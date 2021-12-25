import React from 'react'
import { Tabs, Typography } from 'antd';
const { TabPane } = Tabs;
const { Title } = Typography;

const UserAbout = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ height: 320, width: 400 }} centered>
                <TabPane tab={<Title level={5}>About</Title>} />
                <TabPane tab={<Title level={5}>Overview</Title>} key="1">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserAbout
