import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { CountryListComponent } from './features/country/country-list/country-list.component';
import { CountryFormComponent } from './features/country/country-form/country-form.component';
import { RegionListComponent } from './features/region/region-list/region-list.component';
import { RegionFormComponent } from './features/region/region-form/region-form.component';

export const routes: Routes = [
    { path: '', component: CountryListComponent },
    { path: 'country/create', component: CountryFormComponent },
    { path: 'country/edit/:id', component: CountryFormComponent },
    { path: 'regions', component: RegionListComponent },
    { path: 'region/create', component: RegionFormComponent },
    { path: 'region/edit/:id', component: RegionFormComponent },
    { path: '', redirectTo: '', pathMatch: 'full'}
];

export const appRouting = [provideRouter(routes, withComponentInputBinding())];


