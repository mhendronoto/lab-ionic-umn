import { Component, OnInit } from '@angular/core';
import { MenuController, IonItemSliding } from '@ionic/angular';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  constructor(private menuCtrl:MenuController,private bookingService:BookingService,private router:Router) { }
  loadedBookings:Booking[];
  ngOnInit() {
    this.loadedBookings=this.bookingService.getAllBookings();
  }

  onOpenMenu(){
    this.menuCtrl.toggle('m1');
  }

  ionViewWillEnter(){
    this.loadedBookings=this.bookingService.getAllBookings();
  }

  deleteBooking(id:string,slidingItem:IonItemSliding){
    slidingItem.close();
    console.log(id+": cancelled");
    this.bookingService.deleteBooking(id);
    // this.router.navigate(['/']);
    this.ionViewWillEnter();
  }

}
