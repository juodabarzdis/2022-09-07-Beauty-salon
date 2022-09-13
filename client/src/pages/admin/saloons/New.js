import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import Alert from "../../../components/alert/Alert";
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
        window.scrollTo(0, 0);
        setTimeout(() => {
          setAlert({
            message: "",
          });
          navigate("/admin");
        }, 2000);
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
      <h1>Naujas grožio salonas</h1>
      <Alert />
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
        <button className="btn btn-primary">Siųsti</button>
      </form>
    </>
  );
};

export default NewSaloon;
