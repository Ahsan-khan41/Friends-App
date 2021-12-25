import React, { useState, useEffect, useContext } from 'react'
import { Menu } from 'antd';
import { HomeFilled, SettingFilled, UsergroupDeleteOutlined, ContainerOutlined ,UserOutlined} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import CurentUserContext from '../context/CurrentUserContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import logo from './logo.svg'
import './nav.css'


const { Option } = Select;


const Nav = () => {
    const userObj = useContext(CurentUserContext)
    const [users, setUsers] = useState([])
    const [current, setCurrent] = useState('home')
    // console.log(users)
    let navigate = useNavigate();

    const handleClick = e => {
        setCurrent(e.key);
    };


    let userArr = [];

    useEffect(async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            userArr.push(doc.data())
            // console.log(doc.id, " => ", doc.data());
        });
        setUsers(userArr)
    }, [])

    function handleChange(value) {
        console.log(users[value]);
        navigate(`/users/${users[value].uid}`);
    }
    const children = users.map((elem, i) => {
        return <Option key={i} >{elem.name}</Option>
    })
    // const children = ['jj', '11']

    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='menu-nav' style={{ height: 55 }}   >
                <Menu.Item >
                    <img src={logo} />
                </Menu.Item>
                <Menu.Item >
                    <Select showSearch={true}
                        placeholder='Search Users'
                        showArrow={false}
                        defaultActiveFirstOption={false}
                        style={{ width: '250px' }}
                        onChange={handleChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {children}
                    </Select>
                </Menu.Item>
                <Menu.Item key="home" icon={<HomeFilled style={{ fontSize: 25, width: 70 }} />}>
                    <Link to='/'></Link>
                </Menu.Item>
                <Menu.Item key="user" icon={<UserOutlined  style={{ fontSize: 25, width: 70 }} />}>
                    <Link to='/user'></Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingFilled style={{ fontSize: 25, width: 70 }} />}>
                    <Link to='/settings'></Link>
                </Menu.Item>
                <Menu.Item key="myposts" icon={<ContainerOutlined style={{ fontSize: 25, width: 70 }} />}>
                    <Link to='/myposts'></Link>
                </Menu.Item>
                <Menu.Item key="posts" icon={<UsergroupDeleteOutlined style={{ fontSize: 25, width: 70 }} />}>
                    <Link to='/posts'></Link>
                </Menu.Item>

            </Menu>

        </div>
    )
}

export default Nav
