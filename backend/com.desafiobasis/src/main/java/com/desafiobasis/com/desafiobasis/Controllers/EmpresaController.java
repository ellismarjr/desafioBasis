package com.desafiobasis.com.desafiobasis.Controllers;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import com.desafiobasis.com.desafiobasis.Models.dto.EmpresaDTO;
import com.desafiobasis.com.desafiobasis.Models.mapper.EmpresaMapper;
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
    EmpresaMapper empresaMapper;

    @Autowired
    EmpresaRepository empresaRepository;

    @GetMapping("/empresas")
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
    public EmpresaDTO create(@RequestBody EmpresaDTO empresaDTO) {
        Empresa empresa = empresaMapper.toEntity(empresaDTO);
        return empresaMapper.toDto(empresaRepository.save(empresa));
    }

    @PutMapping("/empresas")
    public EmpresaDTO update(@RequestBody EmpresaDTO empresaDTO){
        Empresa empresa = empresaMapper.toEntity(empresaDTO);
        return empresaMapper.toDto(empresaRepository.save(empresa));
    }

    @DeleteMapping("/empresas/{id}")
    public void destroy(@PathVariable(value = "id") long id) {
        empresaRepository.deleteById(id);
    }

}

