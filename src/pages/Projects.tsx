import React, { useEffect, useState } from 'react'
import { QueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Typography, Link, ButtonGroup, Box } from '@mui/material';
import { getUserProjects } from '../services/ApiService';

import useModal from '../hooks/useModal';
import useAuth from '../hooks/useAuth';
import { CreateProjectModal, DeleteProjectModal, UpdateProjectModal } from '../components/Modals';

const queryClient = new QueryClient()

export default function Projects() {
  const [projects, setProjects] = useState<any>([]);

  const navigate = useNavigate()
  const modal = useModal()

  const goToProjects = (id: any) => navigate(`/projects/${id}`)
  const openCreateModal = () => modal?.onOpen({ title: 'Create Project', body: <CreateProjectModal mutation={mutate}/> })
  const openEditModal = (project: any) => modal?.onOpen({ title: 'Edit Project', body: <UpdateProjectModal project={project} mutation={mutate} />})
  const openDeleteModal = (project: any) => modal?.onOpen({ title: 'Delete Project', body: <DeleteProjectModal project={project} mutation={mutate} />})

  const auth = useAuth()
  const token = auth?.getToken()

  const { mutate, isLoading, isSuccess } = useMutation('getProjects', getUserProjects, {
    useErrorBoundary: true,
  })

  useEffect(() => {
    if (token && !isSuccess) {
      mutate(undefined, {
        onSuccess: (response) => {
          if (response?.data.ack === 1) {
            setProjects(response?.data.projects);
            return queryClient.invalidateQueries('getProjects')
          } else {
            throw new Error(response?.data.message)
          }
        }
      })
    }
  }, [token, mutate, isSuccess])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem 0.5rem', padding: '0 0.5rem' }}>
        <Typography variant='h4'>
          My Projects
        </Typography>
        <Button disabled={isLoading} variant="contained" onClick={openCreateModal}>
          Create New
        </Button>
      </Box>
      <Grid container sx={{ minHeight: '90%', padding: '0.5rem' }}>
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
                  <TableCell>
                    <Link onClick={() => goToProjects(project._id)} sx={{ cursor: 'pointer' }}>{project.name}</Link>
                  </TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <ButtonGroup>                 
                      <Button disabled={isLoading} variant="outlined" onClick={() => openEditModal(project)}>
                        Edit
                      </Button>
                      <Button disabled={isLoading} variant="outlined" color="error" onClick={() => openDeleteModal(project)}>
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              )) 
            }
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  )
}