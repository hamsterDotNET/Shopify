import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe-book/recipe.service';
import { Recipe } from '../recipe-book/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private uri = 'https://ng-firebase-1e15d-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeSrvc: RecipeService) {
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(this.uri)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            // make sure the recipe.ingredients is not a null array
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          })
        }),
        tap(recipes => {
          this.recipeSrvc.setRecipes(recipes);
        })
      );
  }
  
  storeRecipes(){
    const recipes = this.recipeSrvc.getRecipes();
    this.http.put(this.uri, recipes, {}).subscribe(
      response => {
        console.log(response);
      });
  }
}
