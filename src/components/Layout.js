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
import { AiOutlineInstagram } from 'react-icons/ai';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


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

  const role = (() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find((u) => u.email === user?.email);

    switch (currentUser?.role) {
      case 'admin':
        return 'Адміністратор';
      case 'user':
        return 'Розробник';
    }
  })();


  return (
    <Box sx={{ display: 'flex', color: '#1f1704' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
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
            backgroundColor: '#efb11d',
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
          <List sx={{ color: '#1f1704' }}>
            <ListItem button component={Link} to="/" sx={{ color: '#1f1704', padding: '15px 15px' }}>
              <ListItemText primary="Головна" primaryTypographyProps={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} />
            </ListItem>
            {role !== 'Адміністратор' && (
              <>
                <ListItem button component={Link} to="/tasks" sx={{ color: '#1f1704', padding: '15px 15px' }}>
                  <ListItemText primary="Завдання" primaryTypographyProps={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} />
                </ListItem>
              </>
            )}
            <ListItem button component={Link} to="/chat" sx={{ color: '#1f1704', padding: '15px 15px' }}>
              <ListItemText primary="Чат" primaryTypographyProps={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} />
            </ListItem>
          </List>

          {/* Footer в Drawer */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {role}
            </Typography>
            <Typography
  variant="body2"
  color="textSecondary"
  sx={{
    maxWidth: '200px', // Максимальна ширина блоку
    whiteSpace: 'nowrap', // Заборонити перенос рядка
    overflow: 'hidden', // Приховати текст, що виходить за межі
    textOverflow: 'ellipsis', // Додати "..." для обрізаного тексту
    fontSize: user?.email?.length > 25 ? '0.8rem' : '1rem', // Динамічний розмір шрифта
    textAlign: 'center', // Вирівнювання по центру
  }}
>
  {user?.email}
</Typography>
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
          ml: isDrawerOpen ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar />
        <Outlet />
        {children}

        {/* Footer на сторінці */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            padding: "13px",
            borderTop: '1px solid #ccc',
            textAlign: 'center',

          }}
        >
          <Typography variant="body1">© Нагина Максим 2024. Усі права захищені.</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <IconButton component="a" href="https://www.instagram.com/just___maks/" target="_blank" color="primary">
              <AiOutlineInstagram size={24} />
            </IconButton>

            <IconButton component="a" href="https://linkedin.com/in/maksym-nahyna-4518ab277" target="_blank" color="primary">
              <LinkedInIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/KonG196" target="_blank" color="primary">
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="mailto:maks060691@gmail.com" target="_blank" color="primary">
              Gmail
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
