import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { SeleccionService } from '../servicios/seleccion.service';

@Component({
  selector: 'app-seleccion',
  standalone: true,
  imports: [
    CommonModule,
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent implements OnInit {

  public textoBusqueda: string = "";
  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad", prop: "entidad" }
  ];

  constructor(private seleccionServicio: SeleccionService) {
  }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.seleccionServicio.listar().subscribe(
      {
        next: response => {
          this.selecciones = response;
        },
        error: error => {
          window.alert(error);
        }
      }
    );
  }

  public buscar() {

  }
  agregar() {

  }
  modificar() {

  }
  verificarEliminar() {

  }

}
