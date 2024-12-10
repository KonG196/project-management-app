import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, updateTask } from '../features/tasks/tasksSlice';
import { addPerson, removePerson, updatePerson } from '../features/people/peopleSlice';
import { removeProject } from '../features/projects/projectsSlice';
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
    state.projects.find((proj) => proj.id === id)
  );
  const tasks = useSelector((state) =>
    state.tasks.filter((task) => task.projectId === id)
  );
  const people = useSelector((state) =>
    state.people.filter((person) => person.projectId === id)
  );

  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [personName, setPersonName] = useState('');
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editedPersonName, setEditedPersonName] = useState('');

  const handleAddTask = () => {
    if (taskTitle) {
      dispatch(addTask({ id: Date.now().toString(), title: taskTitle, projectId: id }));
      setTaskTitle('');
    }
  };

  const handleEditTask = (taskId, title) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(title);
  };

  const handleSaveTask = () => {
    if (editedTaskTitle) {
      dispatch(updateTask({ id: editingTaskId, title: editedTaskTitle }));
      setEditingTaskId(null);
      setEditedTaskTitle('');
    }
  };

  const handleAddPerson = () => {
    if (personName) {
      dispatch(addPerson({ id: Date.now().toString(), name: personName, projectId: id }));
      setPersonName('');
    }
  };

  const handleEditPerson = (personId, name) => {
    setEditingPersonId(personId);
    setEditedPersonName(name);
  };

  const handleSavePerson = () => {
    if (editedPersonName) {
      dispatch(updatePerson({ id: editingPersonId, name: editedPersonName }));
      setEditingPersonId(null);
      setEditedPersonName('');
    }
  };

  const handleRemoveProject = () => {
    dispatch(removeProject(id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4">{project?.name}</Typography>
      <Typography variant="body1" gutterBottom>{project?.description}</Typography>

      <Typography variant="h5" mt={3}>Tasks</Typography>
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
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <>
                {editingTaskId === task.id ? (
                  <>
                    <TextField
                      variant="outlined"
                      value={editedTaskTitle}
                      onChange={(e) => setEditedTaskTitle(e.target.value)}
                      size="small"
                    />
                    <Button onClick={handleSaveTask}>Save</Button>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => handleEditTask(task.id, task.title)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(removeTask(task.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </>
            }
          >
            <ListItemText primary={task.title} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" mt={3}>People</Typography>
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
          <ListItem
            key={person.id}
            secondaryAction={
              <>
                {editingPersonId === person.id ? (
                  <>
                    <TextField
                      variant="outlined"
                      value={editedPersonName}
                      onChange={(e) => setEditedPersonName(e.target.value)}
                      size="small"
                    />
                    <Button onClick={handleSavePerson}>Save</Button>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => handleEditPerson(person.id, person.name)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(removePerson(person.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </>
            }
          >
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
