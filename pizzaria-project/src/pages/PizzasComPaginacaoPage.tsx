import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDePizzas from "../components/TabelaDePizzas";

const PizzasComPaginacaoPage = () => {

  return (
    <>
      <h5>Lista de Pizzas</h5>
      <hr className="mt-1" />

      <Pesquisa />
      <TabelaDePizzas />
      <Paginacao />
    </>
  );
};
export default PizzasComPaginacaoPage;
