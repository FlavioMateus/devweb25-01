import { createBrowserRouter } from "react-router-dom";
import CardsPorSlugCategoriaPage from "../pages/CardsPorSlugCategoriaPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ErrorPage from "../pages/ErrorPage";
import FavoritosPage from "../pages/FavoritosPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PizzaPage from "../pages/PizzaPage";
import PizzasComPaginacaoPage from "../pages/PizzasComPaginacaoPage";
import Layout from "./Layout";
import PrivateRoutes from "./PrivateRoutes";
import CadastrarPizzaPage from "../pages/CadastrarPizzaPage";
import CadastrarUsuarioPage from "../pages/CadastrarUsuarioPage";
import PizzasInfinitePage from "../pages/PizzasInfinitePage";

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
                    {path: ":slugCategoria?", element: <CardsPorSlugCategoriaPage />}
                ]},
            {path: "pizzas", element: <PizzasComPaginacaoPage />},
            {path: "carrinho", element: <CarrinhoPage />},
            {path: "cadastrar-pizza", element: <CadastrarPizzaPage />},
            {path: "pizzas/:id", element: <PizzaPage />},
            {path: "login", element: <LoginPage />},
            {path: "/cadastro", element: <CadastrarUsuarioPage />},
            {path: "/pizzas-infinite", element: <PizzasInfinitePage />,}
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