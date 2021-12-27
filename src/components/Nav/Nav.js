import React, { useState, useEffect, useContext } from 'react'
import { Menu, Affix } from 'antd';
import { HomeFilled, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';
import logo from './logo.svg'
import './nav.css'


const { Option } = Select;


const Nav = () => {
    const [users, setUsers] = useState([])
    const [current, setCurrent] = useState('home')
    const [searchKeys, setSearchKeys] = useState('z')
    let navigate = useNavigate();

    const handleClick = e => {
        setCurrent(e.key);
    };


    let userArr = [];

    useEffect(async () => {
        const q = query(collection(db, "users"), where("name", ">=", searchKeys));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            userArr.push(doc.data())
        });
        setUsers(userArr)
    }, [searchKeys])

    function handleChange(value) {
        console.log(users[value]);
        navigate(`/users/${users[value].uid}`);
    }
    const children = users.map((elem, i) => {
        return <Option key={i} >{elem.name}</Option>
    })

    useEffect(() => {

    }, [])
    const SearchFunc = (val) => {
        if (val === '') {
            setSearchKeys('z')
        } else {
            setSearchKeys(val)

        }
    }
    return (

        
        <div>
            <Affix >
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='menu-nav' style={{ height: 55 }}   >
                    <Menu.Item >
                        <img className='logo' src={logo} />
                        <Link to='/'></Link>
                    </Menu.Item>
                    <Menu.Item >
                        <Select showSearch={true}
                            placeholder='Search Users'
                            showArrow={false}
                            className='searchSelect'
                            defaultActiveFirstOption={false}
                            onSearch={SearchFunc}
                            style={{ width: '250px' }}
                            onChange={handleChange}
                            filterOption={(input, option) => {

                                return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            }
                        >
                            {children}
                        </Select>
                    </Menu.Item>
                    <Menu.Item key="home" icon={<HomeFilled style={{ fontSize: 25, width: 70 }} />}>
                        <Link to='/'></Link>
                    </Menu.Item>
                    <Menu.Item key="user" icon={<UserOutlined style={{ fontSize: 25, width: 70 }} />}>
                        <Link to='/user'></Link>
                    </Menu.Item>


                </Menu>
            </Affix>,



        </div >
    )
}

export default Nav
