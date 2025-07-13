import Categoria from "../interfaces/Categoria";
import Pizza from "../interfaces/Pizza";

const salgadas: Categoria = { id: 1, nome: "Salgadas", slug: "salgadas" };
const doces: Categoria = { id: 2, nome: "Doces", slug: "doces" };

const pizzas: Pizza[] = [
  {
    id: 1,
    imagem: "calabresa.png",
    categoria: salgadas,
    nome: "Calabresa",
    slug: "calabresa",
    descricao: "Calabresa com cebola e mussarela",
    disponivel: true,
    dataCadastro: new Date(2023, 5, 12),
    qtdEstoque: 10,
    preco: 39.9,
  },
  {
    id: 2,
    imagem: "chocolate.png",
    categoria: doces,
    nome: "Chocolate",
    slug: "chocolate",
    descricao: "Pizza doce com chocolate e morango",
    disponivel: true,
    dataCadastro: new Date(2023, 5, 15),
    qtdEstoque: 8,
    preco: 42.5,
  },
  // adicione mais pizzas
];

const recuperarPizzas = () => {
  console.log("Executando recuperarPizzas()");
  return new Promise<Pizza[]>((resolve) => {
    setTimeout(() => {
      resolve(pizzas);
    }, 2000)
  })
    return pizzas
}

export default recuperarPizzas;
