import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/index.scss";
// import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      {/* <Dashboard/> */}
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
