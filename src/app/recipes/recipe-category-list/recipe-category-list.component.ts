import {Component, OnInit} from '@angular/core';

import { RecipeCategoryService } from '../recipe-category.service';
import { RecipeCategory } from '../recipe-category.model';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-recipe-category-list',
  templateUrl: './recipe-category-list.component.html',
  styleUrls: ['./recipe-category-list.component.css']
})
export class RecipeCategoryListComponent implements OnInit, OnDestroy {
  categories: RecipeCategory[];
  subscribtion: Subscription;

  name: string = 'all';

  constructor(private categoryService: RecipeCategoryService) {}

  ngOnInit() {
    this.subscribtion = this.categoryService.categoriesChanged
      .subscribe(
        (categories: RecipeCategory[]) => {
          this.categories = categories;
        }
      );
    this.categories = this.categoryService.getCategories();
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

}
