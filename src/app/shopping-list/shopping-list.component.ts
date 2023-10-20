import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styles: ['']
  })
  
  export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
    subscription: Subscription;

    constructor(private shoppingListService : ShoppingListService){}

    ngOnInit(): void {
      this.ingredients = this.shoppingListService.getIngredients();
      this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    onEditIngredient(index: number){
      this.shoppingListService.startedEdit.next(index);
    }
  }