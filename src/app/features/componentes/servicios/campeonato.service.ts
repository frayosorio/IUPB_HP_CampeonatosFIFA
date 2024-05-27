import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Campeonato } from '../../../core/entidades/Campeonato';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}campeonatos/`;
  }

  public listar(): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(`${this.url}listar`);
  }

  public buscar(tipo: number, dato: string): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(`${this.url}buscar/${tipo}/${dato}`);
  }

  public agregar(campeonato: Campeonato): Observable<Campeonato> {
    campeonato.año = campeonato.year;
    return this.http.post<Campeonato>(`${this.url}agregar`, campeonato);
  }

  public modificar(campeonato: Campeonato): Observable<Campeonato> {
    campeonato.año = campeonato.year;
    return this.http.put<Campeonato>(`${this.url}modificar`, campeonato);
  }

  public eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }


}
