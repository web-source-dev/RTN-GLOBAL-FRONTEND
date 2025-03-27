import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  useTheme,
  Link,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import API from '../../BackendAPi/ApiProvider';

const priorityColors = {
  'Low': 'info',
  'Medium': 'warning',
  'High': 'error',
  'Critical': 'error'
};

const statusColors = {
  'Open': 'error',
  'In Progress': 'warning',
  'Resolved': 'success',
  'Closed': 'default'
};

const SUPPORT_CONTACTS = [
  {
    method: 'Phone',
    value: '+1 (888) 123-4567',
    availability: '24/7 for Critical Issues',
    icon: 'phone'
  },
  {
    method: 'Email',
    value: 'support@rtnglobal.com',
    availability: 'Response within 24 hours',
    icon: 'email'
  },
  {
    method: 'Live Chat',
    value: 'Click to Begin',
    availability: 'Business Hours (9 AM - 6 PM EST)',
    icon: 'chat'
  }
];

const TICKET_MANAGEMENT_TIPS = [
  {
    title: 'Provide Clear Information',
    description: 'Include specific details, error messages, and steps to reproduce issues'
  },
  {
    title: 'Use Appropriate Priority',
    description: 'Select priority level based on business impact and urgency'
  },
  {
    title: 'Check Related Solutions',
    description: 'Review FAQ and knowledge base before submitting new tickets'
  },
  {
    title: 'Keep Track of Updates',
    description: 'Monitor ticket status and respond promptly to support team requests'
  }
];

const FAQ_ITEMS = [
  {
    question: 'What do the different ticket statuses mean?',
    answer: `Open: Your ticket has been submitted and is awaiting review\nIn Progress: Our team is actively working on your issue\nResolved: A solution has been provided\nClosed: The ticket has been completed and verified`
  },
  {
    question: 'How are ticket priorities determined?',
    answer: `Low: Minor issues that don't affect core functionality\nMedium: Issues affecting some features but with workarounds available\nHigh: Significant issues affecting core functionality\nCritical: Urgent issues requiring immediate attention`
  },
  {
    question: 'How long does it take to get a response?',
    answer: 'Response times vary based on ticket priority: Critical (2-4 hours), High (24 hours), Medium (48 hours), Low (3-5 business days)'
  },
  {
    question: 'Can I update my ticket after submission?',
    answer: 'Yes, you can add comments or additional information to your ticket using your ticket number'
  },
  {
    question: 'What happens after my ticket is resolved?',
    answer: 'You will receive a notification and have 48 hours to verify the solution before the ticket is automatically closed'
  }
];


const TicketStatus = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [ticketNumber, setTicketNumber] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticketNumber.trim()) return;

    setLoading(true);
    setError('');
    setTicket(null);
    
    try {
      const response = await API.get(`/api/forms/support/ticket/${ticketNumber}`);
      
      if (response.data.success) {
        setTicket(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch ticket details");
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setError(error.response?.data?.message || 'Failed to retrieve ticket information. Please check the ticket ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await API.post(`/api/support/ticket/${ticket.ticketId}/comment`, {
        comment: comment
      });

      setTicket(response.data);
      setComment('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add comment. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Button
            component={RouterLink}
            to="/support"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Back to Support
          </Button>
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Check Ticket Status
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 4 }}
          >
            Enter your ticket number to track the status of your support request. You can find this number in the confirmation email we sent when you submitted your ticket.
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            mb: 4
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Ticket Number"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
                placeholder="Enter your ticket number (e.g., TKT-123456)"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  height: '56px',
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Check Status'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {ticket && (
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
              mb: 4
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Ticket Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Ticket Number</Typography>
                <Typography variant="h6">{ticket.ticketNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Status</Typography>
                <Chip
                  label={ticket.status}
                  color={statusColors[ticket.status]}
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Priority</Typography>
                <Chip
                  label={ticket.priority}
                  color={priorityColors[ticket.priority]}
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Category</Typography>
                <Typography variant="body1">{ticket.issueCategory}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text.secondary">Subject</Typography>
                <Typography variant="body1">{ticket.subject}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text.secondary">Description</Typography>
                <Typography variant="body1">{ticket.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text.secondary">Submitted On</Typography>
                <Typography variant="body1">
                  {new Date(ticket.createdAt).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Ticket Management Guide
          </Typography>
          <Grid container spacing={2}>
            {TICKET_MANAGEMENT_TIPS.map((tip, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    height: '100%',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tip.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Frequently Asked Questions
          </Typography>
          {FAQ_ITEMS.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                mb: 1
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 ,mb:8 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Need to submit a new support ticket?
          </Typography>
          <Button
            component={RouterLink}
            to="/support/form"
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
              },
            }}
          >
            Create New Ticket
          </Button>
        </Box>
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Support Contact Information
          </Typography>
          <Grid container spacing={3}>
            {SUPPORT_CONTACTS.map((contact, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {contact.method}
                  </Typography>
                  <Typography variant="body1" color="primary" gutterBottom>
                  {contact.value === "Click to Begin" ? (
  <a href="/livechat">{contact.value}</a>
) : (
  contact.value
)}


                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {contact.availability}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
};

export default TicketStatus;