package com.carlosribeiro.pizzarestfulv1.service;

import com.carlosribeiro.pizzarestfulv1.model.Usuario;
import com.carlosribeiro.pizzarestfulv1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(Usuario usuario) {
        // System.out.println("Conta = " + usuario.getConta() + " e senha = " + usuario.getSenha());
        return usuarioRepository.findByContaAndSenha(
                usuario.getConta(), usuario.getSenha());
    }
    public ResponseEntity<?> cadastrar(Usuario usuario) {
        if (usuario.getConta() == null || usuario.getSenha() == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Conta e senha são obrigatórios"));
        }
    
        Usuario existente = usuarioRepository.findByConta(usuario.getConta());
        if (existente != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Conta já existe"));
        }
    
        usuarioRepository.save(usuario);
        return ResponseEntity.ok().build();
    }
}
