// RequireAuth.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  //const userRole = localStorage.getItem('userRole'); // Or fetch role from context
  const location = useLocation();
  const { user } = useAuth();

  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if(!allowedRoles.includes(user.role)) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet/>;

 

};

export default RequireAuth;
