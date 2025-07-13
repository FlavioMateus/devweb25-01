package com.carlosribeiro.pizzarestfulv1.exception;

public class PizzaNaoEncontradaException extends RuntimeException {
    public PizzaNaoEncontradaException(String message) {
        super(message);
    }
}
