import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../../core/services/city.service'; 
import { City } from '../../../core/models/city.model'; 
import { RegionService } from '../../../core/services/region.service'; 
import { Region } from '../../../core/models/region.model'; 
import { FormComponent } from '../../../shared/form/form.component';
import { TableComponent } from '../../../shared/table/table.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { SearchComponent } from '../../../shared/search/search.component';

@Component({
  selector: 'app-city-list',
  imports: [CommonModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss'
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  regionNames: Map<number, string> = new Map();

  constructor(private cityService: CityService, private regionService: RegionService, private router: Router) {}

  ngOnInit() {
    this.loadCitys();
  }

  loadCitys() {
    this.cityService.getAll().subscribe(data => {
      this.cities = data;
      this.loadRegionNames();
    });
  }

  loadRegionNames() {
    this.cities.forEach(city => {
      if (city.regionId && !this.regionNames.has(city.regionId)) {
        this.regionService.getById(city.regionId).subscribe(region => {
          this.regionNames.set(city.regionId, region.name);
        });
      }
    });
  }

  editCity(id: number): void {
    this.router.navigate(['/city/edit', id]);
  }

  deleteCity(id: number) {
    if (confirm('¿Estás seguro de eliminar esta ciudad?')) {
      this.cityService.delete(id).subscribe(() => this.loadCitys());
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/city/create']);
  }

  getRegionName(regionId: number): string {
    return this.regionNames.get(regionId) || 'Desconocido';
  }
}