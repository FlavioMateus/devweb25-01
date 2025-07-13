// import TabelaDePizzas from "../components/TabelaDePizzas";
// import useRecuperarPizzas from "../hooks/useRecuperarPizzas";

// const PizzasPage = () => {
//   const {data: pizzas,
//          isPending: carregandoPizzas,
//          error: errorPizzas} = useRecuperarPizzas();
 
//   if (carregandoPizzas) return <p className="fw-bold">Carregando pizzas...</p>
//   if (errorPizzas) throw errorPizzas;
  
//   return (
//     <>
//       <h5>Lista de Pizzas</h5>
//       <hr className="mt-1"/>
      
//       <TabelaDePizzas pizzas={pizzas} />
//     </>
//   );
// };
// export default PizzasPage;
