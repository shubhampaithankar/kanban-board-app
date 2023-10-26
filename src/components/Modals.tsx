import { useState } from "react";
import { Typography, TextField, Button, Select, MenuItem } from "@mui/material";
import { useMutation } from "react-query";
import { createProject, createTask, deleteProject, deleteTask, updateProject, updateTask } from "../services/ApiService";
import useModal from "../hooks/useModal";

// Project Modals
export const CreateProjectModal = ({ mutate }: any) => {

  const [formData, setFormData] = useState({
   name: '',
   description: ''
  });
  const modal = useModal()

  const createProjectMutation = useMutation(createProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        modal?.onClose()
        mutate()
      } else {
        throw new Error(response.data.message)
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
        <Button onClick={() => modal?.onClose()} variant="outlined">
          Cancel
        </Button>
      </form>
    </>
  )
}

export const UpdateProjectModal = ({ project: { id, name, description }, mutate }: any) => {

  const [formData, setFormData] = useState({
   name,
   description
  });
  const modal = useModal()

  const updateProjectMutation = useMutation(updateProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        modal?.onClose()
        mutate()
      } else {
        throw new Error(response.data.message)
      }
    },
  })

  const handleChange = (e: any) => {
     const { target: { name, value } } = e
     setFormData((prev: any) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = () => updateProjectMutation.mutate({ id, data: formData })

  return (
    <>
      <Typography variant="h5">Update Project</Typography>
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
          Delete
        </Button>
        <Button onClick={() => modal?.onClose()} variant="outlined">
          Cancel
        </Button>
      </form>
    </>
  )
}

export const DeleteProjectModal = ({ project: { id, name }, mutate }: any) => {
  const modal = useModal()

  const deleteProjectMutation = useMutation(deleteProject, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        modal?.onClose()
        mutate()
      } else {
        throw new Error(response.data.message)
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
      <Button onClick={() => modal?.onClose()} variant="outlined">
        Cancel
      </Button>
    </>
  )
}

// Task Modals 
export const CreateTaskModal = ({ mutation }: any) => {
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
 
   const handleSubmit = () => mutate(formData)
 
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
           >
            { priorities.map((p: string) => <MenuItem value={p}>{p}</MenuItem>) }
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
         <Button type='submit' variant="contained" disabled={isLoading}>
           Create
         </Button>
         <Button onClick={() => modal?.onClose()} variant="outlined" disabled={isLoading}>
           Cancel
         </Button>
       </form>
     </>
   )
}

export const UpdateTaskModal = ({ task, mutation }: any) => {
  const priorities = ['Low', 'Medium', 'High']
  const [formData, setFormData] = useState(task);
   const modal = useModal()
 
   const { mutate, isLoading } = useMutation(updateTask, {
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
 
   const handleSubmit = () => mutate(formData)
 
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
         <Button type='submit' variant="contained" disabled={isLoading}>
           Create
         </Button>
         <Button onClick={() => modal?.onClose()} variant="outlined" disabled={isLoading}>
           Cancel
         </Button>
       </form>
     </>
   )
}

export const DeleteTaskModal = ({ project: { id, title }, mutation }: any) => {
  const modal = useModal()

  const deleteProjectMutation = useMutation(deleteTask, {
    onSuccess: (response) => {
      if (response.data.ack === 1) {
        modal?.onClose()
        mutation()
      } else {
        throw new Error(response.data.message)
      }
    },
  })

  const handleDeleteProject = () =>  deleteProjectMutation.mutate({ id })

  return (
    <>
      <Typography variant="h5">Are you sure you want to delete {title}?</Typography>
      <Button onClick={handleDeleteProject} variant="contained">
        Delete
      </Button>
      <Button onClick={() => modal?.onClose()} variant="outlined">
        Cancel
      </Button>
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