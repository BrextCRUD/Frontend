import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { CountryListComponent } from './features/country/country-list/country-list.component';
import { CountryFormComponent } from './features/country/country-form/country-form.component';

export const routes: Routes = [
    { path: '', component: CountryListComponent },
    { path: 'country/create', component: CountryFormComponent },
    { path: 'country/edit/:id', component: CountryFormComponent },
    { path: '', redirectTo: '', pathMatch: 'full'}
];

export const appRouting = [provideRouter(routes, withComponentInputBinding())];


