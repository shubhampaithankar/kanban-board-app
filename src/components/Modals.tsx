import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useMutation } from "react-query";
import useModal from "../hooks/useModal";
import { createProject, deleteProject } from "../services/ApiService";

export const CreateProjectModal = () => {

  const [formData, setFormData] = useState({
   name: '',
   description: ''
  });
  const { onClose } = useModal()

  const createProjectMutation = useMutation(createProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        onClose()
      }
    },
  })

  const handleChange = (e: any) => {
     const { target: { name, value } } = e
     setFormData((prev: any) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = () => createProjectMutation.mutate(formData)

  return (
    <>
      <Typography variant="h5">Create New Project</Typography>
       <form onSubmit={handleSubmit} style={{ padding: '0.5rem' }}>
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            name='name'
            fullWidth
            value={formData.name}
            onChange={handleChange}
            sx={{ margin: '0.25rem' }} required
          />
          <TextField
            label="Description"
            variant="outlined"
            type="text"
            name='description'
            fullWidth
            value={formData.description}
            onChange={handleChange}
            sx={{ margin: '0.25rem' }} required
          />
        <Button type='submit' variant="contained">
          Create
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </form>
    </>
  )
}

export const DeleteProjectModal = ({ project: { id, name } }: any) => {
  const { onClose } = useModal()

  const deleteProjectMutation = useMutation(deleteProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        onClose()
      }
    },
  })

  const handleDeleteProject = () =>  deleteProjectMutation.mutate({ id })

  return (
    <>
      <Typography variant="h5">Are you sure you want to delete {name}?</Typography>
      <Button onClick={handleDeleteProject} variant="contained">
        Delete
      </Button>
      <Button onClick={onClose} variant="outlined">
        Cancel
      </Button>
    </>
  )
}
