import { useEffect, useState } from "react";
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
      <div className="page-heading mt-4">
        <h1>Darbuotojai</h1>
      </div>
      {workers ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th className="text-center w-10">Nuotraukas</th>
              <th>Vardas</th>
              <th>Pavardė</th>
              <th>Salonas</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr className="align-middle" key={worker.id}>
                <td>{worker.id}</td>
                <td className="text-center">
                  <img
                    height="50px"
                    src={worker.photo}
                    alt={worker.first_name + " " + worker.last_name}
                  />
                </td>
                <td>{worker.first_name}</td>
                <td>{worker.last_name}</td>
                <td>{worker.saloon.name}</td>
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
