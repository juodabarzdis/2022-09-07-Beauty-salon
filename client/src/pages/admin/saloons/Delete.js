import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import MainContext from "../../../context/MainContext";

const DeleteSaloon = () => {
  const { id } = useParams();
  const { setAlert } = useContext(MainContext);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.delete("/api/saloons/delete/" + id)
      .then((res) => {
          setAlert({
          message: res.data,
          status: "success",
        });
              navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
        if (error.response.status === 401) navigate("/login");
      });
  }, []);

  return <div>Delete</div>;
};

export default DeleteSaloon;
