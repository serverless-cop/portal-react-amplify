import * as React from 'react';
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
import {Component, useState} from "react";
import {API, Auth} from "aws-amplify";

const theme = createTheme();

export function CustomSignUp(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [organization, setOrganization] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [error, setError] = useState('')

    function onSignUpClicked (event) {
        if (password !== passwordRepeat){
            setError('Password does not match.')
        } else{
            setError('')
            let promise = postData({
                firstName,
                lastName,
                jobTitle,
                organization,
                email,
                phone,
                password
            });
            signUp({email, password}).then(e => {
                props.updateAuthState('confirmSignUp')
            })

            promise.then(result => {
                console.log(result.body)
            });
        }
        event.preventDefault();
    };

    async function signUp(options) {
        try {
            const {user} = await Auth.signUp({
                username: options.email,
                password: options.password,
                attributes: {
                    email: options.email,
                }
            });
            props.setEmail(options.email)
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    async function postData(options) {
        const apiName = 'registrationAPI';
        const path = '/register';
        const myInit = {
            body: {
                firstName: options.firstName,
                lastName: options.lastName,
                jobTitle: options.jobTitle,
                organization: options.organization,
                email: options.email,
                password: options.password,
                phone: options.phone,
            },
            headers: {},
        };

        return await API.post(apiName, path, myInit);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={onSignUpClicked} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={event => setFirstName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={event => setLastName(event.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="job-title"
                                    name="jobTitle"
                                    required
                                    fullWidth
                                    id="jobTitle"
                                    label="Job Title"
                                    autoFocus
                                    onChange={event => setJobTitle(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="organizarion"
                                    required
                                    fullWidth
                                    id="organization"
                                    label="Organization"
                                    name="organization"
                                    onChange={event => setOrganization(event.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={event => setPhone(event.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordRepeat"
                                    label="Repeat Password"
                                    type="password"
                                    id="passwordRepeat"
                                    autoComplete="new-password"
                                    onChange={event => setPasswordRepeat(event.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <text style={styles.errorText}>
                                    {error}
                                </text>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => {
                                    props.updateAuthState('signIn')
                                }}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const styles = {
    errorText: {
        color: 'red'
    },
}
