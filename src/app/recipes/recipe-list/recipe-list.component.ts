import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeCategoryService } from '../recipe-category.service';
import { forEach } from '@angular/router/src/utils/collection';
import { RecipeCategory } from '../recipe-category.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  catId: string;
  recipes: Recipe[];

  subOne: Subscription;
  subTwo: Subscription;

  constructor(private recipeService: RecipeService,
              private categoryService: RecipeCategoryService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subOne = this.route.params
      .subscribe(
        (params: Params) => {
          this.catId = params['id'];
          
          try {
            if(!this.catId) {
              this.recipes = this.categoryService.getRecipes();
            } else {
              this.recipes = this.categoryService.getRecipesOfCategory(this.catId);
            }
          } catch(e) {
            this.onReload();
          }
        }
      );

    this.subTwo = this.categoryService.categoriesChanged
      .subscribe(
        () => {
          
          try {
            if(!this.catId) {
              this.recipes = this.categoryService.getRecipes();
            } else {
              this.recipes = this.categoryService.getRecipesOfCategory(this.catId);
            }
          } catch(e) {
            this.onReload();
          }
        }
      );
  }

  ngOnDestroy() {
    this.subOne.unsubscribe();
    this.subTwo.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onReload() {
    this.router.navigate(['/recipes']);
  }
}
