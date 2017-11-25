import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { RecipeCategory } from './recipe-category.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Form } from '@angular/forms/src/directives/form_interface';

@Injectable()
export class RecipeCategoryService {
  recipesChanged = new Subject<Recipe[]>();
  categoriesChanged = new Subject<RecipeCategory[]>();

  recipes: Recipe[] = [];
  categories: RecipeCategory[] = [
    new RecipeCategory(
      '1',
      'Schnitzels',
      [
        new Recipe(
          '1',
          '1',
          'Tasty Schnitzel',
          'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]
        )
      ]
    ),
    new RecipeCategory(
      '2',
      'Burgers',
      [
        new Recipe(
          '2',
          '2',
          'Big Fat Burger',
          'What else you need to say?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
          ]
        )
      ]
    )
  ];

  constructor(private slService: ShoppingListService) { 
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
    this.recipesChanged.next(this.recipes.slice());
    this.categoriesChanged.next(this.categories.slice());
  }

  updateRecipe(recipe: Recipe) {
    // Find index of recipe in categories
    const indexCat = this.categories.find(c => c.id === recipe.categoryId)
      .recipes.findIndex(r => r.id === recipe.id);

    // Find index of recipe in recipes
    const indexRec = this.recipes.findIndex(r => r.id === recipe.id);

    // Replace current recipe with new one in categories
    this.categories.find(c => c.id === recipe.categoryId)
      .recipes[indexCat] = recipe;

    // Replace current recipe with new one in recipes
    this.recipes[indexRec] = recipe;

    // Notify observable
    this.recipesChanged.next(this.recipes.slice());
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
    this.recipesChanged.next(this.recipes.slice());
    this.categoriesChanged.next(this.categories.slice());
  }
}
