import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext";
import Axios from "axios";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [saloons, setSaloons] = useState([]);
  const [selectedSaloon, setSelectedSaloon] = useState("0");
  const { setAlert } = useContext(MainContext);

  useEffect(() => {
    let url = "/api/workers/";
    if (selectedSaloon !== "0") {
      url += "?saloon=" + selectedSaloon;
    }

    console.log(url);
    Axios.get(url)
      .then((res) => {
        // laikinas
        const workers = res.data.map((worker) => {
          if (worker.ratings.length > 0) {
            let sum = 0;
            worker.ratings.map((r) => (sum += r.rating));
            worker.total_rating = (sum / worker.ratings.length).toFixed(1);
          }

          return worker;
        });
        setWorkers(workers);
      })
      .catch((err) => {
        setAlert({
          message: err.response.data.message,
          status: "danger",
        });
      });
  }, [selectedSaloon]);

  useEffect(() => {
    Axios.get("/api/saloons")
      .then((res) => {
        setSaloons(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          message: err.message.data.message,
          status: "danger",
        });
      });
  }, [selectedSaloon]);

  const handleFilter = (e) => {
    setSelectedSaloon(e.target.value);
  };

  return (
    <>
      <h1>Darbuotojų sąrašas</h1>
      {saloons && (
        <select onChange={handleFilter}>
          <option value="0">Pasirinkite saloną</option>
          {saloons.map((saloon) => (
            <option key={saloon.id} value={saloon.id}>
              {saloon.name}
            </option>
          ))}
        </select>
      )}
      <div className="d-flex ">
        {workers &&
          workers.map((worker) => (
            <div key={worker.id} className="m-4">
              <div
                style={{
                  objectFit: "cover",
                  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <img src={worker.photo} alt="" style={{ width: "200px" }} />
              </div>
              <div>
                <h4>{worker.first_name + " " + worker.last_name}</h4>
              </div>
              <div>{worker.saloon.name}</div>
              <div>Įvertinimas: {worker.total_rating}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Workers;
