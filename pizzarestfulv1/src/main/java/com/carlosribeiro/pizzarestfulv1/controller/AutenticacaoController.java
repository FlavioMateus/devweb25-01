package com.carlosribeiro.pizzarestfulv1.controller;

import com.carlosribeiro.pizzarestfulv1.model.Usuario;
import com.carlosribeiro.pizzarestfulv1.service.AutenticacaoService;
import com.carlosribeiro.pizzarestfulv1.util.TokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("autenticacao")   // http://localhost:8080/autenticacao
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @PostMapping("login")  // http://localhost:8080/autenticacao/login
    public TokenResponse login(@RequestBody Usuario usuario) {
        System.out.println(usuario.getConta() + " " + usuario.getSenha());
        Usuario usuarioLogado = autenticacaoService.login(usuario);
        if (usuarioLogado != null) {
            return new TokenResponse(usuarioLogado.getId());
        } else {
            return new TokenResponse(0);
        }
    }
    @PostMapping("cadastrar")
        public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        return autenticacaoService.cadastrar(usuario);
    }
}


