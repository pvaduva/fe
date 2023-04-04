import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkedCar } from './models/parked-car.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private baseUrl = 'http://localhost:5039/Parking';

  constructor(private http: HttpClient) { }

  getParkedCars(): Observable<ParkedCar[]> {
    return this.http.get<ParkedCar[]>(`${this.baseUrl}/`);
  }

  parkCar(licensePlateNumber: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/`,   '"' + licensePlateNumber + '"',   { headers: { 
      'Content-Type': 'application/json'
    } });
  }

  unparkCar(licensePlateNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${licensePlateNumber}`);
  }

  getPriceParkedCar(licensePlateNumber: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/price/${licensePlateNumber}`);
  }

  payParkedCar(licensePlateNumber: string, payment: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/paypark/${licensePlateNumber}`,  payment );
  }

  getFreeSpaces(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/free-spaces`);
  }
}