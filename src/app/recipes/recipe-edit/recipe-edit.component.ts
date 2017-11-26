import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { RecipeCategoryService } from '../recipe-category.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { RecipeCategory } from '../recipe-category.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeId: string;
  currentCatID: string;

  editMode = false;

  subscription: Subscription;
  categories: RecipeCategory[];

  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private categoryService: RecipeCategoryService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.recipeId = params['id'];
          this.editMode = params['id'] != null;
          this.categories = this.categoryService.getCategories();

          this.initForm();
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let recipeId = '';
    let recipeName = '';
    let recipeCatId = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.categoryService.getRecipe(this.recipeId);
      this.currentCatID = recipe.categoryId;

      recipeId = recipe.id
      recipeName = recipe.name;
      recipeCatId = recipe.categoryId;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'id': new FormControl(recipeId),
      'name': new FormControl(recipeName, Validators.required),
      'categoryId': new FormControl(recipeCatId, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSave() {
    if (!this.editMode) {
      this.categoryService.addRecipe(this.recipeForm.value);
    } else {
      this.categoryService.updateRecipe(this.currentCatID, this.recipeForm.value);
    }

    this.onCancel();
  }

  onCancel() {
    if (!this.editMode) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../../'], {relativeTo: this.route});
    }
  }
}
