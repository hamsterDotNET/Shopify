import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService{
  private ingredients: Ingredient[] = [{ name:'Bread', amount: 1 }];
  
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEdit = new Subject<number>();

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.getIngredients());
  }
}