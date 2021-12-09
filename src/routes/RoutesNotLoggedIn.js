import React from 'react'
import {
    BrowserRouter,
    Routes as BrowserRoutes,
    Route
} from "react-router-dom";
import SignIn from '../pages/signin/SignIn';
import Signup from '../pages/signup/Signup';
import NotFound from '../components/routesComponets/NotFound'

const RoutesNotLoggedIn = () => {
    return (
        <BrowserRouter>
            <BrowserRoutes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
            </BrowserRoutes>
        </BrowserRouter>
    )
}

export default RoutesNotLoggedIn
