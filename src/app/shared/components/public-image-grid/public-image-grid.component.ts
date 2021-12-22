import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { GlobalConstant } from '../../../global-constants';
import { TokenStorageService } from '../../services/token-storage.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-public-image-grid',
  templateUrl: './public-image-grid.component.html',
  styleUrls: ['./public-image-grid.component.scss']
})
export class PublicImageGridComponent implements OnInit {
  @Input() isShowTooltip: boolean = false;
  @Input() size: number = 100;
  @Input() width: number;
  @Input() height: number;
  @Output() deletedFile:  EventEmitter<any> = new EventEmitter<any>();
  @Output() onThumbnailClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() fileInfo: any;
  private image_blob: SafeUrl ;  
  
  constructor(private tokenStorageService: TokenStorageService, private fileService: FileService,
    private http: HttpClient, private santizer: DomSanitizer) { }

  ngOnInit() {
    //get the image
    if (this.fileInfo.id) {
      let route = `${GlobalConstant}/file/${this.fileInfo.id}/user/${TokenStorageService.userId}/image`
      this.http.get(route,{
        responseType: 'blob'
      }).pipe(map(image =>{
        this.image_blob = this.santizer.bypassSecurityTrustUrl(URL.createObjectURL(image))
      })).subscribe(value => {
      });
    }
  }

  getWitdh(): number {
    if (this.width == undefined || this.width <= 0) return this.size;
    else return this.width;
  }

  getHeight(): number {
      if (this.height == undefined || this.height <= 0) return this.size;
      else return this.height;
  }

  thumbnailClick(){

  }

  editImage() {
    let update = {public: !this.fileInfo.public};
    this.fileService.updateFile(this.fileInfo.id, update).subscribe(updated => {
      this.fileInfo = Object.assign(this.fileInfo, update);
    });
  }

  deleteImage() {
    this.fileService.deleteFile(this.fileInfo.id).subscribe(deleted => {
      this.deletedFile.emit(this.fileInfo.id);
    })
  }
}
