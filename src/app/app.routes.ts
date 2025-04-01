import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { RegionComponent } from './components/region/region.component';
import { CityComponent } from './components/city/city.component';

export const routes: Routes = [
    { path: 'countries', component: CountryComponent},
    { path: 'regions', component: RegionComponent},
    { path: 'cities', component: CityComponent},
    { path: '', redirectTo: '/countries', pathMatch: 'full'}
];

export const appRouting = [provideRouter(routes, withComponentInputBinding())];


