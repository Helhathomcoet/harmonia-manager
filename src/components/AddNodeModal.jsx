import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";


function AddNodeModal({ setIsModalOpen, setNodesData }) {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none',
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddNode = () => {
        if (title && description) {
            const newNode = {
                id: uuidv4(),
                title: title,
                description: description,
                x: 0,
                y: 0
            };
            setNodes([...nodes, newNode]);
            setTitle("");
            setDescription("");
            setIsModalOpen(false);
        }
    };

    return (

        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={2}>
                    Add Node
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nodeTitle"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="nodeDescription"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />


                <Box textAlign="right" marginTop={2}>
                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleAddNode()} variant="contained" sx={{ ml: 2 }}>
                        Done
                    </Button>

                </Box>
            </Box>
        </Modal>
    );
}

export default AddNodeModal;