import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import Axios from "axios";

const NewSaloon = () => {
  const { setAlert } = useContext(MainContext);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api/saloons/new", form)
      .then((res) => {
        setAlert({
          message: res.data,
          status: "success",
        });
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
        if (error.response.status === 401) navigate("/login");
      });
  };

  return (
    <>
      <div className="page-heading mt-4">
        <h1>Naujas grožio salonas</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Pavadinimas:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Adresas:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Telefono Nr.:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <button className="btn btn-primary me-2">Išsaugoti</button>
        <Link to="/admin/saloons" className="btn btn-light">
          Grįžti
        </Link>
      </form>
    </>
  );
};

export default NewSaloon;
