import { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Button, Drawer, Grid, Typography } from '@mui/material';
import Xarrow from 'react-xarrows';
import Modal from '@mui/material/Modal';
import { Box, TextField } from '@mui/material';
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./Firebase";
function Roadmap() {
    const [isCustomizeMode, setIsCustomizeMode] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodesData, setNodesData] = useState([
    ]);


    const [renderArrows, setRenderArrows] = useState(false);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "roadmap"));
        const nodes = [];
        querySnapshot.forEach((doc) => {
            nodes.push({ ...doc.data(), id: doc.id });
        });
        setNodesData(nodes);
    };

    useEffect(() => {
        

        fetchData();

        const timer = setTimeout(() => {
            setRenderArrows(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const layout = nodesData.map((node, index) => ({
        i: node.id,
        x: node.gridItem.x,
        y: node.gridItem.y,
        w: node.gridItem.w,
        h: node.gridItem.h,
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

    const handleLayoutChange = async (newLayout) => {
        const updatedNodesData = nodesData.map(node => {
            const layoutItem = newLayout.find(item => item.i === node.id);
            if (layoutItem) {
                return {
                    ...node,
                    gridItem: {
                        ...node.gridItem,
                        x: layoutItem.x,
                        y: layoutItem.y,
                        w: layoutItem.w,
                        h: layoutItem.h,
                    },
                };
            }
            return node;
        });

        setNodesData(updatedNodesData);

        // Mise à jour de Firebase pour chaque nœud modifié
        for (const node of updatedNodesData) {
            await updateDoc(doc(db, "roadmap", node.id), {
                ...node,
                "gridItem": node.gridItem,
            });
        }
    };

    const handleAddNode = async () => {
        const newNode = {
            label: title,
            description: description,
            gridItem: {
                x: 0,
                y: 0,
                w: 2,
                h: 2,
            },
        };

        try {
            const docRef = await addDoc(collection(db, "roadmap"), newNode);
            console.log("Document written with ID: ", docRef.id);

            // Ajoutez l'ID du document au nœud pour le référencer localement
            const addedNode = { ...newNode, id: docRef.id };
            setNodesData([...nodesData, addedNode]);

            setTitle('');
            setDescription('');

            setIsModalOpen(false);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
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
                onLayoutChange={(newLayout) => {
                    handleLayoutChange(newLayout);
                }}
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
