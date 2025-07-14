import pizza_logo from "../assets/pizza-logo.png";

export default function Footer() {
    return (
      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container text-center">
          <div className="mb-3">
            <img src={pizza_logo} alt="Logo" style={{ height: "60px" }} />
          </div>
          <p className="mb-2">© 2025 Pizzaria Delícia</p>
          <div className="social-links">
            <a href="#" className="text-white mx-2 fs-4"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-white mx-2 fs-4"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white mx-2 fs-4"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </footer>
    );
  }
  