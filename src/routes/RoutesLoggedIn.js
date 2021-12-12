import React from 'react'
import {
    BrowserRouter,
    Routes as BrowserRoutes,
    Route
} from "react-router-dom";

import Home from '../pages/home/Home';
import Settings from '../pages/settings/Settings';
import Posts from '../pages/posts/Posts';
import AlreadyLoggedIn from '../components/routesComponets/AlreadyLoggedIn';
import NotFound from '../components/routesComponets/NotFound'
import NewHome from '../pages/home/userCard/NewHome';

const RoutesLoggedIn = () => {




    return (

        <BrowserRouter>
            <BrowserRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/newhome" element={<NewHome />} />
                <Route path="/signup" element={<AlreadyLoggedIn />} />
                <Route path="/users/:user" element={<NewHome />} />
                <Route path="*" element={<NotFound />} />
            </BrowserRoutes>
        </BrowserRouter>

    )
}

export default RoutesLoggedIn
