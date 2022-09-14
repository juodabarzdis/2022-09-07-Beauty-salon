import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <h1 className="display-6">Saloonas</h1>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
            <li>
              <Link
                to="/"
                className="nav-link px-2 text-white active"
                role="button"
                aria-pressed="true"
              >
                Pagrindinis
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="nav-link px-2 text-white active"
                role="button"
                aria-pressed="true"
              >
                Administratorius
              </Link>
            </li>
            <li>
              <Link
                to="/admin/saloons/new/"
                className="nav-link px-2 text-white"
              >
                Naujas gožio salonas
              </Link>
            </li>
            <li>
              <Link
                to="/admin/services/new/"
                className="nav-link px-2 text-white"
              >
                Nauja paslauga
              </Link>
            </li>
            <li>
              <Link to="/admin/services/" className="nav-link px-2 text-white">
                Paslaugos
              </Link>
            </li>
          </ul>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">
              Prisijungimas
            </button>
            <button type="button" className="btn btn-warning">
              Registracija
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
