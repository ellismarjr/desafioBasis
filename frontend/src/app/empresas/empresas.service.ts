import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, delay, take } from "rxjs/operators";

import { Empresa } from "./empresa";

@Injectable({
  providedIn: "root"
})
export class EmpresasService {
  private readonly API = "http://localhost:8080/empresas";

  constructor(private http: HttpClient) {}

  find() {
    return this.http.get<Empresa[]>(this.API).pipe(delay(2000), tap());
  }

  findById(id) {
    return this.http.get<Empresa>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(empresa) {
    return this.http.post(this.API, empresa);
  }

  private update(empresa) {
    return this.http.put(`${this.API}/${empresa.id}`, empresa).pipe(take(1));
  }

  delete(empresa) {
    return this.http.delete(`${this.API}/${empresa.id}`, empresa).pipe(take(1));
  }

  save(empresa) {
    if (empresa.id) {
      console.log("update");
      return this.update(empresa);
    } else {
      console.log("create");
      return this.create(empresa);
    }
  }
}
