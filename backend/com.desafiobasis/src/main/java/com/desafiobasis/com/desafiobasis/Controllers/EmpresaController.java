package com.desafiobasis.com.desafiobasis.Controllers;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import com.desafiobasis.com.desafiobasis.Repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.support.CustomSQLExceptionTranslatorRegistrar;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping(value = "/api")
public class EmpresaController {
    @Autowired
    EmpresaRepository empresaRepository;


//    @GetMapping("/empresas")
    @RequestMapping(method = RequestMethod.GET, value = "/empresas", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Empresa> find() {
        return empresaRepository.findAll();
    }

    @GetMapping("/empresas/{id}")
    @ResponseBody
    public Empresa show(@PathVariable(value = "id" ) long id) {
        Empresa empresa = empresaRepository.findById(id);

        return empresa;
    }

    @PostMapping("/empresas")
    public Empresa create(@RequestBody Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @PutMapping(value = "/empresas/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Empresa update(@PathVariable(value = "id") long id, @RequestBody Map<String, String> body) {
        long empresaId = id;
        System.out.println(body.get("id"));
        Empresa empresa = empresaRepository.findById(empresaId);

        empresa.setNome(body.get(("nome")));
        empresa.setEndereco(body.get("endereco"));
        empresa.setCnpj(body.get("cnpj"));

        empresaRepository.save(empresa);
        return empresa;
    }

    @DeleteMapping("/empresas/{id}")
    public void destroy(@PathVariable(value = "id") long id) {
        empresaRepository.deleteById(id);
    }


}

