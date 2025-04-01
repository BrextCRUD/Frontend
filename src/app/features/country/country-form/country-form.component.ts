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
  imports: [],
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.scss'
})
export class CountryFormComponent {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  fields = [{ label: 'Nombre', name: 'name', type: 'text' }];

  constructor(private countryService: CountryService, private router: Router) {}

  save() {
    if (this.formGroup.valid) {
      const countryData = {
        id: 0,  
        name: this.formGroup.value.name || '',
      };
      this.countryService.create(countryData).subscribe(() => {
        this.router.navigate(['/countries']);
      });
    }
  }
}