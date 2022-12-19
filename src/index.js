import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import {BrowserRouter, Route, Router, Routes, Switch} from "react-router-dom";
import InSecureApp from "./Components/InSecureApp";
Amplify.configure(awsExports);

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/insecure" element={<InSecureApp />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);

reportWebVitals();
