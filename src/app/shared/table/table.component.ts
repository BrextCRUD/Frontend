import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: any[] = []; 
  @Input() columnHeaders: string[] = []; 
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  editItem(item: any) {
    this.onEdit.emit(item);
  }

  deleteItem(item: any) {
    this.onDelete.emit(item);
  }
}
