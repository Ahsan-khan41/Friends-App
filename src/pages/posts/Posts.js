import React, { useEffect, useState, useContext } from "react";
import { Card, Collapse, Tooltip, Input, Form, Button, Comment, Typography,Image } from "antd";
import PostModal from "./postModal/PostModal";
import moment from 'moment';
import { collection, onSnapshot, updateDoc, doc, arrayUnion, arrayRemove, setDoc, serverTimestamp } from "firebase/firestore";
import { MessageOutlined, LikeOutlined, ShareAltOutlined, LikeFilled } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { Link } from "react-router-dom";
import CurentUserContext from "../../components/context/CurrentUserContext";
import PostComments from "./postComments/PostComments";
import { db } from "../../components/firebase";
import './posts.css'
import InputEmoji from 'react-input-emoji'

// const { TextArea } = Input;
const { Title } = Typography;
const { Meta } = Card;
const { Panel } = Collapse;
const Posts = () => {
  const [form] = Form.useForm();
  const userObj = useContext(CurentUserContext)

  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [postArr, setPostArr] = useState([]);
  const [callBack, setCallBack] = useState('[]');

  //   console.log(postArr[0].adminUid);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (doc) => {
      let arr = [];
      doc.forEach((element) => {
        arr.push(element.data());
      });
      setPostArr(arr);
    });
  }, []);

  const likeHandler = (element) => {
    const post = doc(db, "posts", `${element.postUid}`);
    console.log(element.like.findIndex((liked) => liked));

    // Set the "capital" field of the city 'DC'
    if ((element.like.findIndex((liked) => liked == userObj.uid)) >= 0) {
      updateDoc(post, {
        like: arrayRemove(userObj.uid)
      });
    } else {
      console.log('console wroking');
      updateDoc(post, {
        like: arrayUnion(userObj.uid)
      });
    }
  }


  const callback = (key) => {
    console.log(key);
    setCallBack(key)
  }
  const onFinish = async (postObj, postComment) => {
    // setLoading(true)
    let commentUid = new Date().getTime();
    const ref = doc(db, "posts", `${postObj}`, 'comments', `${commentUid}`)
    await setDoc(ref, {
      Comment: postComment.postComment,
      adminProfile: userObj.profile,
      adminUid: userObj.uid,
      adminName: userObj.name,
      postUid: postObj,
      timestamp: serverTimestamp(),
      commentUid


    })
    setCallBack(postComment.postComment)
    form.resetFields();
    console.log(postObj, postComment);
    // setLoading(false)
  }


  return (
    <div className="post-div">



      {postArr.slice(0).reverse().map((elem, index) => {

        
          return elem.timestamp && (
            <Card key={index}
              className="post-card"

              actions={[
                <Badge count={elem.like.length}>
                  {/* {console.log((elem.like.findIndex((liked) => liked == userObj.uid)))} */}
                  {(() => {
                    if ((elem.like.findIndex((liked) => liked == userObj.uid)) < 0) {
                      return <LikeOutlined style={{ width: 32 }} onClick={() => { likeHandler(elem) }} key="setting" />
                    } else {
                      return <LikeFilled style={{ width: 32, color: '#1890ff' }} onClick={() => { likeHandler(elem) }} key="setting" />
                    }
                  })()}
                </Badge>,

                // <DeleteOutlined key="delete" onConfirm={confirm} />,
                <ShareAltOutlined />,

                <Collapse style={{ marginTop: -8 }} expandIcon={() => { }} ghost='true' expandIconPosition='right' defaultActiveKey={['0']} onChange={callback}>
                  <Panel style={{}} showArrow='false' header={<MessageOutlined style={{ width: 32, marginLeft: 56 }} key="edit" />} key="1">
                    <div style={{ width: '580px', position: 'relative', right: 400 }}>




                      <Comment
                        avatar={<Avatar src={userObj.profile} alt="Han Solo" />}

                        content={
                          <>
                            <Form
                              form={form}
                              onFinish={(postComment) => { onFinish(elem.postUid, postComment) }}>
                              <Form.Item
                                name="postComment"
                                rules={[{ required: true, message: '' }]}
                              >
                                <InputEmoji
                                  // value={text}
                                  // onChange={setText}
                                  // cleanOnEnter
                                  // onEnter={handleOnEnter}
                                  placeholder="Type a message"
                                />
                              </Form.Item>
                              <Form.Item>

                                <Button htmlType="submit" type="primary">
                                  Add Comment
                                </Button>
                                {/* {loading ? <Button htmlType="submit" type="primary">
                                  loading
                                </Button> : } */}
                                {/* <Button htmlType="submit" type="primary">
                                  Add Comment
                                </Button> */}




                              </Form.Item>
                            </Form>
                          </>
                        }
                      />


                      <PostComments callBack={callBack} postElement={elem} />

                    </div>
                  </Panel>

                </Collapse>,

              ]}
              hoverable
              style={{ border: "1px solid #ccc", margin: '10px 20px' }}
              cover={
                < Image
                  className="post-img"
                  alt="example"
                  src={elem.imgUrl}
                />
              }
            >
              <Link to={`/users/${elem.adminUid}`}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <Avatar src={elem.adminProfile} size={37} />
                  <div style={{ marginLeft: 10 }}>
                    <Title style={{ margin: 0 }} level={5}>{elem.adminName}</Title>
                    <Tooltip title={moment(elem.timestamp.toDate()).format('YYYY-MM-DD HH:mm:ss')}>
                      <span style={{ color: '#616161' }}>{moment(elem.timestamp.toDate()).fromNow()}</span>
                    </Tooltip>
                  </div>
                </div>
              </Link>



              <Meta
                title={elem.postTitle}
                description={elem.postDescription}
              />
            </Card >

          );
        

      })}





      <PostModal />
    </div >
  );
};

export default Posts;