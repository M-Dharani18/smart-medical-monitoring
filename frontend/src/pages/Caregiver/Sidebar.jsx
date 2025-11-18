
// src/pages/Caregiver/Sidebar.jsx
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
  Person,
  Medication,
  Description,
  FavoriteBorder,
  LocalHospital
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const CaregiverSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [caregiverInfo, setCaregiverInfo] = useState({
    name: 'Caregiver',
    relationship: 'Loading...',
    initials: 'C'
  });

  useEffect(() => {
    // Load caregiver info from localStorage
    const loadCaregiverInfo = () => {
      try {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          
          // Get caregiver name
          const caregiverName = userData.name || userData.fullName || userData.email?.split('@')[0] || 'Caregiver';
          
          // Get initials (first letter of first two words)
          const nameParts = caregiverName.split(' ');
          const initials = nameParts.length >= 2 
            ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
            : caregiverName.substring(0, 2).toUpperCase();
          
          // Get relationship
          const relationship = userData.relationship || 'Care Provider';
          
          setCaregiverInfo({
            name: caregiverName,
            relationship: relationship,
            initials: initials
          });
        }
      } catch (error) {
        console.error('Error loading caregiver info:', error);
      }
    };

    loadCaregiverInfo();
  }, []);

  const menuItems = [
    {
      id: 'overview',
      icon: <Dashboard />,
      label: 'Overview',
      path: '/caregiver/overview'
    },
    {
      id: 'patient-profile',
      icon: <Person />,
      label: 'Patient Profile',
      path: '/caregiver/patient-profile'
    },
    {
      id: 'medications',
      icon: <Medication />,
      label: 'Medications',
      path: '/caregiver/medications'
    },
    {
      id: 'care-log',
      icon: <Description />,
      label: 'Care Log',
      path: '/caregiver/care-log'
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
          background: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%)',
          borderRight: '1px solid #d8b4fe',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid #d8b4fe',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FavoriteBorder sx={{ fontSize: 32, mr: 1.5 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Caregiver Portal
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
              Patient Care Dashboard
            </Typography>
          </Box>
        </Box>
        
        {/* Caregiver Profile Mini Card - Dynamic */}
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
            {caregiverInfo.initials}
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
              {caregiverInfo.name}
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
              {caregiverInfo.relationship}
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
                  backgroundColor: '#e9d5ff',
                  color: '#7c3aed',
                  '& .MuiListItemIcon-root': {
                    color: '#7c3aed',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: '60%',
                    backgroundColor: '#7c3aed',
                    borderRadius: '0 2px 2px 0'
                  }
                },
                '&:hover': {
                  backgroundColor: '#f5f3ff',
                  '& .MuiListItemIcon-root': {
                    color: '#7c3aed',
                  },
                },
                transition: 'all 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 45, 
                color: isSelected(item.path) ? '#7c3aed' : '#64748b',
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
      <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #d8b4fe' }}>
        <Box sx={{ 
          p: 2, 
          backgroundColor: '#faf5ff', 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <LocalHospital sx={{ color: '#7c3aed', mb: 1, fontSize: 20 }} />
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
            HealthCenter Medical
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>
            Compassionate Care
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CaregiverSidebar;