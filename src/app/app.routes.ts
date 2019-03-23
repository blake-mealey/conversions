import { Routes } from '@angular/router';
import { ConverterListComponent } from './components/converter-list/converter-list.component';
import { PublicListsComponent } from './components/public-lists/public-lists.component';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';

export const ROUTES: Routes = [
  { path: '',               component: ConverterListComponent,    data: { title: 'Chimerical Conversions' } },
  { path: 'lists/:id',      component: ConverterListComponent,    data: { title: 'Chimerical Conversions' } },
  { path: 'lists',          component: PublicListsComponent,      data: { title: 'Converter Lists' } },
  { path: 'auth/redirect',  component: AuthRedirectComponent,     data: { title: 'Chimerical Conversions' } },
  { path: '**',             redirectTo: '/' },
];
