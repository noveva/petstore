import { Routes } from '@angular/router';
import { PetsListComponent } from './pets-list/pets-list.component';

export const routes: Routes = [
  {
    path: '',
    component: PetsListComponent
  },
  {
    path: '**',
    component: PetsListComponent
  }
];
