import { Container } from "@mui/material";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import { useAppSelector } from "./store/hooks";
import NavBar from "./components/NavBar";
import { RegisterForm } from "./components/Forms/Register";
import { LoginForm } from "./components/Forms/Login";

function App() {
  const user = useAppSelector((state) => state.users.user);
  return (
    <>
      <NavBar />
      <main>
        <Container maxWidth="xl">
          <Routes>
           
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />

            
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
