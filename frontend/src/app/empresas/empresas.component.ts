import { Component, OnInit } from '@angular/core';
import { EmpresasService } from './empresas.service';
import { Empresa } from './empresa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[];

  constructor(private empresasService: EmpresasService,
    private router: Router) { }

  ngOnInit() {
    this.find();
  }

  find() {
    this.empresasService.find().subscribe(res => {
      this.empresas = res._embedded.empresas as Empresa[];
    });
  }

  goToUpdateEmpresa() {
    this.router.navigate(['/empresas/update']);
  }

  goToDeleteEmpresa() {
    this.router.navigate(['/empresas/delete']);
  }

}
