import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../empresas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cad-empresas',
  templateUrl: './cad-empresas.component.html',
  styleUrls: ['./cad-empresas.component.css']
})
export class CadEmpresasComponent implements OnInit {

  form: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private empresaService: EmpresasService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.maxLength(250)]],
      endereco: [null, [Validators.required, Validators.maxLength(250)]],
      cnpj: [null, [Validators.required, Validators.maxLength(14)]],
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.empresaService.create(this.form.value).subscribe(
        success => {
          this.toastr.success("Empresa cadastrada com sucesso!");
          this.router.navigate(['/empresas']);
        },
        error => {
          this.onCancel();
          this.toastr.error("Erro ao cadastrar empresa. Verifique seus dados!")
        },
        () => console.log('request completo')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('cancel');
  }

  showToast() {
    this.toastr.success("Empresa cadastrada com sucesso!")
  }





}
