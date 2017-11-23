import { Component, OnInit } from '@angular/core';
import { RecipeCategoryService } from './recipe-category-list/recipe-category.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeCategoryService],
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
