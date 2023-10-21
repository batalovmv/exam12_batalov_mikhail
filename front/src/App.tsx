import { Container } from "@mui/material";
import "./App.css";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import PostsPage from "./containers/post/PostsPage";
import PostDetailsPage from "./containers/post/PostDetailsPage";
import LoginPage from "./containers/LoginPage/LoginPage";
import NewPost from "./containers/post/NewPost";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from "./store/hooks";
import MyCocktailsPage from "./components/cocktails/MyCocktailsList";
import NewCocktailPage from "./components/cocktails/NewCocktailForm";
import NavBar from "./components/NavBar";

function App() {
  const user = useAppSelector((state) => state.users.currentUser);
  return (
    <>
      <NavBar />
      <main>
        <Container maxWidth="xl">
          <Routes>
           
            
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
