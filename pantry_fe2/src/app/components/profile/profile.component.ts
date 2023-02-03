import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/data/user';
import { UiService } from 'src/app/services/ui/ui.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {
  
  @Input() account: User = new User(-1, '', '', '', [])

  public accountSub: Subscription

  public id: number | null
  public username: string | undefined
  public email: string | undefined
  public password: string | undefined

  public file: File | null = null;

  constructor(public ui: UiService, public dialog: MatDialog, public fb: FormBuilder) {
    this.accountSub = this.ui.whenProfileUpdated()
    .subscribe(account => this.account = account)
    this.id = this.account?.id
    this.username = this.account?.username
    this.email = this.account?.email
    this.password = this.account?.password
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe()
  }

  openEditDialog(editProfile: User): void {
    let dialogRef = this.dialog.open(EditProfileComponent, { width: '500px', data: editProfile, disableClose: true})
    
    dialogRef.afterClosed().subscribe(account => {
      if (account !== undefined) {
        this.ui.updateEditedProfile(account)
      }
    })
  }

  // File Upload
  @ViewChild('fileInput') el: ElementRef | undefined;
  imageUrl: any = 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg';

  registrationForm = this.fb.group({ })  

  uploadFile(event: any | undefined) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
      }     
    }
  }

}
