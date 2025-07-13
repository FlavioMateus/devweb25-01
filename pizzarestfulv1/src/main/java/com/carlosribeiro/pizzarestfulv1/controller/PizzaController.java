package com.carlosribeiro.pizzarestfulv1.controller;

import com.carlosribeiro.pizzarestfulv1.model.Pizza;
import com.carlosribeiro.pizzarestfulv1.model.ResultadoPaginado;
import com.carlosribeiro.pizzarestfulv1.service.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("pizzas")  // http://localhost:8080/pizzas
public class PizzaController {

    @Autowired
    private PizzaService pizzaService;

    @GetMapping   // Requisição do tipo GET para http://localhost:8080/pizzas
    public List<Pizza> recuperarPizzas() {
//        if (true) {
//            throw new RuntimeException("Deu erro no servidor");
//        }
        return pizzaService.recuperarPizzas();
    }

    // Requisição do tipo GET para http://localhost:8080/pizzas/1
    @GetMapping("{idPizza}")
    public Pizza recuperarPizzaPorId(@PathVariable("idPizza") long id) {
        return pizzaService.recuperarPizzaPorId(id);
    }

    // Requisição do tipo GET para http://localhost:8080/pizzas/categoria/frutas
    @GetMapping("categoria/{slugCategoria}")
    public List<Pizza> recuperarPizzasPorSlugCategoria(@PathVariable("slugCategoria") String slugCategoria) {
        return pizzaService.recuperarPizzasPorSlugCategoria(slugCategoria);
    }

    @PostMapping
    public Pizza cadastraPizza(@RequestBody Pizza pizza) {
        return pizzaService.cadastrarPizza(pizza);
    }

    @PutMapping
    public Pizza alterarPizza(@RequestBody Pizza pizza) {
        return pizzaService.alterarPizza(pizza);
    }

    @DeleteMapping  ("{idPizza}")   // http://localhost:8080/pizzas/1
    public void removerPizza(@PathVariable("idPizza") long id) {
        pizzaService.removerPizza(id);
    }

    // Entradas
    // - pagina corrente
    // - tamanho da página
    // Saídas:
    // - total de itens
    // - total de páginas
    // - pagina corrente
    // - itens da página corrente

    // Requisição do tipo GET para
    // http://localhost:8080/pizzas/paginacao?pagina=0&tamanho=5&nome=ce
    @GetMapping("paginacao")
    public ResultadoPaginado<Pizza> recuperarPizzasComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "5") int tamanho,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Pizza> page = pizzaService.recuperarPizzasComPaginacao(pageable, nome);
        ResultadoPaginado<Pizza> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

    // http://localhost:8080/pizzas/categoria/paginacao?pagina=0&tamanho=5&slugCategoria=frutas
    @GetMapping("categoria/paginacao")
    public ResultadoPaginado<Pizza> recuperarPizzasPaginadosPorSlugDaCategoria(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "slugCategoria", defaultValue = "") String slugCategoria) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Pizza> page = pizzaService.recuperarPizzasPaginadosPorSlugDaCategoria(slugCategoria, pageable);
        ResultadoPaginado<Pizza> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }
}
