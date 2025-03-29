import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  IconButton, 
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions,
  Badge,
  Tooltip,
  useMediaQuery,
  alpha
} from '@mui/material';
import { 
  Add as AddIcon, 
  Chat as ChatIcon, 
  Public as PublicIcon, 
  Group as GroupIcon, 
  Person as PersonIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  ForumRounded as ForumIcon,
  Groups as CommunityIcon,
  AccessTime as RecentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../BackendAPi/ApiProvider';

const ChatRoomsList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  
  const [newRoom, setNewRoom] = useState({
    name: '',
    description: '',
    type: 'group',
    participants: []
  });
  const [formError, setFormError] = useState('');
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/global/chat/rooms');
      setRooms(response.data);
    } catch (err) {
      console.error('Error fetching chat rooms:', err);
      setError('Failed to load chat rooms');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (newRoom.type !== 'private') return;
    
    try {
      setLoadingUsers(true);
      const response = await API.get('/api/global/chat/users');
      setUsers(response.data.filter(u => u._id !== user?._id)); // Exclude current user
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (openDialog && isAdmin) {
      fetchUsers();
    }
  }, [openDialog, newRoom.type, isAdmin]);

  const handleCreateRoom = async () => {
    // Validate form
    if (!newRoom.name.trim()) {
      setFormError('Room name is required');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare participants data for API
      let roomData = { ...newRoom };
      
      if (newRoom.type === 'private' && selectedUsers.length > 0) {
        roomData.participants = selectedUsers.map(user => user._id);
      }
      
      const response = await API.post('/api/global/chat/rooms', roomData);
      setRooms(prev => [...prev, response.data]);
      setOpenDialog(false);
      setNewRoom({ name: '', description: '', type: 'group', participants: [] });
      setSelectedUsers([]);
      setFormError('');
    } catch (err) {
      console.error('Error creating chat room:', err);
      setFormError(err.response?.data?.message || 'Failed to create chat room');
    } finally {
      setLoading(false);
    }
  };

  const getRoomIcon = (type) => {
    switch (type) {
      case 'global':
        return <PublicIcon />;
      case 'group':
        return <GroupIcon />;
      case 'private':
        return <PersonIcon />;
      default:
        return <ChatIcon />;
    }
  };

  const handleOpenRoom = (roomId) => {
    navigate(`/chat/room/${roomId}`);
  };

  const getRoomTypeLabel = (type) => {
    switch (type) {
      case 'global':
        return 'Global';
      case 'group':
        return 'Group';
      case 'private':
        return 'Private';
      default:
        return type;
    }
  };

  const getRoomTypeColor = (type) => {
    switch (type) {
      case 'global':
        return 'primary';
      case 'group':
        return 'success';
      case 'private':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleRoomTypeChange = (event) => {
    const type = event.target.value;
    setNewRoom({...newRoom, type});
    
    // Reset selected users if not private
    if (type !== 'private') {
      setSelectedUsers([]);
    }
  };

  // Filter rooms based on search only
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Filter by search query
      return searchQuery === '' || 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (room.description && room.description.toLowerCase().includes(searchQuery.toLowerCase()));
    });
  }, [rooms, searchQuery]);

  // Sort rooms: most recent activity first
  const sortedRooms = useMemo(() => {
    return [...filteredRooms].sort((a, b) => {
      // Use lastActivity or createdAt for sorting
      const aDate = a.lastActivity ? new Date(a.lastActivity) : new Date(a.createdAt);
      const bDate = b.lastActivity ? new Date(b.lastActivity) : new Date(b.createdAt);
      return bDate - aDate;
    });
  }, [filteredRooms]);

  // Community stats
  const communityStats = useMemo(() => {
    return {
      totalRooms: rooms.length,
      globalRooms: rooms.filter(r => r.type === 'global').length,
      groupRooms: rooms.filter(r => r.type === 'group').length,
      privateRooms: rooms.filter(r => r.type === 'private').length,
    };
  }, [rooms]);

  // Get time difference in friendly format
  const getTimeDifference = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return diffMins <= 1 ? 'just now' : `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return past.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.mode === 'dark' 
        ? alpha(theme.palette.background.default, 0.9) 
        : alpha(theme.palette.grey[50], 0.8),
      minHeight: '100vh',
      pb: 6
    }}>
      {/* Community Header */}
      <Box 
        sx={{
          pt: 5,
          pb: 4,
          mb: 4,
          backgroundImage: `linear-gradient(to bottom, ${
            theme.palette.mode === 'dark' 
              ? alpha(theme.palette.primary.dark, 0.8) 
              : alpha(theme.palette.primary.light, 0.2)
          }, transparent)`,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 3
          }}>
            <Box 
              sx={{ 
                width: { xs: 80, md: 100 }, 
                height: { xs: 80, md: 100 }, 
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: theme.palette.mode === 'dark' 
                  ? `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}` 
                  : `0 10px 20px ${alpha(theme.palette.primary.main, 0.15)}`
              }}
            >
              <ForumIcon sx={{ fontSize: { xs: 40, md: 50 }, color: 'primary.main' }} />
            </Box>

            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: theme.palette.mode === 'dark' ? 'transparent' : undefined,
                  letterSpacing: '-0.025em'
                }}
              >
                Community Spaces
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ 
                  fontWeight: 400,
                  maxWidth: '800px',
                  mb: 2,
                  opacity: 0.9
                }}
              >
                Join conversations, collaborate with others, and build connections in our diverse
                chat spaces {isAdmin && "or create new communities as an administrator"}.
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                gap: 3, 
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' },
                mt: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    icon={<CommunityIcon />} 
                    label={`${communityStats.totalRooms} Spaces`} 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    icon={<PublicIcon />} 
                    label={`${communityStats.globalRooms} Global`} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    icon={<GroupIcon />} 
                    label={`${communityStats.groupRooms} Groups`} 
                    color="success" 
                    variant="outlined" 
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    icon={<PersonIcon />} 
                    label={`${communityStats.privateRooms} Private`} 
                    color="secondary" 
                    variant="outlined" 
                    size="small"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' }, 
          mb: 4,
          gap: 2
        }}>
          <TextField
            placeholder="Search communities..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ 
              flexGrow: 1, 
              maxWidth: { sm: '500px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                pr: 1,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.background.paper, 0.5) 
                  : alpha(theme.palette.background.paper, 0.9),
                '&:hover': {
                  backgroundColor: theme.palette.background.paper,
                }
              }
            }}
          />
          
          {isAdmin && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              disabled={loading}
              sx={{ 
                borderRadius: '50px',
                px: 3,
                py: 1,
                boxShadow: 2,
                fontWeight: 600
              }}
            >
              Create Community
            </Button>
          )}
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 3,
            mb: 4,
            overflow: 'hidden',
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.7) 
              : alpha(theme.palette.background.paper, 0.8),
            backgroundImage: theme.palette.mode === 'dark'
              ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.03))'
              : 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85))'
          }}
        >
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              All Communities
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                {sortedRooms.length} {sortedRooms.length === 1 ? 'community' : 'communities'} found
              </Typography>
              
              <Chip 
                icon={<RecentIcon fontSize="small" />} 
                label="Recent Activity" 
                size="small" 
                color="default" 
                variant="outlined"
                sx={{ borderRadius: '50px' }}
              />
            </Box>
          </Box>
        </Paper>

        {loading && rooms.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column',
            my: 8,
            py: 6
          }}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" sx={{ mt: 4, color: 'text.secondary' }}>
              Loading communities...
            </Typography>
          </Box>
        ) : sortedRooms.length === 0 ? (
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: 4,
              backgroundColor: theme.palette.mode === 'dark' 
                ? alpha(theme.palette.background.paper, 0.6) 
                : alpha(theme.palette.background.paper, 0.8),
              border: 1,
              borderColor: theme.palette.divider,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          >
            <Box 
              sx={{ 
                width: 100, 
                height: 100, 
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}
            >
              <ForumIcon sx={{ fontSize: 50, color: 'primary.main', opacity: 0.8 }} />
            </Box>
            
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              {searchQuery ? 'No communities found' : 'No communities available yet'}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 500, mx: 'auto' }}>
              {searchQuery 
                ? 'Try a different search term or clear your search'
                : isAdmin 
                  ? 'As an administrator, you can create a new community to start conversations with others'
                  : 'Communities will appear here once they are created by administrators'
              }
            </Typography>
            
            {!searchQuery && isAdmin && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                size="large"
                sx={{ borderRadius: 50, px: 3, py: 1, fontWeight: 600 }}
              >
                Create First Community
              </Button>
            )}
            
            {searchQuery && (
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={() => setSearchQuery('')}
                size="large"
                sx={{ mt: 1, borderRadius: 50, px: 3 }}
              >
                Clear Search
              </Button>
            )}
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {sortedRooms.map((room) => (
              <Grid item xs={12} sm={6} md={4} key={room._id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.palette.mode === 'dark' 
                        ? `0 12px 28px ${alpha(theme.palette.common.black, 0.4)}`
                        : '0 12px 28px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer'
                    },
                    borderRadius: 3,
                    overflow: 'hidden',
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.background.paper, 0.7) 
                      : alpha(theme.palette.background.paper, 0.9),
                    backgroundImage: theme.palette.mode === 'dark'
                      ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
                      : 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85))'
                  }}
                  onClick={() => handleOpenRoom(room._id)}
                >
                  {/* Room type banner */}
                  <Box sx={{ 
                    height: 6, 
                    bgcolor: room.type === 'global' 
                      ? 'primary.main' 
                      : room.type === 'private' 
                      ? 'secondary.main' 
                      : 'success.main',
                  }} />
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        sx={{ 
                          bgcolor: room.type === 'global' 
                            ? alpha(theme.palette.primary.main, 0.9)
                            : room.type === 'private' 
                            ? alpha(theme.palette.secondary.main, 0.9)
                            : alpha(theme.palette.success.main, 0.9),
                          color: '#fff',
                          width: 56,
                          height: 56,
                          mr: 2,
                          boxShadow: 2,
                          borderRadius: 2
                        }}
                      >
                        {getRoomIcon(room.type)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ 
                              fontWeight: 600,
                              lineHeight: 1.2,
                              mb: 0.5
                            }}
                          >
                            {room.name}
                          </Typography>
                        </Box>
                        
                        <Chip 
                          label={getRoomTypeLabel(room.type)} 
                          size="small" 
                          color={getRoomTypeColor(room.type)}
                          sx={{ 
                            height: 20, 
                            fontWeight: 500, 
                            fontSize: '0.7rem',
                            borderRadius: '50px'
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <Typography 
                      color="text.secondary" 
                      variant="body2"
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        minHeight: '40px',
                        lineHeight: 1.4
                      }}
                    >
                      {room.description || `A ${room.type} community space for collaboration and discussion`}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Tooltip title={`${room.participants?.length || 0} members`}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Badge 
                            badgeContent={room.participants?.length || 0} 
                            color="primary"
                            max={999}
                            sx={{ 
                              '& .MuiBadge-badge': {
                                fontWeight: 'bold',
                                fontSize: '0.7rem'
                              }
                            }}
                          >
                            <GroupIcon sx={{ color: 'text.secondary', mr: 0.5 }} />
                          </Badge>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            {room.participants?.length || 0} {room.participants?.length === 1 ? 'member' : 'members'}
                          </Typography>
                        </Box>
                      </Tooltip>
                      
                      {room.lastActivity && (
                        <Tooltip title={new Date(room.lastActivity).toLocaleString()}>
                          <Chip
                            size="small"
                            icon={<RecentIcon fontSize="small" />}
                            label={getTimeDifference(room.lastActivity)}
                            variant="outlined"
                            sx={{ 
                              height: 24, 
                              '& .MuiChip-label': { px: 1, fontSize: '0.7rem' },
                              borderRadius: '50px'
                            }}
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 3, pt: 0, mt: 'auto' }}>
                    <Button 
                      size="medium" 
                      variant="contained" 
                      fullWidth
                      startIcon={<ChatIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenRoom(room._id);
                      }}
                      sx={{ 
                        borderRadius: '50px', 
                        py: 1,
                        fontWeight: 600,
                        boxShadow: 1,
                        backgroundColor: room.type === 'global' 
                          ? 'primary.main' 
                          : room.type === 'private' 
                          ? 'secondary.main' 
                          : 'success.main',
                      }}
                    >
                      Join Conversation
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Create New Room Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => {
          setOpenDialog(false);
          setNewRoom({ name: '', description: '', type: 'group', participants: [] });
          setSelectedUsers([]);
          setFormError('');
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundImage: theme.palette.mode === 'dark'
              ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.03))'
              : 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85))'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 3, px: 3 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            Create New Community
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
            Create a space for conversations with your team or community
          </Typography>
        </DialogTitle>
        
        <Divider />
        
        <DialogContent sx={{ pt: 3, px: 3 }}>
          {formError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {formError}
            </Alert>
          )}
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="room-type-label">Community Type</InputLabel>
            <Select
              labelId="room-type-label"
              id="room-type"
              value={newRoom.type}
              label="Community Type"
              onChange={handleRoomTypeChange}
            >
              <MenuItem value="global">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PublicIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>Global (Everyone)</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="group">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GroupIcon sx={{ mr: 1, color: 'success.main' }} />
                  <Typography>Group</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="private">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography>Private</Typography>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Community Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newRoom.name}
            onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
            sx={{ mb: 3 }}
            required
            helperText={newRoom.type === 'private' ? "Name of the private conversation" : "Give your community a descriptive name"}
          />
          
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newRoom.description}
            onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
            sx={{ mb: 3 }}
            helperText="Describe what this community space is about"
          />
          
          {newRoom.type === 'private' && (
            <Autocomplete
              multiple
              id="participants-select"
              options={users}
              loading={loadingUsers}
              value={selectedUsers}
              onChange={(event, newValue) => {
                setSelectedUsers(newValue);
              }}
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
                  label="Select Participants"
                  placeholder="Add users"
                  helperText="Select users to add to this private conversation"
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
            />
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => {
              setOpenDialog(false);
              setNewRoom({ name: '', description: '', type: 'group', participants: [] });
              setSelectedUsers([]);
            }}
            sx={{ borderRadius: '50px', px: 3 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateRoom} 
            variant="contained" 
            disabled={loading || (!newRoom.name.trim())}
            startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
            sx={{ borderRadius: '50px', px: 3, fontWeight: 600 }}
          >
            Create Community
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatRoomsList; 