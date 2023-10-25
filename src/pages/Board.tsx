import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, List, ListItem } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = {
  todo: [
    { id: 'task-1', title: 'Task 1' },
    { id: 'task-2', title: 'Task 2' },
  ],
  inProgress: [
    { id: 'task-3', title: 'Task 3' },
    { id: 'task-4', title: 'Task 4' },
  ],
  done: [
    { id: 'task-5', title: 'Task 5' },
    { id: 'task-6', title: 'Task 6' },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<any>(initialTasks);

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list

    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const [movedTask] = tasks[sourceColumn].splice(sourceIndex, 1);
    tasks[destinationColumn].splice(destinationIndex, 0, movedTask);

    setTasks({ ...tasks });
  };

  return (
    <Container>
      <Typography variant="h4">Kanban Board</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {Object.keys(tasks).map((column) => (
            <Grid item xs={4} key={column}>
              <Paper elevation={3}>
                <Typography variant="h6" align="center">
                  {column}
                </Typography>
                <Droppable droppableId={column} key={column}>
                  {(provided, snapshot) => (
                    <List
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {tasks[column].map((task: any, index: number) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
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
                      ))}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;
