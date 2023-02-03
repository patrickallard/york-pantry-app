import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/data/item';
import { ItemService } from 'src/app/services/item/item.service';
import { CreateItemComponent } from '../create-item/create-item.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  
  public pantryItems: Item[] = []

  public tmpid: number | null = null
  public tmpname: string = ''
  public tmpimage: string = ''
  public tmpweight: number = 0
  public tmpcalories: number = 0
  public tmpavailable: boolean = false
  public tmprecipe: number | null = null

  constructor(@Optional() public dialogRef: MatDialogRef<CreateItemComponent>, @Inject(MAT_DIALOG_DATA) public data: Item, public itemService: ItemService) {}

  ngOnInit() {
    this.tmpid = this.data.id
    this.tmpname = this.data.name
    this.tmpimage = this.data.image
    this.tmpweight = this.data.weight
    this.tmpcalories = this.data.calories
    this.tmpavailable = this.data.available
    this.tmprecipe = this.data.recipe
  }

  cancel() {
    this.dialogRef.close()

    this.data.id = this.tmpid
    this.data.name = this.tmpname
    this.data.image = this.tmpimage
    this.data.weight = this.tmpweight
    this.data.calories = this.tmpcalories
    this.data.available = this.tmpavailable
    this.data.recipe = this.tmprecipe
  }
}
