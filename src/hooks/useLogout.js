import { useAuthContext } from "./useAuthContext";
import { useProjectContext } from "./useProjectContext";

export const useLogout = () => {
  const { dispatch: logoutDispatch } = useAuthContext();
  const { dispatch: projectDispatch } = useProjectContext()
  const logout = () => {
    localStorage.removeItem("user");
    logoutDispatch({
      type: "LOGOUT",
    });
    projectDispatch({
      type: "SET_PROJECT",
      project: null
    })
  };
  return { logout };
};
