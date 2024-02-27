import { Box, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';


const KanbanCard = ({ title, index, parent }) => {
  return (
    <Draggable draggableId={`card-${title}`} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            bgcolor: 'background.paper',
            p: 2,
            mt: 1,
            borderRadius: 1,
            boxShadow: 3,
            width: '100%',
            minHeight: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: snapshot.isDragging ? 'grabbing' : 'grab',
            // Vous pouvez ajouter des transitions ou d'autres styles ici
          }}
        >
          <Typography>{title}</Typography>
        </Box>
      )}
    </Draggable>
  );
};

export default KanbanCard;
