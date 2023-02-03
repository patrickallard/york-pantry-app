import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Item } from 'src/app/data/item';
import { UiService } from '../ui/ui.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public pantryItems: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([])

  public itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([])

  public creatingItem = false;

  constructor(private http: HttpClient, private ui: UiService) {
    this.updateItems()
  }

  updateItems(): void {
    this.http.get<Item[]>('http://localhost:8080/items')
      .pipe(take(1))
      .subscribe({
        next: (items) => this.itemSubject.next(items),
        error: (err) => this.ui.showAlert("Error getting items")
      })
  }

  updateItem(updatedItemDetails: Item): void {
    this.http.put(`http://localhost:8080/items/${updatedItemDetails.id}`, updatedItemDetails)
      .pipe(take(1))
      .subscribe({
        next: () => { this.updateItems() },
        error: (err) => { this.ui.showAlert("Error updating item") }
      })
  }

  createItem(newItem: Item): void {
    this.http.post('http://localhost:8080/items', newItem) 
      .pipe(take(1))
      .subscribe({
        next: () => this.updateItems(),
        error: (err) => this.ui.showAlert("Error creating item") 
      })
  }

  deleteItem(itemId: Number): void {
    this.http.delete(`http://localhost:8080/items/${itemId}`)
    .pipe(take(1))
    .subscribe({
      next: () => this.updateItems(),
      error: (err) => this.ui.showAlert(`Error deleting item ${itemId}`)
    })
  }

  getItems(): Observable<Item[]> {
    return this.itemSubject.asObservable()
  }
}
