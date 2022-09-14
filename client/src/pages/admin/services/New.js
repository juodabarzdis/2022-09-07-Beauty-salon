import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import Axios from "axios";
import Saloons from "../saloons/Saloons";

const NewService = () => {
  const { setAlert } = useContext(MainContext);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
    saloonId: "",
  });
  const [saloons, setSaloons] = useState([]);
  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api/services/new/", form)
      .then((res) => {
        navigate("/admin/services");
        setAlert({
          message: res.data,
          status: "success",
        });
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

  useEffect(() => {
    Axios.get("/api/saloons/")
      .then((res) => {
        console.log(res.data);
        setSaloons(res.data);
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [navigate]);

  return (
    <>
      <div className="page-heading mt-4">
        <h1>Nauja paslauga</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Paslaugos pavadinimas:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Paslaugos trukmė:</label>
          <input
            type="text"
            name="duration"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Kaina:</label>
          <input
            type="number"
            name="price"
            step="any"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Grožio salonas:</label>
          <select
            className="form-control"
            name="saloonId"
            onChange={handleForm}
          >
            <option value="">Pasirinkite saloną</option>
            {saloons.map((saloon) => (
              <option key={saloon.id} value={saloon.id}>
                {saloon.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary me-2">Išsaugoti</button>
        <Link to="/admin/services" className="btn btn-light">
          Grįžti
        </Link>
      </form>
    </>
  );
};

export default NewService;
