package com.proto.testeciss.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proto.testeciss.dtos.FuncionarioDTO;
import com.proto.testeciss.models.Funcionario;
import com.proto.testeciss.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {

	private final FuncionarioRepository funcionarioRepository;

	@Autowired
	public FuncionarioService(FuncionarioRepository pessoaRepository) {
		this.funcionarioRepository = pessoaRepository;
	}

	public List<FuncionarioDTO> listarFuncionarios() {
		List<Funcionario> listaFuncionarios = funcionarioRepository.findAll();

		List<FuncionarioDTO> listaFuncionariosDto = new ArrayList<>();
		if (!listaFuncionarios.isEmpty()) {
			for (Funcionario funcionario : listaFuncionarios) {
				FuncionarioDTO funcionarioDto = converterEntidade(funcionario);
				listaFuncionariosDto.add(funcionarioDto);
			}
		}

		return listaFuncionariosDto;
	}

	public Optional<Funcionario> encontrarPorId(Long id) {
		return funcionarioRepository.findById(id);
	}

	public Funcionario salvarFuncionario(FuncionarioDTO funcionarioDto) throws Exception {

		if (funcionarioDto.getNome() == null)
			throw new Exception("Necessário informar o Nome do Funcionário!");

		if (funcionarioDto.getSobrenome() == null)
			throw new Exception("Necessário informar o Sobrenome do Funcionário!");

		if (funcionarioDto.getEmail() == null)
			throw new Exception("Necessário informar um email para contato!");

		Funcionario funcionario = converterDTO(funcionarioDto);
		return funcionarioRepository.save(funcionario);
	}

	public Funcionario converterDTO(FuncionarioDTO funcionarioDto) throws Exception {
		return new ModelMapper().map(funcionarioDto, Funcionario.class);
	}

	public void excluirFuncionario(Long id) {
		funcionarioRepository.deleteById(id);
	}

	public FuncionarioDTO converterEntidade(Funcionario funcionario) {
		return new ModelMapper().map(funcionario, FuncionarioDTO.class);
	}
}