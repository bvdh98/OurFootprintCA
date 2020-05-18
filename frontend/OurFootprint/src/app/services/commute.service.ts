import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CommuteService {

  constructor(private http: HttpClient) { }

  getCommutes(): Observable<any> {
    return this.http.get<any>('/api/commute/')
  }

  addCommute(commute): Observable<any> {
    return this.http.post<any>('/api/commute/', commute)
  }

  deleteCommute(id: number): Observable<any> {
    return this.http.delete<any>(`/api/commute/${id}`)
  }
}
