import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Typography, TextField } from '@mui/material';
import { getUserProjects } from '../services/ApiService';

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
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          projects.length > 0 && projects.map((project: any, index: number) => (
            <TableRow key={project._id}>
              <TableCell>{index+1}</TableCell>
              <TableCell onClick={() => handleClick(project._id)}>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
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