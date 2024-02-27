import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Box } from '@mui/material';
import KanbanLane from './KanbanLane';

const KanbanBoard = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [uItems, setuItems] = useState([]);

    const lanesConfig = {
        "ToDo": setTodoItems,
        "InProgress": setInProgressItems,
        "Done": setDoneItems,
        "Unassigned": setuItems,
    };

    const arrayLanes = [
        { title: "ToDo", items: todoItems, color: "red" },
        { title: "InProgress", items: inProgressItems, color: "yellow" },
        { title: "Done", items: doneItems, color: "green" },
        { title: "Unassigned", items: uItems, color: "gray" },
    ];

    const onDragEnd = (result) => {
        const { destination, source, type } = result;
        if (!destination) {
            return;
        }

        if (type === "column") {
            const newLanesOrder = Array.from(lanesOrder);
            const [removed] = newLanesOrder.splice(source.index, 1);
            newLanesOrder.splice(destination.index, 0, removed);

            setLanesOrder(newLanesOrder);
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const setState = lanesConfig[source.droppableId];
            const items = setState((prevItems) => {
                const newItems = Array.from(prevItems);
                const [removed] = newItems.splice(source.index, 1);
                newItems.splice(destination.index, 0, removed);
                return newItems;
            });
            return;
        }
    };


    const handleAddNewCard = (laneTitle, newCardTitle) => {
        const setState = lanesConfig[laneTitle];
        setState(prevItems => [...prevItems, { title: newCardTitle }]);
    };

    return (

        <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
            <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
            >
                {arrayLanes.map((lane, index) => (
                    <Draggable key={lane.title} draggableId={lane.title} index={index}>
                        {(provided, snapshot) => (
                            
                                <KanbanLane
                                    title={lane.title}
                                    items={lane.items}
                                    color={lane.color}
                                    handleAddNewCard={() => handleAddNewCard(lane.title, `New Task in ${lane.title}`)}
                                />
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </Box>
        )}
    </Droppable>
</DragDropContext>

    );
};

export default KanbanBoard;
