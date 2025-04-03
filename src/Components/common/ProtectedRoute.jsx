import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        role="status"
        aria-live="polite"
        aria-busy="true"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <CircularProgress
          size={40}
          aria-label="Loading authentication status"
          sx={{ mb: 2 }}
        />
        <Typography variant="h6" component="p">
          Verifying authentication...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/blog" />;
  }

  return children;
}; 