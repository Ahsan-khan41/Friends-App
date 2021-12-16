import React, { useEffect, useContext, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import { Button, Input, Divider } from 'antd'
import UserCard from './userCard/UserCard'
import { CreditCardOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import './userCard/userCard.css'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../components/firebase';
import CurentUserContext from '../../components/context/CurrentUserContext';
import './home.css'
import Posts from '../posts/Posts';




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
        // <div>
        //     {/* <div className='userCard'>
        //         <UserCard name={getUsers.name} email={getUsers.email} img={getUsers.img} />

        //     </div> */}
        // </div>
        <div>
            <Nav />

            <div className='create-post-div'>
                <Input placeholder="What's on your mind ?" className='post-input' />
                <Divider />
                <div className='buttons-div' >
                    <Button type="primary"><CreditCardOutlined /> Photo</Button>
                    <Button type="primary"><VideoCameraAddOutlined /> Video</Button>
                </div>
            </div>
            <div className='post-div'>
                <Posts/>
            </div>
        </div>
    )
}

export default Home
