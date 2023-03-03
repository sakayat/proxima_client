import { useContext } from "react";
import { AuthContex } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContex);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
