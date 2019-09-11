import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ActionSheetController, NavController, NavParams } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/places/places.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private navCtrl:NavController,
    private placesService:PlacesService,
    private navParams:NavParams,
    private modalCtrl:ModalController,private loadingCtrl:LoadingController,
    private actionSheetCtrl:ActionSheetController) { }
  place:Place;
  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap=>{
    //   if(!paramMap.has('placeId')){
    //     this.navCtrl.navigateBack('/places/tabs/offers');
    //     return;
    //   }
    //   this.place=this.placesService.getPlace(paramMap.get('placeId'));
    // })
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

  async bookPlace(){
    const actionSheet=await this.actionSheetCtrl.create({
      header:'Book Place',
      buttons:[{
        text:'Book w/ Random Date',
        handler:()=>{
          this.modalCtrl.create({component:CreateBookingComponent,
          componentProps:{selectedPlace:this.place}})
          .then(modalElement=>{
            modalElement.present();
            return modalElement.onDidDismiss();
          })
          .then(resultData=>{
            console.log(resultData);
          });
        }
      },{
        text:'Cancel',
        role:'cancel',
        handler:()=>{
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
