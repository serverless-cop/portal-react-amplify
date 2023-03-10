import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {Title} from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {AppBar} from "@mui/material";


export default function TopBar() {
    return (
        <AppBar
            position="absolute"
            // open={open}
        >
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    // onClick={toggleDrawer}
                    // sx={{
                    //     marginRight: '36px',
                    //     ...(open && { display: 'none' }),
                    // }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
