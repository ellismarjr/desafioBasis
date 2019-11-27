import { Component, OnInit } from "@angular/core";
import { EmpresasService } from "../empresas.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { map, switchMap, exhaustMap } from "rxjs/operators";

@Component({
  selector: "app-cad-empresas",
  templateUrl: "./cad-empresas.component.html",
  styleUrls: ["./cad-empresas.component.css"]
})
export class CadEmpresasComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresasService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const empresa = this.route.snapshot.data["empresa"];

    this.form = this.fb.group({
      id: [empresa.id],
      nome: [empresa.nome, [Validators.required, Validators.maxLength(250)]],
      endereco: [
        empresa.endereco,
        [Validators.required, Validators.maxLength(250)]
      ],
      cnpj: [empresa.cnpj, [Validators.required, Validators.maxLength(14)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log("create");
      let msgSuccess = "Empresa cadastrada com sucesso!";
      let msgError = "Erro ao cadastrar empresa. Verifique seus dados!";

      if (this.form.value.id) {
        console.log("update");
        msgSuccess = "Empresa atualizada com sucesso!";
        msgError = "Erro ao atualizar empresa. Verifique seus dados!";
      }

      this.empresaService.save(this.form.value).subscribe(
        success => {
          this.toastr.success(msgSuccess);
          this.router.navigate(["/empresas"]);
        },
        error => {
          this.onCancel();
          this.toastr.error(msgError);
        }
      );

      // if (this.form.value.id) {
      //   // update
      //   this.empresaService.update(this.form.value).subscribe(
      //     success => {},
      //     error => {
      //       this.onCancel();
      //     },
      //     () => console.log("request completo")
      //   );
      // } else {
      //   this.empresaService.create(this.form.value).subscribe(
      //     success => {
      //       this.toastr.success("Empresa cadastrada com sucesso!");
      //       this.router.navigate(["/empresas"]);
      //     },
      //     error => {
      //       this.onCancel();
      //       this.toastr.error(
      //         "Erro ao cadastrar empresa. Verifique seus dados!"
      //       );
      //     },
      //     () => console.log("request completo")
      //   );
      // }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(["empresas"]);
  }

  showToast() {
    this.toastr.success("Empresa cadastrada com sucesso!");
  }
}
