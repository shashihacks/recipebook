import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipePage } from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes:Recipe[];
  constructor(
    public recipeService:RecipesService,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  onNewRecipe(){
    console.log("pus")
    this.navCtrl.push(EditRecipePage, {mode:'new'})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }
  ionViewWillEnter(){
    this.recipes=this.recipeService.getRecipes();
  }
  onLoadRecipe(recipe:Recipe,index:number){
    this.navCtrl.push(RecipePage,{recipe:recipe, index:index} )
  }
}
