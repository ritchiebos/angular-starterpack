import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'all', component: RecipeListComponent, children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id/:recipe', component: RecipeDetailComponent},
      { path: ':id/:recipe/edit', component: RecipeEditComponent },
    ] },
    { path: ':id/:category', component: RecipeListComponent, children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id/:recipe', component: RecipeDetailComponent},
      { path: ':id/:recipe/edit', component: RecipeEditComponent },
    ] }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
