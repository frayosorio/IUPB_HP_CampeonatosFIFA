import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { SeleccionService } from '../../servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';

const ANCHO_DIALOGO = "500px";

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

  private seleccionEscogida: Seleccion | undefined;
  private indiceSeleccionEscogida: number = -1;

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
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
      this.indiceSeleccionEscogida = this.selecciones.findIndex(seleccion => seleccion == this.seleccionEscogida);
    }
  }

  public listar() {
    this.seleccionServicio.listar().subscribe({
      next: respuesta => {
        this.selecciones = respuesta;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public agregar() {
    const dialogoEdicion = this.dialogoServicio.open(SeleccionEditarComponent,
      {
        width: ANCHO_DIALOGO,
        height: "400px",
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

    dialogoEdicion.afterClosed().subscribe({
      next: data => {
        if (data) {
          this.seleccionServicio.agregar(data.seleccion).subscribe(
            {
              next: respuesta => {
                this.seleccionServicio.buscar(0, respuesta.nombre).subscribe({
                  next: respuesta => {
                    this.selecciones = respuesta;
                  },
                  error: error => {
                    window.alert(error.message);
                  }
                });
              },
              error: error => {
                window.alert(error.message);
              }
            }
          );
        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public modificar() {
    if (this.seleccionEscogida) {
      const dialogoEdicion = this.dialogoServicio.open(SeleccionEditarComponent,
        {
          width: ANCHO_DIALOGO,
          height: "400px",
          data:
          {
            encabezado: `Modificando la seleccion ${this.seleccionEscogida.nombre}`,
            seleccion: JSON.parse(JSON.stringify(this.seleccionEscogida))
          }
        }
      );

      dialogoEdicion.afterClosed().subscribe({
        next: data => {
          if (data) {
            this.seleccionServicio.modificar(data.seleccion).subscribe({
              next: respuesta => {
                this.selecciones[this.indiceSeleccionEscogida] = respuesta;
                this.selecciones = [...this.selecciones];
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger una selección");
    }
  }

  public verificarEliminar() {
    if (this.seleccionEscogida) {
      const dialogoEdicion = this.dialogoServicio.open(DecidirComponent,
        {
          width: ANCHO_DIALOGO,
          height: "200px",
          data:
          {
            mensaje: `Está seguro de eliminar la selección ${this.seleccionEscogida.nombre}?`,
            id: this.seleccionEscogida.id
          }
        }
      );

      dialogoEdicion.afterClosed().subscribe({
        next: data => {
          if (data) {
            this.seleccionServicio.eliminar(data.id).subscribe({
              next: respuesta => {
                if (respuesta) {
                  this.listar();
                }
                else{
                  window.alert("No se pudo eliminar la selección");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger una selección");
    }
  }

}
