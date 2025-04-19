// RequireAuth.jsx
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole'); // Or fetch role from context
  const location = useLocation();

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
