import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Slider,
  useTheme,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

const Calculator = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [formData, setFormData] = useState({
    monthlyBudget: 5000,
    timeframe: 12,
    industry: '',
    currentRevenue: 100000,
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const calculateROI = () => {
    // This is a simplified ROI calculation
    const totalInvestment = formData.monthlyBudget * formData.timeframe;
    const projectedRevenue = formData.currentRevenue * 1.5; // Assuming 50% growth
    const profit = projectedRevenue - formData.currentRevenue - totalInvestment;
    const roi = (profit / totalInvestment) * 100;

    setResults({
      totalInvestment,
      projectedRevenue,
      profit,
      roi
    });
  };

  return (
    <Box
      py={12}
      sx={{
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.2,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
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
          ROI Calculator
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Calculate your potential return on investment with our digital marketing services
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                background: isDark
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Input Your Details
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Typography gutterBottom>Monthly Marketing Budget ($)</Typography>
                  <Slider
                    value={formData.monthlyBudget}
                    onChange={handleSliderChange('monthlyBudget')}
                    min={1000}
                    max={50000}
                    step={1000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    name="monthlyBudget"
                    value={formData.monthlyBudget}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                  />

                  <Typography gutterBottom sx={{ mt: 3 }}>Campaign Timeframe (Months)</Typography>
                  <Slider
                    value={formData.timeframe}
                    onChange={handleSliderChange('timeframe')}
                    min={3}
                    max={24}
                    step={1}
                    valueLabelDisplay="auto"
                  />
                  <TextField
                    fullWidth
                    type="number"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    sx={{ mt: 3 }}
                  />

                  <TextField
                    fullWidth
                    label="Current Annual Revenue ($)"
                    type="number"
                    name="currentRevenue"
                    value={formData.currentRevenue}
                    onChange={handleChange}
                    sx={{ mt: 3 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<CalculateIcon />}
                    onClick={calculateROI}
                    sx={{
                      mt: 4,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0, #7b1fa2)'
                      }
                    }}
                  >
                    Calculate ROI
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                background: isDark
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Projected Results
                </Typography>

                {results ? (
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Card
                          sx={{
                            bgcolor: theme.palette.primary.main + '15',
                            p: 3,
                            borderRadius: 2
                          }}
                        >
                          <Typography variant="h4" color="primary" gutterBottom>
                            {results.roi.toFixed(2)}%
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            Projected ROI
                          </Typography>
                        </Card>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider' }}>
                          <Typography variant="h6" gutterBottom>
                            ${results.totalInvestment.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Investment
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider' }}>
                          <Typography variant="h6" gutterBottom>
                            ${results.projectedRevenue.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Projected Revenue
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider' }}>
                          <Typography variant="h6" gutterBottom>
                            ${results.profit.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Projected Profit
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 4, fontStyle: 'italic' }}
                    >
                      * These projections are estimates based on industry averages and historical data.
                      Actual results may vary.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4
                    }}
                  >
                    <Typography color="text.secondary" textAlign="center">
                      Enter your details and click Calculate ROI to see projected results
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Calculator;