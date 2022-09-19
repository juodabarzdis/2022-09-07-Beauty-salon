import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import MainContext from "../context/MainContext";

const Saloons = () => {
  const [saloons, setSaloons] = useState([]);
  const [sort, setSort] = useState("");
  const { setAlert } = useContext(MainContext);

  useEffect(() => {
    console.log(sort);
    let url = "/api/saloons/";
    if (sort === "1" || sort === "2") url += "?sort=" + sort;
    Axios.get(url)
      .then((res) => {
        setSaloons(res.data);
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [sort]);

  return (
    <div>
      <h1>Salonų sąrašas</h1>
      <select name="" id="" onChange={(e) => setSort(e.target.value)}>
        <option>Pagal ID</option>
        <option value="1">Pagal pavadinimą A-Z</option>
        <option value="2">Pagal pavadinimą Z-A</option>
      </select>
      {saloons.map((saloon) => (
        <div key={saloon.id} className="">
          <h3>{saloon.name}</h3>
          <p>{saloon.address}</p>
          <p>{saloon.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default Saloons;
