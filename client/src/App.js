import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
import MainContext from "./context/MainContext";
// Admmin pages
import Saloons from "./pages/admin/saloons/Saloons";
import NewSaloon from "./pages/admin/saloons/New";
import EditSaloon from "./pages/admin/saloons/Edit";
import Header from "./components/header/Header";
import Alert from "./components/alert/Alert";
import NewService from "./pages/admin/services/New";
import Services from "./pages/admin/services/Services";
import Workers from "./pages/admin/workers/Workers";
import DeleteSaloon from "./pages/admin/saloons/Delete";
import EditService from "./pages/admin/services/Edit";
import DeleteService from "./pages/admin/services/Delete";
import NewWorker from "./pages/admin/workers/New";
import EditWorker from "./pages/admin/workers/Edit";
import DeleteWorker from "./pages/admin/workers/Delete";
import Orders from "./pages/admin/orders/Orders";
import EditOrder from "./pages/admin/orders/Edit";
// User pages
import PublicSaloons from "./pages/Saloons";
import PublicWorkers from "./pages/Workers";
import PublicNewOrder from "./pages/NewOrder";
import PublicOrders from "./pages/Orders";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });
  const [userInfo, setUserInfo] = useState({});
  const contextValues = { alert, setAlert, userInfo, setUserInfo };

  useEffect(() => {
    Axios.get("/api/users/check-auth").then((res) => {
      console.log(res.data);
      setUserInfo(res.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Admin routes */}
            {userInfo.role === 1 && (
              <Route path="admin">
                <Route index element={<Saloons />} />
                <Route path="saloons/new/" element={<NewSaloon />} />
                <Route path="saloons/edit/:id" element={<EditSaloon />} />
                <Route path="saloons/delete/:id" element={<DeleteSaloon />} />
                <Route path="services/new/" element={<NewService />} />
                <Route path="services" element={<Services />} />
                <Route path="services/edit/:id" element={<EditService />} />
                <Route path="services/delete/:id" element={<DeleteService />} />
                <Route path="workers" element={<Workers />} />
                <Route path="workers/new/" element={<NewWorker />} />
                <Route path="workers/edit/:id" element={<EditWorker />} />
                <Route path="workers/delete/:id" element={<DeleteWorker />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/edit/:id" element={<EditOrder />} />
              </Route>
            )}
            {/* User routes */}
            <Route path="/" element={<PublicSaloons />} />
            <Route path="workers" element={<PublicWorkers />} />
            {userInfo.id && (
              <>
                <Route
                  path="new-order/:saloonId"
                  element={<PublicNewOrder />}
                />
                <Route path="orders" element={<PublicOrders />} />
              </>
            )}

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
