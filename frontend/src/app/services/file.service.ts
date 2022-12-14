import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  //Backend base domain
  ROOT_URL: string = 'http://localhost:8000/api';
  //Request Options
  request_options: Object = {withCredentials: true}

  constructor(private http:HttpClient) { }

  /**
   * **Sends an HTTP request with a file to the backend to upload it there**
   * @param {File} file File to upload
   * @return {Observable<HttpResponse<any>>} Observable HTTP Response
   */
  upload(file: any): Observable<HttpResponse<any>> {
    const formData = new FormData(); 
    formData.append("file", file, file.name);
    return this.http.post<any>(`${this.ROOT_URL}/tickets/upload-file`, formData, this.request_options)
  }

  /**
   * **Sends an HTTP request to the backend to download file**
   * @param {string} file_name File Name
   * @return {Observable<HttpResponse<any>>} Observable HTTP Response
   */
  download(file_name: string): Observable<HttpResponse<any>>{
    return this.http.post(`${this.ROOT_URL}/tickets/download-file`, {file: file_name}, {withCredentials: true, observe:'response', responseType:'blob'})
  }
}
