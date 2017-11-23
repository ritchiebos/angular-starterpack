import { Injectable } from '@angular/core';
import { RecipeCategory } from './recipe-category.model';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Injectable()
export class RecipeCategoryService {
  categories: RecipeCategory[] = [
    new RecipeCategory(
      'Schnitzels',
      [
        new Recipe(
          'Tasty Schnitzel',
          'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]
        ),
        new Recipe(
          'Tasty Schnitzel 2',
          'A super-tasty Schnitzel 2 - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]
        )
      ]
    ),
    new RecipeCategory(
      'Burgers',
      [
        new Recipe(
          'Big Fat Burger',
          'What else you need to say?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
          ]
        ),
        new Recipe(
          'Big Fat Burger 2',
          'What else you need to say hmmm?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
          ]
        )
      ]
    )
  ];

  constructor() { }

  getCategories() {
    return this.categories.slice();
  }

  getCategory(index: number) {
    return this.categories[index];
  }

}
