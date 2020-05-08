import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFortisBill(file: File): Observable<any> {
    return this.http.post('/api/uploadfortisbill', file)
  }

  uploadHydroBill(file: File): Observable<any> {
    return this.http.post('/api/uploadhydrobill', file)
  }
}
