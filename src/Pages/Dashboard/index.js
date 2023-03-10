import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Reminders from '../../Components/Dashboard/Reminders';


function Dashboard() {

    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Reminders />
                </Paper>
            </Grid>
        </Grid>

    );
}

export default Dashboard;
