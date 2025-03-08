// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children, auth }) {
//   return auth ? children : <Navigate to="/login" />;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const session = JSON.parse(localStorage.getItem("supabaseSession"));
  return session ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
