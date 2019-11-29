package com.desafiobasis.com.desafiobasis.Controllers;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import com.desafiobasis.com.desafiobasis.Models.dto.EmpresaDTO;
import com.desafiobasis.com.desafiobasis.Models.mapper.EmpresaMapper;
import com.desafiobasis.com.desafiobasis.Repository.EmpresaRepository;
import com.desafiobasis.com.desafiobasis.error.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> show(@PathVariable(value = "id" ) long id) {
        verifyEmpresaExists(id);
        Empresa empresa = empresaRepository.findById(id);
        return new ResponseEntity<>(empresa, HttpStatus.OK);
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
    public ResponseEntity<?> destroy(@PathVariable(value = "id") long id) {
        verifyEmpresaExists(id);
        empresaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void verifyEmpresaExists(long id) {
        if ( empresaRepository.findById(id) == null) {
            throw new ResourceNotFoundException("Empresa não encontrada de ID: " + id);
        }
    }

}

