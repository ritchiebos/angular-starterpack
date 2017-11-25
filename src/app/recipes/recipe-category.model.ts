import { Recipe } from "./recipe.model";



export class RecipeCategory {
  public id: string;
  public name: string;
  public recipes: Recipe[];

  constructor(id: string, name: string, recipes: Recipe[]) {
    this.id = id;
    this.name = name;
    this.recipes = recipes;
  }
}
