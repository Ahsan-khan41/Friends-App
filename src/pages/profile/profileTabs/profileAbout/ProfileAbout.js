import React, { useState, useContext, useEffect } from 'react'
import { Tabs, List, Typography, Divider } from 'antd';
import CurentUserContext from '../../../../components/context/CurrentUserContext';
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../../components/firebase';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Paragraph } = Typography;
const ProfileAbout = () => {
    const userObj = useContext(CurentUserContext)
    let uName;
    let udob;
    let uMstatus;
    let ucity;
    let uinfo;
    let ulanguage;
    let umobile;
    let uEmail;
    const [name, setName] = useState(uName);
    const [dob, setDob] = useState(udob);
    const [Mstatus, setMstatus] = useState(uMstatus);
    const [city, setCity] = useState(ucity);
    const [info, setInfo] = useState(uinfo);
    const [language, setLanguage] = useState(ulanguage);
    const [mobile, setMobile] = useState(umobile);
    const [email, setEmail] = useState(uEmail);

    const [updateName, setUpdateName] = useState(name);
    const [updateEmail, setUpdateEmail] = useState(email);
    const [updateDob, setUpdateDob] = useState(dob);
    const [updateStatus, setUpdateMstatus] = useState(Mstatus);
    const [updateCity, setUpdateCity] = useState(city);
    const [updateInfo, setUpdateinfo] = useState(info);
    const [updateLanguage, setUpdateLanguage] = useState(language);
    const [updateMobile, setUpdateMobile] = useState(mobile);

    useEffect(() => {
        onSnapshot(doc(db, "users", `${userObj.uid}`), (doc) => {
            if (doc.data()) {
                uName = doc.data().name
                udob = doc.data().DOB
                uMstatus = doc.data().Mstatus
                uEmail = doc.data().email
                ucity = doc.data().city
                uinfo = doc.data().info
                ulanguage = doc.data().language
                umobile = doc.data().mobile
                console.log(umobile);

                setUpdateName(uName)
                setUpdateEmail(uEmail)
                setUpdateDob(udob)
                setUpdateMstatus(uMstatus)
                setUpdateCity(ucity)
                setUpdateinfo(uinfo)
                setUpdateLanguage(ulanguage)
                setUpdateMobile(umobile)



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

    }, [userObj])

    console.log(updateMobile, updateLanguage, updateCity, updateEmail);
    if (updateMobile) {

        const usersRef = doc(db, 'users', `${userObj.uid}`);
        setDoc(usersRef, { name: updateName, Mstatus: updateStatus, city: updateCity, info: updateInfo, language: updateLanguage, mobile: updateMobile }, { merge: true });
    }

    console.log(updateMobile);

    return (
        <div>
            <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ height: '350px', width: '100%' }} centered>
                <TabPane tab={<Title style={{ width: 200 }} level={5}>About</Title>} />
                <TabPane tab={<Title level={5}>Overview</Title>} key="1">

                    <Divider orientation="center">Overview</Divider>

                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>Name :  </Title></span> <Title style={{ marginLeft: 100 }} level={5} editable={{ onChange: setUpdateName }}>{updateName}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>Email :  </Title></span> <Title style={{ marginLeft: 115 }} level={5}>{updateEmail}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>Status :  </Title></span> <Title style={{ marginLeft: 100 }} level={5}>{updateStatus}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>City :  </Title></span> <Title style={{ marginLeft: 115 }} level={5} editable={{ onChange: setUpdateCity }}>{updateCity}</Title>
                        </div>
                    </List.Item>



                </TabPane>
                <TabPane tab={<Title level={5}>Contact And Basic Info</Title>} key="2">
                    <Divider orientation="center">Contact And Basic Info</Divider>

                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5}>Email :  </Title></span> <Title style={{ marginLeft: 115 }} level={5}>{updateEmail}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5} >Mobile :  </Title></span> <Title style={{ marginLeft: 102 }} level={5} editable={{ onChange: setUpdateMobile }}>{updateMobile}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5} >Language :  </Title></span> <Title style={{ marginLeft: 85 }} level={5} editable={{ onChange: setUpdateLanguage }}>{updateLanguage}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5} >Date of Birth :  </Title></span> <Title style={{ marginLeft: 65 }} level={5} >{updateDob}</Title>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                            <span><Title level={5} >Info :  </Title></span> <Title style={{ marginLeft: 130 }} level={5} editable={{ onChange: setUpdateinfo }}>{updateInfo}</Title>
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

export default ProfileAbout
