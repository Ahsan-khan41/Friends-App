import React from 'react'
import { render } from "react-dom";
import {
    BrowserRouter,
    Routes as BrowserRoutes,
    Route
} from "react-router-dom";
import SignIn from '../pages/signin/SignIn';
import Signup from '../pages/signup/Signup';
import Home from '../home/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <BrowserRoutes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />

            </BrowserRoutes>
        </BrowserRouter>
    )
}

export default Routes
