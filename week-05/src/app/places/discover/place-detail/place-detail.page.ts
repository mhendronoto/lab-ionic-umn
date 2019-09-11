import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Place } from '../../place.model';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place:Place;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private navCtrl:NavController,
    private placesService:PlacesService,
    private modalCtrl:ModalController,
    private actionSheetCtrl:ActionSheetController
  ) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place=this.placesService.getPlace(paramMap.get('placeId'));
    })
  }
  goBack(){
    this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // this.navCtrl.pop();
  }

  // bookPlace(){
  //   this.modalCtrl.create({
  //     component:CreateBookingComponent,
  //     componentProps: {
  //       place:this.place
  //     }
  //   }).then(modalElement=>{
  //     modalElement.present();
  //   });
  // }

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
  

}
