// src/pages/Caregiver/Messages.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Send,
  AttachFile,
  Image,
  VideoCall,
  Flag,
  CheckCircle,
  Schedule,
  LocationOn,
  Phone,
  CalendarMonth
} from '@mui/icons-material';

const CaregiverMessages = () => {
  const [message, setMessage] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const [messages] = useState([
    {
      id: 1,
      sender: 'Dr. Sarah Mitchell',
      avatar: 'DS',
      time: '10:30 AM',
      date: 'Today',
      message: 'Please monitor blood sugar levels more frequently. Target below 140 mg/dL.',
      isDoctor: true
    },
    {
      id: 2,
      sender: 'You',
      time: '10:45 AM',
      date: 'Today',
      message: 'Understood. I will check levels after each meal and log the results.',
      isDoctor: false
    },
    {
      id: 3,
      sender: 'Dr. Sarah Mitchell',
      avatar: 'DS',
      time: '11:00 AM',
      date: 'Today',
      message: 'Great! Also, please ensure he takes the evening medication with food.',
      isDoctor: true
    },
    {
      id: 4,
      sender: 'You',
      time: '2:15 PM',
      date: 'Yesterday',
      message: 'Patient is complaining of mild dizziness. Blood pressure was 145/90 this morning.',
      isDoctor: false
    },
    {
      id: 5,
      sender: 'Dr. Sarah Mitchell',
      avatar: 'DS',
      time: '2:30 PM',
      date: 'Yesterday',
      message: 'Please have him rest and monitor BP again in 2 hours. Call me if it remains elevated.',
      isDoctor: true
    }
  ]);

  const templates = [
    { id: 1, title: 'Patient Not Feeling Well', text: 'The patient is not feeling well today. Symptoms include: [describe symptoms]. Please advise.' },
    { id: 2, title: 'Question About Medication', text: 'I have a question about the [medication name]. [Your question here]' },
    { id: 3, title: 'Blood Sugar Alert', text: 'Blood sugar reading is [value] mg/dL, which is [higher/lower] than normal. Patient status: [describe].' },
    { id: 4, title: 'Appointment Confirmation', text: 'Confirming appointment on [date] at [time]. Patient is prepared and ready.' }
  ];

  const nextAppointment = {
    date: 'October 10, 2025',
    time: '2:00 PM',
    doctor: 'Dr. Sarah Mitchell',
    location: 'Green Valley Clinic, Room 205',
    type: 'Follow-up Consultation',
    preparation: [
      'Bring updated medication list',
      'Recent blood sugar log (last 7 days)',
      'List of questions or concerns',
      'Insurance card and ID'
    ]
  };

  const [pastAppointments] = useState([
    { date: 'Oct 3, 2025', doctor: 'Dr. Sarah Mitchell', type: 'Regular Checkup', notes: 'BP elevated, increased monitoring needed' },
    { date: 'Sep 15, 2025', doctor: 'Dr. Sarah Mitchell', type: 'Diabetes Review', notes: 'Blood sugar control improving' },
    { date: 'Aug 20, 2025', doctor: 'Dr. Sarah Mitchell', type: 'Follow-up', notes: 'Medication adjusted' }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message, 'Urgent:', isUrgent);
      setMessage('');
      setIsUrgent(false);
      alert('Message sent to doctor!');
    }
  };

  const useTemplate = (template) => {
    setMessage(template.text);
    setSelectedTemplate(template.id);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Message Thread */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box sx={{ 
              p: 2, 
              borderBottom: '1px solid #e2e8f0',
              bgcolor: '#faf5ff'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#8b5cf6', mr: 2 }}>DS</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Dr. Sarah Mitchell
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    General Physician
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <IconButton sx={{ color: '#10b981' }}>
                    <Phone />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              p: 3,
              bgcolor: '#f8fafc'
            }}>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.isDoctor ? 'flex-start' : 'flex-end',
                    mb: 2
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: msg.isDoctor ? 'white' : '#8b5cf6',
                      color: msg.isDoctor ? 'inherit' : 'white',
                      border: msg.isDoctor ? '1px solid #e2e8f0' : 'none'
                    }}
                  >
                    {msg.isDoctor && (
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#7c3aed' }}>
                        {msg.sender}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {msg.message}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block', 
                        mt: 1,
                        opacity: 0.7
                      }}
                    >
                      {msg.time}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', bgcolor: 'white' }}>
              <Box sx={{ mb: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      icon={<Flag />}
                      checkedIcon={<Flag />}
                      sx={{
                        color: '#ef4444',
                        '&.Mui-checked': { color: '#ef4444' }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: isUrgent ? '#ef4444' : 'text.secondary' }}>
                      Mark as urgent
                    </Typography>
                  }
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <IconButton sx={{ color: '#64748b' }}>
                  <AttachFile />
                </IconButton>
                <IconButton sx={{ color: '#64748b' }}>
                  <Image />
                </IconButton>
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  endIcon={<Send />}
                  sx={{
                    bgcolor: '#8b5cf6',
                    '&:hover': { bgcolor: '#7c3aed' }
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Card>

          {/* Quick Templates */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#7c3aed' }}>
                Quick Report Templates
              </Typography>
              <Grid container spacing={2}>
                {templates.map((template) => (
                  <Grid item xs={12} sm={6} key={template.id}>
                    <Paper
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: selectedTemplate === template.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                        bgcolor: selectedTemplate === template.id ? '#faf5ff' : 'white',
                        '&:hover': {
                          bgcolor: '#faf5ff',
                          borderColor: '#8b5cf6'
                        }
                      }}
                      onClick={() => useTemplate(template)}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        {template.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Click to use this template
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments Section */}
        <Grid item xs={12} lg={4}>
          {/* Next Appointment */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#7c3aed' }}>
                Next Appointment
              </Typography>
              <Paper sx={{ p: 2, bgcolor: '#faf5ff', border: '2px solid #8b5cf6' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarMonth sx={{ color: '#8b5cf6', mr: 1 }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {nextAppointment.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {nextAppointment.time}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Doctor
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {nextAppointment.doctor}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Type
                  </Typography>
                  <Chip 
                    label={nextAppointment.type} 
                    size="small" 
                    sx={{ bgcolor: '#8b5cf6', color: 'white' }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'start' }}>
                    <LocationOn sx={{ fontSize: 18, color: '#8b5cf6', mr: 1, mt: 0.3 }} />
                    <Typography variant="body2" color="text.secondary">
                      {nextAppointment.location}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#10b981',
                    '&:hover': { bgcolor: '#059669' }
                  }}
                >
                  Get Directions
                </Button>
              </Paper>

              {/* Preparation Checklist */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: '#7c3aed' }}>
                  Preparation Checklist
                </Typography>
                <List dense>
                  {nextAppointment.preparation.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <Checkbox size="small" sx={{ color: '#8b5cf6' }} />
                      <ListItemText 
                        primary={item}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>

          {/* Past Appointments */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#7c3aed' }}>
                Past Appointments
              </Typography>
              <List>
                {pastAppointments.map((appointment, index) => (
                  <Box key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {appointment.date}
                          </Typography>
                          <Chip 
                            label={appointment.type} 
                            size="small" 
                            sx={{ 
                              fontSize: '0.7rem',
                              bgcolor: '#e0e7ff',
                              color: '#7c3aed'
                            }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                          {appointment.doctor}
                        </Typography>
                        <Paper sx={{ p: 1, bgcolor: '#f8fafc', mt: 1 }}>
                          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                            "{appointment.notes}"
                          </Typography>
                        </Paper>
                      </Box>
                    </ListItem>
                    {index < pastAppointments.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CaregiverMessages;