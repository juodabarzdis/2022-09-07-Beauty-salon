import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import Axios from "axios";

const EditSaloon = () => {
  const { setAlert } = useContext(MainContext);
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    Axios.get("/api/saloons/" + id)
      .then((res) => {
        console.log(res);
        setForm(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put("/api/saloons/edit/" + id, form)
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
        <h1>Redaguoti grožio saloną</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Pavadinimas:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleForm}
            value={form.name}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Adresas:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            onChange={handleForm}
            value={form.address}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Telefono Nr.:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            onChange={handleForm}
            value={form.phone}
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

export default EditSaloon;
