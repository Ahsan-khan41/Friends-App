import React, { useState } from 'react'
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Home from '../../pages/home/Home';
const { SubMenu } = Menu;


const Nav = () => {
    const [current, setCurrent] = useState('home')
    console.log(current);

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"   >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                   <Link to='/home'>Home</Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                <Link to='/settings'>Seiitngs</Link>
                </Menu.Item>
            </Menu>
           
        </div>
    )
}

export default Nav
