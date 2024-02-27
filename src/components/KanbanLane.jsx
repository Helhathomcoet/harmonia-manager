import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';
import AddIcon from '@mui/icons-material/Add';

const KanbanLane = ({ title, items, color, handleAddNewCard }) => {
    const backgroundColor = color === 'red' ? 'error.main' : color === 'yellow' ? 'warning.main' : color === 'green' ? 'success.main' : 'grey.500';

    return (
        <Droppable droppableId={title}>
            {(provided, snapshot) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                        flex: 3,
                        p: 2,
                        flexDirection: 'column',
                        minHeight: '10rem',
                        bgcolor: backgroundColor,
                        borderRadius: 1,
                        boxShadow: 3,
                        display: 'flex',
                    }}
                >
                    <Grid container justifyContent={"space-between"} alignItems="center">
                        <Grid item>
                            <Typography sx={{ fontSize: 'xl', fontWeight: 'bold', color: 'white', p: 1 }}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleAddNewCard} color="inherit">
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Box sx={{ flex: 1, flexDirection: 'column', p: 2 }}>
                        {items.map((item, index) => (
                            <KanbanCard key={index} title={item.title} index={index} parent={title} />
                        ))}
                        {provided.placeholder}
                    </Box>
                </Box>
            )}
        </Droppable>
    );
};

export default KanbanLane;
