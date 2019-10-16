import { Component, OnInit } from '@angular/core';
import { MenuController, IonItemSliding } from '@ionic/angular';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { Router } from '@angular/router';
import { Place } from '../places/place.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  constructor(private menuCtrl:MenuController,private bookingService:BookingService,private router:Router) { }
  loadedBookings:Booking[];
  myBookings:Place[];
  ngOnInit() {
    this.loadedBookings=this.bookingService.getAllBookings();
    this.myBookings=this.bookingService.getMyBookings();
    console.log(this.myBookings);
  }

  onOpenMenu(){
    this.menuCtrl.toggle('m1');
  }

  ionViewWillEnter(){
    this.loadedBookings=this.bookingService.getAllBookings();
    this.myBookings=this.bookingService.getMyBookings();
    console.log(this.myBookings);
  }

  deleteBooking(id:string,slidingItem:IonItemSliding){
    slidingItem.close();
    console.log(id+": cancelled");
    this.bookingService.deleteBooking(id);
    this.loadedBookings=this.bookingService.getAllBookings();

    // this.router.navigate(['/']);
    // this.ionViewWillEnter();
  }

  onCancelMyBooking(id:string){
    this.bookingService.removeFromMyBookings(id);
    this.myBookings=this.bookingService.getMyBookings();
  }

}
