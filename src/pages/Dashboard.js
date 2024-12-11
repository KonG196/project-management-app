import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProject } from '../features/projects/projectsSlice';
import { removeTask } from '../features/tasks/tasksSlice';
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  IconButton,
  InputBase,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // Завдання та проекти користувача
  const userTasks = tasks.filter((task) => task.assignedTo === user?.email);
  const userProjects = projects.filter((project) => project.team.includes(user?.email));

  // Стани діалогів
  const [searchQueryTasks, setSearchQueryTasks] = useState('');
  const [searchQueryProjects, setSearchQueryProjects] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  // Фільтрація
  const filteredTasks = user.role === 'admin' ? tasks : userTasks;
  const filteredProjects = user.role === 'admin' ? projects : userProjects;

  // Обробка подій
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleAddProject = () => {
    if (projectName) {
      dispatch(
        addProject({
          id: Date.now().toString(),
          name: projectName,
          description: description || 'Без опису',
          team: [user.email], // Додаємо автора проекту
        })
      );
      handleDialogClose();
    }
  };

  const handleTaskCompletionChange = (taskId) => {
    dispatch({
      type: 'tasks/updateTaskStatus',
      payload: { id: taskId },
    });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  return (
    <Box sx={{ minHeight: '100vh', padding: '16px' }}>
      <Grid container spacing={3} mt={2}>
        {/* Завдання */}
        <Grid item xs={5}>
          <Typography variant="h6">Мої завдання</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <SearchIcon />
            <InputBase
              placeholder="Пошук завдань..."
              onChange={(e) => setSearchQueryTasks(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          <Grid container spacing={2}>
            {filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} key={task.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Призначено: {task.assignedTo === user.email ? 'Мені' : task.assignedTo}
                    </Typography>
                    {task.assignedTo === user.email && (
                      <Checkbox
                        checked={task.completed || false}
                        onChange={() => handleTaskCompletionChange(task.id)}
                        label="Виконано"
                      />
                    )}
                  </CardContent>
                  {user.role === 'admin' && (
                    <CardActions>
                      <IconButton color="error" onClick={() => handleDeleteTask(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Проекти */}
        <Grid item xs={7}>
          <Typography variant="h5">Мої проекти</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <SearchIcon />
            <InputBase
              placeholder="Пошук проектів..."
              onChange={(e) => setSearchQueryProjects(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          {user.role === 'admin' && (
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleDialogOpen}>
              Додати проект
            </Button>
          )}
          <Grid container spacing={2} mt={2}>
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
                      variant="outlined"
                      component={Link}
                      to={`/project/${project.id}`}
                    >
                      Деталі
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Діалог додавання проекту */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
        <DialogTitle>Додати проект</DialogTitle>
        <DialogContent>
          <TextField
            label="Назва проекту"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Скасувати
          </Button>
          <Button onClick={handleAddProject} variant="contained" color="primary">
            Додати
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
