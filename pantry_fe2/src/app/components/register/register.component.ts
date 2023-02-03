import { Component } from '@angular/core';
import { User } from 'src/app/data/user';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public hide: boolean = true
  public newUser: User = new User(-1,'','','', [])


  constructor(public ui: UiService) { }

  registerUser() {  
    this.ui.registerUser(this.newUser)
  }
}
