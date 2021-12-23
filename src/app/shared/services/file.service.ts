import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { GlobalConstant } from '../../global-constants';

const FILE_API = `${GlobalConstant.apiURL}/file/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient, tokenService: TokenStorageService) { }

  getFileCount(): Observable<any> {
    return this.http.get(FILE_API + `user/${TokenStorageService.userId}/count`)
  }

  fetchFiles(limit?,offset?): Observable<any> {
    let route = FILE_API + `user/${TokenStorageService.userId}`;
    if (limit || offset) {
      route = route + `?limit=${limit}&offset=${offset}`;
    }
    return this.http.get(route);
  }

  fetchPublicFiles(limit?,offset?): Observable<any> {
    let route = FILE_API + `public`;
    if (limit || offset) {
      route = route + `?limit=${limit}&offset=${offset}`;
    }
    return this.http.get(route);
  }

  deleteFile(fileId): Observable<any> {
    return this.http.delete(FILE_API + `${fileId}/user/${TokenStorageService.userId}`)
  }

  updateFile(fileId, updateObj): Observable<any> {
    return this.http.put(FILE_API + `${fileId}/user/${TokenStorageService.userId}`, updateObj);
  }
}