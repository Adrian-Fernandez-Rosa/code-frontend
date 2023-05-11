import React, { useState } from 'react';

// Material List Components
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

// Material Icon Components
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

export const MenuItems = () => {
    const [openUsers, setOpenUsers] = useState(false);

    const handleClickUsers = () => {
        setOpenUsers(!openUsers);
    };

    // REDIRECT
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleRegisterClick = () => {
        navigate("/register");
    }

    return (
        <React.Fragment>
            {/* Dashboard to Katas Button */}
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Katas" />
            </ListItemButton>
            {/* Users */}
            <ListItemButton onClick={handleClickUsers}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>

            <Collapse in={openUsers} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={handleRegisterClick}>
                        <ListItemText primary="Register" />
                    </ListItemButton>
                    <ListItemButton onClick={handleLoginClick}>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* Ranking */}
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Ranking" />
            </ListItemButton>
        </React.Fragment>
    );
};
