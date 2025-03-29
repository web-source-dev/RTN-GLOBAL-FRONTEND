import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  TextField,
  Autocomplete,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Tooltip
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../BackendAPi/ApiProvider';

const ChatParticipantsManager = ({ roomId, open, onClose, onParticipantsUpdated }) => {
  const { user } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (open && roomId) {
      fetchParticipants();
      if (user?.role === 'admin') {
        fetchAllUsers();
      }
    }
  }, [open, roomId]);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/api/global/chat/room/${roomId}/participants`);
      setParticipants(response.data);
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError('Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await API.get('/api/global/chat/users');
      // Filter out users who are already participants
      setAllUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAddParticipants = async () => {
    if (!selectedUsers.length) return;
    
    try {
      setLoading(true);
      const participantIds = selectedUsers.map(user => user._id);
      
      await API.post(`/api/global/chat/room/${roomId}/participants`, {
        participants: participantIds
      });
      
      // Reset and refresh
      setSelectedUsers([]);
      fetchParticipants();
      setSuccessMessage('Participants added successfully');
      
      // Notify parent component
      if (onParticipantsUpdated) {
        onParticipantsUpdated();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error adding participants:', err);
      setError(err.response?.data?.message || 'Failed to add participants');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveParticipant = async (participantId) => {
    try {
      setLoading(true);
      
      await API.delete(`/api/global/chat/room/${roomId}/participants/${participantId}`);
      
      // Refresh participants list
      fetchParticipants();
      setSuccessMessage('Participant removed successfully');
      
      // Notify parent component
      if (onParticipantsUpdated) {
        onParticipantsUpdated();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error removing participant:', err);
      setError(err.response?.data?.message || 'Failed to remove participant');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // Filter all users to exclude current participants
  const availableUsers = allUsers.filter(u => 
    !participants.some(p => p.user._id === u._id) && u._id !== user?._id
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GroupIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Manage Chat Participants</Typography>
          </Box>
          <IconButton edge="end" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        
        {user?.role === 'admin' && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Add New Participants
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Autocomplete
                multiple
                id="add-participants"
                options={availableUsers}
                loading={loadingUsers}
                value={selectedUsers}
                onChange={(event, newValue) => setSelectedUsers(newValue)}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName || ''}`}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={option.avatar} 
                        alt={option.firstName}
                        sx={{ width: 24, height: 24, mr: 1 }}
                      >
                        {option.firstName.charAt(0)}
                      </Avatar>
                      <Typography>
                        {option.firstName} {option.lastName}
                        {option.role && (
                          <Typography component="span" variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                            ({option.role})
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  </li>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      avatar={
                        <Avatar src={option.avatar} alt={option.firstName}>
                          {option.firstName.charAt(0)}
                        </Avatar>
                      }
                      label={`${option.firstName} ${option.lastName || ''}`}
                      {...getTagProps({ index })}
                      size="small"
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select users to add"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingUsers ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
                sx={{ flexGrow: 1 }}
              />
              
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddParticipants}
                disabled={selectedUsers.length === 0 || loading}
                startIcon={<PersonAddIcon />}
              >
                Add
              </Button>
            </Box>
          </Box>
        )}
        
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Current Participants ({participants.length})
        </Typography>
        
        {loading && participants.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : participants.length === 0 ? (
          <Typography color="text.secondary" sx={{ my: 2, textAlign: 'center' }}>
            No participants found
          </Typography>
        ) : (
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {participants.map((participant) => (
              <ListItem key={participant.user._id} divider>
                <ListItemAvatar>
                  <Avatar src={participant.user.avatar}>
                    {participant.user.firstName?.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${participant.user.firstName} ${participant.user.lastName || ''}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {participant.role}
                      </Typography>
                      {participant.user.email && ` — ${participant.user.email}`}
                    </React.Fragment>
                  }
                />
                
                {user?.role === 'admin' && participant.user._id !== user._id && participant.role !== 'admin' && (
                  <ListItemSecondaryAction>
                    <Tooltip title="Remove participant">
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleRemoveParticipant(participant.user._id)}
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatParticipantsManager; 