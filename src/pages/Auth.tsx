import React, { useEffect, useState } from 'react'
import { Typography, TextField, Button, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { loginUser, registerUser } from '../services/ApiService';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useModal from '../hooks/useModal';
import { UserRegisterModal } from '../components/Modals';

export default function Auth() {

  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    dob: '',
    region: ''
  })

  const auth = useAuth()
  const navigate = useNavigate()

  const modal = useModal()

  const handleChange = (e: any) => {
    const { target: { name, value } } = e
    setFormData(prev => ({ ...prev, [name]: value }))
  };

  const { isLoading, mutate } = useMutation(isRegistering ? registerUser : loginUser);
  const clearForm = () => setFormData({ username: '', password: '', dob: '', email: '', region: '' })

  const handleSubmit = (e: any) => {
    e.preventDefault(); 
    const data = isRegistering ? formData : { username: formData.username, password: formData.password }
    mutate(data, {
      onSuccess: (response) => {
        if (response?.data.ack === 1) {
          if (!isRegistering) {
            auth?.setToken(response?.data.token)
          } else {
            modal?.onOpen({
              title: 'Success',
              body: <UserRegisterModal />
            })
            setIsRegistering(false)
          }
        } else {
          throw new Error(response?.data.message)
        }
      },
      onError: (error) => {
        console.log(error)
      }, 
      onSettled: () => {
        clearForm()
      }
    })
  };

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate('/projects')
    }
  }, [auth?.isAuthenticated, navigate])

  return (
    <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', flexDirection: 'column' }}>
      <Grid item xs={2} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ margin: '0.5rem' }}>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
      </Grid>
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        <form onSubmit={handleSubmit} style={{ padding: '0.5rem' }}>
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            name='username'
            fullWidth
            value={formData.username}
            onChange={handleChange}
            sx={{ margin: '0.25rem' }} required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name='password'
            fullWidth
            value={formData.password}
            onChange={handleChange}
            sx={{ margin: '0.25rem' }} required
          />
          {
            isRegistering && (
              <>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  name='email'
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ margin: '0.25rem' }} required
                />
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  name='dob'
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formData.dob}
                  onChange={handleChange}
                  sx={{ margin: '0.25rem' }} required
                />
                <TextField
                  label="Region"
                  variant="outlined"
                  type="text"
                  name='region'
                  fullWidth
                  value={formData.region}
                  onChange={handleChange}
                  sx={{ margin: '0.25rem' }} required
                />
              </>
            )
          }
          <Button disabled={isLoading} type="submit" variant="contained" color="primary" sx={{ margin: '0.5rem' }}>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" sx={{ margin: '0.25rem' }}>
          { isRegistering ? "Already have an account?": "Don't have an account?" }
          <Button disabled={isLoading} onClick={() => {setIsRegistering(!isRegistering); clearForm()}}>
            {isRegistering ? 'Login' : 'Register'}
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
}