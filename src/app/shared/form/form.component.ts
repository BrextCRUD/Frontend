import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
  @Input() title: string = '';
  @Input() formGroup!: FormGroup;
  @Input() fields: { label: string; name: string; type: string }[] = [];
  @Output() submitForm = new EventEmitter<void>();

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitForm.emit();
    }
  }
}
