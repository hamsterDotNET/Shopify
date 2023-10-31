import { ResolveFn } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { inject } from '@angular/core';
import { RecipeService } from './recipe.service';

export const recipeResolver: ResolveFn<Recipe[]> = (route, state) => {
  const recipes = inject(RecipeService).getRecipes();
  if (recipes.length === 0){
    return inject(DataStorageService).fetchRecipes();
  }

  return recipes;
};
