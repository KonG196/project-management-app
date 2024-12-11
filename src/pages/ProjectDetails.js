import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, updateTask } from '../features/tasks/tasksSlice';
import { addPerson, updatePerson, removePerson } from '../features/people/peopleSlice';
import { removeProject, addPersonToProject } from '../features/projects/projectsSlice';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = useSelector((state) =>
    state.projects.find((project) => project.id === id)
  );
  const tasks = useSelector((state) =>
    state.tasks.filter((task) => task.projectId === id)
  );
  const people = useSelector((state) =>
    state.people.filter((person) => project?.team.includes(person.id))
  );

  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');
  const [personName, setPersonName] = useState('');

  const handleAddTask = () => {
    if (taskTitle) {
      dispatch(addTask({ id: Date.now().toString(), title: taskTitle, projectId: id }));
      setTaskTitle('');
    }
  };

  const handleAddPerson = () => {
    if (personName) {
      const newPerson = { id: Date.now().toString(), name: personName };
      dispatch(addPerson(newPerson));
      dispatch(addPersonToProject({ projectId: id, personId: newPerson.id }));
      setPersonName('');
    }
  };

  const handleRemoveProject = () => {
    dispatch(removeProject(id));
    
  };

  return (
    <Box p={3}>
      <Typography variant="h4">{project?.name}</Typography>
      <Typography variant="body1" gutterBottom>
        {project?.description}
      </Typography>

      <Typography variant="h5" mt={3}>
        Tasks
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Task Title"
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>

      <Typography variant="h5" mt={3}>
        People
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Person Name"
          variant="outlined"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddPerson}>
          Add Person
        </Button>
      </Box>
      <List>
        {people.map((person) => (
          <ListItem key={person.id}>
            <ListItemText primary={person.name} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" color="error" mt={5}>
        Danger Zone
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleRemoveProject}>
        Delete Project
      </Button>
    </Box>
  );
};

export default ProjectDetails;
