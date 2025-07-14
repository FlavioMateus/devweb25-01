import Categoria from "./Categoria";

interface Pizza {
    id: number;
    imagem: string;
    categoria: Categoria;
    nome: string;
    slug: string;
    descricao: string;
    disponivel: boolean;
    dataCadastro: Date | null;
    preco: number;  
}
export default Pizza;