import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/services';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public limit = 15;
  public offset = 0;
  public publicFileList = [] 
  public fileCount;
  public scrollStop = false;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  modalOpen = false;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    //get all the total files 
    this.fileService.fetchPublicFiles(this.limit,this.offset).subscribe(fileLists => {
      this.publicFileList = fileLists.rows;
      this.fileCount = fileLists.count;
    })

  }

  appendFiles() {
    this.fileService.fetchFiles(this.limit,this.offset).subscribe(fileLists => {
      this.publicFileList.push(...fileLists.rows);
    })
  }

  handleDelete($event) {
    this.publicFileList = this.publicFileList.filter(f => {
      return f.id !== $event
    })
  }

  onScrollDown(ev) {
    //fetch more files
    this.appendFiles();

    this.direction = "down";
  }
}