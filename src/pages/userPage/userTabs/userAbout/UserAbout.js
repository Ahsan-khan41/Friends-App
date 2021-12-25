import React, { useState, useContext, useEffect } from 'react'
import { Tabs, List, Typography, Divider } from 'antd';
import CurentUserContext from '../../../../components/context/CurrentUserContext';
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../../components/firebase';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Paragraph } = Typography;
const UserAbout = () => {
    const userObj = useContext(CurentUserContext)
    
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [Mstatus, setMstatus] = useState('');
    const [city, setCity] = useState('');
    const [info, setInfo] = useState('');
    const [language, setLanguage] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    

    useEffect(() => {
        onSnapshot(doc(db, "users", `${userObj.uid}`), (doc) => {
            if (doc.data()) {
            
                setName(doc.data().name)
                setEmail(doc.data().email)
                setDob(doc.data().DOB)
                setMstatus(doc.data().Mstatus)
                setCity(doc.data().city)
                setInfo(doc.data().info)
                setLanguage(doc.data().language)
                setMobile(doc.data().mobile)

            }
        });

    }, [])

   


    return (
        <div>
            <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ height: '350px', width: '100%' }} centered>
                <TabPane tab={<Title style={{ width: 200 }} level={5}>About</Title>} />
                <TabPane tab={<Title level={5}>Overview</Title>} key="1">

                    <Divider orientation="center">Overview</Divider>

                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>Name :  </Title></span> <Title style={{ marginLeft: 100 }} level={5} >{name}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>Email :  </Title></span> <Title style={{ marginLeft: 101 }} level={5}>{email}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>Status :  </Title></span> <Title style={{ marginLeft: 100 }} level={5}>{Mstatus}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>City :  </Title></span> <Title style={{ marginLeft: 115 }} level={5} >{city}</Title>
                        </div>
                    </List.Item>



                </TabPane>
                <TabPane tab={<Title level={5}>Contact And Basic Info</Title>} key="2">
                    <Divider orientation="center">Contact And Basic Info</Divider>

                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>Email :  </Title></span> <Title style={{ marginLeft: 115 }} level={5}>{email}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5} >Mobile :  </Title></span> <Title style={{ marginLeft: 102 }} level={5} >{mobile}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5} >Language :  </Title></span> <Title style={{ marginLeft: 85 }} level={5} >{language}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5} >Date of Birth :  </Title></span> <Title style={{ marginLeft: 65 }} level={5} >{dob}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5} >Info :  </Title></span> <Title style={{ marginLeft: 130 }} level={5} >{info}</Title>
                        </div>
                    </List.Item>

                </TabPane>
                <TabPane tab={<Title level={5}>Life Events</Title>} key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserAbout
