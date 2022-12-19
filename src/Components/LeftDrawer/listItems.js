import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import signOut from "../Auth";
import { useNavigate } from "react-router-dom";
import {Link} from "@mui/material";



export const mainListItems = (
    <div>
        <ListItem button>
            <Button
                variant="contained"
                color="primary"
                onClick={signOut}
            >Sign Out</Button>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Subscriptions" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <a href='UserManagement' />
            <ListItemText onClick={() => {
                let navigate = useNavigate();
                navigate('/UserManagement')}
            } primary="User Management" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Usage Reports" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PasswordIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>

    </div>
);
