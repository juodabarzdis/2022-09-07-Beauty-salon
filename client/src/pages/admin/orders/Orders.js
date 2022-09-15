import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Axios.get("/api/orders/")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="page-heading mt-4">
        <h1>Užsakymai</h1>
      </div>
      {orders ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Užsakymo data</th>
              <th>Statusas</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="align-middle" key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.order_date).toLocaleString("lt-LT")}</td>
                <td>{order.status ? "Patvirtintas" : "Nepatvirtintas"}</td>
                <td>
                  <Link
                    to={"/admin/orders/edit/" + order.id}
                    className="btn btn-light"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <Link
                    to={"/admin/orders/delete/" + order.id}
                    className="btn btn-warning"
                  >
                    Delete
                  </Link>
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
