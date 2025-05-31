import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import App from "./Authentications_role/ProdectRoutes/Prodect";
// import Checkout from "./App";
import "./assets/Css/Reg.css"
import "./assets/Css/Login.css"
import "./assets/Css/Navbar.css"
import "./assets/Css/Slide.css"
import "react-pro-sidebar/dist/css/styles.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App/>
    {/* <App /> */}
    {/* <Checkout /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
