import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }

  postFile(filesToUpload: any): Observable<any> {
    let url = 'https://54s07wbbpe.execute-api.sa-east-1.amazonaws.com/file-upload-system';
    
    const formData: FormData = new FormData();
    
    formData.append('file', filesToUpload[0], filesToUpload[0].name);
    
    let headers = new HttpHeaders();

    return this._http.post(url, formData, { headers: headers });
  }
}
