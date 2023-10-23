import { AppBar, Grid, Typography } from '@mui/material'
import React from 'react'

export default function Navbar() {
  return (
    <AppBar style={{ height: '50px', position: 'sticky' }}>
      <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'row' }}>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Typography>KanBan Board</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Typography>Login</Typography>
        </Grid>
      </Grid>
    </AppBar>
  )
}