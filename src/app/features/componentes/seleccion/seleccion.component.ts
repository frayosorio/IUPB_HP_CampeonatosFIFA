import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { SeleccionService } from '../../servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';

@Component({
  selector: 'app-seleccion',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent implements OnInit {

  public textoBusqueda: string = "";
  public tipoBusqueda: number = 0;
  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  constructor(private seleccionServicio: SeleccionService,
    private dialogoServicio: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.listar();
  }

  public buscar() {
    if (this.textoBusqueda) {
      this.seleccionServicio.buscar(this.tipoBusqueda, this.textoBusqueda).subscribe({
        next: respuesta => {
          this.selecciones = respuesta;
        },
        error: error => {
          window.alert(error);
        }
      });
    } else {
      this.listar();
    }
  }

  public escoger(event: any) {

  }

  public listar() {
    this.seleccionServicio.listar().subscribe({
      next: respuesta => {
        this.selecciones = respuesta;
      },
      error: error => {
        window.alert(error);
      }
    });
  }

  public agregar() {
    const dialogoEdicion = this.dialogoServicio.open(SeleccionEditarComponent,
      {
        width:"500px",
        height:"400px",
        data:
        {
          encabezado: "Agregando una nueva seleccion",
          seleccion: {
            id: 0,
            nombre: "",
            entidad: ""
          }
        }
      }
    );
  }

  public modificar() {

  }

  public verificarEliminar() {

  }

}
