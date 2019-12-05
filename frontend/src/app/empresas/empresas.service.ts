import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, delay, take } from "rxjs/operators";

import { Empresa } from "./empresa";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EmpresasService {
  private readonly API = "http://localhost:8080/api/empresas";

  constructor(private http: HttpClient) {}

  // metodo para pegar somente o id, nome e cnpj da empresa
  list() {}

  findAll() {
    return this.http.get<Empresa[]>(`${this.API}/all`).pipe(tap());
  }

  find() {
    return this.http.get<Empresa[]>(this.API).pipe(tap());
  }

  findById(id): Observable<any> {
    return this.http.get<Empresa>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(empresa) {
    return this.http.post(this.API, empresa);
  }

  private update(empresa) {
    return this.http.put(`${this.API}`, empresa).pipe(take(1));
  }

  delete(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

  save(empresa): Observable<any> {
    if (empresa.id) {
      return this.update(empresa);
    } else {
      return this.create(empresa);
    }
  }
}
