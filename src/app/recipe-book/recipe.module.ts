import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-detail/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeRouteModule } from './recipe-route.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipeRouteModule,
    RouterModule
  ]
})
export class RecipeModule { }
