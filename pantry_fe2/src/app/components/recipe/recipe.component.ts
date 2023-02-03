import { AfterViewInit, Component, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { elementAt } from 'rxjs';
import { Item } from 'src/app/data/item';
import { Recipe } from 'src/app/data/recipe';
import { User } from 'src/app/data/user';
import { ItemService } from 'src/app/services/item/item.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe = new Recipe(null, '', '', 0, [], '', false)

  public pantryItems: Item[] = []

  public id: number | null = null
  public name: string = ''
  public image: string = ''
  public items: Item[] = []
  public steps: string = ''
  public owner: number | null = null
  public make: boolean = false

  public edit = false;

  constructor(public ui: UiService, public recipeService: RecipeService, public itemService: ItemService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.recipeService.pantryItemsEvent.subscribe((value) => {
      this.pantryItems = value
    })
  }

  deleteitem(recipeId: number) {
    this.recipeService.deleteRecipe(recipeId)
  }

  openEditDialog(recipe: Recipe): void {
    let dialogRef = this.dialog.open(EditRecipeComponent, { width: '400px', data: recipe , disableClose: true })
      dialogRef.afterClosed().subscribe(recipe => {

        if (recipe.items !== undefined) {
          var map = new Map()
          this.recipe.items.map((item) => item.available = false)
          this.recipe.items.map((item) => { item.recipe = recipe.id })
          this.recipe.items.forEach(element => this.itemService.updateItem(element))
        }

        if (this.pantryItems !== undefined) {
          var map = new Map()
          this.pantryItems.map((item) => item.available = true)
          this.recipe.items.map((item) => item.recipe = null)
          this.pantryItems.forEach(element => this.itemService.updateItem(element))
        }

        if (recipe !== undefined) {
          this.recipeService.updateRecipe(recipe)
        }
        
        this.recipeService.submit = false
      })
  }

  removeUnavailableItems(item: Item, index: number, pantryItems: Item[]) {
    if (item.available === false) {
      pantryItems.splice(index, 1)
      return true;
    }
    return false;
  }
}
