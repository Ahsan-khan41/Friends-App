import { Tabs, Typography } from 'antd';
import ProfilePost from './profilePost/ProfilePost'
import ProfileAbout from './profileAbout/ProfileAbout'
import './profileTabs.css'
const { TabPane } = Tabs;
const ProfileTabs = (props) => {
    const { Title } = Typography;




    console.log(props.user);
    return (
        <div>
            <Tabs id='userTabs' defaultActiveKey="1" centered size='large'>
                <TabPane tab={<Title level={5}>Posts</Title>} key="1">
                    <ProfilePost user={props.user} />
                </TabPane>
                <TabPane tab={<Title level={5}>About</Title>} key="2">
                    <div className='aboutDiv'>
                        <ProfileAbout />

                    </div>
                </TabPane>
                <TabPane tab={<Title level={5}>Photos</Title>} key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div >
    )
}

export default ProfileTabs
