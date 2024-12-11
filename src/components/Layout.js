import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const role = user?.email === 'maks060691@gmail.com' ? 'Адміністратор' : 'Розробник';

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            HoReCa Management Solution
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffcc00', // Колір як у хедера
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: 'auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Головна" sx={{ color: '#4a4a4a' }} />
            </ListItem>
            <ListItem button component={Link} to="/projects">
              <ListItemText primary="Проекти" sx={{ color: '#4a4a4a' }} />
            </ListItem>
            <ListItem button component={Link} to="/tasks">
              <ListItemText primary="Завдання" sx={{ color: '#4a4a4a' }} />
            </ListItem>
            <ListItem button component={Link} to="/team">
              <ListItemText primary="Команда" sx={{ color: '#4a4a4a' }} />
            </ListItem>
          </List>

          {/* Footer для користувача */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f9a825',
              padding: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Іконка та інформація про користувача */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                {user?.name?.[0].toUpperCase()}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.role === 'admin' ? 'Адміністратор' : 'Розробник'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordWrap: 'break-word',
                  maxWidth: '150px',
                  overflowWrap: 'break-word',
                }}
              >
                {user?.email}
              </Typography>
            </Box>

            {/* Кнопка виходу */}
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: '100%',
                marginTop: '16px',

              }}
              onClick={handleLogout}
            >
              Вийти
            </Button>
          </Box>

        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: isDrawerOpen ? `${drawerWidth}px` : 0, // Динамічний відступ
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar />
        <Outlet />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
