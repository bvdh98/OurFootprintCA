import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFortisBill(file: File): any {
    console.log('we got all the way to \'uploadFortisBill\'')

    const fd = new FormData()
    fd.append('fortisBill', file)

    console.log('formData didn\'t break probably... here it is: ' + fd)

    const postPromise = this.http.post('/api/uploadfortisbill', fd).toPromise();

    // postObservable.subscribe(response => console.log(response))

    console.log('a promise is... this: ' + typeof postPromise)

    return postPromise
  }

  uploadHydroBill(file: File): any {
    console.log('we got all the way to \'uploadHydroBill\'')

    const fd = new FormData()
    fd.append('hydroBill', file)

    console.log('formData didn\'t break probably... here it is: ' + fd)

    const postPromise = this.http.post('/api/uploadhydrobill', fd).toPromise();

    // postObservable.subscribe(response => console.log(response))

    console.log('a promise is... this: ' + typeof postPromise)

    return postPromise
  }
}
