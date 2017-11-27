import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  id: string;
  name: string;

  constructor() {}

  ngOnInit() {
    this.id = this.recipe.id;
    this.name = this.recipe.name.toLowerCase()
      .split(' ').join('-');
  }
}
