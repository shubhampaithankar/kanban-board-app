import React, { useEffect } from 'react'
import { AppBar, Button, ButtonGroup, Grid, Typography } from '@mui/material'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { isAuthenticated, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    if (isAuthenticated) {
      logoutUser()
    } else {
      navigate('/auth')
    }
  }

  useEffect(() => {
  }, [isAuthenticated])

  return (
    <AppBar style={{ height: '50px', position: 'sticky', backgroundColor: 'gray' }} variant='outlined' elevation={0}>
      <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'row' }}>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Typography onClick={() => navigate('/home')}>KanBan Board</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            { isAuthenticated && <Button color="info" onClick={() => navigate('/projects')}>Projects</Button> }
            { isAuthenticated && <Button color="info" onClick={() => navigate('/profile')}>My Profile</Button> }
            <Button color="secondary" onClick={handleClick}>
              { isAuthenticated ? 'Logout': 'Login / Register' }
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </AppBar>
  )
}