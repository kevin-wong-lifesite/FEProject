import { Component, OnChanges, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit,OnChanges {

  private uploader: FileUploader;
  
  constructor() {
    this.uploader = new FileUploader({
      url: `http://localhost:6969/api/file/user/1`,
      allowedFileType: ['image'],
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        console.log(item,"FDSFDS")
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    })

    this.uploader.response.subscribe( res => console.log(res,"SDFDSF") );

  }

  ngOnInit() {
    console.log(this.uploader)
    this.uploader.onAfterAddingFile = (file) => { 
      console.log(this.uploader.queue)
      console.log(file) };

  } 

  ngOnChanges() {
  }

  public fileOverBase(e:any):void {
    
  }

  onFileDrop(event){
    //check file type is image
    if (!event[0].type.includes('image')) {
      alert("Please upload an image")
    } else {

    }
  }

}
