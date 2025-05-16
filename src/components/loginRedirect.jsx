import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';

const LoginRedirect = () => {
 
  const { user, loading, authReady } = useAuth();
  

  //While loading user info from localstorage or server, wait
  if(loading || !authReady) return <div> Loading....</div>;

  if(user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if(user?.role === 'farmer') {
    return <Navigate to="/farmer/dashboard" replace />;
  } 


    return <Login />;
  };
  
  

export default LoginRedirect;
