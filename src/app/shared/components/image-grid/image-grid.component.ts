import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { TokenStorageService } from '../../services';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit {
  @Input() isShowTooltip: boolean = false;
  @Input() size: number = 100;
  @Input() width: number;
  @Input() height: number;
  
  @Output() onThumbnailClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() fileId: any;
  private image_blob: SafeUrl ;  
  
  constructor(tokenStorageService: TokenStorageService,
    private http: HttpClient, private santizer: DomSanitizer) { }

  ngOnInit() {
    //get the image
    console.log(this.fileId)
    if (this.fileId) {
      let route = `http://localhost:6969/api/file/${this.fileId}/user/${TokenStorageService.userId}/image`
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
}
