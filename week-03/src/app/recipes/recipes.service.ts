import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes:Recipe[]=[
    {
      id:'r1',
      title:'Gado-gado',
      imageUrl:'https://www.bbcgoodfood.com/sites/default/files/recipe/recipe-image/2016/05/gado-gado-salad.jpg',
      ingredients:['Lontong','Sawi','Bumbu Kecap','Tauge']
    },
    {
      id:'r2',
      title:'Ketupat',
      imageUrl:'https://cdn1-production-images-kly.akamaized.net/a5iLUvIlZoTrQPymxIV1PNYVhPA=/680x383/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2569805/original/089977800_1546464068-ini-dia-tips-pilih-janur-yang-baik-untuk-kulit-ketupat.jpg',
      ingredients:['Beras']
    },
    {
      id:'r3',
      title:'Pizza Margerita',
      imageUrl:'https://img.taste.com.au/Wf8mL7LT/w720-h480-cfill-q80/taste/2016/11/jessica-39581-2.jpeg',
      ingredients:['Tepung','Keju','Garlic','Tomat','Bocconcini']
    },
  ];
  constructor() { }

  getAllRecipes(){
    return [...this.recipes];
  }
  getRecipe(recipeId:string){
    return{
      ...this.recipes.find(recipe=>{
        return recipe.id===recipeId;
      })
    };
  }

  deleteRecipe(recipeId:string){
    this.recipes=this.recipes.filter(
      recipe=>{
        return recipe.id!==recipeId;
      }
    );
  }
}
