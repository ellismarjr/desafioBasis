package com.desafiobasis.com.desafiobasis.Controllers;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import com.desafiobasis.com.desafiobasis.Repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.support.CustomSQLExceptionTranslatorRegistrar;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class EmpresaController {
    @Autowired
    EmpresaRepository empresaRepository;

    @GetMapping("/empresas")
    public List<Empresa> listaEmpresas() {
        return empresaRepository.findAll();
    }

    @GetMapping("/empresas/{id}")
    @ResponseBody
    public Empresa listaEmpresa(@PathVariable(value = "id" ) long id) {
        Empresa empresa = empresaRepository.findById(id);

        return empresa;
    }

    @PostMapping("/empresas")
    public Empresa salvaEmpresa(@RequestBody Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @PutMapping("/empresas")
    public Empresa atualizaEmpresa(@RequestBody Empresa empresa) {
        empresaRepository.save(empresa);
        return empresa;
    }

    @DeleteMapping("/empresas/{id}")
    public void excluirEmpresa(@PathVariable(value = "id") long id) {
        empresaRepository.deleteById(id);
    }


}

