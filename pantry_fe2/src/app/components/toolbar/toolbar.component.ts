import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(public ui: UiService){}

  public totalItem: number = 0;
  
  ngAfterViewInit(): void {
    const dateElement = document.getElementById("date")
    if(dateElement){
      const date = new Date()
      dateElement.innerHTML = date.toLocaleDateString()
    }
  }
}
