import { useEffect, useState } from "react";
import Axios from "axios";

const Saloons = () => {
  const [saloons, setSaloons] = useState([]);

  useEffect(() => {
    Axios.get("api/saloons/")
      .then((res) => setSaloons(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {saloons ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Pavadinimas</th>
              <th>Adresas</th>
              <th>Telefono nr.</th>
            </tr>
          </thead>
          <tbody>
            {saloons.map((saloon) => (
              <tr>
                <td>{saloon.id}</td>
                <td>{saloon.name}</td>
                <td>{saloon.address}</td>
                <td>{saloon.phone}</td>
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
