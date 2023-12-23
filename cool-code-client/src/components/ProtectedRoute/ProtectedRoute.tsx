import styles from "./ProtectedRoute.module.css";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  if (localStorage.getItem("userToken") == null) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
}
