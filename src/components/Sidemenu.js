import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

const SideMenu = () => {
  const menuItems = [
    { text: 'Головна', icon: <DashboardIcon />, path: '/' },
    { text: 'Команди', icon: <GroupIcon />, path: '/teams' },
    { text: 'Налаштування', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent" // Якщо потрібно постійно відображати меню
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <h3>Меню</h3>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
