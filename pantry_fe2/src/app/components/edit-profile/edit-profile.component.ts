import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from 'src/app/data/recipe';
import { User } from 'src/app/data/user';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {  
  
  public tmpid: number | null = null
  public tmpusername: string  = ''
  public tmpemail: string = ''
  public tmppassword: string = ''
  public tmprecipes: Recipe[] = []

  constructor(public dialogRef: MatDialogRef<EditProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: User,) { }

  ngOnInit(): void {
    this.tmpid = this.data.id
    this.tmpusername = this.data.username
    this.tmpemail = this.data.email
    this.tmppassword = this.data.password
    this.tmprecipes = this.data.recipes
  }

  cancel() {
    this.data.id = this.tmpid
    this.data.username = this.tmpusername
    this.data.email = this.tmpemail
    this.data.password = this.tmppassword
    this.data.recipes = this.tmprecipes
    this.dialogRef.close()
  }
}
