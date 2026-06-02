import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

// router.get(
//   "/profile",
//   authMiddleware,
//   (req, res) => {
//     res.json(req.user);
//   }
// );

export default ProtectedRoute;