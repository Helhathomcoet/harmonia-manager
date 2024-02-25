import { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Button, Drawer, Grid, Typography } from '@mui/material';
import Xarrow from 'react-xarrows';
import Modal from '@mui/material/Modal';
import { Box, TextField } from '@mui/material';
// import { DeleteIcon, EditIcon} from '@mui/icons-material/Delete';



function Roadmap() {
    const [isCustomizeMode, setIsCustomizeMode] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodesData, setNodesData] = useState([
        { id: 'node1', label: 'Harmonia', description: "Harmonia est un projet" },
    ]);

    const [renderArrows, setRenderArrows] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRenderArrows(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    // const handleDeleteNode = () => {

    //     console.log('delete node');
    // };

    // const handleEditNode = () => {
    //     setIsModalOpen(true);
    // };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const layout = nodesData.map((node, index) => ({
        i: node.id,
        x: index * 2,
        y: 0,
        w: 2,
        h: 2,
    }));

    const toggleCustomizeMode = () => {
        setIsCustomizeMode(!isCustomizeMode);
    };

    const handleSelectNode = (nodeId) => {
        if (!isCustomizeMode) {
            const node = nodesData.find(node => node.id === nodeId);
            setSelectedNode(node);
        }
    };

    const handleAddNode = () => {
        const newNode = {
            id: `node${nodesData.length + 1}`,
            label: title,
            description: description,
        };

        setNodesData([...nodesData, newNode]);

        setTitle('');
        setDescription('');

        setIsModalOpen(false);
    };



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


    return (
        <div>
            <Grid container padding={2}>
                <Grid item xs={4} />

                <Grid container justifyContent={"center"} item xs={4} >
                    <Typography variant="h4" gutterBottom>Product Roadmap</Typography>
                </Grid>
                <Grid item xs={4} container justifyContent={"right"} >
                    {isCustomizeMode ? <Button variant="contained" onClick={handleOpenModal} color='primary' sx={{ m: 0.5 }}>
                        Add Node
                    </Button>
                        : null}
                    <Button variant="contained" onClick={toggleCustomizeMode} color='secondary' sx={{ m: 0.5 }}>
                        {isCustomizeMode ? 'Read' : 'Custom'}
                    </Button>
                </Grid>
            </Grid>

            <GridLayout
                className="layout"
                layout={layout}
                cols={30}
                rowHeight={30}
                width={window.innerWidth - 20}
                isDraggable={isCustomizeMode}
                isResizable={isCustomizeMode}
                compactType={null}
            >
                {nodesData.map(node => (
                    <div key={node.id} id={node.id} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '8px',
                        height: '100%',
                    }}

                        onClick={() => handleSelectNode(node.id)}>
                        {node.label}
                        {/* {isCustomizeMode && (
                            <>
                                <IconButton onClick={() => handleEditNode} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteNode} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )} */}
                    </div>
                ))}
            </GridLayout>

            {!isCustomizeMode && renderArrows && nodesData.map((node, index) => {
                if (index < nodesData.length - 1) {
                    const nextNode = nodesData[index + 1];
                    return <Xarrow key={index} start={node.id} end={nextNode.id} showHead={false} strokeWidth={3} color="#DAAB3A" />;
                }
                return null;
            })}

            <Drawer anchor="right" open={Boolean(selectedNode)} onClose={() => setSelectedNode(null)}>
                <div style={{ width: '33vw', padding: '20px' }}>
                    {selectedNode && (
                        <>
                            <Typography variant="h5" gutterBottom>{selectedNode.label}</Typography>
                            <Typography variant="body1">{selectedNode.description}</Typography>
                        </>
                    )}
                </div>
            </Drawer>

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



        </div>
    );
}

export default Roadmap;
