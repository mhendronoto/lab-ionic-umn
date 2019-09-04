import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService { 
  private places:Place[]=[
    new Place(
      'p1',
      'Serpong M-Town',
      '2BR apartment near Sumamrecon Mal Serpong.',
      'http://www.summareconbekasi.com/public/images/gallery/article/7082/IMG_3293-25.jpg',
      700000000
    ),
    new Place(
      'p2',
      'Scientia Residence',
      'Neaer UMN with many choices of foods around.',
      'https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100123853_wh_3',
      1000000000
    ),
    ]
  constructor() { }
  getAllPlaces(){
    return [...this.places];
  }
}
