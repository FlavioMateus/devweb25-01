import { createBrowserRouter } from "react-router-dom";
import CardsPorSlugCategoriaPage from "../pages/CardsPorSlugCategoriaPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ErrorPage from "../pages/ErrorPage";
import FavoritosPage from "../pages/FavoritosPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ContatosPage from "../pages/ContatosPage";
import PizzaPage from "../pages/PizzaPage";
import PizzasComPaginacaoPage from "../pages/PizzasComPaginacaoPage";
import Layout from "./Layout";
import PrivateRoutes from "./PrivateRoutes";
import CadastrarPizzaPage from "../pages/CadastrarPizzaPage";
import CadastrarUsuarioPage from "../pages/CadastrarUsuarioPage";
import PizzasInfinitePage from "../pages/PizzasInfinitePage";
import SobrePage from '../pages/SobrePage';
import CardapioPage from '../pages/CardapioPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "", 
                element: <HomePage />,
                children: [
                    {path: "homepage", element: <HomePage />}
                ]},
            {path: "tabeladepizzas", element: <PizzasComPaginacaoPage />},
            {
                path: "cardapio",
                element: <CardapioPage />,
                children: [
                  { path: ":slugCategoria?", element: <CardsPorSlugCategoriaPage /> }
                ]
              },
            {path: "carrinho", element: <CarrinhoPage />},
            {path: "cadastrar-pizza", element: <CadastrarPizzaPage />},
            {path: "pizzas/:id", element: <PizzaPage />},
            {path: "login", element: <LoginPage />},
            {path: "contatos", element: <ContatosPage />},
            {path: "/cadastro", element: <CadastrarUsuarioPage />},
            {path: "/pizzas-infinite", element: <PizzasInfinitePage />},
            {path: "sobre", element: <SobrePage />},
        ]
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        errorElement: <ErrorPage />,
        children: [
            {path: "favoritos", element: <FavoritosPage />},
        ]
    }
])
export default router;