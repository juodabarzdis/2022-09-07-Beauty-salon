import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import Axios from "axios";

const EditOrder = () => {
  const { setAlert } = useContext(MainContext);
  const { id } = useParams();
  const [form, setForm] = useState({
    order_date: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    Axios.get("/api/orders/single/" + id)
      .then((res) => {
        res.data.order_date = new Date(res.data.order_date)
          .toISOString()
          .slice(0, 16);
        res.data.status = res.data.status ? "1" : "0";
        setForm(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put("/api/orders/edit/" + id, form)
      .then((res) => {
        setAlert({
          message: res.data,
          status: "success",
        });
        navigate("/admin/orders");
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
        <h1>Redaguoti užsakymą</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Užsakymo data:</label>
          <input
            type="datetime-local"
            name="order_date"
            className="form-control"
            onChange={handleForm}
            value={form.order_date}
          />
        </div>

        <div className="form-group mb-2">
          <label className="mb-1">Užsakymo statusas: </label>
          <select name="status" onChange={handleForm} value={form.status}>
            <option value="0">Nepatvirtintas</option>
            <option value="1">Patvirtintas</option>
          </select>
        </div>
        <button className="btn btn-primary me-2">Išsaugoti</button>
        <Link to="/admin/orders/" className="btn btn-light">
          Grįžti
        </Link>
      </form>
    </>
  );
};

export default EditOrder;
