import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() showModal: boolean = false;
  @Input() message: string = '';
  @Output() onConfirm: EventEmitter<void> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  close() {
    this.showModal = false;
  }

  confirm() {
    this.onConfirm.emit();
    this.close();
  }

  cancel() {
    this.onCancel.emit();
    this.close();
  }
}
