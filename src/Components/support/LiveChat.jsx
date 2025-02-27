import React from 'react';
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
  Avatar,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';

const LiveChat = () => {
  const theme = useTheme();

  const handleSendMessage = (event) => {
    event.preventDefault();
    // Handle message sending logic here
  };

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          color="text.primary"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Live Chat Support
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            maxWidth: 800,
            mx: 'auto',
            borderRadius: 2,
          }}
        >
          <Box sx={{ height: 400, display: 'flex', flexDirection: 'column' }}>
            <List sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
              <ListItem>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                  <ChatIcon />
                </Avatar>
                <ListItemText
                  primary="Support Agent"
                  secondary="Hello! How can I help you today?"
                />
              </ListItem>
            </List>
            <Box component="form" onSubmit={handleSendMessage}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  variant="outlined"
                  size="small"
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LiveChat;