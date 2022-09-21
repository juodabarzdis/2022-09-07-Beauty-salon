import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MainContext from "../context/MainContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { setAlert } = useContext(MainContext);

  const handleRatings = (e, workerId) => {
    Axios.post("/api/ratings/worker/" + workerId, {
      rating: e.target.value,
    })
      .then((res) => {
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
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    Axios.get("/api/orders/user/")
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
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
  }, [setAlert]);

  return (
    <>
      <div className="page-heading mt-4">
        <h1>Jūsų užsakymai</h1>
      </div>
      {orders ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Užsakymo data</th>
              <th>Salonas</th>
              <th>Paslauga</th>
              <th>Meistras</th>
              <th>Statusas</th>
              <th>Meistro įvertinimas</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="align-middle" key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.order_date).toLocaleString("lt-LT")}</td>
                <td>{order.service.saloon.name}</td>
                <td>{order.service?.name}</td>
                <td>
                  {order.worker.first_name + " " + order.worker.last_name}
                </td>
                <td>{order.status ? "Patvirtintas" : "Nepatvirtintas"}</td>
                <td>
                  <select
                    onChange={(e) => handleRatings(e, order.workerId)}
                    name=""
                    id=""
                    key={order.id}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Nėra užsakymų</h3>
      )}
    </>
  );
};

export default Orders;
