import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import Axios from "axios";

const NewWorker = () => {
  const { setAlert } = useContext(MainContext);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    photo: "",
    saloonId: "",
  });

  const [saloons, setSaloons] = useState([]);
  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for(const key in form) {
        formData.append(key, form[key]);
    }
    console.log(e.target)
    Axios.post("/api/workers/new/", formData)
      .then((res) => {
        navigate("/admin/workers");
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
        <h1>Naujas darbuotojas</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Vardas:</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Pavardė:</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Nuotrauka:</label>
          <input
            type="file"
            name="photo"
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

export default NewWorker;
