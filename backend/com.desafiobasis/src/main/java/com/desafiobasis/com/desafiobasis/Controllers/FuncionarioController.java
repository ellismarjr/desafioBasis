package com.desafiobasis.com.desafiobasis.Controllers;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import com.desafiobasis.com.desafiobasis.Models.Funcionario;
import com.desafiobasis.com.desafiobasis.Repository.EmpresaRepository;
import com.desafiobasis.com.desafiobasis.Repository.FuncionarioRepository;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class FuncionarioController {

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    EmpresaRepository empresaRepository;

    @GetMapping("/funcionarios")
    public List<Funcionario> find() {
        return funcionarioRepository.findAll();
    }

    @GetMapping("/funcionarios/{id}")
    @ResponseBody
    public Funcionario show(@PathVariable(value = "id" ) long id) {
        Funcionario funcionario = funcionarioRepository.findById(id);
        return funcionario;
    }

    @PostMapping("/funcionarios")
    public Funcionario create(@RequestBody Map<String, String> body, Funcionario funcionario, Empresa empresa) {
        funcionario.setNome(body.get("nome"));
        funcionario.setDataNascimento(body.get("dataNascimento"));
        funcionario.setCpf(body.get("cpf"));

        long empresaId = Long.parseLong(body.get("empresa_id"));
        empresa = empresaRepository.findById(empresaId);
        funcionario.setEmpresa(empresa);

        return funcionarioRepository.save(funcionario);
    }

    @PutMapping("/funcionarios")
    public Funcionario update(@RequestBody Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    @DeleteMapping("/funcionarios/{id}")
    public void destroy(@PathVariable(value = "id") long id) {
        funcionarioRepository.deleteById(id);
    }
}
