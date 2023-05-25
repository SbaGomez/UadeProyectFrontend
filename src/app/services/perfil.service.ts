import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil'

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private url = 'http://localhost:8080/perfil'

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/deletePerfil', null)
  }

  add(perfil: Perfil): Observable<any> {
    return this.http.post(this.url + '/addPerfil', perfil)
  }

  edit(perfil: Perfil): Observable<any> {
    return this.http.post(this.url + '/' + perfil.id + '/updatePerfil', perfil)
  }
}
