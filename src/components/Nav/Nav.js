import React, { useState } from 'react'
import { Menu,Button } from 'antd';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Nav = () => {
    const [current, setCurrent] = useState('home')
    console.log(current);

    const handleClick = e => {
        setCurrent(e.key);
        console.log('click ', e);
    };
    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"   >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                   <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                <Link to='/settings'>Seiitngs</Link>
                </Menu.Item>
                <Menu.Item key="posts" icon={<SettingOutlined />}>
                <Link to='/posts'>Posts</Link>
                </Menu.Item>
                
                
            </Menu>
           
        </div>
    )
}

export default Nav
