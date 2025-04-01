import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../../../core/services/region.service'; 
import { Region } from '../../../core/models/region.model'; 
import { CountryService } from '../../../core/services/country.service'; 
import { Country } from '../../../core/models/country.model'; 
import { FormComponent } from '../../../shared/form/form.component';
import { TableComponent } from '../../../shared/table/table.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { SearchComponent } from '../../../shared/search/search.component';

@Component({
  selector: 'app-region-list',
  imports: [CommonModule],
  templateUrl: './region-list.component.html',
  styleUrl: './region-list.component.scss'
})
export class RegionListComponent implements OnInit {
  regions: Region[] = [];
  countryNames: Map<number, string> = new Map();

  constructor(private regionService: RegionService, private countryService: CountryService, private router: Router) {}

  ngOnInit() {
    this.loadRegions();
  }

  loadRegions() {
    this.regionService.getAll().subscribe(data => {
      this.regions = data;
      this.loadCountryNames();
    });
  }

  loadCountryNames() {
    this.regions.forEach(region => {
      if (region.countryId && !this.countryNames.has(region.countryId)) {
        this.countryService.getById(region.countryId).subscribe(country => {
          this.countryNames.set(region.countryId, country.name);
        });
      }
    });
  }

  editRegion(id: number): void {
    this.router.navigate(['/region/edit', id]);
  }

  deleteRegion(id: number) {
    if (confirm('¿Estás seguro de eliminar este departamento?')) {
      this.regionService.delete(id).subscribe(() => this.loadRegions());
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/region/create']);
  }

  getCountryName(countryId: number): string {
    return this.countryNames.get(countryId) || 'Desconocido';
  }
}