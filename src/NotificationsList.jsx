import { Notifications } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Container, CssBaseline, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Récupérer le jeton du local storage
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          navigate("/login")
        }

        const response = await fetch('http://127.0.0.1:8000/api/notifications', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        console.log(data);
        setNotifications(data.notifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

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
          Notifications
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : notifications.length === 0 ? (
          <Typography variant="body1">No notifications available</Typography>
        ) : (
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <Notifications />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={notification.title} secondary={notification.content} />
                <Typography variant="body2">
                  {new Date(notification.created_at).toLocaleTimeString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
        <Divider sx={{ height: "4px", color: "black" }} />
      </Box>
    </Container>
  );

}

export default NotificationsList