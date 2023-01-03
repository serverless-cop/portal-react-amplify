import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../Components/Dashboard/Charts';
import Deposits from '../../Components/Dashboard/Deposits';
import Orders from '../../Components/Dashboard/Orders';
import {withAuthenticator} from "@aws-amplify/ui-react";
import Theme from "../../Components/Theme";


function Dashboard() {

    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                </Paper>
            </Grid>
        </Grid>

    );
}

export default Dashboard;
