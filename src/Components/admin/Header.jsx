import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Box,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={7} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={user?.avatar}
            alt={user?.firstName}
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Administrator
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 