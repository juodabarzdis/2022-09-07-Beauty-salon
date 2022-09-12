import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Saloons from "./pages/admin/Saloons";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Saloons />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
