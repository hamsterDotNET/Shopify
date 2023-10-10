import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
//  @Input() open: boolean = true;

  constructor(
    private recipeSrvc: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.recipe = this.recipeSrvc.getRecipe(+params['id']);
    });
  }

  activateShoppingList(){
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
