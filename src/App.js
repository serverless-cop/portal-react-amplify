
import React, { useEffect, useState } from "react";
import { CustomSignIn } from "./Components/SignIn"
import { CustomConfirmSignUp } from "./Components/ConfirmSignUp";
import Amplify, { Auth, Hub } from "aws-amplify";
import {SecureApp} from "./Components/SecureApp"
import {CustomSignUp} from "./Components/SignUp";
import {CustomForgetPasswordRequest} from "./Components/ForgotPasswordRequest";
import {ResetPassword} from "./Components/ResetPassword";

const initialFormState = {
    username: "",
    password: "",
    email: "",
    authCode: "",
    formType: "signIn",
};

function App() {
    const [formState, updateFormState] = useState(initialFormState);
    const [user, updateUser] = useState(null);
    const [email, setEmail] = useState(null);

    function updateAuthState(state) {
        updateFormState(() => ({
            ...formState,
            formType: state,
        }));
    }

    const checkUser = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            updateUser(currentUser.username);
            updateFormState(() => ({ ...formState, formType: "signedIn" }));
        } catch (err) {
            console.log("checkUser error", err);
            updateFormState(() => ({ ...formState, formType: "signIn" }));
        }
    };

    const setAuthListener = async () => {
        Hub.listen("auth", (data) => {
            switch (data.payload.event) {
                case "signOut":
                    console.log(data);

                    updateFormState(() => ({
                        ...formState,
                        formType: "signIn",
                    }));

                    break;
                case "signIn":
                    console.log(data);
                    break;
            }
        });
    };

    useEffect(() => {
        checkUser();
        setAuthListener();
    }, []);

    const { formType } = formState;


    return (
        <>
            {formType === "resetPassword" && (
                <ResetPassword updateAuthState={updateAuthState} email={email} />
            )}
            {formType === "forgotPassword" && (
                <CustomForgetPasswordRequest updateAuthState={updateAuthState} setEmail={setEmail} />
            )}
            {formType === "signUp" && (
                <CustomSignUp updateAuthState={updateAuthState} setEmail={setEmail} />
            )}
            {formType === "confirmSignUp" && (
                <CustomConfirmSignUp email={email} updateAuthState={updateAuthState} />
            )}
            {formType === "signIn" && (
                <CustomSignIn updateAuthState={updateAuthState} setEmail={setEmail} />
            )}
            {formType === "signedIn" && (
                <SecureApp currentUserEmail={email} />
            )}
        </>
    );
}

export default App;
