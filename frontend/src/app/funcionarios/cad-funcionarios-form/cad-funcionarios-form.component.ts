import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FuncionariosService } from "../funcionarios.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { EmpresasService } from "src/app/empresas/empresas.service";
import { Empresa } from "src/app/empresas/empresa";

@Component({
  selector: "app-cad-funcionarios-form",
  templateUrl: "./cad-funcionarios-form.component.html",
  styleUrls: ["./cad-funcionarios-form.component.css"]
})
export class CadFuncionariosFormComponent implements OnInit {
  formFuncionario: FormGroup;
  submitted = false;
  empresas: Empresa[];
  isEmpresaEmpty = false;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionariosService,
    private empresasService: EmpresasService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const funcionario = this.route.snapshot.data["funcionario"];

    this.formFuncionario = this.fb.group({
      id: [funcionario.id],
      nome: [
        funcionario.nome,
        [Validators.required, Validators.maxLength(250)]
      ],
      dataNascimento: [
        funcionario.dataNascimento,
        [Validators.required, Validators.maxLength(250)]
      ],
      cpf: [funcionario.cpf, [Validators.required, Validators.maxLength(14)]],
      empresa_id: [funcionario.empresa_id]
    });

    this.loadEmpresas();
  }

  hasError(field: string) {
    return this.formFuncionario.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formFuncionario.valid) {
      let msgSuccess = "Empresa cadastrada com sucesso!";
      let msgError = "Erro ao cadastrar funcionario. Verifique seus dados!";

      if (this.formFuncionario.value.id) {
        msgSuccess = "Empresa atualizada com sucesso!";
        msgError = "Erro ao atualizar funcionario. Verifique seus dados!";
      }

      this.funcionarioService.save(this.formFuncionario.value).subscribe(
        success => {
          this.toastr.success(msgSuccess);
          this.router.navigate(["/funcionarios"]);
        },
        error => {
          this.onCancel();
          this.toastr.error(msgError);
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.formFuncionario.reset();
    this.router.navigate(["/funcionarios"]);
  }

  loadEmpresas() {
    this.empresasService.find().subscribe(
      res => {
        this.empresas = res["content"];
        // Check if response is empty
        if (res["content"][0]["rel"] === null) {
          this.isEmpresaEmpty = true;
        } else {
          this.isEmpresaEmpty = false;
        }
      },
      error =>
        this.toastr.error(
          "Erro ao carregar lista de empresas. Tente novamente mais tarde!"
        )
    );
  }
}
