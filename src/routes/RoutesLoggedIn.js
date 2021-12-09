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
import Posts from '../pages/posts/Posts';
import AlreadyLoggedIn from '../components/routesComponets/AlreadyLoggedIn';
import NotFound from '../components/routesComponets/NotFound'

const RoutesLoggedIn = () => {
    return (
        <BrowserRouter>
            <BrowserRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/signup" element={<AlreadyLoggedIn />} />
                <Route path="*" element={<NotFound />} />


            </BrowserRoutes>
        </BrowserRouter>
    )
}

export default RoutesLoggedIn
