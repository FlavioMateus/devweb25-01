import dayjs from "dayjs";
import Pizza from "../interfaces/Pizza";
import { Link } from "react-router-dom";
import usePizzaStore from "../store/PizzaStore";
import useRecuperarPizzasComPaginacao from "../hooks/useRecuperarPizzasComPaginacao";
import useRemoverPizzaPorId from "../hooks/useRemoverPizzaPorId";

const TabelaDePizzas = () => {
  const pagina = usePizzaStore((s) => s.pagina);
  const tamanho = usePizzaStore((s) => s.tamanho);
  const nome = usePizzaStore((s) => s.nome);

  const setPagina = usePizzaStore((s) => s.setPagina);
  const setMensagem = usePizzaStore((s) => s.setMensagem);

  const {
    data: resultadoPaginado,
    isPending: carregandoPizzas,
    error: errorPizzas,
  } = useRecuperarPizzasComPaginacao({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome: nome,
  });
  
  const { mutate: removerPizza, error: errorRemocaoPizza } =
    useRemoverPizzaPorId();

  const tratarRemocao = (id: number) => {
    removerPizza(id);
    setPagina(0);
  };

  if (carregandoPizzas)
    return <p className="fw-bold">Carregando pizzas...</p>;
  if (errorPizzas) throw errorPizzas;
  if (errorRemocaoPizza) throw errorRemocaoPizza;

  const pizzas: Pizza[] = resultadoPaginado.itens;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm table-hover table-striped">
        <thead>
          <tr>
            <th className="text-center align-middle">Id</th>
            <th className="text-center align-middle">Imagem</th>
            <th className="text-center align-middle">Categoria</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Data de Cadastro</th>
            <th className="text-center align-middle">Quantidade</th>
            <th className="text-center align-middle">Preço</th>
            <th className="text-center align-middle">Ação</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza) => (
            <tr key={pizza.id}>
              <td width="8%" className="text-center align-middle">
                {pizza.id}
              </td>
              <td width="13%" className="text-center align-middle">
                <img
                  src={pizza.imagem}
                  alt="imagem de pizza"
                  style={{ width: "40px" }}
                />
              </td>
              <td width="13%" className="text-center align-middle">
                {pizza.categoria.nome}
              </td>
              <td width="17%" className="align-middle ps-3">
                <Link
                  onClick={() => setMensagem("")}
                  style={{ textDecoration: "none" }}
                  to={"/pizzas/" + pizza.id}
                >
                  {pizza.nome}
                </Link>
              </td>
              <td width="13%" className="text-center align-middle">
                {dayjs(pizza.dataCadastro).format("DD/MM/YYYY")}
              </td>
              <td width="13%" className="text-center align-middle">
                {pizza.qtdEstoque}
              </td>
              <td width="10%" className="text-end align-middle pe-3">
                {pizza.preco.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </td>
              <td width="13%" className="text-center align-middle">
                <button
                  onClick={() => tratarRemocao(pizza.id!)}
                  className="btn btn-danger btn-sm"
                  type="button"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-center align-middle fw-bold" colSpan={5}>
              Total...
            </td>
            <td className="text-center align-middle fw-bold" colSpan={2}>
              R${" "}
              {pizzas
                .reduce(
                  (total, pizza) =>
                    total + pizza.qtdEstoque * pizza.preco,
                  0
                )
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default TabelaDePizzas;
