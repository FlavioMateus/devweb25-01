import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

const schema = z
  .object({
    conta: z.string().min(1, "Conta é obrigatória"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z.string().min(6, "Confirmação obrigatória"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

const CadastrarUsuarioPage = () => {
  const [erroServidor, setErroServidor] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:8080/autenticacao/cadastrar", {
        conta: data.conta,
        senha: data.senha,
      });
      alert("Usuário cadastrado com sucesso!");
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErroServidor(error.response.data.message);
      } else {
        setErroServidor("Erro ao cadastrar usuário");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Conta</label>
          <input className="form-control" {...register("conta")} />
          {errors.conta && <p className="text-danger">{errors.conta.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" {...register("senha")} />
          {errors.senha && <p className="text-danger">{errors.senha.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar Senha</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmarSenha")}
          />
          {errors.confirmarSenha && (
            <p className="text-danger">{errors.confirmarSenha.message}</p>
          )}
        </div>

        {erroServidor && <p className="text-danger">{erroServidor}</p>}

        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastrarUsuarioPage;
