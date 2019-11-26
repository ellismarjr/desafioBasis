import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from './empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private readonly API = 'http://localhost:8080/empresas/';

  constructor(private http: HttpClient) { }

  find() {
    return this.http.get<Empresa[]>(this.API);
  }

  create(empresa) {
    return this.http.post(this.API, empresa);
  }
}
