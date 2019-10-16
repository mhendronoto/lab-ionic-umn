import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ActionSheetController, NavController, NavParams } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/places/places.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
@Input()selectedPlace:Place;
@Input() selectedMode:'select'|'random';
startDate:string;
endDate:string;
  constructor(
    private route:ActivatedRoute,
    private navCtrl:NavController,
    private placesService:PlacesService,
    private navParams:NavParams,
    private modalCtrl:ModalController,private loadingCtrl:LoadingController,
    private actionSheetCtrl:ActionSheetController,
    private bookingService:BookingService) { }
  place:Place;
  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap=>{
    //   if(!paramMap.has('placeId')){
    //     this.navCtrl.navigateBack('/places/tabs/offers');
    //     return;
    //   }
    //   this.place=this.placesService.getPlace(paramMap.get('placeId'));
    // })

    const availableFrom=new Date(this.selectedPlace.availableFrom);
    const availableTo= new Date(this.selectedPlace.availableTo);
    if(this.selectedMode==='random'){
      this.startDate=new Date(
        availableFrom.getTime()+
        Math.random()*(availableTo.getTime())-7*24*60*60*1000-availableFrom.getTime()
      ).toISOString();
      this.endDate=new Date(
        new Date(this.startDate).getTime()+
        Math.random()*
        (new Date(this.startDate).getTime()+
        6*24*60*60*1000-
        new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  bookThisPlace(){
    //this.isLoading=true;
    this.loadingCtrl.create({
      keyboardClose:true,
      message:'Booking the place ...'
    })
    .then(loadingEl=>{
      loadingEl.present();
      setTimeout(()=>{
        loadingEl.dismiss();
        this.modalCtrl.dismiss({message:'booked!'},'confirm');
      },2000);
    });
  }

  // async bookPlace(){
  //   const actionSheet=await this.actionSheetCtrl.create({
  //     header:'Book Place',
  //     buttons:[{
  //       text:'Book w/ Random Date',
  //       handler:()=>{
  //         this.modalCtrl.create({component:CreateBookingComponent,
  //         componentProps:{selectedPlace:this.place}})
  //         .then(modalElement=>{
  //           modalElement.present();
  //           return modalElement.onDidDismiss();
  //         })
  //         .then(resultData=>{
  //           console.log(resultData);
  //         });
  //       }
  //     },{
  //       text:'Cancel',
  //       role:'cancel',
  //       handler:()=>{
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  
  onBookMyPlace(){
    // this.bookThisPlace();
    this.modalCtrl.dismiss({message:'This is a dummy message!'},'confirm');
    this.bookingService.addToMyBookings(this.selectedPlace);
  }
}
