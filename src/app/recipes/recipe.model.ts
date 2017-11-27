import { Ingredient } from "../shared/ingredient.model";



export class Recipe {
  public _id: string;
  public categoryId: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  get id():string{
    return this._id;
  }

  set id(id: string){
    this._id = id;
  }

  constructor(_id: string, catId: string, name: string, desc: string, 
              imgPath: string, ingr: Ingredient[]) {
    this._id = _id;
    this.categoryId = catId;
    this.name = name;
    this.description = desc;
    this.imagePath = imgPath;
    this.ingredients = ingr;
  }
}
