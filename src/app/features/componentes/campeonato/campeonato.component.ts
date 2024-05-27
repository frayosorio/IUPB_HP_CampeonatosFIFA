import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { Campeonato } from '../../../core/entidades/Campeonato';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { CampeonatoService } from '../servicios/campeonato.service';
import { MatDialog } from '@angular/material/dialog';
import { CampeonatoEditarComponent } from '../campeonato-editar/campeonato-editar.component';
import { DecidirComponent } from '../decidir/decidir.component';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [
    ReferenciasMaterialModule
  ],
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.css'
})
export class CampeonatoComponent {

  public textoBusqueda: string = "";
  public campeonatos: Campeonato[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "País", prop: "seleccion.nombre" },
    { name: "Año", prop: "año" },
  ];
  public modoColumna = ColumnMode;
  public tipoCampeonato = SelectionType;

  public campeonatoEscogido: Campeonato | undefined;
  public indiceCampeonatoEscogido: number = -1;

  constructor(private campeonatoServicio: CampeonatoService,
    public dialogServicio: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listar();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.campeonatoEscogido = event.row;
      this.indiceCampeonatoEscogido = this.campeonatos.findIndex(campeonato => campeonato == this.campeonatoEscogido);
    }
  }

  public listar() {
    this.campeonatoServicio.listar().subscribe(
      {
        next: response => {
          this.campeonatos = response;
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
      this.campeonatoServicio.buscar(0, this.textoBusqueda).subscribe({
        next: response => {
          this.campeonatos = response;
        },
        error: error => {
          window.alert(error);
        }
      });
    }
  }
  agregar() {
    const dialogRef = this.dialogServicio.open(CampeonatoEditarComponent, {
      width: '500px',
      height: '300px',
      data: {
        encabezado: "Agregando un nuevo Campeonato",
        campeonato: {
          id: 0,
          nombre: "",
          seleccion: {
            id: 0, nombre: "", entidad: ""
          },
          año: 0
        },
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.campeonatoServicio.agregar(datos.campeonato).subscribe({
            next: response => {
              this.campeonatoServicio.buscar(0, response.nombre).subscribe({
                next: response => {
                  this.campeonatos = response;
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
    if (this.campeonatoEscogido) {
      const dialogRef = this.dialogServicio.open(CampeonatoEditarComponent, {
        width: '500px',
        height: '300px',
        data: {
          encabezado: `Editando el Campeonaton [${this.campeonatoEscogido.nombre}]`,
          campeonato: this.campeonatoEscogido,
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.campeonatoServicio.modificar(datos.campeonato).subscribe({
              next: response => {
                this.campeonatos[this.indiceCampeonatoEscogido] = response;
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
      window.alert("Se debe elegir un Campeonato de la lista");
    }
  }
  verificarEliminar() {
    if (this.campeonatoEscogido) {
      const dialogRef = this.dialogServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar el Campeonato [${this.campeonatoEscogido.nombre}]`,
          id: this.campeonatoEscogido.id
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.campeonatoServicio.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar();
                  window.alert("El Campeonato fue eliminado");
                }
                else {
                  window.alert("No se pudo eliminar el Campeonato");
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
      window.alert("Se debe elegir un Campeonato de la lista");
    }
  }

}
