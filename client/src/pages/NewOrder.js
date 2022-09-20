import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext";
import Axios from "axios";

const NewOrder = () => {
  const { saloonId } = useParams();
  const { setAlert } = useContext(MainContext);
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/api/services/")
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

  return (
    <>
      <div>užsakymas {saloonId}</div>
      <div>
        <form action="">
          <select name="" id="">
            <option value="0">Pasirinkite paslaugą</option>
            {services.map((service) => (
              <option value={service.id} key={service.id}>
                {service.name + " trukmė: " + service.duration}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
};

export default NewOrder;
