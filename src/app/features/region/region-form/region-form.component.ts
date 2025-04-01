import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../../../core/services/region.service'; 
import { CountryService } from '../../../core/services/country.service'; 
import { Region } from '../../../core/models/region.model'; 
import { Country } from '../../../core/models/country.model'; 
import { FormComponent } from '../../../shared/form/form.component';
import { TableComponent } from '../../../shared/table/table.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { SearchComponent } from '../../../shared/search/search.component';

@Component({
  selector: 'app-region-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './region-form.component.html',
  styleUrl: './region-form.component.scss'
})
export class RegionFormComponent implements OnInit {
  regionForm!: FormGroup;
  regionId: number | null = null;
  countries: Country[] = [];

  constructor(
    private fb: FormBuilder,
    private regionService: RegionService,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.regionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      countryId: ['', Validators.required]
    });

    this.countryService.getAll().subscribe(data => this.countries = data);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.regionId = +id;
        this.regionService.getById(this.regionId).subscribe(data => {
          this.regionForm.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.regionForm.invalid) return;
  
    const region: Region = this.regionForm.value;
  
    if (this.regionId) {
      region.id = this.regionId;
      this.regionService.update(region).subscribe(
        () => {
          this.router.navigate(['/regions']);
        },
        (error) => {
          let errorMessage = 'Ha ocurrido un error desconocido';
          if (error?.error) {
            errorMessage = error.error; 
          } else if (error?.message) {
            errorMessage = error; 
          }
  
          alert('Error al actualizar el departamento: ' + errorMessage); 
          console.error('Error al actualizar el departamento:', error); 
        }
      );
    } else {
      this.regionService.create(region).subscribe(
        (response) => {
          this.router.navigate(['/regions']);
        },
        (error) => {
          let errorMessage = 'Ha ocurrido un error desconocido';
          if (error?.error) {
            errorMessage = error.error; 
          } else if (error?.message) {
            errorMessage = error; 
          }
  
          alert('Error al crear el departamento: ' + errorMessage); 
          console.error('Error al crear el departamento:', error); 
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/regions']);
  }
}