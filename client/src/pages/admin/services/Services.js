import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    Axios.get("/api/services/")
      .then((res) => {
        console.log(res.data);
        setServices(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="page-heading mt-4">
        <h1>Grožio paslaugos</h1>
      </div>
      {services ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Paslauga</th>
              <th>Trukmė</th>
              <th>Kaina</th>
              <th>Salonas</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr className="align-middle" key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.duration}</td>
                <td>{service.price}</td>
                <td>{service.saloon.name}</td>
                <td>
                  <Link
                    to={"/admin/services/edit/" + service.id}
                    className="btn btn-light"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <Link
                    to={"/admin/services/delete/" + service.id}
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
        <h3>Nėra paslaugų</h3>
      )}
    </>
  );
};

export default Services;
