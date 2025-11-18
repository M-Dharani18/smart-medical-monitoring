

// import React from 'react';
// import { Box, Container } from '@mui/material';
// import { useLocation, Outlet } from 'react-router-dom';
// import FamilySidebar from './Sidebar';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useNavigate } from 'react-router-dom';

// const drawerWidth = 240;

// const FamilyLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   const getPageTitle = () => {
//     const path = location.pathname;
//     if (path.includes('Overview')) return 'Family Overview';
//     if (path.includes('Vitals')) return 'Vitals Monitoring';
//     if (path.includes('Medications')) return 'Medications';
//     if (path.includes('Reports')) return 'Medical Reports';
//     if (path.includes('Alerts')) return 'Alerts & Notifications';
//     return 'Family Dashboard';
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       {/* Sidebar */}
//       <FamilySidebar />
      
//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1 }}>
//         {/* App Bar */}
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//             background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
//             boxShadow: '0 2px 10px rgba(16, 185, 129, 0.2)',
//           }}
//         >
//           <Toolbar sx={{ minHeight: 64 }}>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: 'none' } }}
//             >
//               <MenuIcon />
//             </IconButton>
            
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               {getPageTitle()}
//             </Typography>
            
//             {/* Right side actions */}
//             <IconButton color="inherit" sx={{ mr: 1 }}>
//               <NotificationsIcon />
//             </IconButton>
//             <IconButton color="inherit" sx={{ mr: 1 }}>
//               <AccountCircleIcon />
//             </IconButton>
//             <IconButton color="inherit" onClick={handleLogout}>
//               <LogoutIcon />
//             </IconButton>
//           </Toolbar>
//         </AppBar>

//         {/* Main content area - This is where the nested routes will render */}
//         <Box
//           sx={{
//             mt: 8, // Account for AppBar height
//             minHeight: 'calc(100vh - 64px)',
//             backgroundColor: '#f8fafc',
//           }}
//         >
//           <Outlet /> {/* This renders the current nested route */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default FamilyLayout;


// src/pages/Family/Layout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';
import FamilySidebar from './Sidebar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const FamilyLayout = () => {
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
    if (path.includes('overview')) return 'Family Overview';
    if (path.includes('vitals')) return 'Vitals Monitoring';
    if (path.includes('medications')) return 'Medications';
    if (path.includes('reports')) return 'Medical Reports';
    if (path.includes('alerts')) return 'Alerts & Notifications';
    return 'Family Dashboard';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <FamilySidebar />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            boxShadow: '0 2px 10px rgba(16, 185, 129, 0.2)',
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
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {getPageTitle()}
            </Typography>
            
            {/* Right side actions */}
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main content area - This is where the nested routes will render */}
        <Box
          sx={{
            mt: 8, // Account for AppBar height
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#f8fafc',
          }}
        >
          <Outlet /> {/* This renders the current nested route */}
        </Box>
      </Box>
    </Box>
  );
};

export default FamilyLayout;