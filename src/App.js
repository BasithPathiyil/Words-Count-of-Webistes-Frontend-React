import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import DetailedInsight from "./pages/DetailedInsight";
function App() {
  return (
    <div>
      {/* <Header /> */}
      {/* <div style={{ marginTop: "64px" }}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/detailedinsight/:insightId"
          element={<DetailedInsight />}
        />
      </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
