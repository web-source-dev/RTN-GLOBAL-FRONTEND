import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ProjectTracker() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      status: 'In Progress',
      progress: 65,
      deadline: '2024-03-01',
      description: 'Complete overhaul of company website with modern design',
      milestones: [
        { id: 1, title: 'Design Approval', completed: true },
        { id: 2, title: 'Frontend Development', completed: true },
        { id: 3, title: 'Backend Integration', completed: false },
        { id: 4, title: 'Testing', completed: false },
      ],
    },
    // Add more sample projects as needed
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newMilestone, setNewMilestone] = useState('');

  const handleAddProject = () => {
    setSelectedProject(null);
    setOpenDialog(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const handleSaveProject = (formData) => {
    if (selectedProject) {
      setProjects(projects.map((p) =>
        p.id === selectedProject.id ? { ...p, ...formData } : p
      ));
    } else {
      setProjects([...projects, { id: Date.now(), ...formData }]);
    }
    setOpenDialog(false);
  };

  const handleAddMilestone = (projectId) => {
    if (!newMilestone) return;
    setProjects(projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          milestones: [
            ...p.milestones,
            { id: Date.now(), title: newMilestone, completed: false },
          ],
        };
      }
      return p;
    }));
    setNewMilestone('');
  };

  const handleToggleMilestone = (projectId, milestoneId) => {
    setProjects(projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          milestones: p.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          ),
        };
      }
      return p;
    }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddProject}
        >
          New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} key={project.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{project.name}</Typography>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleEditProject(project)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Chip
                  label={project.status}
                  color={
                    project.status === 'Completed' ? 'success' :
                    project.status === 'In Progress' ? 'primary' : 'default'
                  }
                  size="small"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Deadline: {project.deadline}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Progress: {project.progress}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={project.progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Typography variant="subtitle2" gutterBottom>Milestones</Typography>
              <List dense>
                {project.milestones.map((milestone) => (
                  <ListItem
                    key={milestone.id}
                    onClick={() => handleToggleMilestone(project.id, milestone.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ListItemText
                      primary={milestone.title}
                      sx={{
                        textDecoration: milestone.completed ? 'line-through' : 'none',
                      }}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        size="small"
                        label={milestone.completed ? 'Done' : 'Pending'}
                        color={milestone.completed ? 'success' : 'default'}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Add milestone"
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAddMilestone(project.id)}
                >
                  Add
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProject ? 'Edit Project' : 'New Project'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Name"
                  defaultValue={selectedProject?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  defaultValue={selectedProject?.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    defaultValue={selectedProject?.status || 'Not Started'}
                    label="Status"
                  >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Deadline"
                  type="date"
                  defaultValue={selectedProject?.deadline}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => handleSaveProject({})}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProjectTracker;