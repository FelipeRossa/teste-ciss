package com.proto.testeciss.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proto.testeciss.dtos.FuncionarioDTO;
import com.proto.testeciss.models.Funcionario;
import com.proto.testeciss.services.FuncionarioService;

import jakarta.ws.rs.core.Response;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

	private final FuncionarioService funcionarioService;

	@Autowired
	public FuncionarioController(FuncionarioService funcionarioService) {
		this.funcionarioService = funcionarioService;
	}

	@GetMapping("/listar")
	public Response listarPessoas() {
		try {
			return Response.ok(funcionarioService.listarFuncionarios()).build();
		} catch (Exception e) {
			return Response.serverError().entity(e.getMessage()).build();
		}
	}

	@GetMapping("/buscar/{id}")
	public FuncionarioDTO encontrarFuncionario(@PathVariable Long id) {
		Funcionario funcionario = funcionarioService.encontrarPorId(id).orElse(null);
		return funcionarioService.converterEntidade(funcionario);
	}

	@PostMapping("novo")
	public Response criarFuncionario(@RequestBody FuncionarioDTO funcionarioDto) throws Exception {
		try {
			Funcionario Funcionario = funcionarioService.salvarFuncionario(funcionarioDto);
			FuncionarioDTO FuncionarioRet = funcionarioService.converterEntidade(Funcionario);
			return Response.ok(FuncionarioRet).status(Response.Status.CREATED).build();
		} catch (Exception e) {
			return Response.serverError().entity(e.getMessage()).build();
		}

	}

	@PutMapping("atualizar/{id}")
	public Response atualizarPessoa(@PathVariable Long id, @RequestBody FuncionarioDTO FuncionarioDto)
			throws Exception {
		FuncionarioDto.setId(id);
		try {
			FuncionarioDTO funcionarioRet = funcionarioService
					.converterEntidade(funcionarioService.salvarFuncionario(FuncionarioDto));
			return Response.ok(funcionarioRet).build();
		} catch (Exception e) {
			return Response.serverError().entity(e.getMessage()).build();
		}
	}

	@DeleteMapping("/remover/{id}")
	public Response excluirFuncionario(@PathVariable Long id) {
		try {
			funcionarioService.excluirFuncionario(id);
			return Response.ok().build();
		} catch (Exception e) {
			return Response.serverError().entity(e.getMessage()).build();
		}
	}
}