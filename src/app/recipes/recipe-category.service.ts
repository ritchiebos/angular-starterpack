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

  private fetchData() {
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

    this.recipes = [];

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
    let category = this.categories.find(c => c.id === recipe.categoryId)
    category.recipes.push(recipe);
    
    // Push into recipes
    this.recipes.push(recipe);

    // Update to server
    this.putCategory(category);

    // Notify observable
    this.categoriesChanged.next(this.categories.slice());
  }

  private postCategory(category: RecipeCategory) {
    this.httpClient.post(this.url + '/categories', category);
  }

  private putCategory(category: RecipeCategory) {
    this.httpClient.put(this.url + '/categories/' + category.id, category)
    .subscribe(
      (category : RecipeCategory) => {
        //Update category with data received from server
        let originalIndex = this.categories.findIndex(c => c._id == category.id);
        this.categories[originalIndex] = category;
      }
    );
  }

  updateRecipe(catId: string, recipe: Recipe) {
    /*
    const curCatI = this.categories.findIndex(c => c.id === catId);
    const newCatI = this.categories.findIndex(c => c.id === recipe.categoryId);

    const currentCategory = this.categories[curCatI];
    const newCategory = this.categories[newCatI];

    // Find index of recipe in categories
    const indexCat = this.categories.find(c => c.id === catId)
      .recipes.findIndex(r => r.id === recipe.id);
    
    // Find index of recipe in recipes
    const indexRec = this.recipes.findIndex(r => r.id === recipe.id);

    if(curCatI === newCatI) {
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
    */

    const curCatI = this.categories.findIndex(c => c.id === catId);
    const newCatI = this.categories.findIndex(c => c.id === recipe.categoryId);

    const currentCategory = this.categories[curCatI];
    const newCategory = this.categories[newCatI];

    // Find index of recipe in categories
    const indexCat = this.categories.find(c => c.id === catId)
      .recipes.findIndex(r => r.id === recipe.id);
  
    // Find index of recipe in recipes
    const indexRec = this.recipes.findIndex(r => r.id === recipe.id);

    if(curCatI === newCatI) {
      //Category has not changed
      const recipeIndex = currentCategory.recipes.findIndex(r => r._id == recipe._id);
      
      currentCategory.recipes[recipeIndex] = recipe;

      this.putCategory(currentCategory);
    }
    else {
      //Category has changed
      const recipeIndex = currentCategory.recipes.findIndex(r => r._id == recipe._id);
      const recipe = currentCategory.recipes[recipeIndex];

      //Remove from old category
      currentCategory.recipes.splice(recipeIndex, 1);
      this.putCategory(currentCategory);

      //Add to new category
      newCategory.recipes.push(recipe);
      this.putCategory(newCategory);
    }

    // Notify observable
    this.categoriesChanged.next(this.categories.slice());
  }

  deleteRecipe(recipe: Recipe) {
    /*
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
    */

    let category = this.categories.find(c => c.id == recipe.categoryId);
    
    //Get index of recipe
    let recipeIndex = category.recipes.findIndex(r => r.id == recipe.id);

    category.recipes.splice(recipeIndex, 1);

    this.putCategory(category);

    // Notify observable
    this.categoriesChanged.next(this.categories.slice());
  }
}
