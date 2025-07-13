import usePizzaStore from "../store/PizzaStore";
import CarrinhoPage from "./CarrinhoPage";
import LoginPage from "./LoginPage";

const ContatosPage = () => {
  const pagina = usePizzaStore((s) => s.pagina);
  const setPagina = usePizzaStore((s) => s.setPagina);

  console.log("");
  console.log("Contatos page (contém página) ", pagina);

  return (
    <>
      <div>
        <h5>ContatosPage - pagina = {pagina}</h5>
        <button onClick={() => (setPagina(6))}>Mudar página</button>
        <hr />
        <LoginPage />
        <hr />
        <CarrinhoPage />
      </div>
    </>
  );
};
export default ContatosPage;
