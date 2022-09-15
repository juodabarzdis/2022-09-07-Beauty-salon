import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Saloons = () => {
  const [saloons, setSaloons] = useState([]);

  useEffect(() => {
    Axios.get("api/saloons/")
      .then((res) => setSaloons(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="page-heading mt-4 d-flex justify-content-between">
        <h1>Grožio salonai</h1>
        <Link to="/admin/saloons/new" className="btn btn-primary">
          Pridėti saloną
        </Link>
      </div>
      {saloons ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Pavadinimas</th>
              <th>Adresas</th>
              <th>Telefono nr.</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {saloons.map((saloon) => (
              <tr className="align-middle" key={saloon.id}>
                <td>{saloon.id}</td>
                <td>{saloon.name}</td>
                <td>{saloon.address}</td>
                <td>{saloon.phone}</td>
                <td>
                  <Link
                    to={"/admin/saloons/edit/" + saloon.id}
                    className="btn btn-light"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <Link
                    to={"/admin/saloons/delete/" + saloon.id}
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
        <h3>Nėra sukurtų grožio salonų</h3>
      )}
    </>
  );
};

export default Saloons;
