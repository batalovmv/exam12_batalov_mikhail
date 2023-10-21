import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import Establishments from "../Establishments";

export const EstablishmentsRoute = () => {
  const user = useAppSelector((state) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? <Establishments /> : null;
};