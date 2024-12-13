import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProject } from '../features/projects/projectsSlice';
import { addTask, removeTask } from '../features/tasks/tasksSlice';
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
  Select,
  MenuItem,
  Avatar,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import loadJSONData from '../LOAD_DATA';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const userTasks = tasks.filter((task) => task.assignedTo === user?.email);
  const userProjects = projects.filter((project) => project.team.includes(user?.email));

  const [searchQueryTasks, setSearchQueryTasks] = useState('');
  const [searchQueryProjects, setSearchQueryProjects] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskProjectId, setTaskProjectId] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');

  const filteredTasks = (user.role === 'admin' ? tasks : userTasks).filter((task) =>
    task.title.toLowerCase().includes(searchQueryTasks.toLowerCase())
  );

  const filteredProjects = (user.role === 'admin' ? projects : userProjects).filter((project) =>
    project.name.toLowerCase().includes(searchQueryProjects.toLowerCase())
  );

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleAddProject = () => {
    if (projectName) {
      dispatch(
        addProject({
          id: Date.now().toString(),
          name: projectName,
          description: description || 'Без опису',
          team: [],
        })
      );
      handleDialogClose();
      setProjectName('');
      setDescription('');
    }
  };

  const handleTaskDialogOpen = () => setTaskDialogOpen(true);
  const handleTaskDialogClose = () => setTaskDialogOpen(false);

  const handleAddTask = () => {
    if (taskTitle && taskProjectId && taskAssignee) {
      dispatch(
        addTask({
          id: Date.now().toString(),
          title: taskTitle,
          projectId: taskProjectId,
          assignedTo: taskAssignee,
          completed: false,
        })
      );
      setTaskDialogOpen(false);
      setTaskTitle('');
      setTaskProjectId('');
      setTaskAssignee('');
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
    <Box sx={{ minHeight: '70vh' }}>
      <Grid container spacing={3} mt={1}>
        {/* Tasks Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderRight: '1px solid #ccc',
            pr: 3,
          }}
        >
          <Typography variant="h5">
            {user.role === 'admin' ? 'Всі завдання' : 'Мої завдання'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <SearchIcon />
            <InputBase
              placeholder="Пошук завдань..."
              value={searchQueryTasks}
              onChange={(e) => setSearchQueryTasks(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          {user.role === 'admin' && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleTaskDialogOpen}
              sx={{ mb: 2 }}
            >
              Додати завдання
            </Button>
          )}
          <Grid container spacing={2} justifyContent="center">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const project = projects.find((proj) => proj.id === task.projectId);
                const projectName = project ? project.name : 'Без проєкту';

                return (
                  <Grid item xs={12} sm={6} key={task.id}>
                    <Card sx={{ minWidth: 250, maxWidth: 400 }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h6">{task.title}</Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontStyle: 'italic', color: 'gray', ml: 2 }}
                          >
                            {projectName}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          Призначено: {task.assignedTo === user.email ? 'Мені' : task.assignedTo}
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
                );
              })
            ) : (
              <Typography
                variant="body1"
                sx={{ mt: 2, textAlign: 'center', color: 'gray', width: '100%' }}
              >
                Завдань не знайдено
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Projects Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5">
            {user.role === 'admin' ? 'Всі проекти' : 'Мої проекти'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <SearchIcon />
            <InputBase
              placeholder="Пошук проектів..."
              value={searchQueryProjects}
              onChange={(e) => setSearchQueryProjects(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          {user.role === 'admin' && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleDialogOpen}
            >
              Додати проект
            </Button>
          )}
          <Grid container spacing={2} mt={2} justifyContent="center">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} key={project.id}>
                  <Card sx={{ minWidth: 250, maxWidth: 400 }}>
                    <CardContent>
                      <Typography variant="h6">{project.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {project.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        {project.team.map((email) => (
                          <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }} key={email}>
                            {email.charAt(0).toUpperCase()}
                          </Avatar>
                        ))}
                      </Stack>
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
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ mt: 2, textAlign: 'center', color: 'gray', width: '100%' }}
              >
                Проекти не знайдено
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
            {/* Діалог додавання завдання */}
            <Dialog open={taskDialogOpen} onClose={handleTaskDialogClose}>
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
            value={taskProjectId}
            onChange={(e) => setTaskProjectId(e.target.value)}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Виберіть проект
            </MenuItem>
            {projects.map((proj) => (
              <MenuItem key={proj.id} value={proj.id}>
                {proj.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            value={taskAssignee}
            onChange={(e) => setTaskAssignee(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Виберіть виконавця
            </MenuItem>
            {projects
              .find((proj) => proj.id === taskProjectId)
              ?.team.map((email) => (
                <MenuItem key={email} value={email}>
                  {email}
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTaskDialogClose}>Скасувати</Button>
          <Button variant="contained" onClick={handleAddTask}>
            Додати
          </Button>
        </DialogActions>
      </Dialog>
      {/* Діалог для додавання проекту */}
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
          <Button variant="contained" onClick={handleAddProject}>
            Додати
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        onClick={loadJSONData}
        variant="contained"
        style={{ position: 'fixed', bottom: '10px', right: '10px' }}
      >
        Завантажити дані з файлу
      </Button>
    </Box>
  );
};

export default Dashboard;
