import { Component, Inject, NgZone, OnInit, Optional, ViewChild  } from '@angular/core';
import { Item } from 'src/app/data/item';
import { ItemService } from 'src/app/services/item/item.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from 'src/app/data/recipe';
import { UiService } from 'src/app/services/ui/ui.service';
import { User } from 'src/app/data/user';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  public pantryItems: Item[] = []

  public user: User = new User(0, '', '', '', [])


  public tmpid: Number | null = null
  public tmpname: string = ''
  public tmpimage: string = ''
  public tmpowner: number = 0
  public tmpitems: Item[] = []
  public tmpsteps: string = ''
  public tmpmake: boolean = false

  constructor(public itemService: ItemService, private _ngZone: NgZone, @Optional() public dialogRef: MatDialogRef<CreateRecipeComponent>, @Inject(MAT_DIALOG_DATA) public data: Recipe, public ui: UiService){
    this.user = this.ui.currentUser.getValue()    
    this.tmpid = this.data.id
    this.tmpname = this.data.name
    this.tmpimage = this.data.image
    this.tmpitems = this.data.items
    this.tmpsteps = this.data.steps
    this.tmpmake = this.data.make
    // TODO: use a subscription to grab Item data
    // right now it only updates synchronously, not optimal in a production setting
    // it may be beacuse I am returning the Item BehaviorSubject as an Observalbe, which does not hold a value
    // could try piping(take(1)) to it using the Overload next and error methods
  
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  ngOnInit(): void {
    this.itemService.itemSubject.subscribe((value) => {
      value.forEach((item) => {
        if (item.available == true) {
          this.pantryItems.push(item)
        }
      })
    })
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
  }

  cancel() {
    this.data.items.forEach((item) => {
      if (item.recipe === null) {
        this.pantryItems.push(item)
        this.data.items.filter((item) => item.recipe == null)
      }
    })
    this.data.id = this.tmpid
    this.data.name = this.tmpname
    this.data.items = []
    this.data.make = this.tmpmake
    this.data.owner = this.tmpowner
    this.data.steps = this.tmpsteps  
    this.dialogRef.close()
  }
}
