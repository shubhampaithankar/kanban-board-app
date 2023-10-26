import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAuth from '../hooks/useAuth';
import { updateUser } from '../services/ApiService';
import useModal from '../hooks/useModal';
import { UserUpdateModal } from '../components/Modals';

export default function Profile() {
  const { getUser } = useAuth()
  const user = getUser()

  const { onOpen } = useModal()

  // Use a single state object for form controls
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    region: '',
  });
  const [isTouched, setIsTouched] = useState(false)

  const clearForm = () => {
    setFormData({ username: '', dob: '', email: '', region: '' })
    setIsTouched(false)
  }

  const { mutate } = useMutation(updateUser,{
    useErrorBoundary: true
  })

  const handleChange = (e: any) => {
    const { target: { name, value } } = e
    setFormData(prev => ({ ...prev, [name]: value }))
    setIsTouched(true)
  }
    
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (isTouched) { // Bad way to check
      mutate(formData, {
          onSuccess: (response) => {
              if (response?.data.ack === 1) {
                clearForm()
                onOpen({
                  title: 'Success',
                  body: <UserUpdateModal />
                })
              } else {
                throw new Error(response.data.message)
              }
          }
      })
    }
  }

  useEffect(() => {
    if (user) {
        setFormData({
            username: user.username,
            email: user.email,
            dob: new Date(user.dob).toISOString().substring(0, 10),
            region: user.region,
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', flexDirection: 'column' }}>
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ margin: '0.5rem' }}>
                    Edit Profile
                </Typography>
            </Grid>
            <Grid item xs={10} sx={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit} style={{ padding: '0.5rem' }}>
                <TextField
                    label="Username"
                    fullWidth
                    value={formData.username}
                    onChange={handleChange}
                    disabled
                    sx={{ margin: '0.5rem 0.25rem' }}
                />
                <TextField
                    label="Email"
                    name='email'
                    fullWidth
                    type='text'
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ margin: '0.5rem 0.25rem' }}
                />
                <TextField
                    label="Date of Birth"
                    name='dob'
                    fullWidth
                    type='date'
                    value={formData.dob}
                    onChange={handleChange}
                    sx={{ margin: '0.5rem 0.25rem' }}
                />
                <TextField
                    label="Region"
                    name='region'
                    fullWidth
                    type='text'
                    value={formData.region}
                    onChange={handleChange}
                    sx={{ margin: '0.5rem 0.25rem' }}
                />
                <Button variant="contained" color="primary" type='submit'>
                    Save Changes
                </Button>
            </form>
            </Grid>
        </Grid>
    </>
  );
}