import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  CircularProgress, 
  Container, 
  Divider, 
  Grid, 
  Chip, 
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  PictureAsPdf as PdfIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import API from '../BackendAPi/ApiProvider';

const VerifyReceipt = () => {
  const { receiptNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);
  
  useEffect(() => {
    const verifyReceipt = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/api/user/verify-receipt/${receiptNumber}`);
        setReceipt(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to verify receipt');
        setLoading(false);
      }
    };
    
    verifyReceipt();
  }, [receiptNumber]);
  
  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', width: '100%' }}>
          <CircularProgress sx={{ mb: 2 }} color="success" />
          <Typography variant="h5" gutterBottom>Verifying Receipt</Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we verify the payment receipt...
          </Typography>
        </Paper>
      </Container>
    );
  }
  
  if (error || !receipt || !receipt.isValid) {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', width: '100%' }}>
          <Avatar sx={{ bgcolor: '#FFEBEE', mb: 2, mx: 'auto', width: 60, height: 60 }}>
            <CloseIcon color="error" fontSize="large" />
          </Avatar>
          <Typography variant="h5" gutterBottom>Invalid Receipt</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {error || "The receipt number provided is invalid or could not be verified."}
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            startIcon={<ArrowBackIcon />} 
            variant="text" 
            color="primary"
          >
            Return to homepage
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ bgcolor: '#E8F5E9', mb: 2, mx: 'auto', width: 60, height: 60 }}>
            <CheckIcon color="success" fontSize="large" />
          </Avatar>
          <Typography variant="h4" gutterBottom>Payment Verified</Typography>
          <Typography variant="body1" color="text.secondary">
            This payment receipt is authentic and has been issued by RTN Global
          </Typography>
        </Box>
        
        <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Grid item>
              <Typography variant="h6">Receipt #{receipt.receiptNumber}</Typography>
              <Typography variant="body2" color="text.secondary">
                Payment Date: {receipt.paymentDate}
              </Typography>
            </Grid>
            <Grid item>
              <Chip 
                label="Paid" 
                color="success" 
                size="small" 
                variant="outlined"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" gutterBottom>
              CUSTOMER
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {receipt.customer}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" gutterBottom>
              SERVICE DETAILS
            </Typography>
            <Typography variant="body1">
              {receipt.service}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: {receipt.duration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {receipt.consultationDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time: {receipt.consultationTime}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Base Price" />
              <Typography variant="body2">${receipt.basePrice}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Tax (10%)" />
              <Typography variant="body2">${receipt.tax}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary={<Typography variant="subtitle1">Total Paid</Typography>} />
              <Typography variant="subtitle1" color="success.main">${receipt.totalAmount}</Typography>
            </ListItem>
          </List>
        </Paper>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            component={Link} 
            to="/" 
            startIcon={<ArrowBackIcon />} 
            variant="text"
          >
            Return to homepage
          </Button>
          <Button 
            startIcon={<PdfIcon />} 
            variant="contained" 
            color="success" 
            onClick={() => {
              window.open(`${process.env.REACT_APP_API_URL}${receipt.paymentReceiptPath}`, '_blank');
            }}
          >
            Download Receipt
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyReceipt; 