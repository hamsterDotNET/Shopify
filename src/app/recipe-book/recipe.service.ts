import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService{
  private recipes: Recipe[] = [
    new Recipe('One Pan Creamy Garlic Chicken Breasts',
      'Tender chicken breasts smothered in a rich garlic cream sauce, all made in the same pan, and ready in less than 30 minutes!',
      'https://littlesunnykitchen.com/wp-content/uploads/2022/03/Creamy-Garlic-Chicken-1.jpg',
      [
        new Ingredient('Chicken Breast Halves', 4),
        new Ingredient('Kosher Salt', .5),
        new Ingredient('Black Pepper', .75),
        new Ingredient('Papikra', .25),
      ]),
    new Recipe('Boilermaker Tailgate Chili',
      'This boilermaker chili recipe is the one the gang eats at Purdue Boilermaker football games.',
      'https://i.pinimg.com/736x/cb/10/27/cb10278a61f6e3e647aff294f6fda80f.jpg',
      [
        new Ingredient('Ground Beef Chuck', 2),
        new Ingredient('Italian Sausage', 1),
        new Ingredient('Chili Beans', 3),
      ]),
  ];

  recipeSelected = new Subject<Recipe>();
  
  addRecipe(recipe: Recipe){

  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  getRecipes(){
    return this.recipes.slice();
  }

  updateRecipe(id: number, recipe: Recipe){

  }
}