
import React from 'react';
import { Box } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';
import CaregiverSidebar from './Sidebar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const CaregiverLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getPageTitle = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('overview')) return 'Caregiver Overview';
    if (path.includes('patient-profile')) return 'Patient Profile & Settings';
    if (path.includes('medications')) return 'Medication Management';
    if (path.includes('care-log')) return 'Daily Care Log';
    return 'Caregiver Dashboard';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <CaregiverSidebar />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.15)',
          }}
        >
          <Toolbar sx={{ minHeight: 64 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              {getPageTitle()}
            </Typography>
            
            {/* Right side actions */}
            <IconButton 
              color="inherit" 
              sx={{ mr: 1, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              sx={{ mr: 1, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              onClick={handleLogout}
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main content area */}
        <Box
          sx={{
            mt: 8,
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#f8fafc',
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(124, 58, 237, 0.05) 2%, transparent 0%)',
            backgroundSize: '100px 100px'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default CaregiverLayout;