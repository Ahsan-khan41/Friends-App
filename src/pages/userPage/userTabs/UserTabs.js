import { Tabs } from 'antd';
import UserAbout from './userAbout/UserAbout';
import UserPosts from './userPosts/UserPosts';
import './userTabs.css'
const { TabPane } = Tabs;
const UserTabs = (props) => {

    



    console.log(props.user);
    return (
        <div>
            <Tabs id='userTabs' defaultActiveKey="1" centered size='large'>
                <TabPane tab="Posts" key="1">
                   <UserPosts user={props.user}/>
                </TabPane>
                <TabPane tab="About" key="2">
                    <div className='aboutDiv'>
                    <UserAbout/>

                    </div>
                </TabPane>
                <TabPane tab="Photos" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserTabs
