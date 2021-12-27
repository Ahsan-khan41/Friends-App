import { Tabs, Typography } from 'antd';
import UserAbout from './userAbout/UserAbout';
import UserPosts from './userPosts/UserPosts';
import './userTabs.css'
const { TabPane } = Tabs;
const UserTabs = (props) => {
    const { Title } = Typography;




    console.log(props.user);
    return (
        <div>
            <Tabs id='userTabs' defaultActiveKey="1" centered size='large'>
                <TabPane tab={<Title level={5}>Posts</Title>} key="1">
                <UserPosts user={props.user} />
            </TabPane>
            <TabPane tab={<Title level={5}>About</Title>} key="2">
                <div className='aboutDiv'>
                    <UserAbout user={props.user} />

                </div>
            </TabPane>
            <TabPane tab={<Title level={5}>Photos</Title>} key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
        </div >
    )
}

export default UserTabs
