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
import UserPage from '../pages/userPage/UserPage';
import MyPosts from '../pages/myPosts/MyPosts';
import Profile from '../pages/profile/Profile';

const RoutesLoggedIn = () => {




    return (

        <BrowserRouter>
            <BrowserRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/myposts" element={<MyPosts />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/signup" element={<AlreadyLoggedIn />} />
                <Route path="/users/:user" element={<UserPage />} />
                <Route path="*" element={<NotFound />} />
            </BrowserRoutes>
        </BrowserRouter>

    )
}

export default RoutesLoggedIn
