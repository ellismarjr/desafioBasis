import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { FuncionariosService } from "./funcionarios.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Observable, Subject } from "rxjs";
import { Funcionarios } from "./funcionarios";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmpresasService } from "../empresas/empresas.service";
import { Empresa } from "../empresas/empresa";

@Component({
  selector: "app-funcionarios",
  templateUrl: "./funcionarios.component.html",
  styleUrls: ["./funcionarios.component.css"]
})
export class FuncionariosComponent implements OnInit {
  funcionarios: Funcionarios[];
  empresas: Empresa[];
  error$ = new Subject<boolean>();
  isEmpty = true;
  cadModalRef: BsModalRef;
  formFunc: FormGroup;
  submitted = false;
  isEmpresaEmpty = false;

  deleteModalRef: BsModalRef;
  @ViewChild("deleteModal", { static: false }) deleteModal;

  funcionarioSelecionado: Funcionarios = new Funcionarios();

  constructor(
    private funcionarioService: FuncionariosService,
    private empresaService: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.find();

    const funcionario = this.route.snapshot.data["funcionario"];

    this.formFunc = this.fb.group({
      id: [funcionario.id],
      nome: [
        funcionario.nome,
        [Validators.required, Validators.maxLength(500)]
      ],
      dataNascimento: [
        funcionario.dataNascimento,
        [Validators.required, Validators.maxLength(250)]
      ],
      cpf: [funcionario.cpf, [Validators.required, Validators.maxLength(14)]],
      empresaId: [funcionario.empresaId, [Validators.required]]
    });

    this.loadEmpresas();
  }

  find() {
    this.funcionarioService.find().subscribe(
      res => {
        this.funcionarios = res;

        if (!res.length) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      },
      error =>
        this.toastr.error(
          "Erro ao carregar lista de funcionários. Tente novamente mais tarde!"
        )
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.formFunc.valid) {
      let msgSuccess = "Funcionário cadastrado com sucesso!";
      let msgError = "Erro ao cadastrar empresa. Verifique seus dados!";

      if (this.formFunc.value.id) {
        msgSuccess = "Funcionário atualizado com sucesso!";
        msgError = "Erro ao atualizar funcionário. Verifique seus dados!";
      }

      this.funcionarioService.save(this.formFunc.value).subscribe(
        funcionario => {
          this.toastr.success(msgSuccess);
          this.funcionarios.push(funcionario);
          this.cadModalRef.hide();
        },
        error => {
          this.toastr.error(msgError);
          this.cadModalRef.hide();
        }
      );
    }
  }

  onUpdate(id) {
    this.router.navigate(["detalhes", id], { relativeTo: this.route });
  }

  onDelete(funcionario) {
    this.funcionarioSelecionado = funcionario;
    this.deleteModalRef = this.bsModalService.show(this.deleteModal);
  }

  onConfirmDelete() {
    this.funcionarioService.delete(this.funcionarioSelecionado.id).subscribe(
      success => {
        // this.router.navigate(["/empresas"]);
        window.location.reload();
        this.deleteModalRef.hide();
        this.toastr.success("Funcionário excluído com sucesso!");
      },
      error => {
        this.toastr.error(
          "Erro ao tentar excluir funcionário. Tente novamente mais tarde!"
        );
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.toastr.error(
      "Erro ao carregar funcionários. Tente novamente mais tarde!"
    );
  }

  openModal(template: TemplateRef<any>) {
    this.cadModalRef = this.bsModalService.show(template);
  }

  loadEmpresas() {
    this.empresaService.find().subscribe(
      res => {
        this.empresas = res;
        // Check if response is empty

        if (!res.length) {
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
