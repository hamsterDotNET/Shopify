import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { recipeResolver } from "./recipe-book/recipe.resolver";
import { AuthenticationComponent } from "./auth/authentication.component";

const appRoutes : Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },
  { path: 'recipe-book', component: RecipeBookComponent, children:[
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    {
      path: ':id',
      component: RecipeDetailComponent,
      resolve:{ recipe: recipeResolver }
    },
    {
      path: ':id/edit',
      component: RecipeEditComponent,
      resolve:{ recipe: recipeResolver }
    }]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthenticationComponent }
];

@NgModule({
  imports:[ RouterModule.forRoot(appRoutes)],
  exports:[ RouterModule ]
})
export class AppRoutingModule{

}