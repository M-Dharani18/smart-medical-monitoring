// // src/pages/Family/Sidebar.jsx
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
//   Divider 
// } from '@mui/material';
// import { 
//   Dashboard, 
//   MonitorHeart, 
//   Medication, 
//   Description, 
//   Notifications, 
//   Home 
// } from '@mui/icons-material';
// import { useNavigate, useLocation } from 'react-router-dom';

// const drawerWidth = 240;

// const FamilySidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     {
//       id: 'overview',
//       icon: <Dashboard />,
//       label: 'Overview',
//       path: '/Family/Overview'
//     },
//     {
//       id: 'vitals',
//       icon: <MonitorHeart />,
//       label: 'Vitals',
//       path: '/Family/Vitals'
//     },
//     {
//       id: 'medications',
//       icon: <Medication />,
//       label: 'Medications',
//       path: '/Family/Medications'
//     },
//     {
//       id: 'reports',
//       icon: <Description />,
//       label: 'Reports',
//       path: '/Family/Reports'
//     },
//     {
//       id: 'alerts',
//       icon: <Notifications />,
//       label: 'Alerts & Notifications',
//       path: '/Family/Alerts'
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
//           background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
//           borderRight: 'none',
//         },
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ 
//         p: 3, 
//         borderBottom: '1px solid #e2e8f0',
//         background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
//         color: 'white'
//       }}>
//         <Typography variant="h6" sx={{ fontWeight: 700 }}>
//           👨‍👩‍👧‍👦 Family Dashboard
//         </Typography>
//         <Typography variant="caption" sx={{ opacity: 0.9 }}>
//           Health Monitoring
//         </Typography>
//       </Box>

//       <Divider />

//       {/* Navigation Menu */}
//       <List sx={{ p: 1 }}>
//         {menuItems.map((item) => (
//           <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
//             <ListItemButton
//               selected={isSelected(item.path)}
//               onClick={() => handleNavigation(item.path)}
//               sx={{
//                 borderRadius: 2,
//                 mx: 1,
//                 '&.Mui-selected': {
//                   backgroundColor: '#e6fffa',
//                   color: '#059669',
//                   '& .MuiListItemIcon-root': {
//                     color: '#059669',
//                   },
//                 },
//                 '&:hover': {
//                   backgroundColor: '#f0f9ff',
//                   border: '1px solid #0ea5e9',
//                 },
//               }}
//             >
//               <ListItemIcon sx={{ 
//                 minWidth: 40, 
//                 color: isSelected(item.path) ? '#059669' : '#64748b' 
//               }}>
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText 
//                 primary={item.label} 
//                 primaryTypographyProps={{ 
//                   fontWeight: isSelected(item.path) ? 600 : 500 
//                 }} 
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default FamilySidebar;


// src/pages/Family/Sidebar.jsx
import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Typography,
  Divider 
} from '@mui/material';
import { 
  Dashboard, 
  MonitorHeart, 
  Medication, 
  Description, 
  Notifications, 
  Home 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const FamilySidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'overview',
      icon: <Dashboard />,
      label: 'Overview',
      path: '/family/overview' // Changed to lowercase
    },
    {
      id: 'vitals',
      icon: <MonitorHeart />,
      label: 'Vitals',
      path: '/family/vitals' // Changed to lowercase
    },
    {
      id: 'medications',
      icon: <Medication />,
      label: 'Medications',
      path: '/family/medications' // Changed to lowercase
    },
    {
      id: 'reports',
      icon: <Description />,
      label: 'Reports',
      path: '/family/reports' // Changed to lowercase
    },
    {
      id: 'alerts',
      icon: <Notifications />,
      label: 'Alerts & Notifications',
      path: '/family/alerts' // Changed to lowercase
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
          background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRight: 'none',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid #e2e8f0',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Family Dashboard
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          Health Monitoring
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={isSelected(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&.Mui-selected': {
                  backgroundColor: '#e6fffa',
                  color: '#059669',
                  '& .MuiListItemIcon-root': {
                    color: '#059669',
                  },
                },
                '&:hover': {
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                },
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40, 
                color: isSelected(item.path) ? '#059669' : '#64748b' 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontWeight: isSelected(item.path) ? 600 : 500 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default FamilySidebar;