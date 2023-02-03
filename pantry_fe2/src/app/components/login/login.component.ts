import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide: boolean = true
  public username: string = ''
  public email: string = ''
  public password: string = ''

  constructor(public ui: UiService) { }

  loginUser() {
    this.ui.tryLogin(this.email, this.password)
}
}
