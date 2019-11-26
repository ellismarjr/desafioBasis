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
    EmpresaRepository empresaRepository;

    @GetMapping("/funcionarios")
    public List<Funcionario> listaFuncionarios() {
        return funcionarioRepository.findAll();
    }

    @GetMapping("/funcionarios/{id}")
    @ResponseBody
    public Funcionario listaFuncionarios(@PathVariable(value = "id" ) long id) {
        Funcionario funcionario = funcionarioRepository.findById(id);
        return funcionario;
    }

    @PostMapping("/funcionarios")
    public Funcionario salvaFuncionario(@RequestBody Map<String, String> body, Funcionario funcionario) {

        System.out.println("---->>>" + body.get("empresa_id"));
//        Empresa empresa = empresaRepository.findById(empresaId);
//        funcionario.setEmpresa(empresa);
        return funcionarioRepository.save(funcionario);
    }

    @PutMapping("/funcionarios")
    public Funcionario atualizaFuncionario(@RequestBody Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    @DeleteMapping("/funcionarios/{id}")
    public void excluirFuncionario(@PathVariable(value = "id") long id) {
        funcionarioRepository.deleteById(id);
    }
}
