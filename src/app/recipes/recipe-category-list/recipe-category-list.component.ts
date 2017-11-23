import { Component, OnInit } from '@angular/core';
import { RecipeCategory } from './recipe-category.model';
import { RecipeCategoryService } from './recipe-category.service';

@Component({
  selector: 'app-recipe-category-list',
  templateUrl: './recipe-category-list.component.html',
  styleUrls: ['./recipe-category-list.component.css']
})
export class RecipeCategoryListComponent implements OnInit {
  categories: RecipeCategory[];

  constructor(private categoryService: RecipeCategoryService) { 
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
  }

}
