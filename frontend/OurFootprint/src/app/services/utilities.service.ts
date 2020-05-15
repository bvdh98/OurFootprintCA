import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {

  constructor(private http: HttpClient) { }

  getFortisRows(): Observable<any> {
    return this.http.get('/api/fortis/')
  }

  deleteFortisRow(id: number): Observable<any> {
    return this.http.delete(`/api/fortis/${id}`)
  }

  uploadFortisBill(file: File): any {
    const fd = new FormData()
    fd.append('fortis', file)

    const postPromise = this.http.post('/api/fortis/', fd).toPromise()

    return postPromise
  }

  getHydroRows(): Observable<any> {
    return this.http.get('/api/hydro/')
  }

  deleteHydroRow(id: number): Observable<any> {
    return this.http.delete(`/api/hydro/${id}`)
  }

  uploadHydroBill(file: File): any {
    const fd = new FormData()
    fd.append('hydro', file)

    const postPromise = this.http.post('/api/hydro/', fd).toPromise()

    return postPromise
  }
}
