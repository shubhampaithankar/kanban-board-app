import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, Paper, List, ListItem, Box, Button, ButtonGroup } from '@mui/material';
import { DragDropContext, Droppable, Draggable,  } from 'react-beautiful-dnd';
import { QueryClient, useMutation } from 'react-query';
import useAuth from '../hooks/useAuth';
import useModal from '../hooks/useModal';
import { getTasks, updateTask } from '../services/ApiService';
import { CreateTaskModal, DeleteTaskModal, UpdateTaskModal } from '../components/Modals';

const queryClient = new QueryClient()

const KanbanBoard = () => {
  const columns = ['To Do', 'In Progress', 'Done']
  const [tasks, setTasks] = useState<any>([]);

  const auth = useAuth()
  const token = auth?.getToken()
  
  const { id } = useParams()
  const modal = useModal()

  const openCreateModal = () => modal?.onOpen({ title: 'Create Task', body: <CreateTaskModal mutation={getMutation} id={id} /> })
  const openEditModal = (task: any) => modal?.onOpen({ title: 'Edit Task', body: <UpdateTaskModal task={task} mutation={getMutation} id={id} />})
  const openDeleteModal = (task: any) => modal?.onOpen({ title: 'Delete Task', body: <DeleteTaskModal task={task} mutation={getMutation} id={id} />})
  
  const { mutate: getMutation, isLoading, isSuccess } = useMutation('getTasks', getTasks, { useErrorBoundary: true,  })
  const { mutate: updateMutation } = useMutation(updateTask, { useErrorBoundary: true })

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list
    const destinationId = result.destination.droppableId
    if (result.source.droppableId === destinationId) return // Dropped inside the same column
    const taskId = result.draggableId
    updateMutation({ id: taskId, data: { status: destinationId } }, {
      onSuccess: (response) => {
        if (response?.data.ack === 1) {
          setTasks((prev: any) => prev.map((task: any) => (task._id === taskId ? {...task, status: destinationId } : task)))
        } else {
          throw new Error(response?.data.message)
        }
      }, 
    })
  };
  
  useEffect(() => {
    if (token && id && !isSuccess) {
      getMutation({ id }, {
        onSuccess: (response) => {
          try {
            if (response?.data.ack === 1) {
              setTasks(response?.data.tasks);
              return queryClient.invalidateQueries('getTasks')
            } else {
              throw new Error(response?.data.message)
            } 
          } catch (error) {
          }
        }
      })
    }
  }, [token, getMutation, id, isSuccess])


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0.5rem', padding: '0 0.5rem' }}>
        <Link to='/projects'>
          <Button>
            Go to Projects
          </Button>
        </Link>
        <Typography variant="h4">Tasks</Typography>
        <Button variant='contained' onClick={openCreateModal}>
          Create new Task
        </Button>
      </Box>
      { !isLoading ? <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={1} sx={{ backgroundColor: 'whitesmoke', minHeight: '80vh', padding: '0 1rem',}}>
          { tasks.length > 0 ? 
            columns.map((column: any, i: number) => (
              <Grid item xs={4} key={column} sx={{ minHeight: '100%', paddingBottom: '60px' }}>
                <Typography variant="h6" align="center">
                  { column }
                </Typography>
                <Droppable droppableId={column} key={i}>
                  {(provided, snapshot) => (
                    <List ref={provided.innerRef} {...provided.droppableProps} sx={{ borderRadius: '10px', border: '1px solid rgb(0,0,0,0.2)', height: '100%', overflowY: 'scroll' }}>
                      { 
                        tasks.map((task: any, index: number) => (
                          task.status === column && <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                <Paper elevation={3} sx={{ width: '100%', borderRadius: '10px' }}>
                                  <Box sx={{ padding: '0.5rem 1rem' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                      <Box>
                                      <Typography variant='h5'>
                                        { task.title }
                                      </Typography>
                                      <Typography variant='subtitle1'>
                                        { task.description }
                                      </Typography>
                                      </Box>
                                      <ButtonGroup variant='text' color="secondary">
                                        <Button onClick={() => openEditModal(task)}>Edit</Button>
                                        <Button onClick={() => openDeleteModal(task)}>Delete</Button>
                                      </ButtonGroup>
                                    </Box>
                                    { task.labels && task.labels.length > 0 && (
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        { 
                                          task.labels.map((label: any, index: number) => (
                                            <Box key={index} sx={{ backgroundColor: 'lightcyan', borderRadius: '10px', margin: '0 0.25rem', textAlign: 'center', padding: '0.25rem 0.5rem' }}>
                                              <Typography>
                                                { label }
                                              </Typography>
                                            </Box>
                                          ))                                       
                                        }
                                      </Box>
                                    ) }
                                  </Box>
                                </Paper>
                              </ListItem>
                            )}
                          </Draggable>
                        ))

                      }
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Grid>
            )) : <>No tasks found.</> 
          }
        </Grid>
      </DragDropContext> : <>Loading...</> }
    </>
  );
};

export default KanbanBoard;
