import { Recipe } from "./recipe.model";



export class RecipeCategory {
  public _id: string;
  public name: string;
  public recipes: Recipe[];
  
  get id():string {
    return this._id;
  }

  set id(id: string){
    this._id = id;
  }

  constructor(_id: string, name: string, recipes: Recipe[]) {
    this._id = _id;
    this.name = name;
    this.recipes = recipes;
  }
}
