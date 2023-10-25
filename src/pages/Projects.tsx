import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Typography } from '@mui/material';
import { createProject, getUserProjects } from '../services/ApiService';

import useModal from '../hooks/useModal';
import useAuth from '../hooks/useAuth';

export default function Projects() {

  const centerAlign = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem'
  }

  const [projects, setProjects] = useState<any>([]);


  const navigate = useNavigate()
  const { onOpen } = useModal()

  const handleClick = (id: any) => navigate(`/projects/${id}`)
  const openCreateModal = () => onOpen({ title: '', body: '' })

  const { getToken } = useAuth()
  const token = getToken()

  const { mutate, data: response, isLoading, isSuccess } = useMutation('projects', getUserProjects, {
    useErrorBoundary: true, 
  })

  useEffect(() => {
    if (token) {
      mutate()
    }
  }, [token, mutate])
  
  useEffect(() => {
    if (isSuccess) {
      if (response?.data.ack === 1) {
        setProjects(response?.data.projects);
      }
    }
  }, [isSuccess, response?.data.ack, response?.data.projects])

  return (
    <Grid container padding={'0.5rem'}>
      <Grid item xs={8} sx={centerAlign}>
        <Typography variant='h4'>
          My Projects
        </Typography>
      </Grid>
      <Grid item xs={4} sx={centerAlign}>
        <Button disabled={isLoading} variant="contained" onClick={openCreateModal}>
          Create New
        </Button>
      </Grid>
      <Grid item xs={12} textAlign='center'>
      <Table sx={{ border: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          projects.length > 0 && projects.map((project: any) => (
            <TableRow key={project._id}>
              <TableCell onClick={() => handleClick(project._id)}>{project.name}</TableCell>
              <TableCell>
                <Button disabled={isLoading} variant="outlined">
                  Edit
                </Button>
                <Button disabled={isLoading} variant="outlined" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )) 
        }
        </TableBody>
      </Table>
      </Grid>
    </Grid>
  )
}

const CreateProjectModal = () => {

  const [newProjectName, setNewProjectName] = useState('');
  const { onClose } = useModal()

  const createProjectMutation = useMutation(createProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        setNewProjectName('');
        onClose()
      }
    },
  })

  const handleCreateProject = () => {
    if (newProjectName) {
      createProjectMutation.mutate(newProjectName);
    }
  }

  return (
    <>
      <Typography variant="h5">Create New Project</Typography>
      <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} required />
      <Button onClick={handleCreateProject} variant="contained">
        Create
      </Button>
      <Button onClick={onClose} variant="outlined">
        Cancel
      </Button>
    </>
  )
}