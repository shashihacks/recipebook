import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipesService } from '../../services/recipe.service';
import { RecipesPage } from '../recipes/recipes';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
recipe:Recipe;
index:number
  constructor(
    private recipesService:RecipesService,
    private shoppingListService:ShoppingListService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }
  ngOnInit(){
  this.recipe=this.navParams.get('recipe')
  this.index=this.navParams.get('index')
    // console.log(this.recipe, "recipe page")
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {'mode':'Edit', recipe:this.recipe,index:this.index} )
  }
  onAddIngredients() {
   this.shoppingListService.addItems(this.recipe.ingredient)
  }
  onDeleteRecipe() {
  this.recipesService.removeRecipe(this.index)
  this.navCtrl.push(RecipesPage)
  }
}
