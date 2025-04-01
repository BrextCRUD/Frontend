import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../../core/services/city.service'; 
import { RegionService } from '../../../core/services/region.service'; 
import { City } from '../../../core/models/city.model'; 
import { Region } from '../../../core/models/region.model'; 
import { FormComponent } from '../../../shared/form/form.component';
import { TableComponent } from '../../../shared/table/table.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { SearchComponent } from '../../../shared/search/search.component';

@Component({
  selector: 'app-city-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './city-form.component.html',
  styleUrl: './city-form.component.scss'
})
export class CityFormComponent implements OnInit {
  cityForm!: FormGroup;
  cityId: number | null = null;
  countries: Region[] = [];

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private regionService: RegionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      regionId: ['', Validators.required]
    });

    this.regionService.getAll().subscribe(data => this.countries = data);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cityId = +id;
        this.cityService.getById(this.cityId).subscribe(data => {
          this.cityForm.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.cityForm.invalid) return;
  
    const city: City = this.cityForm.value;
  
    if (this.cityId) {
      city.id = this.cityId;
      this.cityService.update(city).subscribe(
        () => {
          this.router.navigate(['/cities']);
        },
        (error) => {
          let errorMessage = 'Ha ocurrido un error desconocido';
          if (error?.error) {
            errorMessage = error.error; 
          } else if (error?.message) {
            errorMessage = error; 
          }
  
          alert('Error al actualizar la ciudad: ' + errorMessage); 
          console.error('Error al actualizar la ciudad:', error); 
        }
      );
    } else {
      this.cityService.create(city).subscribe(
        (response) => {
          this.router.navigate(['/cities']);
        },
        (error) => {
          let errorMessage = 'Ha ocurrido un error desconocido';
          if (error?.error) {
            errorMessage = error.error; 
          } else if (error?.message) {
            errorMessage = error; 
          }
  
          alert('Error al crear la ciudad: ' + errorMessage); 
          console.error('Error al crear la ciudad:', error); 
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/cities']);
  }
}