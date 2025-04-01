import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../../../core/services/region.service'; 
import { Region } from '../../../core/models/region.model'; 
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

  constructor(private regionService: RegionService, private router: Router) {}

  ngOnInit() {
    this.loadRegions();
  }

  loadRegions() {
    this.regionService.getAll().subscribe(data => this.regions = data);
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
}