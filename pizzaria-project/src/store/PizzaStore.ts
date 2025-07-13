import { create } from "zustand";
import Pizza from "../interfaces/Pizza";


interface PizzaStore {
    pagina: number;
    tamanho: number;
    nome: string;
    mensagem: string;
    pizzaSelecionado: Pizza;

    setPagina: (novaPagina: number) => void;
    setNome: (novoNome: string) => void;
    setMensagem: (novaMensagem: string) => void;
    setPizzaSelecionado: (novoPizzaSelecionado: Pizza) => void;
}

const usePizzaStore = create<PizzaStore>((set) => ({
    pagina: 0,
    tamanho: 18,
    nome: "",
    mensagem: "",
    pizzaSelecionado: {} as Pizza,

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),
    setMensagem: (novaMensagem: string) => set(() => ({mensagem: novaMensagem})),
    setPizzaSelecionado: (novoPizzaSelecionado: Pizza) => set(() => ({pizzaSelecionado: novoPizzaSelecionado}))
}))
export default usePizzaStore;

// const pizzaStore = usePizzaStore();

// const setPagina = usePizzaStore((s) => s.setPagina);