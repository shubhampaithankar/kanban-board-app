import { useState } from "react";
import { Typography, TextField, Button, Select, MenuItem, ButtonGroup, Box } from "@mui/material";
import { useMutation } from "react-query";
import { createProject, createTask, deleteProject, deleteTask, updateProject, updateTask } from "../services/ApiService";
import useModal from "../hooks/useModal";

const ButtonStyles = { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'unset', marginTop: '1rem' }

// Project Modals
export const CreateProjectModal = ({ mutation }: any) => {

  const [formData, setFormData] = useState({
   name: '',
   description: ''
  });
  const modal = useModal()

  const createProjectMutation = useMutation(createProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        modal?.onClose()
        mutation()
      } else {
        throw new Error(response.data.message)
      }
    },
  })

  const handleChange = (e: any) => {
     const { target: { name, value } } = e
     setFormData((prev: any) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    createProjectMutation.mutate(formData)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
       <form onSubmit={handleSubmit} style={{ padding: '0.5rem' }}>
          <TextField
            label="Name"
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
            sx={{ margin: '0.25rem' }}
          />
        <ButtonGroup variant="contained" sx={ButtonStyles}>
          <Button type='submit'>
            Create
          </Button>
          <Button onClick={() => modal?.onClose()} variant="outlined">
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  )
}

export const UpdateProjectModal = ({ project: { _id: id, name, description }, mutation }: any) => {

  const [formData, setFormData] = useState({
   name,
   description
  });
  const modal = useModal()

  const updateProjectMutation = useMutation(updateProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        modal?.onClose()
        mutation()
      } else {
        throw new Error(response.data.message)
      }
    },
  })

  const handleChange = (e: any) => {
     const { target: { name, value } } = e
     setFormData((prev: any) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    updateProjectMutation.mutate({ id, data: formData })
  }

  return (
    <>
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
          <ButtonGroup variant="contained" sx={ButtonStyles}>
            <Button type='submit' variant="contained">
              Update
            </Button>
            <Button onClick={() => modal?.onClose()} variant="outlined">
              Cancel
            </Button>
          </ButtonGroup>
      </form>
    </>
  )
}

export const DeleteProjectModal = ({ project: { _id: id, name }, mutation }: any) => {
  const modal = useModal()

  const deleteProjectMutation = useMutation(deleteProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        modal?.onClose()
        mutation()
      } else {
        throw new Error(response.data.message)
      }
    },
  })

  const handleDeleteProject = (e: any) =>  {
    e.preventDefault()
    deleteProjectMutation.mutate({ id })
  }

  return (
    <>
      <Typography variant="h5">Are you sure you want to delete {name}?</Typography>
      <ButtonGroup variant="contained" sx={ButtonStyles}>
        <Button onClick={handleDeleteProject} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={() => modal?.onClose()} variant="outlined">
          Cancel
        </Button>
      </ButtonGroup>
    </>
  )
}

// Task Modals 
export const CreateTaskModal = ({ mutation, id }: any) => {
  const priorities = ['Low', 'Medium', 'High']
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    labels: [''],
    dueDate: ''
   });
   const modal = useModal()
 
   const { mutate, isLoading } = useMutation(createTask, {
     onSuccess: (response) => {
       if (response.data.ack === 1) {
        modal?.onClose()
        mutation({ id })
       } else {
        throw new Error(response.data.message)
      }
     },
   })
 
   const handleChange = (e: any) => {
      const { target: { name, value } } = e
      setFormData((prev: any) => ({ ...prev, [name]: value }))
   };
 
   const handleSubmit = (e: any) => {
    e.preventDefault()
    mutate({ id, data: formData })
   }
 
   return (
     <>
       <Typography variant="h5">Create New Project</Typography>
        <form onSubmit={handleSubmit} style={{ padding: '0.5rem' }}>
           <TextField
             label="Title"
             variant="outlined"
             type="text"
             name='title'
             fullWidth
             value={formData.title}
             onChange={handleChange}
             sx={{ margin: '0.25rem' }} required
             disabled={isLoading}
           />
           <TextField
             label="Description"
             variant="outlined"
             type="text"
             name='description'
             fullWidth
             value={formData.description}
             onChange={handleChange}
             sx={{ margin: '0.25rem' }}
             disabled={isLoading}
           />
           <Select
             label='Priority'
             value={formData.priority}
             name="priority"
             fullWidth
             onChange={handleChange}
             sx={{ margin: '0.25rem' }}
             disabled={isLoading}
           >
            { priorities.map((p: string) => <MenuItem key={p} value={p}>{p}</MenuItem>) }
           </Select>
           <TextField
             label="Due Date"
             variant="outlined"
             type="date"
             name='dueDate'
             fullWidth
             value={formData.dueDate}
             InputLabelProps={{ shrink: true }}
             onChange={handleChange}
             sx={{ margin: '0.25rem' }} required
             disabled={isLoading}
           />
          <ButtonGroup variant="contained" sx={ButtonStyles}>
            <Button type='submit' variant="contained" disabled={isLoading}>
              Create
            </Button>
            <Button onClick={() => modal?.onClose()} variant="outlined" disabled={isLoading}>
              Cancel
            </Button>
          </ButtonGroup>
       </form>
     </>
   )
}

export const UpdateTaskModal = ({ task, mutation, id: projectId }: any) => {
  const priorities = ['Low', 'Medium', 'High']
  const [formData, setFormData] = useState(task);
   const modal = useModal()
 
   const { mutate, isLoading } = useMutation(updateTask, {
     onSuccess: (response) => {
       if (response.data.ack === 1) {
         mutation({ id: projectId })
       } else {
        throw new Error(response.data.message)
      }
     }, onSettled: () => {
        modal?.onClose()
     },
   })
 
   const handleChange = (e: any) => {
      const { target: { name, value } } = e
      setFormData((prev: any) => ({ ...prev, [name]: value }))
   };
 
   const handleSubmit = (e: any) => {
    e.preventDefault()
    mutate({ id: task._id, data: task, projectId })
   }
 
   return (
     <>
       <Typography variant="h5">Create New Project</Typography>
        <form onSubmit={handleSubmit} style={{ padding: '0.5rem' }}>
           <TextField
             label="Title"
             variant="outlined"
             type="text"
             name='title'
             fullWidth
             value={formData.title}
             onChange={handleChange}
             sx={{ margin: '0.25rem' }} required
             disabled={isLoading}
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
             disabled={isLoading}
           />
           <Select
             label='Priority'
             value={formData.priority}
             name="priority"
             fullWidth
             onChange={handleChange}
             sx={{ margin: '0.25rem' }}
             disabled={isLoading}
             required
           >
            { priorities.map((p: string) => <MenuItem value={p}>{p}</MenuItem>) }
           </Select>
           <TextField
             label="Due Date"
             variant="outlined"
             type="date"
             name='dueDate'
             fullWidth
             InputLabelProps={{ shrink: true }}
             value={formData.dueDate}
             onChange={handleChange}
             sx={{ margin: '0.25rem' }} required
             disabled={isLoading}
           />
          <ButtonGroup variant="contained" sx={ButtonStyles}>
            <Button type='submit' variant="contained" disabled={isLoading}>
              Update
            </Button>
            <Button onClick={() => modal?.onClose()} variant="outlined" disabled={isLoading}>
              Cancel
            </Button>
          </ButtonGroup>
       </form>
     </>
   )
}

export const DeleteTaskModal = ({ task: { _id: id, title }, mutation, id: projectId }: any) => {
  const modal = useModal()

  const deleteProjectMutation = useMutation(deleteTask, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        modal?.onClose()
        mutation({ id: projectId })
      } else {
        throw new Error(response.data.message)
      }
    },
  })

  const handleDeleteProject = () =>  deleteProjectMutation.mutate({ id })

  return (
    <>
      <Typography variant="h5">Are you sure you want to delete {title}?</Typography>
      <ButtonGroup variant="contained" sx={ButtonStyles}>
        <Button onClick={handleDeleteProject} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={() => modal?.onClose()} variant="outlined">
          Cancel
        </Button>
      </ButtonGroup>
    </>
  )
}

// User Modals
export const UserRegisterModal = () => {
  const modal= useModal()
  return (
    <>
      <Typography variant="h5">User successfully registered. Please login with the credentials.</Typography>
      <Button onClick={() => modal?.onClose()} variant="outlined">
        Okay
      </Button>
    </>
  )
}

export const UserUpdateModal = () => {
  const modal = useModal()
  return (
    <>
      <Typography variant="h5">User successfully updated.</Typography>
      <Button onClick={() => modal?.onClose()} variant="outlined">
        Okay
      </Button>
    </>
  )
}