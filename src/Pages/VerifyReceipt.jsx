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

  // Define structured data for receipt verification
  const receiptSchema = receipt && receipt.isValid ? {
    "@context": "https://schema.org",
    "@type": "Order",
    "orderNumber": receipt.receiptNumber,
    "orderStatus": "https://schema.org/OrderDelivered",
    "merchant": {
      "@type": "Organization",
      "name": "RTN Global"
    },
    "customer": {
      "@type": "Person",
      "name": receipt.customer
    },
    "orderedItem": {
      "@type": "Service",
      "name": receipt.service,
      "description": `${receipt.duration}-minute consultation`
    },
    "paymentMethodId": "CreditCard",
    "potentialAction": {
      "@type": "DownloadAction",
      "name": "Download Receipt",
      "target": `${process.env.REACT_APP_API_URL}${receipt?.paymentReceiptPath || ''}`
    },
    "paymentDueDate": receipt.paymentDate,
    "totalPaymentDue": {
      "@type": "PriceSpecification",
      "price": receipt.totalAmount,
      "priceCurrency": "USD"
    }
  } : null;
  
  if (loading) {
    return (
      <>
        <SEO
          title="Verifying Payment Receipt | RTN Global"
          description="Verification in progress for your RTN Global payment receipt."
          keywords="payment verification, receipt verification, payment authenticity, RTN Global"
          canonicalUrl={`/verify-receipt/${receiptNumber}`}
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
              color="success" 
              aria-label="Verifying payment receipt"
            />
            <Typography variant="h5" component="h1" gutterBottom>
              Verifying Receipt
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please wait while we verify the payment receipt...
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }
  
  if (error || !receipt || !receipt.isValid) {
    return (
      <>
        <SEO
          title="Invalid Receipt | RTN Global"
          description="The payment receipt could not be verified or is invalid."
          keywords="invalid receipt, verification failed, receipt error, RTN Global"
          canonicalUrl={`/verify-receipt/${receiptNumber}`}
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
              Invalid Receipt
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {error || "The receipt number provided is invalid or could not be verified."}
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
        title={`Receipt #${receipt.receiptNumber} Verified | RTN Global`}
        description="Your RTN Global payment receipt has been successfully verified and is authentic."
        keywords="verified receipt, authentic payment, receipt verification, RTN Global, payment confirmation"
        canonicalUrl={`/verify-receipt/${receiptNumber}`}
        ogType="website"
        schema={receiptSchema}
      />
      <Container component="main" maxWidth="md" sx={{ py: 5 }}>
        <Paper 
          elevation={3} 
          sx={{ p: 4 }}
          component="section"
          aria-labelledby="receipt-verification-heading"
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
              id="receipt-verification-heading"
            >
              Payment Verified
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This payment receipt is authentic and has been issued by RTN Global
            </Typography>
          </Box>
          
          <Paper 
            variant="outlined" 
            sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}
            component="article"
            aria-labelledby="receipt-details-heading"
          >
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Grid item>
                <Typography 
                  variant="h6"
                  component="h2"
                  id="receipt-details-heading"
                >
                  Receipt #{receipt.receiptNumber}
                </Typography>
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
                {receipt.customer}
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
            
            <List 
              disablePadding
              aria-label="Receipt amount details"
            >
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
              startIcon={<ArrowBackIcon aria-hidden="true" />} 
              variant="text"
              aria-label="Return to homepage"
            >
              Return to homepage
            </Button>
            <Button 
              startIcon={<PdfIcon aria-hidden="true" />} 
              variant="contained" 
              color="success" 
              onClick={() => {
                window.open(`${process.env.REACT_APP_API_URL}${receipt.paymentReceiptPath}`, '_blank');
              }}
              aria-label="Download receipt as PDF"
              rel="noopener noreferrer"
            >
              Download Receipt
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default VerifyReceipt; 