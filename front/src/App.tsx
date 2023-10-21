import { Container } from "@mui/material";
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { useAppSelector } from "./store/hooks";
import NavBar from "./components/NavBar";
import { RegisterForm } from "./components/Forms/Register";
import { LoginForm } from "./components/Forms/Login";

import { EstablishmentsRoute } from "./components/routes/establishemntROute";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/establishments" element={<EstablishmentsRoute />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
