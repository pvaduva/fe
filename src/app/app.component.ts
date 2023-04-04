import { Component, OnInit } from '@angular/core';
import { ParkingService } from './parking.service';
import { ParkedCar } from './models/parked-car.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  parkedCars: Observable<ParkedCar[]> = new Observable<ParkedCar[]>();
  licensePlateNumber!: string;
  price$: Observable<number | undefined> = new Observable<number | undefined>();
  payment!: number;
  freeSpaces$: Observable<number> = new Observable<number>();
  result$: Observable<string> = new Observable<string>();

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.getParkedCars(); 
  }

  onClick() {
    this.result$ = new Observable<string>();
  }

  getParkedCars() {
    this.parkedCars = this.parkingService.getParkedCars();
  }

  parkCar() {
    this.parkingService.parkCar(this.licensePlateNumber).subscribe({next: () => 
      this.getParkedCars(),
    error: (error) => 
      this.result$ = error.error,
    },);
  }

  unparkCar() {
    this.parkingService.unparkCar(this.licensePlateNumber).subscribe({next: () => 
      this.getParkedCars(),
    error: (error) => 
      this.result$ = error.error,
    },);
  }

  getPrice() {
    this.price$ = this.parkingService.getPriceParkedCar(this.licensePlateNumber);
  }

  payPrice() {
    this.parkingService.payParkedCar(this.licensePlateNumber, this.payment).subscribe({next: () => 
      this.getParkedCars(),
    error: (error) => 
      this.result$ = error.error,
    },);
  }

  getFreeSpaces() {
    this.freeSpaces$ = this.parkingService.getFreeSpaces();
  }
}