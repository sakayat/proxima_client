import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch: logoutDispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    logoutDispatch({
      type: "LOGOUT",
    });
  };
  return { logout };
};
