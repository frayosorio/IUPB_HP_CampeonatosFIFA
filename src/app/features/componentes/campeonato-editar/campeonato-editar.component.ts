import { Component, Inject } from '@angular/core';
import { Campeonato } from '../../../core/entidades/Campeonato';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { NgFor } from '@angular/common';


export interface DatosEdicionCampeonato {
  encabezado: string;
  campeonato: Campeonato;
  selecciones: Seleccion[];
}

@Component({
  selector: 'app-campeonato-editar',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './campeonato-editar.component.html',
  styleUrl: './campeonato-editar.component.css'
})
export class CampeonatoEditarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionCampeonato,
    public dialogRef: MatDialogRef<CampeonatoEditarComponent>,
  ) {

  }

  cerrar(){
    this.dialogRef.close();
  }
}
