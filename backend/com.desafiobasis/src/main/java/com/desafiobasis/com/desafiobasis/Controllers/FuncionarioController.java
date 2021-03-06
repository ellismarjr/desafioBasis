package com.desafiobasis.com.desafiobasis.Controllers;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import com.desafiobasis.com.desafiobasis.Models.Funcionario;
import com.desafiobasis.com.desafiobasis.Models.dto.FuncionarioDTO;
import com.desafiobasis.com.desafiobasis.Models.dto.FuncionarioListagemDTO;
import com.desafiobasis.com.desafiobasis.Models.mapper.FuncionarioListagemMapper;
import com.desafiobasis.com.desafiobasis.Models.mapper.FuncionarioMapper;
import com.desafiobasis.com.desafiobasis.Repository.EmpresaRepository;
import com.desafiobasis.com.desafiobasis.Repository.FuncionarioRepository;
import com.desafiobasis.com.desafiobasis.error.ResourceNotFoundException;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class FuncionarioController {

    @Autowired
    FuncionarioMapper funcionarioMapper;

    @Autowired
    FuncionarioListagemMapper funcionarioListagemMapper;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    EmpresaRepository empresaRepository;



    @GetMapping("/funcionarios")
    public List<FuncionarioListagemDTO> find() {
        List<FuncionarioListagemDTO> funcionarioListagemDTO = funcionarioListagemMapper.toDto(funcionarioRepository.findAll());
        return funcionarioListagemDTO;
    }

    @GetMapping("/funcionarios/{id}")
    @ResponseBody
    public FuncionarioDTO show(@PathVariable(value = "id" ) long id) {

        Funcionario funcionario = funcionarioRepository.findById(id);
        return funcionarioMapper.toDto(funcionario);
    }

    @PostMapping("/funcionarios")
    public FuncionarioDTO create(@RequestBody FuncionarioDTO funcionarioDTO) {
        Funcionario funcionario = funcionarioMapper.toEntity(funcionarioDTO);
        return funcionarioMapper.toDto(funcionarioRepository.save(funcionario));
    }

    @PutMapping("/funcionarios")
    public FuncionarioDTO update(@RequestBody FuncionarioDTO funcionarioDTO) {
        verifyFuncionarioExists(funcionarioDTO.getId());
        Funcionario funcionario = funcionarioMapper.toEntity(funcionarioDTO);
        return  funcionarioMapper.toDto((funcionarioRepository.save(funcionario)));
    }

    @DeleteMapping("/funcionarios/{id}")
    public void destroy(@PathVariable(value = "id") long id) {
        verifyFuncionarioExists(id);
        funcionarioRepository.deleteById(id);
    }

    private void verifyFuncionarioExists(long id) {
        if (funcionarioRepository.findById(id) == null) {
            throw new ResourceNotFoundException("Funionário não encontrada de ID: " + id);
        }
    }
}
