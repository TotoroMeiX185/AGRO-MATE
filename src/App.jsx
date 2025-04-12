import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

import { Outlet } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Outlet/>
        <Router>
        <Routes>
        <Route index element={<Home />} /> 
        </Routes>
        </Router>
        </main>
        <Footer />
      </div>
      
    </AuthProvider>
  )
}