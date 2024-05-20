import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { SeleccionService } from '../servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';
import { DecidirComponent } from '../decidir/decidir.component';

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
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public seleccionEscogida: Seleccion | undefined;
  public indiceSeleccionEscogida: number = -1;

  constructor(private seleccionServicio: SeleccionService,
    public dialogServicio: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listar();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
      this.indiceSeleccionEscogida = this.selecciones.findIndex(seleccion => seleccion == this.seleccionEscogida);
    }
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
    if (this.textoBusqueda.length == 0) {
      this.listar();
    }
    else {
      this.seleccionServicio.buscar(0, this.textoBusqueda).subscribe({
        next: response => {
          this.selecciones = response;
        },
        error: error => {
          window.alert(error);
        }
      });
    }
  }
  agregar() {
    const dialogRef = this.dialogServicio.open(SeleccionEditarComponent, {
      width: '500px',
      height: '300px',
      data: {
        encabezado: "Agregando una nueva Selección",
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        },
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.seleccionServicio.agregar(datos.seleccion).subscribe({
            next: response => {
              this.seleccionServicio.buscar(0, response.nombre).subscribe({
                next: response => {
                  this.selecciones = response;
                },
                error: error => {
                  window.alert(error);
                }
              });
            },
            error: error => {
              window.alert(error);
            }
          });
        }
      },
      error: error => {
        window.alert(error);
      }
    }
    );
  }
  modificar() {
    if (this.seleccionEscogida) {
      const dialogRef = this.dialogServicio.open(SeleccionEditarComponent, {
        width: '500px',
        height: '300px',
        data: {
          encabezado: `Editando la Selección [${this.seleccionEscogida.nombre}]`,
          seleccion: this.seleccionEscogida,
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.seleccionServicio.modificar(datos.seleccion).subscribe({
              next: response => {
                this.selecciones[this.indiceSeleccionEscogida] = response;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
    else {
      window.alert("Se debe elegir una Selección de la lista");
    }
  }
  verificarEliminar() {
    if (this.seleccionEscogida) {
      const dialogRef = this.dialogServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar la Selección [${this.seleccionEscogida.nombre}]`,
          id: this.seleccionEscogida.id
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.seleccionServicio.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar();
                  window.alert("La selección fue eliminada");
                }
                else {
                  window.alert("No se pudo eliminar la selección");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
    else {
      window.alert("Se debe elegir una Selección de la lista");
    }
  }

}
