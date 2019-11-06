import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService { 
  private places=new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Serpong M-Town',
      '2BR apartment near Sumamrecon Mal Serpong.',
      'http://www.summareconbekasi.com/public/images/gallery/article/7082/IMG_3293-25.jpg',
      700000000,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Scientia Residence',
      'Near UMN with many choices of foods around.',
      'https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100123853_wh_3',
      1000000000,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'Ruko Bolsena',
      'We have Bakmi Ationg nearby!',
      'https://rumahdijual.com/attachments/tangerang/30084584d1541116925-disewakan-ruko-bolsena-2-unit-bersebelahan-gading-serpong-tangerang-faraday.jpg',
      1000000000,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    ]);
  constructor(private authService:AuthService) { }
   get getAllPlaces(){
    // return [...this.places];
    return this.places.asObservable();
  }

  getPlace(placeId:string){
    // return {...this.places.find(p=>p.id===placeId)}
    return this.places.pipe(
      take(1),
      map(places=>{
        return {...places.find(p=>p.id===placeId)};
      })
    );
  }

  addPlace(title:string,description:string,price:number,dateFrom:Date,dateTo:Date){
    const newPlace=new Place(
      Math.random().toString(),
      title,
      description,
      'https://static3.businessinsider.com/image/5681799ce6183e55008b526d-480/carmel-place-nyc-micro-apartment.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    // this.places.push(newPlace);
    this.places.pipe(take(1)).subscribe(places=>{
      setTimeout(()=>{
        this.places.next(places.concat(newPlace));
      },1000);
    });
  }
}
