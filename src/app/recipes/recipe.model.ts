import { Ingredient } from "../shared/ingredient.model";



export class Recipe {
  public id: string;
  public categoryId: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(id: string, catId: string, name: string, desc: string, 
              imgPath: string, ingr: Ingredient[]) {
    this.id = id;
    this.categoryId = catId;
    this.name = name;
    this.description = desc;
    this.imagePath = imgPath;
    this.ingredients = ingr;
  }
}
