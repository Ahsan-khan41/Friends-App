import React from 'react'
import { BellFilled} from '@ant-design/icons';
import {Collapse } from "antd";
import './notification.css'
const { Panel } = Collapse;

const Notifications = () => {



    const callback = (key) => {
        console.log(key);
      }

    return (
        <div className='notificationDiv'>
            <Collapse style={{ marginTop: -8,position:'relative',zIndex:10 }} expandIcon={() => { }} ghost='true' expandIconPosition='right' defaultActiveKey={['0']} onChange={callback}>
                <Panel  showArrow='false' header={<BellFilled style={{ fontSize: 25, width: 70 }} key="edit" />} key="1">
                    <div className='notificationPanel' >hsdsdhjsd</div>









                    
                </Panel>

            </Collapse>
        </div>
    )
}

export default Notifications
