import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProject, removeProject } from '../features/projects/projectsSlice';
import { addPerson, removePerson } from '../features/people/peopleSlice';
import { login } from '../features/authSlice';

import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  InputBase,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const Dashboard = () => {
  const projects = useSelector((state) => state.projects);
  const people = useSelector((state) => state.people);
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [personName, setPersonName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');
const [registerEmail, setRegisterEmail] = useState('');
const [registerPassword, setRegisterPassword] = useState('');
const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');


  const handleAddProject = () => {
    if (projectName) {
      dispatch(
        addProject({
          id: Date.now().toString(),
          name: projectName,
          description: description || 'No description',
        })
      );
      setProjectName('');
      setDescription('');
    }
  };

  const handleRemoveProject = (id) => {
    dispatch(removeProject(id));
  };

  const handleAddPerson = () => {
    if (personName && projectId) {
      dispatch(
        addPerson({
          id: Date.now().toString(),
          name: personName,
          projectId,
        })
      );
      setPersonName('');
      setProjectId('');
    }
  };

  const handleRemovePerson = (id) => {
    dispatch(removePerson(id));

  };


const handleLogin = () => {
  if (loginEmail && loginPassword) {
    // Замість цього додайте запит до API для перевірки логіну
    dispatch(login({ email: loginEmail }));
    console.log('Успішний вхід:', loginEmail);
  }
};

const handleRegister = () => {
  if (registerPassword === registerConfirmPassword) {
    // Замість цього додайте запит до API для реєстрації
    dispatch(login({ email: registerEmail }));
    console.log('Успішна реєстрація:', registerEmail);
  } else {
    console.error('Паролі не збігаються!');
  }
};


  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: '#ebe8de', minHeight: '100vh' }}>
      {/* Header with Search */}
      <AppBar position="static" color="primary"
      sx={{backgroundColor: '#ebe8de'}}>
  <Toolbar sx={{ justifyContent: 'center' }}>

    <Typography variant="h5" sx={{ position: 'absolute', left: '5vh', color: '#e85a4f' }}>
          Панель управління проектами
    </Typography>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ebe8de',
        padding: '0 10px',
        width: '300px', 
        height: '40px',
        border: '3px solid #e85a4f',
        borderRadius: '5px'
      }}
    >
      <SearchIcon sx={{color: '#e85a4f'}} />
      <InputBase
        placeholder="Пошук проєктів..."
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
      />
    </Box>
  </Toolbar>
</AppBar>

      {/* Main Content */}
      <Box p={3}>
        {/* Add Project Form */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Назва проєкту"
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Опис"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddProject}
          >
            Додати
          </Button>
        </Box>
        <Box>
  <Typography variant="h5">Логін</Typography>
  <TextField
    label="Email"
    value={loginEmail}
    onChange={(e) => setLoginEmail(e.target.value)}
    fullWidth
  />
  <TextField
    label="Пароль"
    type="password"
    value={loginPassword}
    onChange={(e) => setLoginPassword(e.target.value)}
    fullWidth
  />
  <Button variant="contained" onClick={handleLogin}>
    Увійти
  </Button>
</Box>

<Box>
  <Typography variant="h5">Реєстрація</Typography>
  <TextField
    label="Email"
    value={registerEmail}
    onChange={(e) => setRegisterEmail(e.target.value)}
    fullWidth
  />
  <TextField
    label="Пароль"
    type="password"
    value={registerPassword}
    onChange={(e) => setRegisterPassword(e.target.value)}
    fullWidth
  />
  <TextField
    label="Підтвердьте пароль"
    type="password"
    value={registerConfirmPassword}
    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
    fullWidth
  />
  <Button variant="contained" onClick={handleRegister}>
    Зареєструватися
  </Button>
</Box>
        <Grid container spacing={3}>
          {/* Projects Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Проєкти
            </Typography>
            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} key={project.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{project.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {project.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        component={Link}
                        to={`/project/${project.id}`}
                      >
                        Деталі
                      </Button>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleRemoveProject(project.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* People Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Користувачі
            </Typography>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="Ім'я користувача"
                variant="outlined"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                fullWidth
              />
              <TextField
                select
                label="Виберіть проєкт"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                SelectProps={{ native: true }}
                fullWidth
              >
                <option value=""></option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </TextField>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PeopleIcon />}
                onClick={handleAddPerson}
              >
                Додати
              </Button>
            </Box>
            <List>
              {people.map((person) => (
                <ListItem
                  key={person.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleRemovePerson(person.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={person.name}
                    secondary={`Проєкт: ${
                      projects.find((p) => p.id === person.projectId)?.name ||
                      'None'
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
