import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NewOrder from "./pages/NewOrder";

const App = () => {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });

  const contextValues = { alert, setAlert };

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Admin routes */}
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
            {/* User routes */}
            <Route path="/" element={<PublicSaloons />} />
            <Route path="/workers" element={<PublicWorkers />} />
            <Route path="/new-order/:saloonId" element={<NewOrder />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
