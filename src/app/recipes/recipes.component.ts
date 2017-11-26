import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  	this.getRecipes();
  }

  getRecipes() {
  	this.httpClient.get<Recipe[]>('https://jsonplaceholder.typicode.com/posts/1/comments', {
  		observe: 'body',
			responseType: 'json'
  	})
  	.map(
      (recipes) => {
				for (let recipe of recipes) {
					if (!recipe['ingredients']) {
						recipe['ingredients'] = [];
					}
				}
        return recipes;
      }
		)
		.subscribe(
			// (Response) => {
			// 	console.log(Response)
			// }

			(recipes: Recipe[]) => {
				// this.recipeService.setRecipes(recipes);
				console.log(recipes);
      }
		);
  }
}