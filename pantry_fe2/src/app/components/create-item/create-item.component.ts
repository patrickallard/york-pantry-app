import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/data/item';
import { User } from 'src/app/data/user';
import { ItemService } from 'src/app/services/item/item.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent {

  constructor(@Optional() public dialogRef: MatDialogRef<CreateItemComponent>, @Inject(MAT_DIALOG_DATA) public data: Item, public itemService: ItemService, public ui: UiService) {}

  cancel() {
    this.dialogRef.close()
  }
}
