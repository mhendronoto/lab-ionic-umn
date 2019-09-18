import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings:Booking[]=[
    new Booking(
      'b1',
      'p3',
      'u1',
      'Ruko Bolsena',
      2
    ),
    new Booking(
      'b2',
      'p2',
      'u1',
      'Scientia Residence',
      8
    )
  ]
  constructor() { }

  getAllBookings(){
    return [...this.bookings];
  }

  getBooking(bookingId:string){
    return {...this.bookings.find(b=>b.id===bookingId)}
  }

  deleteBooking(bookingId:string){
    this.bookings=this.bookings.filter(b=>{
      return b.id!==bookingId;
    });
  }
}
