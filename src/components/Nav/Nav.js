import React, { useState, useEffect, useContext } from 'react'
import { Menu, Affix, Avatar, Typography } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';
import logo from './logo.svg'
import CurentUserContext from '../context/CurrentUserContext';
import Notifications from '../../pages/notifications/Notifications';
import './nav.css'


const { Option } = Select;
const { Text } = Typography;


const Nav = () => {
    const userObj = useContext(CurentUserContext)

    const [users, setUsers] = useState([])
    const [current, setCurrent] = useState('home')
    const [searchKeys, setSearchKeys] = useState('zzz')
    let navigate = useNavigate();

    const handleClick = e => {
        setCurrent(() => { return e.key });

    };

    let activUser = ''
    let activUserName = ''
    if (current === 'user') {
        activUser = 'activUser';
        activUserName = 'activUserName'
    }


    let userArr = [];

    useEffect(async () => {
        const q = query(collection(db, "users"), where("name", ">=", searchKeys), where("name", "<=", searchKeys+ "\uf8ff"),);

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
            setSearchKeys('zzz')
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
                    <Menu.Item className={activUser} style={{ width: 110, padding: 0, height: 40, position: 'absolute', right: '4%', top: 6, display: 'flex', alignItems: 'center', marginRight: 20 }} key="user" icon={<Avatar style={{ marginLeft: 10 }} size={32} src={userObj.profile} />}>
                        <Text className={activUserName} strong>{userObj.name}</Text>

                        <Link to='/user'></Link>
                    </Menu.Item>
                    <Menu.Item style={{ position: 'relative', left: '33%', top: 8}} key="notifications" icon={<Notifications />}>

                    </Menu.Item>


                </Menu>
            </Affix>,



        </div >
    )
}

export default Nav
