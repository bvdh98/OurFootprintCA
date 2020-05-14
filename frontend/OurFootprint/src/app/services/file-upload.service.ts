import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFortisBill(file: File): any {
    const fd = new FormData()
    fd.append('fortis', file)

    const postPromise = this.http.post('/api/fortis', fd).toPromise()

    // postObservable.subscribe(response => console.log(response))

    return postPromise
  }

  uploadHydroBill(file: File): any {
    const fd = new FormData()
    fd.append('hydro', file)

    const postPromise = this.http.post('/api/hydro', fd).toPromise()

    // postObservable.subscribe(response => console.log(response))

    console.log('a promise is... this: ' + typeof postPromise)

    return postPromise
  }
}
