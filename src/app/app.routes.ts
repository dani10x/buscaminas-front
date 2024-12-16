import { Routes } from '@angular/router';
import { NuevoJuegoComponent } from './features/pages/nuevo-juego/nuevo-juego.component';

export const routes: Routes = [
    {
        path: 'inicio',
        component: NuevoJuegoComponent
      },
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
      }
];
