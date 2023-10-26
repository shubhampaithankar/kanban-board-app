import React from 'react'
import { AppBar, Button, ButtonGroup, Grid, Typography } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    if (auth?.isAuthenticated) {
      auth?.logoutUser()
    } else {
      navigate('/auth')
    }
  }

  return (
    <AppBar style={{ height: '50px', position: 'sticky', backgroundColor: 'gray' }} variant='outlined' elevation={0}>
      <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'row' }}>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Typography variant='h4' onClick={() => navigate('/home')}>KanBan Board</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            { auth?.isAuthenticated && <Button color="info" onClick={() => navigate('/projects')}>Projects</Button> }
            { auth?.isAuthenticated && <Button color="info" onClick={() => navigate('/profile')}>My Profile</Button> }
            <Button color="secondary" onClick={handleClick}>
              { auth?.isAuthenticated ? 'Logout': 'Login / Register' }
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </AppBar>
  )
}