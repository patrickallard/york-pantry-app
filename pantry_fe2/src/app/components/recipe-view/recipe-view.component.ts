import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from 'src/app/data/recipe';
import { ItemService } from 'src/app/services/item/item.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Recipe, public recipeService: RecipeService, public itemService: ItemService, public ui: UiService) {}
}
