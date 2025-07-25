import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import databaseAdd from "../assets/skin/database_add.png";
import databaseEdit from "../assets/skin/database_edit.png";
import databaseCancel from "../assets/skin/multiply.png";
import useAlterarPizza from "../hooks/useAlterarPizza";
import useCadastrarPizza from "../hooks/useCadastrarPizza";
import Categoria from "../interfaces/Categoria";
import Pizza from "../interfaces/Pizza";
import usePizzaStore from "../store/PizzaStore";
import z from "zod";
import isCategoriaValida from "../util/isCategoriaValida";
import isDataValida from "../util/isDataValida";
import { zodResolver } from "@hookform/resolvers/zod";

// interface PizzaForm {
//   nome: string;
//   descricao: string;
//   categoria: number;
//   data_cadastro: string;
//   preco: number;
//   imagem: string;
//   disponivel: boolean;
// }

const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const regexImagem = /^[a-z]+\.(gif|jpg|png|bmp)$/;
const schema = z.object({
  nome: z
    .string()
    .nonempty({ message: "O 'nome' deve ser informado." })
    .min(3, { message: "O 'nome' deve ter pelo menos 3 caracteres." }),
  descricao: z
    .string()
    .min(1, { message: "A 'descrição' deve ser informada." }),
  categoria: z.number().refine(isCategoriaValida, {
    message: "A 'categoria' deve ser informada.",
  }),
  data_cadastro: z
    .string()
    .min(1, { message: "A 'data de cadastro' deve ser informada." })
    .regex(regexData, { message: "Data inválida." })
    .refine(isDataValida, { message: "Data inválida." }),
  preco: z.coerce
    .number({ invalid_type_error: "O preço deve ser informado." })
    .min(0.1, { message: "O preço deve ser maior ou igual a R$ 0.10" }),
  imagem: z
    .string()
    .min(1, { message: "A 'imagem' deve ser informada." })
    .regex(regexImagem, { message: "Nome de imagem inválido." }),
  disponivel: z.boolean(),
});

type PizzaForm = z.infer<typeof schema>;

const PizzaForm = () => {
  const setMensagem = usePizzaStore((s) => s.setMensagem);
  const pizzaSelecionado = usePizzaStore((s) => s.pizzaSelecionado);

  const setValoresIniciais = () => {
    if (pizzaSelecionado.id) {
      setValue("nome", pizzaSelecionado.nome);
      setValue("descricao", pizzaSelecionado.descricao);
      setValue("categoria", pizzaSelecionado.categoria.id);
      setValue(
        "data_cadastro",
        dayjs(pizzaSelecionado.dataCadastro).format("DD/MM/YYYY")
      );
      setValue("preco", pizzaSelecionado.preco);
      setValue("imagem", pizzaSelecionado.imagem);
      setValue("disponivel", pizzaSelecionado.disponivel);
    } else {
      reset();
    }
  };

  useEffect(() => {
    setValoresIniciais();
  }, [pizzaSelecionado]);

  const navigate = useNavigate();

  const { mutate: cadastrarPizza, error: errorCadastrarPizza } =
    useCadastrarPizza();
  const { mutate: alterarPizza, error: errorAlterarPizza } = useAlterarPizza();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PizzaForm>({
    defaultValues: {
      nome: "",
      descricao: "",
      categoria: 0,
      data_cadastro: "",
      preco: undefined,
      imagem: "",
      disponivel: false,
    },
    resolver: zodResolver(schema),
  });

  const submit = ({
    nome,
    descricao,
    categoria,
    data_cadastro,
    preco,
    imagem,
    disponivel,
  }: PizzaForm) => {
    const pizza: Pizza = {
      nome: nome,
      slug: nome
        ? slugify(nome, {
            lower: true,
            strict: true,
          })
        : "",
      descricao: descricao,
      categoria: { id: categoria } as Categoria,
      dataCadastro: data_cadastro
        ? new Date(
            data_cadastro.substring(6, 10) +
              "-" +
              data_cadastro.substring(3, 5) +
              "-" +
              data_cadastro.substring(0, 2)
          )
        : null,
      preco: preco,
      imagem: imagem,
      disponivel: disponivel,
    };
    if (pizzaSelecionado.id) {
      pizza.id = pizzaSelecionado.id;
      alterarPizza(pizza, {
        onSuccess: (pizzAlterado: Pizza) => {
          setMensagem("Pizza alterada com sucesso!");
          navigate("/pizzas/" + pizzAlterado.id);
        },
      });
    } else {
      cadastrarPizza(pizza, {
        onSuccess: (pizzCadastrado: Pizza) => {
          setMensagem("Pizza cadastrada com sucesso!");
          navigate("/pizzas/" + pizzCadastrado.id);
        },
      });
    }
  };

  if (errorCadastrarPizza) throw errorCadastrarPizza;
  if (errorAlterarPizza) throw errorAlterarPizza;

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <div className="row">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="nome" className="col-xl-2 fw-bold">
              Nome
            </label>
            <div className="col-xl-10">
              <input
                {...register("nome")} // onChange, onBlur, name, ref
                type="text"
                id="nome"
                className={
                  errors.nome
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.nome?.message}</div>
              {/* {errors.nome && <p className="mt-1" style={{color: "red", fontSize: "14px", marginBottom: "0px"}}>{errors.nome.message}</p>} */}
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="descricao" className="col-xl-3 fw-bold">
              Descrição
            </label>
            <div className="col-xl-9">
              <input
                {...register("descricao")}
                type="text"
                id="descricao"
                className={
                  errors.descricao
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.descricao?.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="categoria" className="col-xl-2 fw-bold">
              Categoria
            </label>
            <div className="col-xl-10">
              <select
                {...register("categoria", { valueAsNumber: true })}
                id="categoria"
                className={
                  errors.categoria
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              >
                <option value="0">Selecione uma categoria</option>
                <option value="1">Tradicional</option>
                <option value="2">Especiais</option>
                <option value="3">Doces</option>
                <option value="4">Vegetarianas</option>
                <option value="5">Premium</option>
              </select>
              <div className="invalid-feedback">
                {errors.categoria?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="data_cadastro" className="col-xl-3 fw-bold">
              Data Cadastro
            </label>
            <div className="col-xl-9">
              <input
                {...register("data_cadastro")}
                type="text"
                id="data_cadastro"
                className={
                  errors.data_cadastro
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.data_cadastro?.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="preco" className="col-xl-2 fw-bold">
              Preço
            </label>
            <div className="col-xl-10">
              <input
                {...register("preco")}
                type="number"
                step="0.01"
                min="0"
                id="preco"
                className={
                  errors.preco
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.preco?.message}</div>
            </div>
          </div>
        </div>
        
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="imagem" className="col-xl-2 fw-bold">
              Imagem
            </label>
            <div className="col-xl-10">
              <input
                {...register("imagem")}
                type="text"
                id="imagem"
                className={
                  errors.imagem
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.imagem?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <div className="offset-xl-3 col-xl-9">
              <div className="form-check pl-0 mt-xl-0 mt-2">
                <input
                  {...register("disponivel")}
                  type="checkbox"
                  id="disponivel"
                  className="form-check-input"
                />
                <label
                  htmlFor="disponivel"
                  className="form-check-label fw-bold"
                >
                  Disponível?
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-10 offset-xl-2 d-flex">
              <button
                id="botao"
                type="submit"
                className="btn btn-primary btn-sm d-flex align-items-center me-3"
              >
                {pizzaSelecionado.id ? (
                  <>
                    <img src={databaseEdit} className="me-1" /> Alterar
                  </>
                ) : (
                  <>
                    <img src={databaseAdd} className="me-1" /> Cadastrar
                  </>
                )}
              </button>
              <button
                onClick={() => setValoresIniciais()}
                id="botao"
                type="button"
                className="btn btn-primary btn-sm d-flex align-items-center "
              >
                <img src={databaseCancel} className="me-1" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default PizzaForm;
