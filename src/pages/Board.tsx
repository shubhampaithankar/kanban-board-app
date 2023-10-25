import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, Box, Link } from '@mui/material';
import { DragDropContext, Droppable, Draggable,  } from 'react-beautiful-dnd';
import { useMutation } from 'react-query';
import useAuth from '../hooks/useAuth';
import { getTasks, updateTask } from '../services/ApiService';
import { useParams } from 'react-router-dom';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<any>([]);
  const columns = ['To Do', 'In Progress', 'Done']

  const { getToken } = useAuth()
  const token = getToken()
  
  const { id } = useParams()
  
  const { mutate: getMutation, isLoading } = useMutation(getTasks, {
    useErrorBoundary: true, 
  })
  const { mutate: updateMutation } = useMutation(updateTask, {
    useErrorBoundary: true
  })

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list
    const destinationId = result.destination.droppableId
    if (result.source.droppableId === destinationId) return // Dropped inside the same column
    const taskId = result.draggableId
    updateMutation({ id: taskId, data: { status: destinationId } }, {
      onSuccess: (response) => {
        if (response?.data.ack === 1) {
          setTasks((prev: any) => prev.map((task: any) => (task._id === taskId ? {...task, status: destinationId } : task)))
        }
      }, 
    })
  };
  
  useEffect(() => {
    if (token && id) {
      getMutation({ id }, {
        onSuccess: (response) => {
          if (response?.data.ack === 1) {
            setTasks(response?.data.tasks);
          }
        }
      })
    }
  }, [token, getMutation, id])

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem', padding: '0.25rem' }}>
        <Link variant='h4' component='button'>
          Go to Projects
        </Link>
        <Typography variant="h4">Tasks</Typography>
      </Box>
      { !isLoading ? <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3} sx={{ padding: '0.25rem', margin: '0.5rem' }}>
          { tasks.length > 0 ? 
            columns.map((column: any, i: number) => (
              <Grid item xs={4} key={column}>
                <Paper elevation={3}>
                    <Typography variant="h6" align="center">
                      { column }
                    </Typography>
                  <Droppable droppableId={column} key={i}>
                    {(provided, snapshot) => (
                      <List ref={provided.innerRef} {...provided.droppableProps}>
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
                                  {task.title}
                                </ListItem>
                              )}
                            </Draggable>
                          ))

                        }
                        {provided.placeholder}
                      </List>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            )) : <>No tasks found.</> 
          }
        </Grid>
      </DragDropContext> : <>Loading...</> }
    </Container>
  );
};

export default KanbanBoard;
