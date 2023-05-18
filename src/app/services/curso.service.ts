import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url = 'http://localhost:8080/curso'

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/deleteCurso', null)
  }

  add(curso: Curso): Observable<any> {
    return this.http.post(this.url + '/addCurso', curso)
  }

  edit(curso: Curso): Observable<any> {
    return this.http.post(this.url + '/' + curso.id + '/updateCurso', curso)
  }
}
