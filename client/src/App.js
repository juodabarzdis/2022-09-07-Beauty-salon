import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContext from "./context/MainContext";
import Saloons from "./pages/admin/saloons/Saloons";
import NewSaloon from "./pages/admin/saloons/New";
import Header from "./components/header/Header";

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
          <Routes>
            <Route path="admin">
              <Route index element={<Saloons />} />
              <Route path="saloons/new/" element={<NewSaloon />} />
            </Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
