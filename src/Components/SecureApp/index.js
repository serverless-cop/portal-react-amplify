import Dashboard from '../../Pages/Dashboard';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserManagement from "../UserManagement";
import Theme from "../Theme";
import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import {Activation} from "../Activation";


export function SecureApp({currentUserEmail}) {
    const [userEmail, setUserEmail] = useState(currentUserEmail);
    const [status, setStatus] = useState('INACTIVE');

    const checkUser = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();

            /*
                TODO : check if the user is active and set the state
                If the user is not active the user will be forwarded to the activation page
             */

        } catch (err) {
            console.log("checkUser error", err);
        }
    };

    useEffect(() => {
        checkUser();

    }, []);

    return (
        <>
        {status === "INACTIVE" && (
            <Activation currentUserEmail={userEmail} />
        )}
        {status === "ACTIVE" && (
            <div>
                <Theme>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}  />
                        <Route path="/usermanagement" element={<UserManagement />} />
                    </Routes>
                </Theme>
            </div>
        )}
        </>
    );
}
