import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const UserSupportTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [newTicket, setNewTicket] = useState({
    issueCategory: '',
    priority: '',
    subject: '',
    description: ''
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/support-tickets`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTickets(data);
      } else {
        setMessage({ type: 'error', text: data.message || 'Error fetching tickets' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching tickets' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/support/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...newTicket,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email
        })
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Ticket created successfully' });
        setOpenDialog(false);
        fetchTickets();
        setNewTicket({
          issueCategory: '',
          priority: '',
          subject: '',
          description: ''
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error creating ticket' });
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': 'info',
      'Medium': 'warning',
      'High': 'error',
      'Critical': 'error'
    };
    return colors[priority] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'error',
      'In Progress': 'warning',
      'Resolved': 'success',
      'Closed': 'default'
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
          Support Tickets
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{
            borderRadius: 2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 3
            }
          }}
        >
          Create New Ticket
        </Button>
      </Box>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <TableContainer 
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 3,
            transition: 'box-shadow 0.3s ease-in-out'
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Ticket Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow 
                  key={ticket._id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transition: 'background-color 0.3s ease-in-out'
                    }
                  }}
                >
                  <TableCell>{ticket.ticketNumber}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.issueCategory}</TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.priority}
                      color={getPriorityColor(ticket.priority)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.status}
                      color={getStatusColor(ticket.status)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Create New Support Ticket</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                label="Issue Category"
                value={newTicket.issueCategory}
                onChange={(e) => setNewTicket({ ...newTicket, issueCategory: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              >
                <MenuItem value="Technical">Technical</MenuItem>
                <MenuItem value="Billing">Billing</MenuItem>
                <MenuItem value="Account">Account</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                select
                label="Priority"
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>

              <TextField
                label="Subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />

              <TextField
                label="Description"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                multiline
                rows={4}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={() => setOpenDialog(false)}
              sx={{ borderRadius: 1 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{
                borderRadius: 1,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: 2
                }
              }}
            >
              Create Ticket
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default UserSupportTickets;