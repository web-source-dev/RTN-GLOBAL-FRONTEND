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

const VerifyInvoice = () => {
  const { invoiceNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);
  
  useEffect(() => {
    const verifyInvoice = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/api/user/verify-invoice/${invoiceNumber}`);
        setInvoice(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to verify invoice');
        setLoading(false);
      }
    };
    
    verifyInvoice();
  }, [invoiceNumber]);
  
  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', width: '100%' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h5" gutterBottom>Verifying Invoice</Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we verify the invoice...
          </Typography>
        </Paper>
      </Container>
    );
  }
  
  if (error || !invoice || !invoice.isValid) {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', width: '100%' }}>
          <Avatar sx={{ bgcolor: '#FFEBEE', mb: 2, mx: 'auto', width: 60, height: 60 }}>
            <CloseIcon color="error" fontSize="large" />
          </Avatar>
          <Typography variant="h5" gutterBottom>Invalid Invoice</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {error || "The invoice number provided is invalid or could not be verified."}
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
          <Typography variant="h4" gutterBottom>Invoice Verified</Typography>
          <Typography variant="body1" color="text.secondary">
            This invoice is authentic and has been issued by RTN Global
          </Typography>
        </Box>
        
        <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Grid item>
              <Typography variant="h6">Invoice #{invoice.invoiceNumber}</Typography>
              <Typography variant="body2" color="text.secondary">
                Issued: {invoice.invoiceDate}
              </Typography>
            </Grid>
            <Grid item>
              <Chip 
                label={invoice.paymentStatus === 'paid' ? 'Paid' : 'Pending'} 
                color={invoice.paymentStatus === 'paid' ? 'success' : 'warning'} 
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
              {invoice.customer}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" gutterBottom>
              SERVICE DETAILS
            </Typography>
            <Typography variant="body1">
              {invoice.service}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: {invoice.duration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {invoice.consultationDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time: {invoice.consultationTime}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Base Price" />
              <Typography variant="body2">${invoice.basePrice}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Tax (10%)" />
              <Typography variant="body2">${invoice.tax}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary={<Typography variant="subtitle1">Total</Typography>} />
              <Typography variant="subtitle1">${invoice.totalAmount}</Typography>
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
            onClick={() => {
              window.open(`${process.env.REACT_APP_API_URL}${invoice.invoicePath}`, '_blank');
            }}
          >
            Download PDF
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyInvoice; 