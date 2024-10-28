import { Routes } from '@angular/router';
import { InicioComponent } from './features/componentes/inicio/inicio.component';
import { SeleccionComponent } from './features/componentes/seleccion/seleccion.component';

export const routes: Routes = [
    { path: "inicio", component: InicioComponent },
    { path: "seleccion", component: SeleccionComponent },
];
