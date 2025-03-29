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
  Fab,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../BackendAPi/ApiProvider';
import { io } from 'socket.io-client';
import { formatDistanceToNow } from 'date-fns';
import ChatParticipantsManager from './ChatParticipantsManager';
import { Group as GroupIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


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
  const [typingList, setTypingList] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatRoom, setChatRoom] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const lastScrollPosition = useRef(0);
  const [openParticipantsDialog, setOpenParticipantsDialog] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Add a state for tracking the message being sent
  const [sendingMessage, setSendingMessage] = useState(false);

  // Add this to force re-renders when typingUsers changes
  const [typingUpdateCounter, setTypingUpdateCounter] = useState(0);

  const navigate = useNavigate();

  // Add these state variables to track navigation state
  const [isBeingRemoved, setIsBeingRemoved] = useState(false);

  // Add a helper function to handle different typing list formats
  const ensureArray = (possibleArray) => {
    if (Array.isArray(possibleArray)) {
      return possibleArray;
    }
    // If it's a Set, convert to array
    if (possibleArray instanceof Set) {
      return Array.from(possibleArray);
    }
    // For any other case, return empty array
    return [];
  };

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

  useEffect(() => {
    console.log('Auth user object:', user);
    if (user) {
      console.log('User properties:', Object.keys(user));
      console.log('User ID candidates:', {
        id: user.id,
        _id: user._id,
        userId: user.userId,
        user_id: user.user_id
      });
    }
  }, [user]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      // Get the room ID from the URL if available
      const roomId = window.location.pathname.includes('/chat/room/') 
        ? window.location.pathname.split('/chat/room/')[1]
        : 'global';
        
      console.log('Initializing chat for room:', roomId);
      
      // Get room details
      let roomResponse;
      if (roomId === 'global') {
        roomResponse = await API.get('/api/global/chat/global');
      } else {
        roomResponse = await API.get(`/api/global/chat/room/${roomId}`);
      }
      
      setChatRoom(roomResponse.data);
      console.log('Chat room initialized:', roomResponse.data);

      // Initialize socket connection with cookies
      console.log('Initializing socket connection with cookies...');
      const newSocket = io(process.env.REACT_APP_API_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      // Add better connection listeners with more logging
      newSocket.on('connect', () => {
        console.log('Socket connected successfully with ID:', newSocket.id);
        setConnectionStatus('connected');
        setError('');
        
        // Join the specific room
        console.log('Emitting joinRoom event for roomId:', roomResponse.data._id);
        newSocket.emit('joinRoom', { roomId: roomResponse.data._id });
      });
      
      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setConnectionStatus('disconnected');
        setError('Disconnected from chat server. Attempting to reconnect...');
      });
      
      newSocket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        setConnectionStatus('error');
        setError(`Connection error: ${err.message}`);
      });
      
      newSocket.on('connectionConfirmed', (data) => {
        console.log('Connection confirmed:', data);
        // Store the user ID from the socket connection for message ownership checks
        if (data && data.user && data.user.id) {
          // Create a local reference for comparing messages
          localStorage.setItem('chatUserId', data.user.id);
          console.log('Set chat user ID:', data.user.id);
        }
      });
      
      newSocket.on('roomJoined', (data) => {
        console.log('Room joined:', data);
        // Only update chatRoom if we don't have one yet
        if (data.room && !chatRoom) {
          setChatRoom(data.room);
        }
        setLoading(false);
      });

      newSocket.on('messages', ({ messages: newMessages, page, roomId }) => {
        console.log(`Received ${newMessages?.length || 0} messages for room ${roomId}:`, newMessages);
        
        if (!Array.isArray(newMessages) || newMessages.length === 0) {
          console.log('No messages received or invalid format');
          setLoading(false);
          return;
        }
        
        // Fix any potential message format issues
        const formattedMessages = newMessages.map(msg => {
          // Ensure message has an _id
          if (!msg._id) {
            console.warn('Message missing _id, generating temporary id', msg);
            return { ...msg, _id: `temp-${Date.now()}-${Math.random()}` };
          }
          
          // Ensure sender is properly formatted
          if (msg.sender && typeof msg.sender === 'object') {
            // Make sure sender has an _id field
            if (!msg.sender._id) {
              console.warn('Sender missing _id', msg.sender);
              msg.sender._id = `sender-${Date.now()}`;
            }
          } else if (!msg.system) {
            // Add a default sender for non-system messages
            console.warn('Message missing proper sender object', msg);
            msg.sender = {
              _id: 'unknown',
              firstName: 'Unknown',
              lastName: 'User',
              avatar: null
            };
          }
          
          return msg;
        });
        
        setMessages(prev => {
          if (page === 1) {
            console.log('Setting initial messages:', formattedMessages.length);
            return formattedMessages;
          }
          
          // For pagination: merge without duplicates
          console.log('Merging with existing messages');
          const existingIds = new Set(prev.map(msg => msg._id));
          const uniqueNewMessages = formattedMessages.filter(msg => !existingIds.has(msg._id));
          return [...uniqueNewMessages, ...prev];
        });
        
        setHasMore(formattedMessages.length === 20);
        setLoading(false);
      });

      newSocket.on('userJoined', ({ userId, user, roomId }) => {
        console.log('User joined:', user?.firstName, 'in room', roomId);
        if (!chatRoom || roomId !== chatRoom._id) return;
        
        const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'A new user';
        
        // Prevent duplicate join messages by checking message ID format
        setMessages(prev => {
          // Check if we already have any join message for this user within the last 10 seconds
          const recentJoinMsg = prev.find(m => 
            m.system && 
            m.content && 
            m.content.includes(userName) && 
            m.content.includes('joined') &&
            m._id && 
            (m._id.includes(userId) || Date.now() - new Date(m.timestamp).getTime() < 10000)
          );
          
          if (recentJoinMsg) {
            console.log('Recent join message exists, not adding duplicate');
            return prev;
          }
          
          console.log('Adding join message for', userName);
          return [...prev, {
            _id: `system-join-${Date.now()}-${userId}`,
            system: true,
            content: `${userName} joined the chat`,
            timestamp: new Date().toISOString(),
            userInfo: {
              _id: userId,
              name: userName,
            }
          }];
        });
      });

      newSocket.on('userLeft', ({ userId, user, roomId }) => {
        console.log('User left:', user?.firstName, 'from room', roomId);
        if (!chatRoom || roomId !== chatRoom._id) return;
        
        const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'A user';
        
        // Don't add duplicate system messages
        setMessages(prev => {
          // Check if we already have a leave message for this user within the last 10 seconds
          const lastLeaveIndex = prev.findIndex(m => 
            m.system && 
            m.content.includes(userName) && 
            m.content.includes('left') &&
            Date.now() - new Date(m.timestamp).getTime() < 10000 // Within last 10 seconds
          );
          
          if (lastLeaveIndex !== -1) {
            console.log('Recent leave message exists, not adding duplicate');
            return prev;
          }
          
          console.log('Adding leave message for', userName);
          return [...prev, {
            _id: `system-leave-${Date.now()}-${userId}`,
            system: true,
            content: `${userName} left the chat`,
            timestamp: new Date().toISOString(),
            userInfo: {
              _id: userId,
              name: userName,
            }
          }];
        });
        
        // Remove from typing users
        setTypingList(prev => prev.filter(name => name !== userName));
      });

      newSocket.on('newMessage', ({ message, roomId }) => {
        console.log('New message from server:', message, 'room:', roomId);
        
        if (!chatRoom || roomId !== chatRoom._id) {
          console.log('Message for different room, ignoring');
          return;
        }
        
        if (!message || !message._id) {
          console.error('Invalid message format or missing ID');
          return;
        }
        
        // Simply add the server's message directly without any optimistic updates
        setMessages(currentMessages => {
          // Check if we already have this message ID to avoid duplicates
          if (currentMessages.some(m => m._id === message._id)) {
            console.log('Message already exists, not adding again');
            return currentMessages;
          }
          
          // Add the new message from the server
          return [...currentMessages, message];
        });
        
        // Once we receive a message, clear the sending indicator
        setSendingMessage(false);
        
        // Auto-scroll logic
        if (isNearBottom()) {
          scrollToBottom();
        } else {
          setUnreadCount(prev => prev + 1);
          setShowScrollButton(true);
        }
      });

      newSocket.on('messageReaction', ({ messageId, reactions, roomId }) => {
        if (!chatRoom || roomId !== chatRoom._id) return;
        
        setMessages(prev => prev.map(msg => 
          msg._id === messageId ? { ...msg, reactions } : msg
        ));
      });

      newSocket.on('messageEdited', (data) => {
        console.log('Message edit event received:', data);
        
        const { _id, content, editHistory, edited, roomId } = data.message || data;
        
        // Only update if this is the current room
        if (!chatRoom || roomId !== chatRoom._id) {
          return;
        }
        
        // Update messages with edited content
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.map(msg => {
            if (msg._id === _id) {
              console.log('Updating edited message:', _id);
              // Create a new object to ensure React detects the change
              return {
                ...msg,
                content: content,
                editHistory: editHistory || msg.editHistory || [],
                edited: true
              };
            }
            return msg;
          });
          
          return updatedMessages;
        });
        
        // Force re-render after a short delay to ensure state updates
        setTimeout(() => {
          console.log('Forcing re-render after edit');
          setTypingUpdateCounter(prev => prev + 1);
        }, 100);
      });

      newSocket.on('messageDeleted', (data) => {
        console.log('Message deleted event received:', data);
        
        // Extract information regardless of data format
        const messageId = data.messageId || data._id || data.message?._id;
        const roomId = data.roomId || data.message?.roomId;
        const content = data.content || data.message?.content || 'This message was deleted.';
        
        if (!chatRoom || roomId !== chatRoom._id || !messageId) {
          console.log('Ignoring delete event - not for current room or missing ID');
          return;
        }
        
        console.log(`Marking message ${messageId} as deleted`);
        
        // Update the message in the UI
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.map(msg => {
            if (msg._id === messageId) {
              console.log('Found message to mark as deleted:', messageId);
              // Create a new object to ensure React detects the change
              return {
                ...msg,
                deleted: true,
                content: content
              };
            }
            return msg;
          });
          
          return updatedMessages;
        });
        
        // Force re-render to ensure UI updates
        setTimeout(() => {
          console.log('Forcing re-render after delete');
          setTypingUpdateCounter(prev => prev + 1);
        }, 100);
      });

      newSocket.on('userTyping', ({ userId, name, user }) => {
        if (userId === localStorage.getItem('chatUserId')) return; // Skip own events
        
        const displayName = name || (user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Someone');
        console.log('TYPING EVENT RECEIVED FOR:', displayName);
        
        // Use a straightforward update
        setTypingList(prev => {
          if (!prev.includes(displayName)) {
            return [...prev, displayName];
          }
          return prev;
        });
      });

      newSocket.on('userStoppedTyping', ({ userId, name, user }) => {
        if (userId === localStorage.getItem('chatUserId')) return;
        
        const displayName = name || (user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Someone');
        console.log('STOP TYPING EVENT RECEIVED FOR:', displayName);
        
        setTypingList(prev => prev.filter(item => item !== displayName));
      });

      newSocket.on('error', ({ message }) => {
        setError(message);
      });

      newSocket.on('roomParticipantsUpdated', ({ roomId, participants }) => {
        console.log('Room participants updated:', roomId, participants);
        
        // If this is the current room
        if (chatRoom && roomId === chatRoom._id) {
          // Check if current user is still a participant
          const currentUserId = localStorage.getItem('chatUserId');
          
          // More comprehensive participant check (handle both string and object IDs)
          const isStillParticipant = participants.some(p => {
            const participantId = p.user._id?.toString() || p.user?.toString();
            return participantId === currentUserId;
          });
          
          // If user was removed, navigate to chat list
          if (!isStillParticipant) {
            console.log('CRITICAL: User was removed from the chat room, forcing redirect');
            
            // Set flag to prevent multiple redirects
            if (isBeingRemoved) return;
            setIsBeingRemoved(true);
            
            setMessages(prev => [
              ...prev,
              {
                _id: `system-removed-${Date.now()}`,
                system: true,
                content: 'You were removed from this chat room',
                timestamp: new Date().toISOString(),
              }
            ]);
            
            // Force navigation with fallback
            setTimeout(() => {
              try {
                console.log('Attempting navigation via React Router');
                navigate('/chat', { replace: true });
                
                // Fallback - if we're still on the same page after 300ms, use window.location
                setTimeout(() => {
                  const currentPath = window.location.pathname;
                  if (currentPath.includes(`/chat/room/${roomId}`)) {
                    console.log('React Router navigation failed, using direct window.location');
                    window.location.href = '/chat';
                  }
                }, 300);
              } catch (err) {
                console.error('Navigation error, using fallback', err);
                window.location.href = '/chat';
              }
            }, 1000);
          }
        }
      });

      newSocket.on('participantRemoved', ({ roomId, userId }) => {
        // Check if this event is for the current user
        const currentUserId = localStorage.getItem('chatUserId');
        
        if (userId === currentUserId && chatRoom && roomId === chatRoom._id) {
          console.log('CRITICAL: You were removed from this chat room, forcing navigation');
          
          // Set flag to prevent multiple redirects
          if (isBeingRemoved) return;
          setIsBeingRemoved(true);
          
          // Show message to user
          setMessages(prev => [
            ...prev,
            {
              _id: `system-removed-${Date.now()}`,
              system: true,
              content: 'You were removed from this chat room by an administrator',
              timestamp: new Date().toISOString(),
            }
          ]);
          
          // Force navigation more aggressively:
          // 1. First try React Router navigation with shorter delay
          setTimeout(() => {
            try {
              console.log('Attempting navigation via React Router');
              navigate('/chat', { replace: true });
              
              // Fallback - if we're still on the same page after 300ms, use window.location
              setTimeout(() => {
                const currentPath = window.location.pathname;
                if (currentPath.includes(`/chat/room/${roomId}`)) {
                  console.log('React Router navigation failed, using direct window.location');
                  window.location.href = '/chat';
                }
              }, 300);
            } catch (err) {
              console.error('Navigation error, using fallback', err);
              window.location.href = '/chat';
            }
          }, 1000); // Reduced delay for better UX
        }
      });

      newSocket.on('forcedRemoval', ({ roomId, message }) => {
        console.log('CRITICAL: FORCED REMOVAL received', message);
        
        // Set flag to prevent multiple redirects
        if (isBeingRemoved) return;
        setIsBeingRemoved(true);
        
        // Show message to user
        alert(message || 'You have been removed from this chat room');
        
        // Force immediate navigation
        try {
          navigate('/chat', { replace: true });
        } catch (err) {
          window.location.href = '/chat';
        }
      });

      setupSocketListeners(newSocket);
      setSocket(newSocket);
      setLoading(false);
    } catch (error) {
      console.error('Chat initialization error:', error);
      setError(`Error connecting to chat: ${error.message}`);
      setLoading(false);
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
    socket.on('connectionConfirmed', (data) => {
      console.log('Connection confirmed:', data);
    });
    
    socket.on('roomJoined', (data) => {
      console.log('Room joined:', data);
      // Only update chatRoom if we don't have one yet
      if (data.room && !chatRoom) {
        setChatRoom(data.room);
      }
      setLoading(false);
    });

    socket.on('messages', ({ messages: newMessages, page, roomId }) => {
      console.log(`Received ${newMessages?.length || 0} messages for room ${roomId}:`, newMessages);
      
      if (!Array.isArray(newMessages) || newMessages.length === 0) {
        console.log('No messages received or invalid format');
        setLoading(false);
        return;
      }
      
      // Fix any potential message format issues
      const formattedMessages = newMessages.map(msg => {
        // Ensure message has an _id
        if (!msg._id) {
          console.warn('Message missing _id, generating temporary id', msg);
          return { ...msg, _id: `temp-${Date.now()}-${Math.random()}` };
        }
        
        // Ensure sender is properly formatted
        if (msg.sender && typeof msg.sender === 'object') {
          // Make sure sender has an _id field
          if (!msg.sender._id) {
            console.warn('Sender missing _id', msg.sender);
            msg.sender._id = `sender-${Date.now()}`;
          }
        } else if (!msg.system) {
          // Add a default sender for non-system messages
          console.warn('Message missing proper sender object', msg);
          msg.sender = {
            _id: 'unknown',
            firstName: 'Unknown',
            lastName: 'User',
            avatar: null
          };
        }
        
        return msg;
      });
      
      setMessages(prev => {
        if (page === 1) {
          console.log('Setting initial messages:', formattedMessages.length);
          return formattedMessages;
        }
        
        // For pagination: merge without duplicates
        console.log('Merging with existing messages');
        const existingIds = new Set(prev.map(msg => msg._id));
        const uniqueNewMessages = formattedMessages.filter(msg => !existingIds.has(msg._id));
        return [...uniqueNewMessages, ...prev];
      });
      
      setHasMore(formattedMessages.length === 20);
      setLoading(false);
    });

    socket.on('newMessage', ({ message, roomId }) => {
      console.log('New message received:', message, 'for room:', roomId);
      
      if (!message) {
        console.error('Invalid message received');
        return;
      }
      
      // Format the message to ensure it has all required fields
      const formattedMessage = {
        ...message,
        _id: message._id || `temp-${Date.now()}-${Math.random()}`,
        // Ensure sender is properly formatted
        sender: message.sender && typeof message.sender === 'object' 
          ? message.sender 
          : message.system 
            ? null 
            : { _id: 'unknown', firstName: 'Unknown', lastName: 'User' }
      };
      
      setMessages(prev => {
        // Check for duplicates
        if (prev.some(m => m._id === formattedMessage._id)) {
          console.log('Duplicate message, not adding:', formattedMessage._id);
          return prev;
        }
        
        console.log('Adding new message to chat:', formattedMessage._id);
        return [...prev, formattedMessage];
      });
      
      // Auto-scroll
      if (isNearBottom()) {
        setTimeout(scrollToBottom, 100);
      } else {
        setUnreadCount(prev => prev + 1);
        setShowScrollButton(true);
      }
    });

    socket.on('messageReaction', ({ messageId, reactions, roomId }) => {
      if (!chatRoom || roomId !== chatRoom._id) return;
      
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, reactions } : msg
      ));
    });

    socket.on('messageEdited', (data) => {
      console.log('Message edit event received:', data);
      
      const { _id, content, editHistory, edited, roomId } = data.message || data;
      
      // Only update if this is the current room
      if (!chatRoom || roomId !== chatRoom._id) {
        return;
      }
      
      // Update messages with edited content
      setMessages(prevMessages => {
        const updatedMessages = prevMessages.map(msg => {
          if (msg._id === _id) {
            console.log('Updating edited message:', _id);
            // Create a new object to ensure React detects the change
            return {
              ...msg,
              content: content,
              editHistory: editHistory || msg.editHistory || [],
              edited: true
            };
          }
          return msg;
        });
        
        return updatedMessages;
      });
      
      // Force re-render after a short delay to ensure state updates
      setTimeout(() => {
        console.log('Forcing re-render after edit');
        setTypingUpdateCounter(prev => prev + 1);
      }, 100);
    });

    socket.on('messageDeleted', (data) => {
      console.log('Message deleted event received:', data);
      
      // Extract information regardless of data format
      const messageId = data.messageId || data._id || data.message?._id;
      const roomId = data.roomId || data.message?.roomId;
      const content = data.content || data.message?.content || 'This message was deleted.';
      
      if (!chatRoom || roomId !== chatRoom._id || !messageId) {
        console.log('Ignoring delete event - not for current room or missing ID');
        return;
      }
      
      console.log(`Marking message ${messageId} as deleted`);
      
      // Update the message in the UI
      setMessages(prevMessages => {
        const updatedMessages = prevMessages.map(msg => {
          if (msg._id === messageId) {
            console.log('Found message to mark as deleted:', messageId);
            // Create a new object to ensure React detects the change
            return {
              ...msg,
              deleted: true,
              content: content
            };
          }
          return msg;
        });
        
        return updatedMessages;
      });
      
      // Force re-render to ensure UI updates
      setTimeout(() => {
        console.log('Forcing re-render after delete');
        setTypingUpdateCounter(prev => prev + 1);
      }, 100);
    });

    socket.on('error', ({ message }) => {
      setError(message);
    });
  };

  const isNearBottom = () => {
    if (!messagesContainerRef.current) return true;
    
    const container = messagesContainerRef.current;
    const scrollPosition = container.scrollTop + container.clientHeight;
    const scrollHeight = container.scrollHeight;
    
    // Consider "near bottom" if within 150px of actual bottom
    return scrollHeight - scrollPosition < 150;
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setUnreadCount(0);
      setShowScrollButton(false);
    }
  };

  const loadMoreMessages = () => {
    if (!socket || !chatRoom || loading) return;
    
    setLoading(true);
    console.log(`Loading more messages for page ${page + 1}`);
    
    // Request older messages through the socket
    socket.emit('loadMessages', { 
      roomId: chatRoom._id,
      page: page + 1, 
      limit: 20 
    });
    
    // Update page for pagination tracking
    setPage(prev => prev + 1);
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const container = messagesContainerRef.current;
    
    // Check if scrolled to top to load more messages
    if (container.scrollTop === 0 && hasMore && !loading) {
      loadMoreMessages();
    }
    
    // Update scroll button visibility
    const isBottom = isNearBottom();
    setShowScrollButton(!isBottom);
    
    if (isBottom) {
      setUnreadCount(0);
    }
    
    // Save last scroll position to determine scroll direction
    lastScrollPosition.current = container.scrollTop;
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    
    if (!newMessage.trim() && !file) return;
    
    try {
      setSendingMessage(true);
      
      // Handle editing existing message
      if (editingMessage) {
        console.log('Editing message:', editingMessage._id);
        
        // Send edit to server
        socket.emit('editMessage', {
          messageId: editingMessage._id,
          content: newMessage.trim(),
          roomId: chatRoom._id
        });
        
        // Optimistic UI update
        setMessages(prevMessages => {
          return prevMessages.map(msg => {
            if (msg._id === editingMessage._id) {
              const timestamp = new Date().toISOString();
              const editHistoryItem = {
                content: editingMessage.content,
                editedAt: timestamp
              };
              
              // Add to edit history
              let newEditHistory = msg.editHistory || [];
              newEditHistory = [...newEditHistory, editHistoryItem];
              
              // Return updated message
              return {
                ...msg,
                content: newMessage.trim(),
                edited: true,
                editHistory: newEditHistory
              };
            }
            return msg;
          });
        });
        
        // Reset editing state
        setEditingMessage(null);
        setNewMessage('');
        setSendingMessage(false);
        return;
      }
      
      // Handle file upload if needed
      let attachment = null;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await API.post('/api/global/chat/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        attachment = response.data;
      }
      
      // Send to server - no temporary message, we'll wait for server confirmation
      socket.emit('sendMessage', {
        content: newMessage,
        attachment,
        replyTo: replyTo?._id,
        roomId: chatRoom._id
      });
      
      // Reset all form fields after sending
      if (replyTo) setReplyTo(null);
      setNewMessage('');
      setFile(null); // Clear the file state
      
      // Also reset file input element to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Error sending/editing message:', error);
      setError('Failed to process message. Please try again.');
      setSendingMessage(false);
    }
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  useEffect(() => {
    if (messages.length > 0) {
      console.log(`Rendered ${messages.length} messages`);
      // Check for the first few messages to debug data structure
      if (process.env.NODE_ENV !== 'production') {
        console.log('Sample message data:', messages[0]);
      }
    }
  }, [messages]);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!socket || !chatRoom) return;
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // If not already typing, emit typing event with proper user info
    if (!isTyping) {
      setIsTyping(true);
      console.log('%c Sending typing event for user:', 'background: #2196f3; color: white; padding: 4px;', 
        user?.firstName + ' ' + user?.lastName);
      
      // Send both first and last name
      socket.emit('typing', { 
        roomId: chatRoom._id,
        name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User',
        userId: localStorage.getItem('chatUserId')
      });
    }
    
    // Set timeout to stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        console.log('%c Sending stop typing event for user:', 'background: #9e9e9e; color: white; padding: 4px;', 
          user?.firstName + ' ' + user?.lastName);
          
        // Send both first and last name
        socket.emit('stopTyping', { 
          roomId: chatRoom._id,
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User',
          userId: localStorage.getItem('chatUserId')
        });
      }
    }, 2000);
  };

  const handleReaction = (messageId, emoji) => {
    if (!chatRoom) return;
    socket.emit('addReaction', { messageId, emoji, roomId: chatRoom._id });
  };

  const handleEdit = async (message) => {
    if (!editingMessage) {
      // Set up editing mode
      setEditingMessage(message);
      setNewMessage(message.content);
      setReplyTo(null);
    } else {
      // Cancel editing if clicking the same message again
      setEditingMessage(null);
      setNewMessage('');
    }
  };

  const handleDelete = async (message) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      console.log('Deleting message:', message._id);
      
      // Send delete event to server
      socket.emit('deleteMessage', {
        messageId: message._id,
        roomId: chatRoom._id
      });
      
      // Optimistic UI update
      setMessages(prevMessages => {
        return prevMessages.map(msg => {
          if (msg._id === message._id) {
            return {
              ...msg,
              deleted: true,
              content: 'This message was deleted.'
            };
          }
          return msg;
        });
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message');
    }
  };

  const handleReply = (message) => {
    handleMenuClose();
    setReplyTo(message);
    // Focus the message input
    document.getElementById('message-input').focus();
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


  const renderAttachment = (attachment) => {
    if (!attachment) return null;
    
    // Get the full URL for the attachment
    const attachmentUrl = attachment.path ? 
      `${process.env.REACT_APP_API_URL}/${attachment.path}` : 
      attachment.url || '#';
    
    const filename = attachment.filename || 'Attachment';
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
    
    return (
      <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: 1 }}>
        {isImage ? (
          <Box sx={{ position: 'relative', maxWidth: '100%' }}>
            <Link 
              href={attachmentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={attachmentUrl} 
                alt={filename}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }} 
              />
            </Link>
          </Box>
        ) : (
          <Link 
            href={attachmentUrl}
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <AttachFileIcon fontSize="small" />
            {filename}
          </Link>
        )}
      </Box>
    );
  };

  const renderMessage = (message) => {
    if (!message) {
      console.error('Attempted to render null/undefined message');
      return null;
    }
    
    // Handle system messages - centered gray messages
    if (message.system) {
      return (
        <Box
          key={message._id || `system-${Date.now()}`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            my: 1.5,
            px: 2
          }}
        >
          <Typography
            variant="body2"
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              borderRadius: 1,
              px: 2,
              py: 0.5,
              color: theme.palette.text.secondary
            }}
          >
            {message.content || 'System message'}
          </Typography>
        </Box>
      );
    }
    
    // Safely extract user info with fallbacks
    const sender = message.sender || {};
    const senderName = sender.firstName ? 
      `${sender.firstName || ''} ${sender.lastName || ''}`.trim() : 
      'Unknown User';
    
    const avatar = sender.avatar || 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(senderName)}&background=random`;
    
    const userRole = sender.role || 'user';
    
    // Force consistency using chatUserId from localStorage
    const chatUserId = localStorage.getItem('chatUserId');
    const isCurrentUser = chatUserId && sender._id && 
                         chatUserId.toString() === sender._id.toString();
    
    // Special styling for deleted messages
    if (message.deleted) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
            mb: 2,
            px: 1,
            opacity: 0.7 // Make deleted messages more faded
          }}
          key={message._id || `msg-${Date.now()}-${Math.random()}`}
        >
          <Box sx={{ 
            display: 'flex',
            flexDirection: isCurrentUser ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            width: '100%',
            gap: 1
          }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40,
                bgcolor: 'grey.500' // Gray avatar for deleted messages
              }}
            >
              {message.sender?.firstName?.charAt(0) || '?'}
            </Avatar>
            
            <Box sx={{ 
              maxWidth: '80%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{
                bgcolor: theme.palette.mode === 'dark' ? 
                  'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                color: theme.palette.text.secondary,
                p: 1.5,
                borderRadius: 2,
                fontStyle: 'italic'
              }}>
                {message.content}
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
    
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
          mb: 2,
          px: 1
        }}
        key={message._id || `msg-${Date.now()}-${Math.random()}`}
      >
        <Box sx={{ 
          display: 'flex',
          flexDirection: isCurrentUser ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          width: '100%',
          gap: 1
        }}>
          {/* Avatar */}
          <Avatar 
            src={avatar} 
            alt={senderName}
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: isCurrentUser ? 'primary.main' : 
                userRole === 'admin' ? 'error.main' : 'secondary.main'
            }}
          >
            {senderName.charAt(0)}
          </Avatar>
          
          {/* Message content */}
          <Box sx={{ 
            maxWidth: '80%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header with name, time and menu */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 0.5,
              flexDirection: isCurrentUser ? 'row-reverse' : 'row',
              gap: 1
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {senderName}
                {userRole === 'admin' && (
                  <Chip
                    label="Admin"
                    size="small"
                    color="error"
                    sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                  />
                )}
              </Typography>
              
              <Typography variant="caption" color="text.secondary">
                {formatDistanceToNow(new Date(message.timestamp))}
              </Typography>
              
              {/* Three-dot menu for all messages, not just current user's */}
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuOpen(e, message);
                }}
                sx={{ 
                  padding: '2px',
                  ml: isCurrentUser ? 'auto' : 0,
                  mr: isCurrentUser ? 0 : 'auto',
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
            
            {/* Message body with different styling based on user */}
            <Box sx={{
              bgcolor: isCurrentUser ? 
                theme.palette.primary.main : theme.palette.mode === 'dark' ? 
                'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
              color: isCurrentUser ? '#fff' : 'text.primary',
              p: 1.5,
              borderRadius: 2,
              maxWidth: '100%',
              wordBreak: 'break-word'
            }}>
              {/* Reply reference if present */}
              {message.replyTo && (
                <Box
                  sx={{
                    borderLeft: 2,
                    borderColor: isCurrentUser ? 'rgba(255, 255, 255, 0.5)' : 'primary.main',
                    pl: 1,
                    mb: 1,
                    opacity: 0.8,
                    fontSize: '0.9rem'
                  }}
                >
                  <Typography variant="body2" sx={{ color: isCurrentUser ? 'inherit' : 'text.secondary' }}>
                    {message.replyTo.content || 'Original message not available'}
                  </Typography>
                </Box>
              )}

              {/* Main message content */}
              <Typography variant="body1">
                {message.content || ''}
                {message.edited && (
                  <Typography 
                    component="span" 
                    variant="caption" 
                    sx={{ 
                      ml: 1,
                      opacity: 0.7,
                      color: isCurrentUser ? 'inherit' : 'text.secondary' 
                    }}
                  >
                    (edited)
                  </Typography>
                )}
              </Typography>

              {/* Updated attachment rendering */}
              {message.attachment && renderAttachment(message.attachment)}
            </Box>
            
            {/* Reactions if present */}
            {message.reactions?.length > 0 && (
              <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {message.reactions.map((reaction, i) => (
                  <Chip
                    key={i}
                    label={`${reaction.emoji} ${reaction.users?.length || 0}`}
                    size="small"
                    variant="outlined"
                    onClick={() => handleReaction(message._id, reaction.emoji)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  };


  useEffect(() => {
    console.log('Current chat room:', chatRoom);
  }, [chatRoom]);

  // Make the scroll button more prominent
  const scrollButtonStyle = {
    position: 'absolute',
    bottom: 65,
    right: 16,
    zIndex: 10,
    padding: '10px',
    minWidth: unreadCount > 0 ? '60px' : '40px',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  };

  // Add a leave chat function
  const handleLeaveChat = () => {
    if (!socket || !chatRoom) {
      console.log('Cannot leave chat: No active socket or chat room');
      return;
    }
    
    console.log('Leaving chat room:', chatRoom._id);
    socket.emit('leaveRoom', { roomId: chatRoom._id });
    
    // Optionally, you can redirect the user or show a confirmation message
    setMessages([
      ...messages,
      {
        _id: `system-leave-self-${Date.now()}`,
        system: true,
        content: 'You left the chat',
        timestamp: new Date().toISOString(),
      }
    ]);
    // Optional: redirect or show a different UI
    window.location.href = '/chat';
  };

  // 1. First, let's remove the direct DOM manipulation useEffect
  // Remove this entire useEffect block
  useEffect(() => {
    // Function to show typing indicator directly in the DOM
    const showTypingIndicator = (users) => {
      // ... (entire function)
    };
    
    // Function to hide typing indicator
    const hideTypingIndicator = () => {
      // ... (entire function)
    };
    
    // Use the array of typing users
    const typingUsersArray = ensureArray(typingList);
    console.log('DOM manipulation for typing:', typingUsersArray);
    
    if (typingUsersArray.length > 0) {
      showTypingIndicator(typingUsersArray);
    } else {
      hideTypingIndicator();
    }
    
    // Cleanup on unmount
    return () => {
      hideTypingIndicator();
    };
  }, [typingList, typingUpdateCounter]);

  // 2. Also remove the unmissable red bar indicator at the top
  // Remove this JSX block from the return statement:
  {/* Unmissable indicator */}
  {ensureArray(typingList).length > 0 && (
    <div 
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        right: '10px',
        backgroundColor: 'red',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '24px',
        zIndex: 2147483647,
        boxShadow: '0 0 50px red'
      }}
    >
      {ensureArray(typingList).join(', ')} IS TYPING!
    </div>
  )}

  // 3. Add a clean chip-based typing indicator above the input form
  // Add this before the Box component="form" element:

  {/* Subtle typing indicator chip */}
  {ensureArray(typingList).length > 0 && (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 2,
        mt: -1
      }}
    >
      <Chip
        icon={<PeopleIcon />}
        label={
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            {ensureArray(typingList).join(', ')} {ensureArray(typingList).length === 1 ? 'is' : 'are'} typing...
          </Typography>
        }
        size="medium"
        color="primary"
        variant="outlined"
        sx={{
          borderRadius: '16px',
          py: 0.5,
          px: 1,
          '& .MuiChip-icon': {
            color: theme.palette.primary.main,
            animation: 'pulse 1.5s infinite'
          }
        }}
      />
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
    {/* existing input form */}
  </Box>

  return (
    <Box sx={{ 
      py: 8, 
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      position: 'relative' // Ensure this is positioned relative for absolute positioning inside
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
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',
            pb: 2,
            mb: 2
          }}>
            <Typography variant="h6">
              {chatRoom?.name || 'Chat Room'}
            </Typography>
           <Box sx={{display:'flex'}} gap={1}>
           <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<ExitToAppIcon />}
              onClick={handleLeaveChat}
            >
              Leave Chat
            </Button>
            {chatRoom?.type === 'private' && (
        <Tooltip title="Manage Participants">
          <Button 
            onClick={() => setOpenParticipantsDialog(true)}
            size="small"
            color="primary"
            variant='outlined'
          >
            <GroupIcon /> Participants
          </Button>
        </Tooltip>
      )}
      </Box>
          </Box>
          

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
              {loading && page === 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
              
            
              
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((message) => (
                  <React.Fragment key={message._id || `msg-${Date.now()}-${Math.random()}`}>
                    {renderMessage(message)}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography align="center" color="text.secondary">
                        {loading ? 'Loading messages...' : 'No messages yet. Start the conversation!'}
                      </Typography>
                    }
                  />
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>

            {showScrollButton && (
              <Fab
                color="primary"
                size="medium"
                aria-label="scroll to bottom"
                onClick={scrollToBottom}
                sx={scrollButtonStyle}
                variant={unreadCount > 0 ? "extended" : "circular"}
              >
                {unreadCount > 0 ? (
                  <>
                    <Badge badgeContent={unreadCount} color="error" sx={{ mr: 1 }}>
                      <ArrowDownwardIcon />
                    </Badge>
                    New
                  </>
                ) : (
                  <ArrowDownwardIcon />
                )}
              </Fab>
            )}

            {/* Subtle typing indicator chip */}
            {ensureArray(typingList).length > 0 && (
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'flex-start',
                  mb: 2,
                  mt: -1
                }}
              >
                <Chip
                  icon={<PeopleIcon />}
                  label={
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      {ensureArray(typingList).join(', ')} {ensureArray(typingList).length === 1 ? 'is' : 'are'} typing...
                    </Typography>
                  }
                  size="medium"
                  color="primary"
                  variant="outlined"
                  sx={{
                    borderRadius: '16px',
                    py: 0.5,
                    px: 1,
                    '& .MuiChip-icon': {
                      color: theme.palette.primary.main,
                      animation: 'pulse 1.5s infinite'
                    }
                  }}
                />
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
                    Replying to {replyTo.sender.firstName} {replyTo.sender.lastName}
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
                      bottom: '100%',
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
                    id="message-input"
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder={editingMessage ? "Edit your message..." : "Type your message..."}
                    value={newMessage}
                    onChange={handleTyping}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
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
        
        {/* Only show Edit/Delete for current user's messages */}
        {selectedMessage && (() => {
          // Get current user ID from localStorage
          const chatUserId = localStorage.getItem('chatUserId');
          const senderId = selectedMessage.sender?._id?.toString();
          
          // Show edit/delete only if it's the current user's message
          return chatUserId && senderId && chatUserId === senderId;
        })() && (
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
              handleDelete(selectedMessage);
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

      <ChatParticipantsManager
        roomId={chatRoom?._id}
        open={openParticipantsDialog}
        onClose={() => setOpenParticipantsDialog(false)}
        onParticipantsUpdated={() => {
          // Refresh room data if needed
          if (fetchMessagesForRoom) {
            fetchMessagesForRoom(chatRoom._id);
          }
        }}
      />
    </Box>
  );
};

export default GlobalLiveChat;