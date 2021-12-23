import { Component, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUploader } from 'ng2-file-upload';
import { GlobalConstant } from '../shared';
import { AppStore } from '../shared/store';
import { getUserId } from '../shared/user';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit,OnChanges {

  private uploader: FileUploader;
  private userId: number;

  constructor(private store: Store<AppStore>) {
    this.uploader = new FileUploader({
      allowedFileType: ['image']
    })


    this.uploader.onCompleteAll = () => {
      this.uploader.clearQueue()
    }
  }

  ngOnInit() {
    this.store.pipe(getUserId).subscribe(id => {
      this.userId = id;
    })
  } 

  ngOnChanges() {
  }

  public fileOverBase(e:any):void {``
    
  }

  removeFile(file) {
    this.uploader.removeFromQueue(file);
  }

  submitFiles(){

    let fileUrl = `${GlobalConstant.apiURL}/file/user/${this.userId}`
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.setOptions({
      url: fileUrl
    })

    this.uploader.uploadAll();
  }

  onFileDrop(event){
    //check file type is image
    if (!event[0].type.includes('image')) {
      alert("Please upload an image")
    } else {

    }
  }

}
