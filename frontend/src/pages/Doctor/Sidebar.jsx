// src/pages/Doctor/Sidebar.jsx
// import React from 'react';
// import { 
//   Drawer, 
//   List, 
//   ListItem, 
//   ListItemButton, 
//   ListItemIcon, 
//   ListItemText, 
//   Box, 
//   Typography,
//   Divider,
//   Avatar
// } from '@mui/material';
// import { 
//   Dashboard, 
//   People, 
//   MonitorHeart, 
//   Medication, 
//   CalendarMonth,
//   LocalHospital
// } from '@mui/icons-material';
// import { useNavigate, useLocation } from 'react-router-dom';

// const drawerWidth = 260;

// const DoctorSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     {
//       id: 'overview',
//       icon: <Dashboard />,
//       label: 'Overview',
//       path: '/doctor/overview'
//     },
//     {
//       id: 'patients',
//       icon: <People />,
//       label: 'Patients',
//       path: '/doctor/patients'
//     },
//     {
//       id: 'vitals',
//       icon: <MonitorHeart />,
//       label: 'Vitals & Health Data',
//       path: '/doctor/vitals'
//     },
//     {
//       id: 'prescriptions',
//       icon: <Medication />,
//       label: 'Prescriptions',
//       path: '/doctor/prescriptions'
//     },
//     {
//       id: 'appointments',
//       icon: <CalendarMonth />,
//       label: 'Appointments & Reports',
//       path: '/doctor/appointments'
//     }
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const isSelected = (path) => location.pathname === path;

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
//           borderRight: '1px solid #cbd5e1',
//         },
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ 
//         p: 3, 
//         borderBottom: '1px solid #cbd5e1',
//         background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%)',
//         color: 'white'
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           <LocalHospital sx={{ fontSize: 32, mr: 1.5 }} />
//           <Box>
//             <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
//               Doctor Dashboard
//             </Typography>
//             <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
//               Medical Care Portal
//             </Typography>
//           </Box>
//         </Box>
        
//         {/* Doctor Profile Mini Card */}
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           p: 2, 
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           borderRadius: 2,
//           backdropFilter: 'blur(10px)'
//         }}>
//           <Avatar 
//             sx={{ 
//               width: 40, 
//               height: 40, 
//               mr: 1.5,
//               backgroundColor: 'rgba(255, 255, 255, 0.2)'
//             }}
//           >
//             DS
//           </Avatar>
//           <Box sx={{ minWidth: 0 }}>
//             <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
//               Dr. Sarah Mitchell
//             </Typography>
//             <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
//               Internal Medicine
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       <Divider />

//       {/* Navigation Menu */}
//       <List sx={{ p: 1.5 }}>
//         {menuItems.map((item) => (
//           <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
//             <ListItemButton
//               selected={isSelected(item.path)}
//               onClick={() => handleNavigation(item.path)}
//               sx={{
//                 borderRadius: 2,
//                 mx: 0.5,
//                 py: 1.5,
//                 '&.Mui-selected': {
//                   backgroundColor: '#dbeafe',
//                   color: '#1d4ed8',
//                   '& .MuiListItemIcon-root': {
//                     color: '#1d4ed8',
//                   },
//                   '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     left: 0,
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     width: 4,
//                     height: '60%',
//                     backgroundColor: '#1d4ed8',
//                     borderRadius: '0 2px 2px 0'
//                   }
//                 },
//                 '&:hover': {
//                   backgroundColor: '#f1f5f9',
//                   '& .MuiListItemIcon-root': {
//                     color: '#1d4ed8',
//                   },
//                 },
//                 transition: 'all 0.2s ease-in-out',
//                 position: 'relative'
//               }}
//             >
//               <ListItemIcon sx={{ 
//                 minWidth: 45, 
//                 color: isSelected(item.path) ? '#1d4ed8' : '#64748b',
//                 transition: 'color 0.2s ease-in-out'
//               }}>
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText 
//                 primary={item.label} 
//                 primaryTypographyProps={{ 
//                   fontWeight: isSelected(item.path) ? 600 : 500,
//                   fontSize: '0.9rem'
//                 }} 
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       {/* Footer */}
//       <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #cbd5e1' }}>
//         <Box sx={{ 
//           p: 2, 
//           backgroundColor: '#f8fafc', 
//           borderRadius: 2,
//           textAlign: 'center'
//         }}>
//           <LocalHospital sx={{ color: '#1d4ed8', mb: 1, fontSize: 20 }} />
//           <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
//             HealthCenter Medical
//           </Typography>
//           <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>
//             Caring for Life
//           </Typography>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default DoctorSidebar;


import React, { useState, useEffect } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Typography,
  Divider,
  Avatar
} from '@mui/material';
import { 
  Dashboard, 
  People, 
  MonitorHeart, 
  Medication, 
  CalendarMonth,
  LocalHospital
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctorInfo, setDoctorInfo] = useState({
    name: 'Doctor',
    specialization: 'Loading...',
    initials: 'D'
  });

  useEffect(() => {
    // Load doctor info from localStorage
    const loadDoctorInfo = () => {
      try {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          
          // Get doctor name
          const doctorName = userData.name || userData.fullName || 'Dr. ' + (userData.email?.split('@')[0] || 'Doctor');
          
          // Get initials (first letter of first two words)
          const nameParts = doctorName.split(' ');
          const initials = nameParts.length >= 2 
            ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
            : doctorName.substring(0, 2).toUpperCase();
          
          // Get specialization
          const specialization = userData.specialization || 'Medical Professional';
          
          setDoctorInfo({
            name: doctorName,
            specialization: specialization,
            initials: initials
          });
        }
      } catch (error) {
        console.error('Error loading doctor info:', error);
      }
    };

    loadDoctorInfo();
  }, []);

  const menuItems = [
    {
      id: 'overview',
      icon: <Dashboard />,
      label: 'Overview',
      path: '/doctor/overview'
    },
    {
      id: 'patients',
      icon: <People />,
      label: 'Patients',
      path: '/doctor/patients'
    },
    {
      id: 'vitals',
      icon: <MonitorHeart />,
      label: 'Vitals & Health Data',
      path: '/doctor/vitals'
    },
    {
      id: 'prescriptions',
      icon: <Medication />,
      label: 'Prescriptions',
      path: '/doctor/prescriptions'
    },
    {
      id: 'appointments',
      icon: <CalendarMonth />,
      label: 'Appointments & Reports',
      path: '/doctor/appointments'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isSelected = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
          borderRight: '1px solid #cbd5e1',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid #cbd5e1',
        background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%)',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalHospital sx={{ fontSize: 32, mr: 1.5 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Doctor Dashboard
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
              Medical Care Portal
            </Typography>
          </Box>
        </Box>
        
        {/* Doctor Profile Mini Card - Dynamic */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)'
        }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 1.5,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontWeight: 600
            }}
          >
            {doctorInfo.initials}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '0.85rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {doctorInfo.name}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.8, 
                fontSize: '0.7rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block'
              }}
            >
              {doctorInfo.specialization}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ p: 1.5 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={isSelected(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                mx: 0.5,
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: '#dbeafe',
                  color: '#1d4ed8',
                  '& .MuiListItemIcon-root': {
                    color: '#1d4ed8',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: '60%',
                    backgroundColor: '#1d4ed8',
                    borderRadius: '0 2px 2px 0'
                  }
                },
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                  '& .MuiListItemIcon-root': {
                    color: '#1d4ed8',
                  },
                },
                transition: 'all 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 45, 
                color: isSelected(item.path) ? '#1d4ed8' : '#64748b',
                transition: 'color 0.2s ease-in-out'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontWeight: isSelected(item.path) ? 600 : 500,
                  fontSize: '0.9rem'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #cbd5e1' }}>
        <Box sx={{ 
          p: 2, 
          backgroundColor: '#f8fafc', 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <LocalHospital sx={{ color: '#1d4ed8', mb: 1, fontSize: 20 }} />
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
            HealthCenter Medical
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>
            Caring for Life
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DoctorSidebar;