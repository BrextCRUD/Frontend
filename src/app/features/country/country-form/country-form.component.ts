import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../../core/services/country.service'; 
import { Country } from '../../../core/models/country.model'; 
import { FormComponent } from '../../../shared/form/form.component';
import { TableComponent } from '../../../shared/table/table.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { SearchComponent } from '../../../shared/search/search.component';

@Component({
  selector: 'app-country-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.scss'
})
export class CountryFormComponent implements OnInit {
  countryForm!: FormGroup;
  countryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.countryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.countryId = +id;
        this.countryService.getById(this.countryId).subscribe(data => {
          this.countryForm.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.countryForm.invalid) return;

    const country: Country = this.countryForm.value;
    

    if (this.countryId) {
      country.id = this.countryId
      this.countryService.update(country)
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.countryService.create(country).subscribe(
        response => {
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error al crear el país:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}