import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/data/item';
import { Recipe } from 'src/app/data/recipe';
import { ItemService } from 'src/app/services/item/item.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { CreateItemComponent } from '../create-item/create-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  
  @Input() item: Item = new Item(null, '', '', 0, 0, true, null)

  public id: number | null = null
  public name: string = ''
  public image: string = ''
  public weight: number = 0
  public calories: number = 0
  public available: boolean = true
  public recipe: Recipe | null = null
 
  public edit = false;

  constructor(public ui: UiService, public itemService: ItemService, public dialog: MatDialog) {}

  deleteitem(itemId: number) {
    this.itemService.deleteItem(itemId)
  }

  openEditDialog(item: Item): void {
    let dialogRef = this.dialog.open(EditItemComponent, { width: '400px', data: item, disableClose: true})

    dialogRef.afterClosed().subscribe(item => {
      if (item !== undefined) {
        this.itemService.updateItem(item)
      }
    })
  }
}
