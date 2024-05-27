import { Seleccion } from "./Seleccion";

export interface Campeonato {
    id: number;
    nombre: string;
    año: number;
    year: number;
    seleccion: Seleccion;
    idSeleccion: number
}