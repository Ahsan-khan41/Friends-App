import React from 'react'
import { render } from "react-dom";
import {
    BrowserRouter,
    Routes as BrowserRoutes,
    Route
} from "react-router-dom";
import SignIn from '../pages/signin/SignIn';
import Signup from '../pages/signup/Signup';
import Home from '../pages/home/Home';
import Settings from '../pages/settings/Settings';

const Routes = () => {
    return (
        <BrowserRouter>
            <BrowserRoutes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/settings" element={<Settings />} />

            </BrowserRoutes>
        </BrowserRouter>
    )
}

export default Routes
