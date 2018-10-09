import { Routes } from '@angular/router';
import { ConverterListComponent } from './components/converter-list/converter-list.component';
import { PublicListsComponent } from './components/public-lists/public-lists.component';

export const ROUTES: Routes = [
  { path: '',           component: ConverterListComponent,    data: { title: "Conversions" } },
  { path: 'lists/:id',  component: ConverterListComponent,    data: { title: "Conversions" } },
  { path: 'lists',      component: PublicListsComponent,      data: { title: "Converter Lists" } },
  { path: '**',         redirectTo: '/' },
];
