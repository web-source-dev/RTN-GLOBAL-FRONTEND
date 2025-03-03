import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const ManageConsultation = () => {
  const [consultations, setConsultations] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/consultations`);
      setConsultations(response.data);
    } catch (error) {
      console.error('Failed to fetch consultations', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/consultations/${id}`, { status: newStatus });
      fetchConsultations();
    } catch (error) {
      console.error('Failed to update consultation status', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'success',
      completed: 'primary',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  const filteredConsultations = consultations.filter((consultation) =>
    filter === 'all' ? true : consultation.status === filter
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Manage Consultation Requests
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="all">All Requests</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConsultations.map((consultation) => (
              <TableRow key={consultation._id}>
                <TableCell>{`${consultation.firstName} ${consultation.lastName}`}</TableCell>
                <TableCell>{consultation.email}</TableCell>
                <TableCell>{consultation.companyName || '-'}</TableCell>
                <TableCell>{consultation.consultationType}</TableCell>
                <TableCell>{new Date(consultation.preferredDate).toLocaleDateString()}</TableCell>
                <TableCell>{consultation.preferredTime}</TableCell>
                <TableCell>
                  <Chip label={consultation.status} color={getStatusColor(consultation.status)} />
                </TableCell>
                <TableCell>
                  {consultation.status === 'pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleStatusUpdate(consultation._id, 'confirmed')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleStatusUpdate(consultation._id, 'cancelled')}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {consultation.status === 'confirmed' && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleStatusUpdate(consultation._id, 'completed')}
                    >
                      Mark Complete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {filteredConsultations.length === 0 && (
        <Typography align="center" sx={{ py: 2, color: 'text.secondary' }}>
          No consultation requests found
        </Typography>
      )}
    </Container>
  );
};

export default ManageConsultation;
