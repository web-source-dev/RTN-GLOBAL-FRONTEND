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
import SEO from '../Components/common/SEO';

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

  // Define structured data for invoice verification
  const invoiceSchema = invoice && invoice.isValid ? {
    "@context": "https://schema.org",
    "@type": "Invoice",
    "identifier": invoice.invoiceNumber,
    "confirmationNumber": invoice.invoiceNumber,
    "provider": {
      "@type": "Organization",
      "name": "RTN Global"
    },
    "broker": {
      "@type": "Organization",
      "name": "RTN Global"
    },
    "customer": {
      "@type": "Person",
      "name": invoice.customer
    },
    "paymentStatus": invoice.paymentStatus,
    "totalPaymentDue": {
      "@type": "PriceSpecification",
      "price": invoice.totalAmount,
      "priceCurrency": "USD"
    },
    "paymentDueDate": invoice.invoiceDate
  } : null;
  
  if (loading) {
    return (
      <>
        <SEO
          title="Verifying Invoice | RTN Global"
          description="Verification in progress for your RTN Global invoice."
          keywords="invoice verification, payment verification, invoice authenticity, RTN Global"
          canonicalUrl={`/verify-invoice/${invoiceNumber}`}
          ogType="website"
        />
        <Container 
          component="main" 
          maxWidth="sm" 
          sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Paper 
            elevation={3} 
            sx={{ p: 4, textAlign: 'center', width: '100%' }}
            role="status"
            aria-live="polite"
          >
            <CircularProgress 
              sx={{ mb: 2 }} 
              aria-label="Verifying invoice"
            />
            <Typography variant="h5" component="h1" gutterBottom>
              Verifying Invoice
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please wait while we verify the invoice...
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }
  
  if (error || !invoice || !invoice.isValid) {
    return (
      <>
        <SEO
          title="Invalid Invoice | RTN Global"
          description="The invoice could not be verified or is invalid."
          keywords="invalid invoice, verification failed, invoice error, RTN Global"
          canonicalUrl={`/verify-invoice/${invoiceNumber}`}
          ogType="website"
        />
        <Container 
          component="main" 
          maxWidth="sm" 
          sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Paper 
            elevation={3} 
            sx={{ p: 4, textAlign: 'center', width: '100%' }}
            role="alert"
          >
            <Avatar 
              sx={{ bgcolor: '#FFEBEE', mb: 2, mx: 'auto', width: 60, height: 60 }}
              aria-hidden="true"
            >
              <CloseIcon color="error" fontSize="large" />
            </Avatar>
            <Typography variant="h5" component="h1" gutterBottom>
              Invalid Invoice
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {error || "The invoice number provided is invalid or could not be verified."}
            </Typography>
            <Button 
              component={Link} 
              to="/" 
              startIcon={<ArrowBackIcon aria-hidden="true" />} 
              variant="text" 
              color="primary"
              aria-label="Return to homepage"
            >
              Return to homepage
            </Button>
          </Paper>
        </Container>
      </>
    );
  }
  
  return (
    <>
      <SEO
        title={`Invoice #${invoice.invoiceNumber} Verified | RTN Global`}
        description="Your RTN Global invoice has been successfully verified and is authentic."
        keywords="verified invoice, authentic invoice, invoice verification, RTN Global, payment confirmation"
        canonicalUrl={`/verify-invoice/${invoiceNumber}`}
        ogType="website"
        schema={invoiceSchema}
      />
      <Container component="main" maxWidth="md" sx={{ py: 5 }}>
        <Paper 
          elevation={3} 
          sx={{ p: 4 }}
          component="section"
          aria-labelledby="invoice-verification-heading"
        >
          <Box 
            sx={{ textAlign: 'center', mb: 4 }}
            role="status"
            aria-live="polite"
          >
            <Avatar 
              sx={{ bgcolor: '#E8F5E9', mb: 2, mx: 'auto', width: 60, height: 60 }}
              aria-hidden="true"
            >
              <CheckIcon color="success" fontSize="large" />
            </Avatar>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              id="invoice-verification-heading"
            >
              Invoice Verified
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This invoice is authentic and has been issued by RTN Global
            </Typography>
          </Box>
          
          <Paper 
            variant="outlined" 
            sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}
            component="article"
            aria-labelledby="invoice-details-heading"
          >
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Grid item>
                <Typography 
                  variant="h6"
                  component="h2"
                  id="invoice-details-heading"
                >
                  Invoice #{invoice.invoiceNumber}
                </Typography>
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
                  role="status"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="overline" 
                color="text.secondary" 
                component="h3"
                gutterBottom
              >
                CUSTOMER
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {invoice.customer}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="overline" 
                color="text.secondary" 
                component="h3"
                gutterBottom
              >
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
            
            <List 
              disablePadding
              aria-label="Invoice amounts"
            >
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
              startIcon={<ArrowBackIcon aria-hidden="true" />} 
              variant="text"
              aria-label="Return to homepage"
            >
              Return to homepage
            </Button>
            <Button 
              startIcon={<PdfIcon aria-hidden="true" />} 
              variant="contained" 
              onClick={() => {
                window.open(`${process.env.REACT_APP_API_URL}${invoice.invoicePath}`, '_blank');
              }}
              aria-label="Download invoice as PDF"
            >
              Download PDF
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default VerifyInvoice; 