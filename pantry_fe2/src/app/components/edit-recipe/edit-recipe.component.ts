import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Inject, Injectable, NgZone, OnChanges, OnInit, Optional, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { elementAt, take } from 'rxjs';
import { Item } from 'src/app/data/item';
import { Recipe } from 'src/app/data/recipe';
import { User } from 'src/app/data/user';
import { ItemService } from 'src/app/services/item/item.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  public pantryItems: Item[] = []

  public user: User = new User(null, '', '', '', [])

  public tmpid: Number | null = null
  public tmpname: string = ''
  public tmpimage: string = ''
  public tmpowner: number = 0
  public tmpitems: Item[] = []
  public tmpsteps: string = ''
  public tmpmake: boolean = false

  constructor(@Optional() public dialogRef: MatDialogRef<EditRecipeComponent>, private _ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: Recipe, public recipeService: RecipeService, public itemService: ItemService, public ui: UiService) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  ngOnInit() {
    this.user = this.ui.currentUser.getValue()
    
    this.itemService.itemSubject.subscribe((value) => {
      value.forEach((item) => {
        if (item.available == true) {
          this.pantryItems.push(item)
        }
      })
    })
    
    this.data.owner = this.user.id!
    this.recipeService.raiseEmitterEvent(this.pantryItems)
    
    this.tmpid = this.data.id
    this.tmpname = this.data.name
    this.tmpimage = this.data.image
    this.tmpitems = this.data.items
    this.tmpsteps = this.data.steps
    this.tmpmake = this.data.make

    this.pantryItems.filter(this.removeUnavailableItems)
  }

  removeAvailableItems(item: Item, index: number, items: Item[]) {
    if (item.available === true) {
      items.splice(index, 1)
      return true;
    }
    return false;
  }

  removeUnavailableItems(item: Item, index: number, pantryItems: Item[]) {
    if (item.available === false) {
      pantryItems.splice(index, 1)
      return true;
    }
    return false;
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        // possible entry point for manipulating the data
        // filter or splice the array to the first element
        // possibly not a great idea, solution would need to scale
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      )
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
  }

  cancel() {
    // should hopefully push items that have not been submitted back to the pantry
    // works, but I need to migrate this logic to the recipe component so that nonCancel clicks 
    // initiates the same logic
    this.data.items.forEach((item) => {
      if (item.available === true) {
        this.pantryItems.push(item)
        // item is being pushed back to pantry, but an instance remains in Included as well
      }
    })

    this.data.id = this.tmpid
    this.data.name = this.tmpname
    this.data.items = this.tmpitems
    this.data.make = this.tmpmake
    this.data.owner = this.tmpowner
    this.data.steps = this.tmpsteps


    this.data.items.filter(this.removeAvailableItems)

    this.dialogRef.close()
  }
}
