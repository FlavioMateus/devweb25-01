package com.carlosribeiro.pizzarestfulv1.service;

import com.carlosribeiro.pizzarestfulv1.exception.EntidadeNaoEncontradaException;
import com.carlosribeiro.pizzarestfulv1.model.Pizza;
import com.carlosribeiro.pizzarestfulv1.repository.PizzaRepository;
import com.carlosribeiro.pizzarestfulv1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PizzaService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PizzaRepository pizzaRepository;

    public List<Pizza> recuperarPizzas() {
        return pizzaRepository.recuperarPizzasComCategoria();
    }

    public Pizza cadastrarPizza(Pizza pizza) {
        return pizzaRepository.save(pizza);
    }

//    public Pizza alterarPizza(Pizza pizza) {
//        Optional<Pizza> opt = pizzaRepository.findById(pizza.getId());
//        if (opt.isPresent()) {
//            return pizzaRepository.save(pizza);
//        }
//        throw new PizzaNaoEncontradoException(
//                "Pizza número " + pizza.getId() + " não encontrado.");
//    }

//    @Transactional
//    public Pizza alterarPizza(Pizza pizza) {
//        Optional<Pizza> opt = pizzaRepository.recuperarPizzaPorIdComLock(pizza.getId());
//        if (opt.isPresent()) {
//            return pizzaRepository.save(pizza);
//        }
//        throw new PizzaNaoEncontradoException(
//                "Pizza número " + pizza.getId() + " não encontrado.");
//    }

    @Transactional
    public Pizza alterarPizza(Pizza pizza) {
        pizzaRepository.recuperarPizzaPorIdComLock(pizza.getId())
            .orElseThrow(() -> new EntidadeNaoEncontradaException(
                    "Pizza número " + pizza.getId() + " não encontrado."));
        return pizzaRepository.save(pizza);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removerPizza(long id) {
        usuarioRepository.removerPizzaDosFavoritos(id);
        pizzaRepository.deleteById(id);

//        pizzaRepository.deleteById(1L);
//        if (true) {
//            throw new Exception("Deu erro!");
//        }
//        pizzaRepository.deleteById(2L);
    }

    public Pizza recuperarPizzaPorId(long id) {
        return pizzaRepository.recuperarPizzaPorId(id)
            .orElseThrow(() -> new EntidadeNaoEncontradaException(
                "Pizza número " + id + " não encontrado."));
    }

    public Page<Pizza> recuperarPizzasComPaginacao(Pageable pageable, String nome) {
        return pizzaRepository.recuperarPizzasComPaginacao(pageable, "%" + nome + "%");
    }

    public List<Pizza> recuperarPizzasPorSlugCategoria(String slugCategoria) {
        return pizzaRepository.recuperarPizzasPorSlugCategoria(slugCategoria);
    }

    public Page<Pizza> recuperarPizzasPaginadosPorSlugDaCategoria(String slugCategoria, Pageable pageable) {
        if(!slugCategoria.isEmpty()) {
            return pizzaRepository.recuperarPizzasPaginadosPorSlugDaCategoria(slugCategoria, pageable);
        }
        else {
            return pizzaRepository.recuperarPizzasPaginados(pageable);
        }
    }
}
