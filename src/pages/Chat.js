import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Avatar,
    MenuItem,
    Select,
} from "@mui/material";

const Chat = () => {
    const user = useSelector((state) => state.auth.user);
    const projects = useSelector((state) => state.projects);

    const userProjects =
        user?.role === "admin"
            ? projects
            : projects.filter((project) => project.team.includes(user?.email));

    const [messages, setMessages] = useState(
        JSON.parse(localStorage.getItem("teamChat")) || []
    );
    const [messageText, setMessageText] = useState("");
    const [selectedProjectId, setSelectedProjectId] = useState(
        userProjects.length > 0 ? userProjects[0].id : null
    );

    useEffect(() => {
        localStorage.setItem("teamChat", JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = () => {
        if (messageText.trim()) {
            setMessages([
                ...messages,
                {
                    id: Date.now(),
                    sender: user.name,
                    email: user.email,
                    text: messageText,
                    timestamp: new Date().toLocaleTimeString(),
                    projectId: selectedProjectId,
                },
            ]);
            setMessageText("");
        }
    };

    const selectedProject = userProjects.find(
        (project) => project.id === selectedProjectId
    );

    return (
        <Box sx={{ p: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography variant="h5">Чат команди</Typography>


            </Box>

            {/* Вибір проекту */}
            <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
                <Select
                    value={selectedProjectId || ""}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    {userProjects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                            {project.name}
                        </MenuItem>
                    ))}
                </Select>
                {/* Іконки користувачів */}
                <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
                    {selectedProject?.team.map((email) => {
                        const member = JSON.parse(localStorage.getItem("users")).find(
                            (u) => u.email === email
                        );
                        return (
                            <Avatar
                                key={email}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    bgcolor: "#1976d2",
                                    color: "#fff",
                                    fontSize: 14,
                                }}
                                title={member?.name || email}
                            >
                                {member?.name ? member.name[0].toUpperCase() : "?"}
                            </Avatar>
                        );
                    })}
                </Box>
            </Box>

            {/* Чат */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "60vh",
                    border: "1px solid #efb11d",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#f3e7cd"
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        p: 2,

                    }}
                >
                    <List>
                        {messages
                            .filter((msg) => msg.projectId === selectedProjectId)
                            .map((msg) => (
                                <ListItem key={msg.id} sx={{ alignItems: "flex-start" }}>
                                    <Avatar sx={{ mr: 2 }}>{msg.sender[0].toUpperCase()}</Avatar>
                                    <ListItemText
                                        primary={`${msg.sender} (${msg.timestamp})`}
                                        secondary={msg.text}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        p: 1,

                        borderTop: "1px solid #efb11d",
                    }}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        placeholder="Введіть повідомлення..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& input::placeholder': {
                                    color: 'grey', // Встановіть бажаний колір
                                    opacity: 1, // Робимо колір видимим
                                },
                            },
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSendMessage}>
                        Відправити
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;
