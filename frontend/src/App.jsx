

import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './pages/Home'

// Doctor components
import DoctorLayout from './pages/Doctor/Layout'
import DoctorOverview from './pages/Doctor/Overview'
import DoctorPatients from './pages/Doctor/Patients'
import DoctorAppointments from './pages/Doctor/Appointments'
import DoctorPrescriptions from './pages/Doctor/Prescriptions'
import DoctorSidebar from './pages/Doctor/Sidebar'
import DoctorVitals from './pages/Doctor/Vitals'

// Caregiver components
import CaregiverLayout from './pages/Caregiver/Layout'
import CaregiverOverview from './pages/Caregiver/Overview'
import CaregiverCareLog from './pages/Caregiver/CareLog'
import CaregiverMedications from './pages/Caregiver/Medications'
import CaregiverProfile from './pages/Caregiver/Profile'

// Family components
import FamilyLayout from './pages/Family/Layout'
import FamilyOverview from './pages/Family/Overview'
import FamilyMedications from './pages/Family/Medications'
import FamilyVitals from './pages/Family/Vitals'
import FamilyReports from './pages/Family/Reports'
import FamilyAlerts from './pages/Family/Alerts'

import './App.css'

const theme = createTheme({
  palette: {
    primary: { main: '#3b82f6' },
    secondary: { main: '#10b981' },
    background: { 
      default: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.9)'
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280'
    }
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          }
        }
      }
    }
  }
})

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  in: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  out: { 
    opacity: 0, 
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const authPageVariants = {
  initial: { 
    opacity: 0,
    scale: 0.95
  },
  in: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  out: { 
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

function App() {
  const location = useLocation()
  
  // Check if current route is auth page
  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  
  // Update body class based on page type
  useEffect(() => {
    if (isAuthPage) {
      document.body.classList.add('auth-page')
    } else {
      document.body.classList.remove('auth-page')
    }
    
    return () => {
      document.body.classList.remove('auth-page')
    }
  }, [isAuthPage])

  return (
    <ThemeProvider theme={theme}>
      <div className={`app-container ${isAuthPage ? 'auth-page' : ''}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={isAuthPage ? authPageVariants : pageVariants}
          >
            <Routes location={location}>
              {/* Public Routes */}
              <Route 
                path="/" 
                element={
                  <div className="page-content">
                    <Home />
                  </div>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Doctor Routes with Layout and Nested Routes */}
              <Route path="/Doctor" element={<DoctorLayout />}>
                <Route path="Overview" element={<DoctorOverview />} />
                <Route path="Appointments" element={<DoctorAppointments />} />
                <Route path="Patients" element={<DoctorPatients />} />
                <Route path="Prescriptions" element={<DoctorPrescriptions />} />
                <Route path="Vitals" element={<DoctorVitals />} />
                {/* Redirect /Doctor to /Doctor/Overview */}
                <Route index element={<DoctorOverview />} />
              </Route>
              
              
              {/* Caregiver Routes with Layout - FIXED! ✅ */}
              <Route path="/Caregiver" element={<CaregiverLayout />}>
                <Route path="Overview" element={<CaregiverOverview />} />
                <Route path="Care-Log" element={<CaregiverCareLog />} />
                <Route path="Medications" element={<CaregiverMedications />} />
                <Route path="Profile" element={<CaregiverProfile />} />
                {/* Redirect /Caregiver to /Caregiver/Overview */}
                <Route index element={<CaregiverOverview />} />
              </Route>
              
              
              {/* Family Routes with Layout and Nested Routes */}
              <Route path="/Family" element={<FamilyLayout />}>
                <Route path="Overview" element={<FamilyOverview />} />
                <Route path="Vitals" element={<FamilyVitals />} />
                <Route path="Reports" element={<FamilyReports />} />
                <Route path="Medications" element={<FamilyMedications />} />
                <Route path="Alerts" element={<FamilyAlerts />} />
                {/* Redirect /Family to /Family/Overview */}
                <Route index element={<FamilyOverview />} />
              </Route>

              {/* Fallback Route */}
              <Route 
                path="*" 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="page-content">
                      <Home />
                    </div>
                  </motion.div>
                } 
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}

export default App