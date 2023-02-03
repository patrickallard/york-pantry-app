import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { elementAt, Subscription } from 'rxjs';
import { Item } from 'src/app/data/item';
import { Recipe } from 'src/app/data/recipe';
import { ItemService } from 'src/app/services/item/item.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[] = []
  public pantryItems: Item[] = []

  public recipe: Recipe = new Recipe(null, '', '', 0, [], '', false)

  public recipeSubscription: Subscription

  public errorExists = false;

  constructor(public recipeService: RecipeService, public itemService: ItemService, public ui: UiService, public dialog: MatDialog) {
    this.recipeSubscription = recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes
    })
  }

  ngOnInit() {
    this.recipeService.getRecipes();
    this.recipeService.pantryItemsEvent.subscribe((value) => {
      value.forEach((item) => {
        if (item.available == true) {
          this.pantryItems.push(item)
        }
      })
    })
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(CreateRecipeComponent, { width: '500px', data: this.recipe, disableClose: true })

    dialogRef.afterClosed().subscribe(recipe => {

      if (this.recipe.items !== undefined) {
        var map = new Map()
        this.recipe.items.map((item) => item.available = false)
        this.recipe.items.forEach(element => this.itemService.updateItem(element))
      }

      if (this.recipe !== undefined) {
        this.recipe = this.recipe
        this.recipe.make = false;
        this.recipeService.createRecipe(recipe)
      }

      if (this.pantryItems.length !== undefined) {
        var map = new Map()
        this.pantryItems.map((item) => item.available = true)
        this.recipe.items.forEach(element => this.itemService.updateItem(element))
      }
    })
  }
}
