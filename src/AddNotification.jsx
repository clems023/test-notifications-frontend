import { Box, Button, CircularProgress, Container, CssBaseline, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddNotification = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()



    const handleAddNotification = async () => {
        try {
            setLoading(true);
            setError('');

            // Récupérer le jeton du local storage
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                // Gérer le cas où l'utilisateur n'est pas connecté
                console.error('User not authenticated');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/api/notifications/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.status === 200) {
                // Réinitialiser les champs après l'ajout
                setTitle('');
                setContent('');
                setLoading(false);
                navigate('/notifications');
            } else if (response.status === 403) {
                setError('User does not have the privileges to perform this action');
                setLoading(false);
            } else {
                throw new Error('Failed to add notification');
            }
        } catch (error) {
            console.error('Error adding notification:', error);
            setLoading(false);
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Add Notification
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="content"
                        label="Content"
                        type="text"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {loading ? (
                        <CircularProgress sx={{ mt: 3, mb: 2 }} />
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleAddNotification}
                        >
                            Add Notification
                        </Button>
                    )}
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default AddNotification