import { Component, OnInit } from '@angular/core';
import { MenuController, IonItemSliding } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  constructor(private menuCtrl:MenuController,private placesService:PlacesService, private router:Router) { }
  loadedPlaces:Place[];
  ngOnInit() {
    this.loadedPlaces=this.placesService.getAllPlaces();
  }
  onOpenMenu(){
    this.menuCtrl.toggle('m1');
  }

  editOffer(offerId:string,slidingItem:IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/','places','tabs','offers','edit',offerId]);
    console.log('Editing item',offerId);
  }
}
