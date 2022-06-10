import { useDispatch } from "react-redux";
import { updateTokenAction } from "../store";

export function useLogout() {
  const dispatch = useDispatch();

  return () => {
    dispatch(updateTokenAction('', ''));
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
}
