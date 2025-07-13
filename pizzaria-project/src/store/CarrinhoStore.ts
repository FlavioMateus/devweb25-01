import { create } from 'zustand';
import Pizza from '../interfaces/Pizza';

interface CarrinhoItem {
  pizza: Pizza;
  quantidade: number;
}

interface CarrinhoState {
  itens: CarrinhoItem[];
  adicionarPizza: (pizza: Pizza) => void;
  alterarQuantidade: (pizzaId: number, novaQuantidade: number) => void;
  removerPizza: (pizzaId: number) => void;
  limparCarrinho: () => void;
}

export const useCarrinhoStore = create<CarrinhoState>((set) => ({
  itens: [],
  
  adicionarPizza: (pizza) => set((state) => {
    const itemExistente = state.itens.find(item => item.pizza.id === pizza.id);
    
    if (itemExistente) {
      return {
        itens: state.itens.map(item =>
          item.pizza.id === pizza.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      };
    }
    
    return { itens: [...state.itens, { pizza, quantidade: 1 }] };
  }),
  
  alterarQuantidade: (pizzaId, novaQuantidade) => set((state) => {
    if (novaQuantidade < 1) {
      return {
        itens: state.itens.filter(item => item.pizza.id !== pizzaId)
      };
    }
    
    return {
      itens: state.itens.map(item =>
        item.pizza.id === pizzaId
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    };
  }),
  
  removerPizza: (pizzaId) => set((state) => ({
    itens: state.itens.filter(item => item.pizza.id !== pizzaId)
  })),
  
  limparCarrinho: () => set({ itens: [] }),
}));