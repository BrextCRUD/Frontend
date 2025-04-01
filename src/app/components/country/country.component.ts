import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../core/services/country.service'; 
import { Country } from '../../core/models/country.model'; 
import { FormComponent } from '../../shared/form/form.component';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-country',
  imports: [CommonModule, FormComponent, TableComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})

export class CountryComponent implements OnInit {
  countries: Country[] = [];
  selectedCountry: Country | null = null;
  showForm: boolean = false;
  countryForm: FormGroup;

  constructor(private countryService: CountryService, private fb: FormBuilder) {
    this.countryForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  addCountry() {
    const newCountry: Country = this.countryForm.value;
    this.countryService.addCountry(newCountry).subscribe(() => {
      this.loadCountries();
      this.showForm = false;
    });
  }

  editCountry(country: Country) {
    this.selectedCountry = country;
    this.countryForm.setValue({
      name: country.name
    });
    this.showForm = true;
  }

  deleteCountry(country: Country) {
    this.countryService.deleteCountry(country.id).subscribe(() => {
      this.loadCountries();
    });
  }
}

