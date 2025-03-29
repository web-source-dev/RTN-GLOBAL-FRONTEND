import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  useTheme,
  CircularProgress,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
  InputAdornment,
  ListItemIcon,
  Badge,
  Link,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../BackendAPi/ApiProvider';
import { io } from 'socket.io-client';
import { formatDistanceToNow } from 'date-fns';


const GlobalLiveChat = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [replyTo, setReplyTo] = useState(null);
  const [socket, setSocket] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatRoom, setChatRoom] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const lastScrollPosition = useRef(0);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  useEffect(() => {
    initializeChat();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const initializeChat = async () => {
    try {
      // Get or create global chat room
      const roomResponse = await API.get('/api/global/chat/global');
      setChatRoom(roomResponse.data);
      console.log('Chat room initialized:', roomResponse.data);

      // Initialize socket connection - using withCredentials to send cookies
      console.log('Initializing socket connection with cookies...');
      const newSocket = io(process.env.REACT_APP_API_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      // Add connection listeners
      newSocket.on('connect', () => {
        console.log('Socket connected successfully');
      });
      
      newSocket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
        setError(`Connection error: ${err.message}`);
      });
      
      setupSocketListeners(newSocket);
      setSocket(newSocket);
      
      // After setting up socket, fetch messages for the room
      if (roomResponse.data && roomResponse.data._id) {
        fetchMessagesForRoom(roomResponse.data._id);
      }
    } catch (error) {
      console.error('Chat initialization error:', error);
      setError(`Error connecting to chat: ${error.message}`);
    }
  };

  const fetchMessagesForRoom = async (roomId) => {
    try {
      setLoading(true);
      console.log(`Fetching messages for room: ${roomId}`);
      const response = await API.get(`/api/global/chat/messages/${roomId}`, {
        params: { page, limit: 20 }
      });
      
      console.log('Messages response:', response.data);
      
      if (response.data && Array.isArray(response.data.messages)) {
        setMessages(response.data.messages);
        setHasMore(response.data.currentPage < response.data.totalPages);
      } else {
        console.warn('Unexpected message format:', response.data);
        setMessages([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(`Failed to load messages: ${err.message}`);
      setMessages([]); 
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = (socket) => {
    socket.on('connect', () => {
      console.log('Connected to chat');
      // Don't need to call loadMessages here as we're already fetching them in initializeChat
    });

    socket.on('messages', ({ messages: newMessages, page }) => {
      if (Array.isArray(newMessages)) {
        setMessages(prev => {
          if (page === 1) {
            return newMessages;
          }
          const existingIds = new Set(prev.map(msg => msg._id));
          const uniqueNewMessages = newMessages.filter(msg => !existingIds.has(msg._id));
          return [...uniqueNewMessages, ...prev];
        });
        setHasMore(newMessages.length === 20);
      }
    });

    socket.on('newMessage', (message) => {
      setMessages(prev => {
        if (!Array.isArray(prev)) {
          return [message];
        }
        if (prev.some(msg => msg._id === message._id)) {
          return prev;
        }
        return [...prev, message];
      });

      // Check if user is near bottom (within 100px) before auto-scrolling
      const container = messagesContainerRef.current;
      if (container) {
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        if (isNearBottom) {
          scrollToBottom();
        } else {
          setUnreadCount(prev => prev + 1);
        }
      }
    });

    socket.on('messageReaction', ({ messageId, reactions }) => {
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, reactions } : msg
      ));
    });

    socket.on('messageEdited', ({ messageId, content, edited }) => {
      setMessages(prev => prev.map(msg =>
        msg._id === messageId ? { ...msg, content, edited } : msg
      ));
      if (editingMessage?._id === messageId) {
        setEditingMessage(null);
        setNewMessage('');
      }
    });

    socket.on('messageDeleted', ({ messageId }) => {
      setMessages(prev => prev.map(msg =>
        msg._id === messageId ? { ...msg, deleted: true, content: 'This message has been deleted' } : msg
      ));
    });

    socket.on('userTyping', ({ userId, name, isTyping }) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        if (isTyping) {
          newSet.add(name);
        } else {
          newSet.delete(name);
        }
        return newSet;
      });
    });

    socket.on('userJoined', ({ name, role }) => {
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.system && lastMessage.content.includes(name)) {
          return prev;
        }
        return [...prev, {
          system: true,
          content: `${name} ${role === 'admin' ? '(Admin)' : ''} joined the chat`,
          timestamp: new Date()
        }];
      });
    });

    socket.on('userLeft', ({ userId, name }) => {
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        // Check if last message is a system message about the same user
        if (lastMessage?.system && lastMessage.content.includes(name)) {
          return prev;
        }
        // Find user's full name from previous messages
        const userMessage = prev.find(msg => msg.sender?._id === userId);
        const fullName = userMessage ? `${userMessage.sender.firstName} ${userMessage.sender.lastName}` : name;
        return [...prev, {
          system: true,
          content: `${fullName} left the chat`,
          timestamp: new Date()
        }];
      });
    });

    socket.on('error', ({ message }) => {
      setError(message);
    });
  };

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Load more messages when scrolling to top
    if (container.scrollTop === 0 && hasMore) {
      socket.emit('loadMessages', { page: page + 1, limit: 20 });
      setPage(prev => prev + 1);
    }

    // Show/hide scroll button based on scroll position
    const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 100;
    setShowScrollButton(isScrolledUp);

    // If user scrolls to bottom, reset unread count
    if (!isScrolledUp) {
      setUnreadCount(0);
    }

    lastScrollPosition.current = container.scrollTop;
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if ((!newMessage.trim() && !file) || loading) return;

    setLoading(true);
    try {
      let attachment;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await API.post('/api/global/chat/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        attachment = response.data;
      }

      if (editingMessage) {
        socket.emit('editMessage', {
          messageId: editingMessage._id,
          content: newMessage
        });
      } else {
        socket.emit('sendMessage', {
          content: newMessage,
          attachment,
          replyTo: replyTo?._id
        });
      }

      setNewMessage('');
      setFile(null);
      setReplyTo(null);
      setEditingMessage(null);
    } catch (error) {
      setError('Failed to send message');
      console.error('Send message error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUnreadCount(0); // Reset unread count when scrolling to bottom
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', false);
    }, 1000);
  };

  const handleReaction = (messageId, emoji) => {
    socket.emit('addReaction', { messageId, emoji });
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setNewMessage(message.content);
  };

  const handleDelete = (messageId) => {
    socket.emit('deleteMessage', { messageId });
  };

  const handleReply = (message) => {
    setReplyTo(message);
  };

  const handleMenuOpen = (event, message) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessage(message);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleEmojiSelect = (emoji) => {
    if (editingMessage) {
      setNewMessage(prev => prev + emoji.native);
    } else if (selectedMessage) {
      handleReaction(selectedMessage._id, emoji.native);
      handleMenuClose();
    } else {
      setNewMessage(prev => prev + emoji.native);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      if (query.trim()) {
        try {
          const response = await API.get('/api/global/chat/search', {
            params: { query },
            ...getAuthConfig()
          });
          setMessages(response.data);
        } catch (error) {
          setError('Error searching messages');
        }
      } else {
        socket.emit('loadMessages', { page: 1, limit: 20 });
      }
    }, 500);
  };

  const handleScrollToBottom = () => {
    scrollToBottom();
    setUnreadCount(0);
  };

  // Update message styles with better color contrast
  const getMessageStyles = (isCurrentUser) => ({
    maxWidth: '70%',
    bgcolor: isCurrentUser 
      ? theme.palette.mode === 'dark'
        ? 'primary.800' // Darker blue in dark mode
        : '#E3F2FD' // Light blue in light mode
      : theme.palette.mode === 'dark'
        ? 'grey.800'
        : 'grey.100',
    color: isCurrentUser 
      ? theme.palette.mode === 'dark'
        ? '#fff'  // White text for dark mode
        : '#1976D2' // Blue text for light mode
      : theme.palette.primary.main,
    borderRadius: 2,
    p: 2,
    position: 'relative',
    '& a': {
      color: theme.palette.mode === 'dark' 
        ? '#90CAF9' // Light blue for links in dark mode
        : '#1565C0', // Darker blue for links in light mode
      textDecoration: 'underline',
      '&:hover': {
        color: theme.palette.mode === 'dark'
          ? '#42A5F5'
          : '#0D47A1'
      }
    }
  });

  const fetchMessages = async () => {
    if (chatRoom && chatRoom._id) {
      fetchMessagesForRoom(chatRoom._id);
    } else {
      // If no chat room exists yet, initialize the chat
      initializeChat();
    }
  };

  return (
    <Box sx={{ 
      py: 8, 
      backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            mb: 6, 
            fontWeight: 700,
            color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main'
          }}
        >
          Live Chat Support
        </Typography>
        <Paper 
          elevation={theme.palette.mode === 'dark' ? 2 : 1}
          sx={{ 
            p: 3, 
            maxWidth: 800, 
            mx: 'auto', 
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
            border: 1,
            borderColor: theme.palette.divider
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ height: 500, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <List 
              sx={{ 
                flexGrow: 1, 
                overflow: 'auto', 
                mb: 2,
                px: 2,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.3)'
                      : 'rgba(0, 0, 0, 0.3)',
                  },
                },
              }} 
              ref={messagesContainerRef}
              onScroll={handleScroll}
            >
              {Array.isArray(messages) ? messages.map((message, index) => (
                <ListItem
                  key={index}
                  sx={{
                    flexDirection: message.sender?._id === user?.id ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    mb: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={message.sender?.avatar}
                      sx={{ 
                        bgcolor: message.sender?.role === 'admin' 
                          ? theme.palette.mode === 'dark'
                            ? 'primary.dark'
                            : 'primary.main'
                          : theme.palette.mode === 'dark'
                            ? 'secondary.dark'
                            : 'secondary.main'
                      }}
                    >
                      {message.sender?.firstName?.[0] || '?'}
                    </Avatar>
                  </ListItemAvatar>
                  <Box
                    sx={getMessageStyles(message.sender?._id === user?.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        {message.sender?.firstName} {message.sender?.lastName}
                        {message.sender?.role === 'admin' && (
                          <Chip
                            label="Admin"
                            size="small"
                            color="primary"
                            sx={{ 
                              ml: 1,
                              height: 20,
                              '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.7rem'
                              }
                            }}
                          />
                        )}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, message)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {message.replyTo && (
                      <Box
                        sx={{
                          borderLeft: 2,
                          borderColor: 'primary.main',
                          pl: 1,
                          my: 1,
                          opacity: 0.7
                        }}
                      >
                        <Typography variant="body2">
                          {message.replyTo.content}
                        </Typography>
                      </Box>
                    )}

                    <Typography variant="body1">
                      {message.content}
                      {message.edited && (
                        <Typography 
                          component="span" 
                          variant="caption" 
                          color="textSecondary"
                          sx={{ ml: 1 }}
                        >
                          (edited)
                        </Typography>
                      )}
                    </Typography>

                    {message.attachment && (
                      <Box 
                        sx={{ 
                          mt: 1,
                          p: 1,
                          bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.05)',
                          borderRadius: 1,
                          display: 'inline-block'
                        }}
                      >
                        <Link
                          href={`${process.env.REACT_APP_API_URL}/${message.attachment.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: theme.palette.mode === 'dark'
                              ? '#90CAF9'
                              : '#1565C0',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          <AttachFileIcon fontSize="small" />
                          {message.attachment.filename}
                        </Link>
                      </Box>
                    )}

                    {message.reactions?.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {message.reactions.map((reaction, i) => (
                          <Chip
                            key={i}
                            label={`${reaction.emoji} ${reaction.users.length}`}
                            size="small"
                            variant="outlined"
                            onClick={() => handleReaction(message._id, reaction.emoji)}
                          />
                        ))}
                      </Box>
                    )}

                    <Typography variant="caption" color="textSecondary" display="block">
                      {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                    </Typography>
                  </Box>
                </ListItem>
              )) : (
                <ListItem>
                  <Typography>No messages yet</Typography>
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>

            {typingUsers.size > 0 && (
              <Typography variant="caption" color="textSecondary" sx={{ ml: 2, mb: 1 }}>
                {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
              </Typography>
            )}

            {showScrollButton && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 80,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleScrollToBottom}
                  startIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    borderRadius: 20,
                    boxShadow: theme.shadows[3],
                    px: 2,
                    py: 0.5,
                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark',
                    }
                  }}
                >
                  <Badge 
                    badgeContent={unreadCount > 0 ? unreadCount : null} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        right: -3,
                        top: 3,
                      }
                    }}
                  >
                    {unreadCount > 0 ? `${unreadCount} New Message${unreadCount > 1 ? 's' : ''}` : 'Scroll to Bottom'}
                  </Badge>
                </Button>
              </Box>
            )}

            <Box 
              component="form" 
              onSubmit={handleSendMessage}
              sx={{ 
                position: 'relative',
                borderTop: 1,
                borderColor: 'divider',
                pt: 2
              }}
            >
              {replyTo && (
                <Box 
                  sx={{ 
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'grey.100',
                    p: 1,
                    borderRadius: 1
                  }}
                >
                  <Typography variant="caption" color="textSecondary">
                    Replying to {replyTo.sender.firstName}
                  </Typography>
                  <IconButton size="small" onClick={() => setReplyTo(null)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}

              <Box sx={{ position: 'relative' }}>
                {showEmojiPicker && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      mb: 1,
                      zIndex: 1000,
                      boxShadow: theme.shadows[3],
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'divider',
                      '.emoji-mart': {
                        borderRadius: 1,
                        border: 'none',
                      }
                    }}
                  >
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      theme={theme.palette.mode}
                      previewPosition="none"
                      skinTonePosition="none"
                    />
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      color="primary"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={loading}
                      sx={{
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <AttachFileIcon />
                    </IconButton>
                    {file && (
                      <Paper
                        elevation={0}
                        sx={{
                          position: 'absolute',
                          bottom: '100%',
                          left: 0,
                          mb: 1,
                          p: 1,
                          minWidth: 200,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1
                        }}
                      >
                        <Chip
                          label={file.name}
                          onDelete={() => setFile(null)}
                          deleteIcon={<CloseIcon />}
                          variant="outlined"
                          size="small"
                          sx={{ maxWidth: '100%' }}
                        />
                      </Paper>
                    )}
                  </Box>

                  <IconButton
                    color="primary"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    sx={{
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <EmojiEmotionsIcon />
                  </IconButton>

                  <TextField
                    fullWidth
                    placeholder={editingMessage ? "Edit message..." : "Type your message..."}
                    variant="outlined"
                    size="small"
                    value={newMessage}
                    onChange={handleTyping}
                    disabled={loading}
                    multiline
                    maxRows={4}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'background.paper'
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                    disabled={loading || (!newMessage.trim() && !file)}
                    sx={{
                      px: 3,
                      height: 40,
                      boxShadow: theme.palette.mode === 'dark' ? 1 : 2
                    }}
                  >
                    {editingMessage ? 'Update' : 'Send'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleReply(selectedMessage);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <ReplyIcon fontSize="small" />
          </ListItemIcon>
          Reply
        </MenuItem>
        {selectedMessage?.sender?._id === user?.id && (
          <>
            <MenuItem onClick={() => {
              handleEdit(selectedMessage);
              handleMenuClose();
            }}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem onClick={() => {
              handleDelete(selectedMessage._id);
              handleMenuClose();
            }}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </>
        )}
      </Menu>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept="image/*,.pdf,.doc,.docx,.txt,.zip"
      />
    </Box>
  );
};

export default GlobalLiveChat;