import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seleccion',
  standalone: true,
  imports: [
    CommonModule,
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {
  public textoBusqueda: string = "";

  public buscar() {

  }
}
