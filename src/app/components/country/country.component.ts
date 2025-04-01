import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../core/services/country.service'; 
import { Country } from '../../core/models/country.model'; 
import { FormComponent } from '../../shared/form/form.component';
import { TableComponent } from '../../shared/table/table.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SearchComponent } from '../../shared/search/search.component';

@Component({
  selector: 'app-country',
  imports: [CommonModule, ReactiveFormsModule, FormComponent, TableComponent, ModalComponent, SearchComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})

export class CountryComponent implements OnInit {
  countries: Country[] = []; // Todos los países
  filteredCountries: Country[] = []; // Países filtrados
  selectedCountry: Country | null = null;
  showForm: boolean = false;
  countryForm: FormGroup;
  showModal: boolean = false;
  countryToDelete: Country | null = null;

  constructor(private countryService: CountryService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {
    this.countryForm = this.fb.group({
      name: ['', Validators.required] // Asegúrate de que el campo "name" sea requerido
    });
  }

  ngOnInit(): void {
    this.loadCountries(); // Cargar los países al iniciar
  }

  loadCountries() {
    this.countryService.getAll().subscribe(countries => {
      this.countries = countries;
      this.filteredCountries = countries; // Inicializa la lista filtrada
    });
  }

  showCreateForm() {
    this.selectedCountry = { id: 0, name: '' }; // Inicializar un país vacío
    this.showForm = true;
  }

  // Método para agregar un nuevo país
  addCountry(newCountry: Country) {
    if (!newCountry.name) {
      return;
    }

    // this.countryService.addCountry(newCountry).subscribe(() => {
    //   this.router.navigate(['/countries']);
    // });
  }

  // Método para editar un país
  editCountry() {
    if (this.countryForm.invalid) {
      return; // Si el formulario no es válido, no se debe enviar
    }

    const updatedCountry: Country = { ...this.selectedCountry!, ...this.countryForm.value };

    // this.countryService.update(updatedCountry).subscribe(() => {
    //   this.loadCountries(); // Recargar los países después de editar
    //   this.showForm = false; // Ocultar el formulario
    //   this.selectedCountry = null; // Limpiar el país seleccionado
    //   this.countryForm.reset(); // Resetear el formulario después de editar
    // });
  }

  // Método para buscar y filtrar los países
  onSearch(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.filteredCountries = [...this.countries]; // Si no hay búsqueda, mostrar todos
    } else {
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  // Método para seleccionar un país para editar
  selectCountryForEdit(country: Country) {
    this.selectedCountry = country;
    this.countryForm.setValue({
      name: country.name
    });
    this.showForm = true; // Mostrar el formulario de edición
  }

  deleteCountry(country: Country) {
    this.countryToDelete = country;
    this.showModal = true;
  }

  confirmDelete() {
    // if (this.countryToDelete) {
    //   this.countryService.delete(this.countryToDelete.id).subscribe(() => {
    //     this.loadCountries();
    //     this.showModal = false;
    //     this.countryToDelete = null;
    //   });
    // }
  }

  closeModal() {
    this.showModal = false;
    this.countryToDelete = null;
  }
}

