import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../empresas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cad-empresas',
  templateUrl: './cad-empresas.component.html',
  styleUrls: ['./cad-empresas.component.css']
})
export class CadEmpresasComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  bsModalRef: BsModalRef;

  constructor(private fb: FormBuilder, private empresaService: EmpresasService,
    private modalservice: BsModalService) { }

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
    console.log(this.form.value)
    if (this.form.valid) {
      console.log('submit');
      this.empresaService.create(this.form.value).subscribe(
        success => console.log('sucesso'),
        error => console.log(error),
        () => console.log('request completo')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('cancel');
  }





}
