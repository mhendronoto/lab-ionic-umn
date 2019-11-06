import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, IonItemSliding } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit,OnDestroy {

  constructor(private menuCtrl:MenuController,private placesService:PlacesService, private router:Router) { }
  loadedPlaces:Place[];
  private placesSub:Subscription;
  ngOnInit() {
    // this.loadedPlaces=this.placesService.getAllPlaces();
    this.placesSub=this.placesService.getAllPlaces.subscribe(places=>{
      this.loadedPlaces=places;
    });
  }
  onOpenMenu(){
    this.menuCtrl.toggle('m1');
  }

  editOffer(offerId:string,slidingItem:IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/','places','tabs','offers','edit',offerId]);
    console.log('Editing item',offerId);
  }

  ngOnDestroy(){
    this.placesSub.unsubscribe();
  }
}
