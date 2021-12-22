import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/services';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  public limit = 15;
  public offset = 0;
  public fileList = [] 
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
    this.fileService.fetchFiles(this.limit,this.offset).subscribe(fileLists => {
      this.fileList = fileLists.rows;
      this.fileCount = fileLists.count;
    })

  }

  appendFiles() {
    this.fileService.fetchFiles(this.limit,this.offset).subscribe(fileLists => {
      this.fileList.push(...fileLists.rows);
    })
  }

  handleDelete($event) {
    this.fileList = this.fileList.filter(f => {
      return f.id !== $event
    })
  }

  onScrollDown(ev) {
    //fetch more files
    this.appendFiles();

    this.direction = "down";
  }

}
