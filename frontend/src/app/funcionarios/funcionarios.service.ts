import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, delay, take } from "rxjs/operators";

import { Funcionario } from "./funcionarios";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FuncionariosService {
  private API = "http://localhost:8080/api/funcionarios";

  constructor(private http: HttpClient) {}

  find() {
    return this.http.get<Funcionario[]>(this.API).pipe(tap());
  }

  findById(id): Observable<any> {
    return this.http.get<Funcionario>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(funcionario) {
    return this.http.post(this.API, funcionario);
  }

  private update(funcionario) {
    return this.http.put(`${this.API}`, funcionario).pipe(take(1));
  }

  delete(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

  save(funcionario): Observable<any> {
    if (funcionario.id) {
      return this.update(funcionario);
    } else {
      return this.create(funcionario);
    }
  }
}
