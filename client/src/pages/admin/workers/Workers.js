import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Workers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    Axios.get("/api/workers/")
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="page-heading mt-4 d-flex justify-content-between">
        <h1>Darbuotojai</h1>
        <Link to="/admin/workers/new" className="btn btn-primary">
          Pridėti darbuotoją
        </Link>
      </div>
      {workers ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th className="text-center w-10">Nuotrauka</th>
              <th>Vardas</th>
              <th>Pavardė</th>
              <th>Salonas</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr className="align-middle" key={worker.id}>
                <td>{worker.id}</td>
                <td className="text-center">
                  {worker.photo ? (
                    <img
                      height="50px"
                      src={worker.photo}
                      alt={worker.first_name + " " + worker.last_name}
                    />
                  ) : (
                    <img
                      height="50px"
                      src="https://via.placeholder.com/50"
                      alt={worker.first_name + " " + worker.last_name}
                    />
                  )}
                </td>
                <td>{worker.first_name}</td>
                <td>{worker.last_name}</td>
                <td>{worker.saloon?.name}</td>
                <td>
                  <Link
                    to={"/admin/workers/edit/" + worker.id}
                    className="btn btn-light"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <Link
                    to={"/admin/workers/delete/" + worker.id}
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
        <h3>Nėra darbuotojų</h3>
      )}
    </>
  );
};

export default Workers;
