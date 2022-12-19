import React, {Component, useState} from "react";
import {API, Auth, JS} from "aws-amplify";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signOut from '../Auth'

const theme = createTheme();

export function Activation({currentUserEmail}) {
    const [voucher, setVoucher] = useState('')
    const [account, setAccount] = useState('')
    const [userEmail, setUserEmail] = useState(currentUserEmail)

    function onActivate (event) {
        postData({email:userEmail, voucher: voucher}).then(e => {
            console.log(e)
        })
        event.preventDefault();
    }

    async function postData(options) {
        const apiName = 'activationAPI';
        const path = '/activate';
        const myInit = {
            body: {
                email: options.email,
                voucher: options.voucher,
            },
            headers: {},
        };

        return await API.post(apiName, path, myInit);
    }

    return (
        <ThemeProvider theme={theme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Account Activation
                    </Typography>
                    <Box component="form" onSubmit={onActivate} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="voucher"
                            label="Voucher Code"
                            name="voucher"
                            autoComplete="voucher"
                            onChange={event => setVoucher(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Activate
                        </Button>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => {
                                signOut();
                            }}>
                                Log in with different user.
                            </Link>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const styles = {
    continer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box"
    },
    submit: {
        width: "100%",
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "14px 20px",
        margin: "8px 0",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    }
};
