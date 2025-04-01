import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
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
