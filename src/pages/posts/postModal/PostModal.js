
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import ModalForm from "./modalForm/ModalForm";

const PostModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
console.log(isModalVisible);
// setIsModalVisible(props.value)
const showModal = () => {
  setIsModalVisible(true);
  
};

  
 
  

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button style={{ position: 'fixed', bottom: 20, right: 20 }} type="primary" onClick={showModal}>
        Create Post
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          
        ]}
      >
        <ModalForm closeFunc={handleOk} />
      </Modal>
    </div>
  );
};

export default PostModal;