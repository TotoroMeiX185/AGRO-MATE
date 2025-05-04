import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import Footer from '../components/Footer';  
import Navbar from '../components/Navbar';
import axios from 'axios';

function Login() {
  const [formData1, setFormData] = useState({ NIC: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading, setLoading} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      //const loggedInUser=await login(formData.NIC, formData.password);
      const res = await axios.post('http://localhost:3000/api/auth/login', formData1); 
        const data = res.data;
        console.log('API Response:', data);

        const user = await login(formData1.NIC, formData1.password);
        if(!user.role) {
          throw new Error('Role not found in response');
      }

      localStorage.setItem('userRole', data.role);

      if(data.role === 'admin'){
        navigate('/Adashboard');
      } else{
        navigate('/Dashboard');
      }

    } catch (error) {
      //console.error('Error during login:', error);

      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else{
        setError('Invalid NIC or password');
      }
    } finally {
      setLoading(false);
    }
  };
     
  function handleChange(e) {
    setFormData({
      ...formData1,
      [e.target.name]: e.target.value
    });
  }

  return (
    <><Navbar /><><div className='shadow-md box-shadow: var(--shadow-md)'>
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8"
        >
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access market details and finance info.
            </p>
          </div>

          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="nic" className="block text-sm font-medium text-gray-700">
                  NIC
                </label>
                <motion.input
                  id='nic'
                  whileFocus={{ scale: 1.01 }}
                  name="NIC"
                  type="text"
                  required
                  value={formData1.NIC}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <motion.input
                  id="password"
                  whileFocus={{ scale: 1.01 }}
                  name="password"
                  type="password"
                  required
                  value={formData1.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                <p className="text-sm text-center mt-2">
                  Are you not registered?{" "}
                  <a
                    href="#"
                    className="font-semibold text-green-700"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/farmers');
                    } }
                  >
                    RegisterNow
                  </a>

                </p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-primary-light group-hover:text-primary" />
              </span>
              {loading ? 'Signing in...' : 'Sign in'}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
      <Footer />
    </></>
  );
}
export default Login;