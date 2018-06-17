import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../models/ingredient';



@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems:Ingredient[];
  public message:string
  constructor(private shoppingListService:ShoppingListService,public toastCtrl: ToastController){

  }
ionViewWillEnter(){
  this.loadItems()
}
 presentToast() {
  let toast = this.toastCtrl.create({
    message: this.message,
    duration: 1600,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  addItem(form:NgForm){
    console.log(form.value)
    let ingredientName=form.value.ingredient;
    let amount = form.value.amount;
    this.shoppingListService.addItem(ingredientName,amount)
    console.log(ingredientName,amount)
     form.reset();
     this.message="Ingredient added succesfully"
     this.presentToast()
     this.loadItems()

  }
  private loadItems(){
    this.listItems = this.shoppingListService.getItems();

  }
  tapEvent(event,index){
    console.log(event)
    
    this.shoppingListService.removeItem(index)
    this.message="Ingredient Deleted ";
    this.presentToast();
    this.loadItems()
  }


}
