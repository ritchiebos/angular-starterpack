import { Component, OnInit, Input } from '@angular/core';
import { RecipeCategory } from '../recipe-category.model';

@Component({
  selector: 'app-recipe-category-item',
  templateUrl: './recipe-category-item.component.html',
  styleUrls: ['./recipe-category-item.component.css']
})
export class RecipeCategoryItemComponent implements OnInit {
  @Input() category: RecipeCategory;

  constructor() { }

  ngOnInit() {
  }

}
