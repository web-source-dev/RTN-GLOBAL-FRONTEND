import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import API from '../../../BackendAPi/ApiProvider';

function ChatSystem() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const response = await API.get('/api/chats');
        setChats(response.data);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError('Failed to load chats. Please try again later.');
        // Fallback to sample data if API fails
        setChats([
          {
            id: 1,
            name: 'Marketing Team',
            type: 'group',
            lastMessage: 'Let\'s discuss the new campaign',
            unread: 2,
            messages: [
              { id: 1, sender: 'Alice', content: 'Hi team!', timestamp: '09:00' },
              { id: 2, sender: 'Bob', content: 'Hello!', timestamp: '09:01' },
              { id: 3, sender: 'Charlie', content: 'Let\'s discuss the new campaign', timestamp: '09:05' },
            ],
          },
          {
            id: 2,
            name: 'John Smith',
            type: 'direct',
            lastMessage: 'Can we meet tomorrow?',
            unread: 1,
            messages: [
              { id: 1, sender: 'John', content: 'Hi, how are you?', timestamp: '10:00' },
              { id: 2, sender: 'You', content: 'I\'m good, thanks!', timestamp: '10:01' },
              { id: 3, sender: 'John', content: 'Can we meet tomorrow?', timestamp: '10:05' },
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;
    
    try {
      const response = await API.post(`/api/chats/${selectedChat.id}/messages`, {
        content: message
      });
      
      // Update the chat with the new message
      setChats(chats.map(chat => 
        chat.id === selectedChat.id 
          ? { 
              ...chat, 
              messages: [...chat.messages, response.data],
              lastMessage: message
            }
          : chat
      ));
      
      // Update selected chat with new message
      if (selectedChat) {
        setSelectedChat({
          ...selectedChat,
          messages: [...selectedChat.messages, response.data]
        });
      }
      
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      // Fallback implementation if API fails
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChats(chats.map(chat => 
        chat.id === selectedChat.id 
          ? { 
              ...chat, 
              messages: [...chat.messages, newMessage],
              lastMessage: message
            }
          : chat
      ));
      
      if (selectedChat) {
        setSelectedChat({
          ...selectedChat,
          messages: [...selectedChat.messages, newMessage]
        });
      }
      
      setMessage('');
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ height: '70vh', display: 'flex' }}>
      <Grid container spacing={2}>
        {/* Chat List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%' }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Chats</Typography>
              <IconButton onClick={handleMenuOpen}>
                <PersonAddIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>New Direct Message</MenuItem>
                <MenuItem onClick={handleMenuClose}>Create Group</MenuItem>
              </Menu>
            </Box>
            <Divider />
            <List sx={{ overflow: 'auto', maxHeight: 'calc(70vh - 64px)' }}>
              {chats.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  selected={selectedChat?.id === chat.id}
                  onClick={() => setSelectedChat(chat)}
                >
                  <ListItemAvatar>
                    <Avatar>{chat.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={chat.lastMessage}
                    primaryTypographyProps={{
                      variant: 'subtitle2',
                      color: chat.unread ? 'primary' : 'textPrimary',
                    }}
                  />
                  {chat.unread > 0 && (
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                      }}
                    >
                      {chat.unread}
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Chat Messages */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedChat ? (
              <>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                  <Avatar sx={{ mr: 2 }}>{selectedChat.name[0]}</Avatar>
                  <Typography variant="h6">{selectedChat.name}</Typography>
                  <IconButton sx={{ ml: 'auto' }}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {selectedChat.messages.map((msg) => (
                    <Box
                      key={msg.id}
                      sx={{
                        display: 'flex',
                        flexDirection: msg.sender === 'You' ? 'row-reverse' : 'row',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          bgcolor: msg.sender === 'You' ? 'primary.main' : 'grey.100',
                          color: msg.sender === 'You' ? 'white' : 'text.primary',
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <Typography variant="subtitle2">{msg.sender}</Typography>
                        <Typography>{msg.content}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                          {msg.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleSendMessage}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="textSecondary">
                  Select a chat to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatSystem;