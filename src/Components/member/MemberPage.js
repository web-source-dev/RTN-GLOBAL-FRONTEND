import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Person, Assignment, Chat, Menu, Analytics, Description, Settings, Group } from '@mui/icons-material';
import ProfileSection from './sections/ProfileSection';
import ProjectTracker from './sections/ProjectTracker';
import ChatSystem from './sections/ChatSystem';
import SettingsSection from './sections/SettingsSection';

const drawerWidth = 240;

function MemberPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Profile', icon: <Person />, component: <ProfileSection /> },
    { text: 'Projects', icon: <Assignment />, component: <ProjectTracker /> },
    { text: 'Chat', icon: <Chat />, component: <ChatSystem /> },
    { text: 'Settings', icon: <Settings />, component: <SettingsSection /> },
  ];

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" noWrap component="div">
          RTN Global
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() => setActiveSection(index)}
            selected={activeSection === index}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mb: 2 }}
          >
            <Menu />
          </IconButton>
        )}
        <Paper sx={{ p: 2 }}>
          {menuItems[activeSection].component}
        </Paper>
      </Box>
    </Box>
  );
}

export default MemberPage;