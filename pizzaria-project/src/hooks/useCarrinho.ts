// src/hooks/useCarrinho.ts

import { useState, useEffect } from "react";

export interface PizzCarrinho {
  idPizza: number;
  quantidade: number;
}

export default function useCarrinho() {
  const [carrinho, setCarrinho] = useState<PizzCarrinho[]>([]);

  useEffect(() => {
    const salvo = localStorage.getItem("carrinho");
    if (salvo) setCarrinho(JSON.parse(salvo));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const getQuantidade = (idPizza: number) => {
    return carrinho.find((p) => p.idPizza === idPizza)?.quantidade || 0;
  };

  const adicionar = (idPizza: number) => {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.idPizza === idPizza);
      if (existente) {
        return prev.map((p) =>
          p.idPizza === idPizza ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      } else {
        return [...prev, { idPizza, quantidade: 1 }];
      }
    });
  };

  const subtrair = (idPizza: number) => {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.idPizza === idPizza);
      if (!existente) return prev;

      if (existente.quantidade <= 1) {
        return prev.filter((p) => p.idPizza !== idPizza);
      } else {
        return prev.map((p) =>
          p.idPizza === idPizza ? { ...p, quantidade: p.quantidade - 1 } : p
        );
      }
    });
  };

  const remover = (idPizza: number) => {
    setCarrinho((prev) => prev.filter((p) => p.idPizza !== idPizza));
  };

  const alterarQuantidade = (idPizza: number, novaQtd: number) => {
    if (novaQtd <= 0) return remover(idPizza);
    setCarrinho((prev) =>
      prev.map((p) =>
        p.idPizza === idPizza ? { ...p, quantidade: novaQtd } : p
      )
    );
  };

  return {
    carrinho,
    adicionar,
    subtrair,
    remover,
    alterarQuantidade,
    getQuantidade,
  };
}
