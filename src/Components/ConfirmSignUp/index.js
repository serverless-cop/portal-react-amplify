import React, {Component, useState} from "react";
import { Auth } from "aws-amplify";
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

const theme = createTheme();

export function CustomConfirmSignUp(props) {
    const [email, setEmail] = useState(props.email)
    const [confirmationCode, setConfirmationCode] = useState('')

    function onConfirmClicked (event) {
        confirmSignUp({username: email, confirmationCode: confirmationCode}).then(e => {
            props.updateAuthState('signIn')
        })

        event.preventDefault();
    };

    async function confirmSignUp({ username, confirmationCode }) {
        try {
            await Auth.confirmSignUp(username, confirmationCode)
        } catch (err) {
            console.log('error signing up..', err)
        }
    }

    function onResendCodeClicked (event) {

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
                        Confirm Sign up
                    </Typography>
                    <Box component="form" onSubmit={onConfirmClicked} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                        />
                        <TextField
                            onChange={event => setConfirmationCode(event.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            name="confirmationCode"
                            label="Confirmation Code"
                            type="confirmationCode"
                            id="confirmationCode"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send
                        </Button>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={onResendCodeClicked}>
                                {"Have not received a code? resend"}
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
