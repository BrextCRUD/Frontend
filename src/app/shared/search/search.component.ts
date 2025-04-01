import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  @Output() searchText = new EventEmitter<string>();

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;  
    this.searchText.emit(input.value); 
  }
}
