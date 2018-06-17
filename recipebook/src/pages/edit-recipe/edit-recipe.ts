import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { RecipesService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = "new";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;
  message:string="";
  recipe:Recipe;
  index:number
  constructor(
    private recipeService:RecipesService,
  private toastCtrl:ToastController,
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if(this.mode=='Edit'){
    this.recipe=this.navParams.get('recipe')
    this.index=this.navParams.get('index');
    }
    this.initializeForm()
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.message,
      duration: 1600,
      // position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  private initializeForm() {
    let title=null;
    let description=null;
    let difficulty='Medium';
    let ingredients=[];
    if(this.mode=='Edit'){
      title=this.recipe.title;
      difficulty=this.recipe.difficulty;
      description=this.recipe.description;
      for(let ingredient of this.recipe.ingredient){
        ingredients.push(new FormControl(ingredient.name,Validators.required))
      }
    }
    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    })


  }

  onSubmit() {
    console.log(this.recipeForm)
    let value=this.recipeForm.value;
    console.log(this.recipeForm,"submite")
    let ingredients = []
    if(value.ingredients.length>0){
      ingredients=value.ingredients.map(name=>{
        return {name:name, amount:1}
      })
    }
    if(this.mode=='Edit') {
      this.recipeService.updateRecipe(this.index,value.title,
        value.description,
        value.difficulty,ingredients)
    }
   else{
    this.recipeService.addRecipe(value.title,
      value.description,
      value.difficulty,ingredients)
   } 
    
    this.recipeForm.reset()
    this.navCtrl.popToRoot();

  }
  private createNewIngredientAlert() {
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [{
        'name': 'name',
        placeholder: 'Name'
      }
      ],
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Add',
          handler:data=>{
            if(data.name.trim()==''|| data.name==null){
                
              this.message="Enter valid Ingredient";
                this.presentToast();

            }
            (<FormArray> this.recipeForm.get('ingredients')).push(new FormControl (data.name,Validators.required))
              console.log(this.recipeForm.get('ingredients'))
              this.message="Ingredient Added";
              this.presentToast();

          }
        }
      ]
    })
    newIngredientAlert.present();
  }
  onManageIngredients() {
    console.log("manage")
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert()
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destruction',
          handler: () => {
              const fArray:FormArray = <FormArray>this.recipeForm.get('ingredients')
              const len =fArray.length;
              if(len>0){
                for(let i=0;i<=len;i++){
                  fArray.removeAt(i)
                  
                }
                this.message="All ingrdients Deleted";
                this.presentToast();
              }
          }
        },
        {
          text: "Cancel",
          role: 'cancel'
        }
      ]
    })
    actionSheet.present()
  }
}
