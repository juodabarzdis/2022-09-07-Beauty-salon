import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import Axios from "axios";

const EditService = () => {
  const { setAlert } = useContext(MainContext);
  const { id } = useParams();
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

  useEffect(() => {
    Axios.get("/api/saloons/")
      .then((res) => {
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

  useEffect(() => {
    Axios.get("/api/services/" + id)
      .then((res) => {
        setForm(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put("/api/services/edit/" + id, form)
      .then((res) => {
        setAlert({
          message: res.data,
          status: "success",
        });
        navigate("/admin/services");
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

  console.log(form);

  return (
    <>
      <div className="page-heading mt-4">
        <h1>Redaguoti paslaugą</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Paslauga:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleForm}
            value={form.name}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Trukmė:</label>
          <input
            type="text"
            name="duration"
            className="form-control"
            onChange={handleForm}
            value={form.duration}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Kaina:</label>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={handleForm}
            value={form.price}
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

export default EditService;
