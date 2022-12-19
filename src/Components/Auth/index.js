import {Auth, Hub} from "aws-amplify";

async function signOut() {
    try {
        await Auth.signOut();
        Hub.dispatch('UI Auth', {   // channel must be 'UI Auth'
            event: 'AuthStateChange',    // event must be 'AuthStateChange'
            message: 'signedout'    // message must be 'signedout'
        });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export default signOut;
