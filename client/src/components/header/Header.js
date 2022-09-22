import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Header.css";
import MainContext from "../../context/MainContext";

const Header = () => {
  const { userInfo, setUserInfo, setAlert } = useContext(MainContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Axios.get("/api/users/logout").then((res) => {
      setUserInfo({});
      setAlert({
        message: res.data,
        status: "success",
      });

      navigate("/");
    });
  };

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
            {userInfo.role === 0 && (
              <li>
                <Link
                  to="/orders"
                  className="nav-link px-2 text-white active"
                  role="button"
                  aria-pressed="true"
                >
                  Užsakymai
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/"
                className="nav-link px-2 text-white active"
                role="button"
                aria-pressed="true"
              >
                Salonai
              </Link>
            </li>
            <li>
              <Link
                to="/workers"
                className="nav-link px-2 text-white active"
                role="button"
                aria-pressed="true"
              >
                Darbuotojai
              </Link>
            </li>
            {userInfo.role === 1 && (
              <li>
                <Link
                  to="/admin"
                  className="nav-link px-2 text-white active"
                  role="button"
                  aria-pressed="true"
                >
                  Administratorius
                </Link>
                <ul className="z-index-10">
                  <li>
                    <Link
                      to="/admin/services/"
                      className="nav-link px-2 text-white"
                    >
                      Paslaugos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/workers/"
                      className="nav-link px-2 text-white"
                    >
                      Darbuotojai
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orders/"
                      className="nav-link px-2 text-white"
                    >
                      Užsakymai
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          <div className="text-end">
            {userInfo.id ? (
              <button onClick={handleLogout} className="btn btn-primary m-2">
                Atsijungti
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
                  Prisijungimas
                </Link>
                <Link to="/register" className="btn btn-warning">
                  Registracija
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
