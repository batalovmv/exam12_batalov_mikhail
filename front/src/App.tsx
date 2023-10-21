import { Container } from "@mui/material";
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { useAppSelector } from "./store/hooks";
import NavBar from "./components/NavBar";
import { RegisterForm } from "./components/Forms/Register";
import { LoginForm } from "./components/Forms/Login";

import { EstablishmentsRoute } from "./components/routes/establishemntROute";
import EstablishmentDetails from "./components/EstablishmentsDetails";
import EstablishmentForm from "./components/Forms/CreateEstablishment";


function App() {
  return (
    <>
      <NavBar />
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Navigate to="/establishments" />} />
            <Route path="/establishment/:id" element={<EstablishmentDetails />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/establishments" element={<EstablishmentsRoute />} />
            <Route path="/new-establishment" element={<EstablishmentForm />} /> 
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
