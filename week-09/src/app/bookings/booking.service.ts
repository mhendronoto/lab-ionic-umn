import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { Place } from '../places/place.model';

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

  private myBookings:Place[]=[];
  constructor() { }

  addToMyBookings(p:Place){
    this.myBookings.push(p);
  }

  removeFromMyBookings(id:string){
    this.myBookings=this.myBookings.filter(p=>{
      return p.id!==id;
    });
  }
  getMyBookings(){
    return[...this.myBookings];
  }

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
