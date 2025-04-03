import React, { useState, useEffect } from 'react';
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Tooltip,
  Avatar,
  Chip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import SupportIcon from '@mui/icons-material/Support';
import EmailIcon from '@mui/icons-material/Email';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoneyIcon from '@mui/icons-material/Money';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BuildIcon from '@mui/icons-material/Build';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { format } from 'date-fns';
import API from '../../BackendAPi/ApiProvider';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/user/notifications');
      setNotifications(response.data);
      setUnreadCount(response.data.filter(notification => !notification.read).length);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyPress = (event, callback) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await API.patch(`/api/user/notifications/${notificationId}/read`);
      
      // Update the notifications state
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      ));
      
      // Update unread count
      setUnreadCount(prevCount => Math.max(0, prevCount - 1));
      
      // Handle notification link if it exists
      const notification = notifications.find(n => n.id === notificationId);
      if (notification && notification.link) {
        window.location.href = notification.link;
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.patch('/api/user/notifications/read-all');
      
      // Update all notifications to read
      setNotifications(notifications.map(notification => ({ ...notification, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const getNotificationIcon = (notification) => {
    const { type } = notification;
    
    // Handle order-specific notification types
    if (notification.metadata && notification.metadata.orderId) {
      // This is likely an order notification
      if (type === 'success') {
        return <CheckCircleIcon color="success" aria-hidden="true" />;
      } else if (type === 'warning') {
        return <WarningIcon color="warning" aria-hidden="true" />;
      } else if (type === 'error') {
        return <ErrorIcon color="error" aria-hidden="true" />;
      }
      
      // Check for specific order notification scenarios based on title
      const title = notification.title.toLowerCase();
      if (title.includes('payment')) {
        return <MoneyIcon color="success" aria-hidden="true" />;
      } else if (title.includes('review')) {
        return <RateReviewIcon color="primary" aria-hidden="true" />;
      } else if (title.includes('revision')) {
        return <BuildIcon color="warning" aria-hidden="true" />;
      } else if (title.includes('offer')) {
        return <ShoppingCartIcon color="primary" aria-hidden="true" />;
      } else if (title.includes('status')) {
        return <InfoIcon color="info" aria-hidden="true" />;
      } else if (title.includes('tip')) {
        return <MoneyIcon color="success" aria-hidden="true" />;
      } else if (title.includes('invoice') || title.includes('receipt')) {
        return <ReceiptIcon color="primary" aria-hidden="true" />;
      }
      
      // Default icon for orders
      return <ShoppingCartIcon color="primary" aria-hidden="true" />;
    }
    
    // Handle standard notification types
    switch (type) {
      case 'system':
        return <InfoIcon color="info" aria-hidden="true" />;
      case 'support':
        return <SupportIcon color="warning" aria-hidden="true" />;
      case 'message':
        return <EmailIcon color="primary" aria-hidden="true" />;
      case 'consultation':
        return <EventNoteIcon color="success" aria-hidden="true" />;
      case 'info':
        return <InfoIcon color="info" aria-hidden="true" />;
      case 'success':
        return <CheckCircleIcon color="success" aria-hidden="true" />;
      case 'warning':
        return <WarningIcon color="warning" aria-hidden="true" />;
      case 'error':
        return <ErrorIcon color="error" aria-hidden="true" />;
      default:
        return <InfoIcon aria-hidden="true" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const renderNotificationContent = (notification) => (
    <ListItem
      alignItems="flex-start"
      sx={{
        backgroundColor: notification.read ? 'inherit' : 'action.hover',
        '&:hover': { backgroundColor: 'action.selected' },
        cursor: 'pointer'
      }}
      onClick={() => markAsRead(notification.id)}
      onKeyDown={(e) => handleKeyPress(e, () => markAsRead(notification.id))}
      tabIndex={0}
      role="button"
      aria-label={`${notification.read ? 'Read' : 'Unread'} notification: ${notification.title}`}
    >
      <ListItemIcon>
        {getNotificationIcon(notification)}
      </ListItemIcon>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" component="div" id={`notification-title-${notification.id}`}>
              {notification.title}
            </Typography>
            {notification.priority && (
              <Chip 
                label={notification.priority} 
                size="small" 
                color={getPriorityColor(notification.priority)}
                sx={{ height: 20, fontSize: '0.7rem' }}
                aria-label={`Priority: ${notification.priority}`}
              />
            )}
          </Box>
        }
        secondary={
          <React.Fragment>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              component="div"
              id={`notification-message-${notification.id}`}
            >
              {notification.message}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              component="time"
              dateTime={new Date(notification.createdAt).toISOString()}
            >
              {format(new Date(notification.createdAt), 'MMM d, yyyy HH:mm')}
            </Typography>
          </React.Fragment>
        }
        aria-labelledby={`notification-title-${notification.id}`}
        aria-describedby={`notification-message-${notification.id}`}
      />
    </ListItem>
  );

  return (
    <Box component="div" role="region" aria-label="Notifications">
      <Tooltip title="Notifications">
        <IconButton 
          color="inherit" 
          onClick={handleNotificationClick}
          aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : '(no unread)'}`}
          aria-haspopup="menu"
          aria-expanded={Boolean(anchorEl)}
          aria-controls={anchorEl ? "notifications-menu" : undefined}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: 360,
            maxHeight: 500,
            '& .MuiList-root': {
              padding: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        aria-labelledby="notifications-title"
      >
        <Box 
          sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}
          component="div"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" id="notifications-title">Notifications</Typography>
            {unreadCount > 0 && (
              <Tooltip title="Mark all as read">
                <IconButton 
                  size="small" 
                  onClick={markAllAsRead}
                  aria-label="Mark all notifications as read"
                >
                  <DoneAllIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {loading ? (
          <Box 
            sx={{ p: 2, display: 'flex', justifyContent: 'center' }}
            role="status"
            aria-live="polite"
          >
            <CircularProgress size={20} aria-label="Loading notifications" />
          </Box>
        ) : error ? (
          <Box 
            sx={{ p: 2 }}
            role="alert"
          >
            <Typography color="error">{error}</Typography>
          </Box>
        ) : notifications.length === 0 ? (
          <Box 
            sx={{ p: 2 }}
            aria-live="polite"
          >
            <Typography color="text.secondary">No notifications</Typography>
          </Box>
        ) : (
          <List 
            sx={{ p: 0, maxHeight: 400, overflowY: 'auto' }}
            aria-label="Notification list"
            role="list"
          >
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                {index > 0 && <Divider role="separator" />}
                {renderNotificationContent(notification)}
              </React.Fragment>
            ))}
          </List>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationComponent;