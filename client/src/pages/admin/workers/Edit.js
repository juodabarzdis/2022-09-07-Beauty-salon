import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import Axios from "axios";

const EditWorker = () => {
  const { setAlert } = useContext(MainContext);
  const { id } = useParams();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    photo: "",
    saloonId: "",
  });

  const [saloons, setSaloons] = useState([]);
  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value});
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
    Axios.get("/api/workers/single/" + id)
      .then((res) => {
        setForm(res.data);
      })
      .catch((error) => {
        setAlert({
            message: error.response.data,
            status: "danger",
            });
        console.log(error)});
  }, [setAlert]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for(const key in form) {
        formData.append(key, form[key]);
    }

    Axios.put("/api/workers/edit/" + id, formData)
      .then((res) => {
        setAlert({
          message: res.data,
          status: "success",
        });
        navigate("/admin/workers");
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
        <h1>Darbuotojo redagavimas</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Vardas</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            onChange={handleForm}
            value={form.first_name}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Pavardė:</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            onChange={handleForm}
            value={form.last_name}
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
        <div className="mb-2">
            {form.photo && typeof form.photo === 'string' && 
            <div className="mb-2">
            <img width="100px" src={form.photo} alt="" />
            <div>
                <button className="btn btn-danger mt-2" onClick={(e) => {
                    e.preventDefault();
                    setForm({
                    ...form,
                    photo: ''
                })}}>Ištrinti nuotrauką</button>
            </div>
        </div>
            }
           
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Grožio salonas:</label>
          <select
            className="form-control"
            name="saloonId"
            onChange={handleForm}
            value={form.saloonId ? form.saloonId : ""}
          >
            {saloons.map((saloon) => (
              <option key={saloon.id} value={saloon.id}>
                {saloon.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary me-2">Išsaugoti</button>
        <Link to="/admin/workers" className="btn btn-light">
          Grįžti
        </Link>
      </form>
    </>
  );
};

export default EditWorker;
