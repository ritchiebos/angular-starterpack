import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { RecipeCategory } from './recipe-category.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Form } from '@angular/forms/src/directives/form_interface';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class RecipeCategoryService {
  categoriesChanged = new Subject<RecipeCategory[]>();

  categories: RecipeCategory[] = [];
  recipes: Recipe[] = [];

  url: string = 'http://localhost:3000/api/v1';

  constructor(private slService: ShoppingListService, private httpClient: HttpClient) { 
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get<RecipeCategory[]>(this.url + '/categories', {
      observe: 'body',
      responseType: 'json'
    })
    .subscribe(
      (categories: RecipeCategory[]) => {

        //Convert category objects to actual instances of the Category class
        for(let category of categories){

          //Convert recipe objects to actual instances of the Recipe class
          let recipes: Recipe[] = [];
          for(let recipe of category.recipes){
            recipes.push(new Recipe(recipe._id, category._id, recipe.name, recipe.description, recipe.imagePath, recipe.ingredients));
          }

          this.categories.push(new RecipeCategory(category._id, category.name, recipes))
        }

        this.extractRecipes();

        // Notify observable
        this.categoriesChanged.next(this.categories.slice());
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Create a flat array of recipe objects
  private extractRecipes(){
    for(let category of this.categories) {
      let recipes = category.recipes;

      for(let recipe of recipes) {
        this.recipes.push(recipe);
      }
    }
  }

  getCategories() {
    return this.categories.slice();
  }

  getCategory(id: string) {
    return this.categories.find(c => c.id === id);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipesOfCategory(id: string) {
    return this.categories.find(c => c.id === id)
      .recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find(r => r.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    // Generate random ID in Recipe Model
    recipe.id = Math.floor(Math.random() * 101 + 1).toString();  
    
    // Push into categories
    this.categories.find(c => c.id === recipe.categoryId)
      .recipes.push(recipe);
    
    // Push into recipes
    this.recipes.push(recipe);

    // Notify observable
    this.categoriesChanged.next(this.categories.slice());
  }

  updateRecipe(catId: string, recipe: Recipe) {
    const curCat = this.categories.findIndex(c => c.id === catId);
    const newCat = this.categories.findIndex(c => c.id === recipe.categoryId);

    // Find index of recipe in categories
    const indexCat = this.categories.find(c => c.id === catId)
      .recipes.findIndex(r => r.id === recipe.id);
    
    // Find index of recipe in recipes
    const indexRec = this.recipes.findIndex(r => r.id === recipe.id);

    if(curCat === newCat) {
      // Replace current recipe with new one in categories
      this.categories.find(c => c.id === catId)
        .recipes[indexCat] = recipe;

      // Replace current recipe with new one in recipes
      this.recipes[indexRec] = recipe;
    } else {
      // Remove old recipe from categories
      this.categories.find(c => c.id === catId)
        .recipes.splice(indexCat, 1);

      // Push new recipe into recipes
      this.categories.find(c => c.id === recipe.categoryId )
        .recipes.push(recipe);

      // Replace current recipe with new one in recipes
      this.recipes[indexRec] = recipe;
    }

    // Notify observable
    this.categoriesChanged.next(this.categories.slice());
  }

  deleteRecipe(recipe: Recipe) {
    // Find index of recipe in categories
    const indexCat = this.categories.find(c => c.id === recipe.categoryId).
      recipes.findIndex(r => r.id === recipe.id);
    
    // Find index of recipe in recipes
    const indexRec = this.recipes.findIndex(r => r.id === recipe.id)

    // Remove recipe from categories
    this.categories.find(c => c.id === recipe.categoryId)
      .recipes.splice(indexCat, 1);

    // Remove recipe from recipes
    this.recipes.splice(indexRec, 1);

    // Notify observable
    this.categoriesChanged.next(this.categories.slice());
  }
}
