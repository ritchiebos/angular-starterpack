import {Recipe} from '../recipe.model';

export class RecipeCategory {
  public name: string;
  public recipes: Recipe[];

  constructor(name: string, recipes: Recipe[]) {
    this.name = name;
    this.recipes = recipes;
  }
}
