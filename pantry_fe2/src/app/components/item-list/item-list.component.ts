import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/data/item';
import { ItemService } from 'src/app/services/item/item.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { CreateItemComponent } from '../create-item/create-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {

  public items: Item[] = []
  public item: Item = new Item(null, '', '', 0, 0, true, null)

  public itemSubscription: Subscription

  public errorExists = false;

  constructor(public itemService: ItemService, public ui: UiService, public dialog: MatDialog) {
    this.itemSubscription = itemService.getItems().subscribe((items) => {
      this.items = items
    })
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(CreateItemComponent, { width: '500px', data: this.item })

    dialogRef.afterClosed().subscribe(item => {
      if (item !== undefined) {
        this.item = item
        this.itemService.createItem(item)
      }
    })
  }
  
  ngOnInit() {
    this.itemService.getItems();
  }
}
