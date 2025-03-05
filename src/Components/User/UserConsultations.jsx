import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const UserConsultations = () => {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/consultations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setConsultations(data);
      } else {
        setMessage({ type: 'error', text: data.message || 'Error fetching consultations' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching consultations' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
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
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium' }}>
        My Consultations
      </Typography>
      
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
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No consultations found
                </TableCell>
              </TableRow>
            ) : (
              consultations.map((consultation) => (
                <TableRow 
                  key={consultation.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transition: 'background-color 0.3s ease-in-out'
                    }
                  }}
                ><TableCell>
                {new Date(consultation.preferredDate).toLocaleString('en-US', {
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                })}
              </TableCell>
              

                  <TableCell>{consultation.preferredTime}</TableCell>
                  <TableCell>{consultation.consultationType}</TableCell>
                  <TableCell>
                    <Chip
                      label={consultation.status}
                      color={getStatusColor(consultation.status)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details" arrow>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/user/consultations/${consultation._id}`)}
                        sx={{
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'primary.lighter'
                          }
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserConsultations;