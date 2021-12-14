import { Tabs } from 'antd';
import UserPosts from './userPosts/UserPosts';
const { TabPane } = Tabs;
const UserTabs = (props) => {

    



    console.log(props.user);
    return (
        <div>
            <Tabs defaultActiveKey="1" centered size='large'>
                <TabPane tab="Posts" key="1">
                   <UserPosts user={props.user}/>
                </TabPane>
                <TabPane tab="About" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Photos" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserTabs
