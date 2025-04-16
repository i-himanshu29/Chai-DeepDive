import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
