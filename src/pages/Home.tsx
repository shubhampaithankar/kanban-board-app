import React from 'react'
import useAuth from '../hooks/useAuth'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const auth = useAuth()
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ margin: '0.5rem auto' }}>
        {auth?.isAuthenticated ? 'Go to My Projects' : 'The Kanban Board'}
      </Typography>
      {auth?.isAuthenticated && (
        <Button
          variant="contained"
          color="primary"
          // Add the link to My Projects here
          onClick={() => navigate('/projects')}
        >
          My Projects
        </Button>
      )}
    </Box>
  )
}