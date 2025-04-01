import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { RegionComponent } from './components/region/region.component';
import { CityComponent } from './components/city/city.component';
import { CountryListComponent } from './features/country/country-list/country-list.component';
import { CountryFormComponent } from './features/country/country-form/country-form.component';

export const routes: Routes = [
    { path: '', component: CountryListComponent },
    { path: 'create', component: CountryFormComponent },
    { path: 'edit/:id', component: CountryFormComponent },
    { path: '', redirectTo: '', pathMatch: 'full'}
];

export const appRouting = [provideRouter(routes, withComponentInputBinding())];


