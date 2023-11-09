import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../auth/auth-guard';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { recipeResolver } from './recipe.resolver';

const routes : Routes = [
  { path: '', component: RecipeBookComponent, canActivate:[authGuard], children:[
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
]

@NgModule({
  declarations: [],
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})
export class RecipeRouteModule { }
