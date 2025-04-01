import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isVisible: boolean = false; 
  @Input() modalTitle: string = '';
  @Input() modalMessage: string = '';
  @Output() closeModal = new EventEmitter<void>(); 
  @Output() confirmAction = new EventEmitter<void>(); 

  close() {
    this.closeModal.emit(); 
  }

  confirm() {
    this.confirmAction.emit(); 
    this.close(); 
  }
}
