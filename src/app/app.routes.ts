import { Routes } from '@angular/router';
import { NuevoJuegoComponent } from './features/pages/nuevo-juego/nuevo-juego.component';
import { FormInicialComponent } from './features/pages/form-inicial/form-inicial.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: FormInicialComponent,
  },
  {
    path: 'juego',
    component: NuevoJuegoComponent
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
];
