import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext";
import Axios from "axios";

const NewOrder = () => {
  const { saloonId } = useParams();
  const { setAlert } = useContext(MainContext);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({});
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api/orders/new/", form)
      .then((res) => {
        setAlert({
          message: res.data,
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  };

  useEffect(() => {
    Axios.get("/api/services/?saloonId=" + saloonId)
      .then((res) => {
        setServices(res.data);
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  useEffect(() => {
    Axios.get("/api/workers/?saloon=" + saloonId)
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, []);

  return (
    <>
      <div>
        <h1>užsakymas {saloonId}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <div>
              <label htmlFor="serviceId">Pasirinkite paslaugą:</label>
            </div>
            <select
              className="form-control"
              onChange={handleForm}
              name="serviceId"
            >
              <option value="0">Pasirinkite paslaugą</option>
              {services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name + " trukmė: " + service.duration}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="workerId">Darbuotojas:</label>
            <select
              className="form-control"
              onChange={handleForm}
              name="workerId"
            >
              <option value="0">Pasirinkite paslaugą</option>
              {workers.map((worker) => (
                <option value={worker.id} key={worker.id}>
                  {worker.first_name + " " + worker.last_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-2">
              <div>
                <label htmlFor="order-date" id="order-date">
                  Data:
                </label>
              </div>

              <input
                name="order_date"
                type="datetime-local"
                onChange={handleForm}
              />
            </div>
          </div>
          <button type="submit">Užsakyti</button>
        </form>
      </div>
    </>
  );
};

export default NewOrder;
