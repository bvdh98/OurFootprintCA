import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {

  constructor(private http: HttpClient) { }

  calculateFootprint(): Observable<any> {
    return this.http.get<any>('/api/calculate/')
  }
  
}
