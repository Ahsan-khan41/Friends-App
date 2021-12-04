import React, { useEffect, useContext, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import UserCard from './userCard/UserCard'
import './userCard/userCard.css'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../components/firebase';
import CurentUserContext from '../../components/context/CurrentUserContext';


const Home = () => {
    let userObj = localStorage.getItem('user')
    userObj = JSON.parse(userObj)

    const currentUserObj = useContext(CurentUserContext)
    const [getUsers, setGetusers] = useState({})
    console.log("Current data: ", getUsers)
    console.log(currentUserObj.uid)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", `${userObj.uid}`), (doc) => {
            if (doc.data()) {
                setGetusers(doc.data())
                // console.log("Current data: ", doc.data())

            }
        });

    }, [])




    return (
        <div>
            <Nav />
            <div className='userCard'>
                <UserCard name={getUsers.name} email={getUsers.email} />

            </div>
        </div>
    )
}

export default Home
