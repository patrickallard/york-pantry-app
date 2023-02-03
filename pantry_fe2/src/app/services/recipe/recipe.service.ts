import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Item } from 'src/app/data/item';
import { Recipe } from 'src/app/data/recipe';
import { ItemService } from '../item/item.service';
import { UiService } from '../ui/ui.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public recipeSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([])
  
  public pantryItemsEvent = new EventEmitter<Item[]>();

  public creatingItem = false;
  public submit = false;

  constructor(private http: HttpClient, private ui: UiService, private itemService: ItemService) {
    this.updateRecipes()
  }

  raiseEmitterEvent(data: Item[]) {
    this.pantryItemsEvent.next(data)
  }

  updateRecipes(): void {
    this.http.get<Recipe[]>(`http://localhost:8080/recipes?userId=${this.ui.currentUser.getValue().id}`)
      .pipe(take(1))
      .subscribe({
        next: (recipe) => this.recipeSubject.next(recipe),
        error: (err) => this.ui.showAlert("Error getting recipe")
      })
  }

  updateRecipe(updatedRecipeDetails: Recipe): void {
    this.http.put(`http://localhost:8080/recipes/${updatedRecipeDetails.id}`, updatedRecipeDetails)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateRecipes()
          this.itemService.updateItems()
        } ,
        error: (err) => {
          console.log("this error is firing")  
          this.ui.showAlert("Error updating recipe")
        }
      })
  }

  createRecipe(newRecipe: Recipe): void {
    this.http.post('http://localhost:8080/recipes', newRecipe) 
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateRecipes()
          this.itemService.updateItems()
        },
        error: (err) => this.ui.showAlert("Error creating recipe") 
      })
  }

  deleteRecipe(recipeId: Number): void {
    this.http.delete(`http://localhost:8080/recipes/${recipeId}`)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.updateRecipes()
        this.itemService.updateItems()
      },
      error: (err) => this.ui.showAlert(`Error deleting recipe ${recipeId}`)
    })
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipeSubject.asObservable()
  }

  onSubmit(): void {
    this.submit = true;
  }

  makeRecipe(recipe: Recipe): void {
    if (recipe.items.length < 1) {
      this.ui.showAlert("Minimum of ONE item must be included to make " + recipe.name)
      return;
    }
    recipe.owner = this.ui.currentUser.getValue().id!
    recipe.make = true;
    this.updateRecipe(recipe)
  }
}
