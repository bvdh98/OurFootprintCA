import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFortisBill(file: File): any {
    console.log('we got all the way to the \'fortis\' endpoint')

    const fd = new FormData()
    fd.append('fortis', file)

    console.log('formData didn\'t break probably... here it is: ' + fd)

    const postPromise = this.http.post('/api/fortis', fd).toPromise()

    // postObservable.subscribe(response => console.log(response))

    console.log('a promise is... this: ' + typeof postPromise)

    return postPromise
  }

  uploadHydroBill(file: File): any {
    console.log('we got all the way to the \'hydro\' endpoint')

    const fd = new FormData()
    fd.append('hydro', file)

    console.log('formData didn\'t break probably... here it is: ' + fd)

    const postPromise = this.http.post('/api/hydro', fd).toPromise()

    // postObservable.subscribe(response => console.log(response))

    console.log('a promise is... this: ' + typeof postPromise)

    return postPromise
  }
}
