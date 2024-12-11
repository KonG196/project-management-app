import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from '@mui/material';
import { addTask, removeTask, updateTaskStatus } from '../features/tasks/tasksSlice';
import {
  addPersonToProject,
  removePersonFromProject,
} from '../features/projects/projectsSlice';

const ProjectDetails = () => {
  const { id } = useParams();
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks.filter((task) => task.projectId === id));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const project = projects.find((p) => p.id === id);

  const [taskTitle, setTaskTitle] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [isPersonDialogOpen, setPersonDialogOpen] = useState(false);

  if (!project) return <Typography>Проект не знайдено</Typography>;

  const isAdmin = user?.role === 'admin';

  // Додавання завдання
  const handleAddTask = () => {
    if (taskTitle && personEmail) {
      dispatch(addTask({ id: Date.now().toString(), title: taskTitle, projectId: id, assignedTo: personEmail }));
      setTaskDialogOpen(false);
      setTaskTitle('');
      setPersonEmail('');
    }
  };

  // Видалення завдання
  const handleDeleteTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  // Додавання учасника
  const handleAddPerson = () => {
    if (personEmail) {
      dispatch(addPersonToProject({ projectId: id, personEmail }));
      setPersonDialogOpen(false);
      setPersonEmail('');
    }
  };

  // Видалення учасника
  const handleRemovePerson = (personEmail) => {
    dispatch(removePersonFromProject({ projectId: id, personEmail }));
  };

  // Зміна статусу завдання
  const handleTaskStatusChange = (taskId, currentStatus) => {
    dispatch(updateTaskStatus({ id: taskId, completed: !currentStatus }));
  };

  // Функція для отримання даних учасника
  const getUserData = (email) => users.find((u) => u.email === email) || {};

  return (
    <Box sx={{ padding: '24px', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {project.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, color: 'gray' }}>
        {project.description}
      </Typography>

      {/* Учасники */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Команда
        </Typography>
        <Grid container spacing={2}>
          {project.team.map((email) => {
            const userData = getUserData(email);
            return (
              <Grid item xs={12} sm={6} md={4} key={email}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    border: '1px solid #ddd',
                  }}
                >
                  <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }}>{userData.name?.[0]?.toUpperCase()}</Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {userData.name || 'Невідомо'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {email}
                    </Typography>
                  </Box>
                  {isAdmin && (
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleRemovePerson(email)}
                      sx={{ ml: 'auto' }}
                    >
                      Видалити
                    </Button>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {isAdmin && (
          <Button variant="contained" onClick={() => setPersonDialogOpen(true)} sx={{ mt: 2 }}>
            Додати учасника
          </Button>
        )}
      </Box>

      {/* Завдання */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Завдання
        </Typography>
        <Grid container spacing={2}>
          {tasks.map((task) => {
            const assignee = getUserData(task.assignedTo);
            return (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card
                  sx={{
                    padding: '16px',
                    border: '1px solid #ddd',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {task.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Avatar sx={{ bgcolor: '#1976d2' }}>{assignee.name?.[0]?.toUpperCase()}</Avatar>
                      <Box>
                        <Typography variant="body2">
                          Призначено: {assignee.name || 'Невідомо'}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: task.completed ? 'green' : 'red',
                            fontWeight: 'bold',
                          }}
                        >
                          Статус: {task.completed ? 'Виконано' : 'Не виконано'}
                        </Typography>
                      </Box>
                    </Box>
                    {task.assignedTo === user.email && (
                      <Checkbox
                        checked={task.completed || false}
                        onChange={() => handleTaskStatusChange(task.id, task.completed)}
                        sx={{ mt: 2 }}
                      />
                    )}
                  </CardContent>
                  {isAdmin && (
                    <Button color="error" size="small" onClick={() => handleDeleteTask(task.id)}>
                      Видалити
                    </Button>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {isAdmin && (
          <Button variant="contained" onClick={() => setTaskDialogOpen(true)} sx={{ mt: 2 }}>
            Додати завдання
          </Button>
        )}
      </Box>

      {/* Посилання на чат */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/chat"
          sx={{ fontWeight: 'bold' }}
        >
          Перейти до чату
        </Button>
      </Box>

      {/* Діалог додавання завдання */}
      <Dialog open={isTaskDialogOpen} onClose={() => setTaskDialogOpen(false)}>
        <DialogTitle>Додати завдання</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Назва завдання"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Select
            fullWidth
            value={personEmail}
            onChange={(e) => setPersonEmail(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Виберіть виконавця
            </MenuItem>
            {project.team.map((personEmail) => (
              <MenuItem key={personEmail} value={personEmail}>
                {getUserData(personEmail).name || personEmail}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTaskDialogOpen(false)}>Скасувати</Button>
          <Button variant="contained" onClick={handleAddTask}>
            Додати
          </Button>
        </DialogActions>
      </Dialog>

      {/* Діалог додавання учасника */}
      <Dialog open={isPersonDialogOpen} onClose={() => setPersonDialogOpen(false)}>
        <DialogTitle>Додати учасника</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={personEmail}
            onChange={(e) => setPersonEmail(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Виберіть учасника
            </MenuItem>
            {users
              .filter((u) => u.role === 'user' && !project.team.includes(u.email))
              .map((user) => (
                <MenuItem key={user.email} value={user.email}>
                  {user.name} ({user.email})
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPersonDialogOpen(false)}>Скасувати</Button>
          <Button variant="contained" onClick={handleAddPerson}>
            Додати
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetails;
