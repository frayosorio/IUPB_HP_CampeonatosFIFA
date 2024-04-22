import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/Seleccion';

@Component({
  selector: 'app-seleccion',
  standalone: true,
  imports: [
    CommonModule,
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {
  public textoBusqueda: string = "";
  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad", prop: "entidad" }
  ];

  public buscar() {

  }
  agregar() {

  }
  modificar() {

  }
  verificarEliminar() {

  }

}
