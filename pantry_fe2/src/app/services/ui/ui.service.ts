import { HttpClient, HttpParams } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { User } from 'src/app/data/user';

import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';

@Injectable({
  providedIn: 'root'
})

export class UiService {

  public account: User[] = []
  public accountEdit: User = new User(-1,'','','', [])
  private accountSubject: Subject<User[]> = new Subject()
  
  // display flags
  public displayEdit: boolean = false
  public displayLogin: boolean = true
  public displayRegister: boolean = false
  public displayDashboard: boolean = false
  public displayProfile: boolean = false
  public displayRecipeDashboard = false;
  public displayRecipeView: boolean = false;

  public isLoggedIn: boolean = false
  public guestUser: User = new User(-1,'','','', [])
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(this.guestUser)
  

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog) { 
    this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
    
    if (this.isLoggedIn) {
      var userString = localStorage.getItem("user")
      if (userString) {
        var user = JSON.parse(userString)
        this.tryLogin(user.email,user.password)
      }
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditProfileComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public showAlert(message: string): void {
    this._snackBar.open(message, undefined, {duration: 10000})
  }

  resetValues() {
    this.displayLogin = false;
    this.displayRegister = false;
    this.displayProfile = false;
    this.displayDashboard = false;
    this.displayRecipeDashboard = false;
  }

  tryLogin(email: string, password: string): void {
    if (email === '' || password == ''){
      this.showAlert('Email and/or Password cannot be blank')
    } else {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", email)
    queryParams = queryParams.append("password", password)
    this.http.get<User>('http://localhost:8080/users', { params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user)
        },
        error: (err) => {
          if(err.status === 404){
            this.showAlert("Invalid Email or Password.")
          } else {
            this.showAlert("Error logging in.")
          }
        }
      })
    }
  }

  registerUser(newUser: User): void {
    this.http.post<User>('http://localhost:8080/users', newUser)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user)
        },
        error: (err) => {
          if(err.status === 400){
            this.showAlert("Username or Email already taken.")
          } else {
            this.showAlert("Error registering.")
          }
        }
      })
  }

  logoutUser() {
    localStorage.clear()
    this.resetValues
    this.isLoggedIn = false
    this.currentUser.next(this.guestUser)
    window.location.reload()
  }

  checkLogOut() {
    if (this.currentUser.value === this.guestUser) {
      this.showAlert('Successfully logged out')
    } else {
      this.showAlert('Oops, something went wrong')
    }
  }

  successfulLogin(user: User) {
    localStorage.setItem("isLoggedIn","true")
    localStorage.setItem("user",JSON.stringify(user))
    this.isLoggedIn = true
    this.resetValues()
    this.currentUser.next(user)
    this.displayDashboard = true
  }

  getCurrentUser() {
    return this.currentUser.asObservable()
  }

  getAccountByEmail(email: string): void {
    this.http
      .get<User>(`http://localhost:8080/users?email=${email}`)
      .pipe(take(1))
      .subscribe({
        next: account => {
          this.accountEdit = account
          this.openDialog('0ms', '0ms')
        },
        error: () => {
          this.showAlert('Failed to get account')
        }
      })
  }

  updateEditedProfile(updatedAccount: User): void {
    this.http.put(`http://localhost:8080/users/${updatedAccount.id}`, updatedAccount)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateAccount()
          this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
          this.currentUser.next(updatedAccount)
          localStorage.setItem("user",JSON.stringify(updatedAccount))
      },
        error: (err) => this.showAlert("Error updating account")
      })
  }

  deleteProfileById(id: number): void {
    this.http
      .delete(`http://localhost:8080/users/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
        this.logoutUser()
        this.resetValues()
        this.showAlert('Successfully deleted account')
        this.displayLogin= true;
        },
        error: () => {
          this.showAlert('Failed to delete account')
        }
      })
  }

  updateAccount(): void {
    this.http
      .get<User[]>('http://localhost:8080/users')
      .pipe(take(1))
      .subscribe({ 
        next: account => {
        this.account = account
        this.accountSubject.next(this.account)
      },
      error: () => {
        this.showAlert('Failed to update account')
      }
    })
  }

  whenProfileUpdated(): Observable<User> {
    return this.currentUser.asObservable()
  }

  showLogin() {
    this.resetValues();
    this.displayLogin = true;
  }

  showRegister() {
    this.resetValues();
    this.displayRegister = true;
  }

  showDashboard() {
    this.resetValues();
    this.displayDashboard = true;
  }

  showRecipeDashboard() {
    this.resetValues();
    this.displayRecipeDashboard = true;
  }

  showRecipeView() {
    this.resetValues();
    this.displayRecipeView = true;
  }

  public changeToProfile() {
    this.resetValues();
    this.displayProfile = true
  }

}
