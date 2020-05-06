import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AutocompleteVehicle } from '../models/vehicle/autocomplete-vehicle.model'

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<AutocompleteVehicle[]> {
    return this.http.get<AutocompleteVehicle[]>('/api/vehicles')
  }
}
