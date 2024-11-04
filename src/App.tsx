import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Map from './pages/Map'
import Tips from './pages/Tips'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import AboutUs from './pages/AboutUs'
import SustainabilityQuestionnaire from './components/SustainabilityQuestionnaire'
import ThemeContext from './contexts/ThemeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/map" element={<Map />} />
                <Route path="/sustentabilidade" element={<Tips />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sobre-nos" element={<AboutUs />} />
                <Route path="/questionnaire" element={<ProtectedRoute><SustainabilityQuestionnaire /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer position="bottom-right" />
        </Router>
      </ThemeContext.Provider>
    </AuthProvider>
  )
}

export default App