import { Component, OnInit, Input } from '@angular/core';
import { IonMenuToggle } from '@ionic/angular';
import { Place } from '../../place.model';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offer: Place;
  constructor() { }

  ngOnInit() {}

  getDummyDate(){
    return new Date();
  }
}
