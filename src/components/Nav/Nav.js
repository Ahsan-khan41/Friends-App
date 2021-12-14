import React, { useState, useEffect, useContext } from 'react'
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import CurentUserContext from '../context/CurrentUserContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';


const { Option } = Select;


const Nav = () => {
    const userObj = useContext(CurentUserContext)
    const [users, setUsers] = useState([])
    const [current, setCurrent] = useState('home')

    let navigate = useNavigate();

    const handleClick = e => {
        setCurrent(e.key);
    };


    let userArr = [];

    useEffect(async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            userArr.push(doc.data().name)
            // console.log(doc.id, " => ", doc.data());
        });
        setUsers(userArr)
    }, [])

    function handleChange(value) {
        console.log(`selected ${users[value]}`);
        navigate(`/users/${users[value]}`);
    }
    const children = users.map((elem, i) => {
        return <Option key={i} >{elem}</Option>
    })
    // const children = ['jj', '11']

    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"   >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <Link to='/settings'>Settings</Link>
                </Menu.Item>
                <Menu.Item key="myposts" icon={<SettingOutlined />}>
                    <Link to='/myposts'>My Posts</Link>
                </Menu.Item>
                <Menu.Item key="posts" icon={<SettingOutlined />}>
                    <Link to='/posts'>Posts</Link>
                </Menu.Item>
                <Menu.Item >
                    <Select showSearch={true}
                    showArrow={false}
                        defaultActiveFirstOption={false}
                        style={{ width: '300px' }}
                        onChange={handleChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {children}
                    </Select>
                </Menu.Item>

            </Menu>

        </div>
    )
}

export default Nav
