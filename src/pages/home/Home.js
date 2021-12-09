import React, { useEffect, useContext, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import UserCard from './userCard/UserCard'
import './userCard/userCard.css'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../components/firebase';
import CurentUserContext from '../../components/context/CurrentUserContext';



const Home = () => {
    const userObj = useContext(CurentUserContext)
    // let userObj = localStorage.getItem('user')
    // userObj = JSON.parse(userObj)

    
    const [getUsers, setGetusers] = useState({})
    

    useEffect(() => {
         onSnapshot(doc(db, "users", `${userObj.uid}`), (doc) => {
            if (doc.data()) {
                setGetusers(doc.data())
                // console.log("Current data: ", doc.data())

            }
        });

    }, [userObj])
    




    return (
        <div>
            <Nav />
            <div className='userCard'>
                <UserCard name={getUsers.name} email={getUsers.email} img={getUsers.img} />

            </div>
        </div>
    )
}

export default Home
