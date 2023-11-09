import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes : Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },
  { path: 'recipe-book', loadChildren: () => import('./recipe-book/recipe.module').then(m => m.RecipeModule) }
];

@NgModule({
  imports:[ RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports:[ RouterModule ]
})
export class AppRoutingModule{ }