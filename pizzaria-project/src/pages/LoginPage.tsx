import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div style={{ paddingTop: "70px" /* ou altura da navbar */ }}>
      <div className="mb-4">
        <h5>Página de Login</h5>
        <hr className="mt-1" />
      </div>

      <LoginForm />
    </div>
  );
};
export default LoginPage;