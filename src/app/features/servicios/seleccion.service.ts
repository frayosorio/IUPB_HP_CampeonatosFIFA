import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seleccion } from '../../core/entidades/Seleccion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}selecciones/`;
  }

  public listar(): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}listar`);
  }

  public buscar(tipo: number, dato:string): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}buscar/${tipo}/${dato}`);
  }

}
