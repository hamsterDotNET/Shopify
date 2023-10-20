import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editIndex: number;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService){
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEdit.subscribe((index: number) =>{
      this.editMode = true;
      this.editIndex = index;
      this.editIngredient = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.amount
      });
    });
  }

  onAddIngredient(form: NgForm){
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode){
      this.form.reset();
      this.editMode = false;
      this.shoppingListService.updateIngredient(this.editIndex, ingredient);
    }
    else{
      this.shoppingListService.addIngredient(ingredient);
    }
  }

  onClear(): void{
    this.form.reset();
    this.editMode = false;
  }

  onDelete(): void{
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editIndex);
  }
}
