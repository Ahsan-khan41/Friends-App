import React, { useState, useEffect,useContext } from 'react'
import { Card, Collapse, Tooltip, Input, Form, Button, Comment, Typography,Divider,Badge,Avatar } from "antd";
import moment from 'moment'
import { MessageOutlined,LikeOutlined, ShareAltOutlined,LikeFilled,CreditCardOutlined,VideoCameraAddOutlined } from '@ant-design/icons';
import { collection, query, where, onSnapshot, doc, arrayUnion, deleteDoc ,updateDoc,arrayRemove,setDoc,serverTimestamp} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import './user-post.css'
import { db, storage } from '../../../../components/firebase';
import CurentUserContext from '../../../../components/context/CurrentUserContext';
import { Link } from 'react-router-dom';
import PostComments from '../../../posts/postComments/PostComments';

const { TextArea } = Input;
const { Title } = Typography;
const { Meta } = Card;
const { Panel } = Collapse;
const UserPosts = (props) => {
    const [form] = Form.useForm();
    const [callBack, setCallBack] = useState('[]');
  const userObj = useContext(CurentUserContext)

    const [postArr, setPostArr] = useState([]);
    console.log(postArr, props.user);
    useEffect(() => {

        const q = query(collection(db, "posts"), where("adminUid", "==", `${props.user.uid}`));
         onSnapshot(q, (querySnapshot) => {
            const arr = [];
            querySnapshot.forEach((element) => {
                arr.push(element.data());
            });
            setPostArr(arr);
        });
    }, [props]);

    const confirm = (e) => {
        deleteDoc(doc(db, 'posts', `${e}`));
        const desertRef = ref(storage, `posts/${e}`);

        // Delete the file
        deleteObject(desertRef).then(() => {
            console.log('File deleted successfully')
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error)
        });

    }

    const likeHandler = (element) => {
        const post = doc(db, "posts", `${element.postUid}`);

        // Set the "capital" field of the city 'DC'
        if ((element.like.findIndex((liked) => liked == userObj.uid)) >= 0) {
            updateDoc(post, {
              like: arrayRemove(userObj.uid)
            });
          } else {
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
      }

    return (
        <div className='userPostParent'>
            <div className="create-post-div">
                <Input placeholder="What's on your mind ?" className="post-input" />
                <Divider />
                <div className="buttons-div">
                    <Button type="primary">
                        <CreditCardOutlined /> Photo
                    </Button>
                    <Button type="primary">
                        <VideoCameraAddOutlined /> Video
                    </Button>
                </div>
            </div>
            {postArr.map((elem, index) => {
                return (
                    <Card key={index}
                        className='post-card'
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
                                rules={[{ required: true, message: 'Please Input Comment!' }]}
                              >
                                <TextArea rows={1} />
                              </Form.Item>
                              <Form.Item>
                                <Button htmlType="submit" type="primary">
                                  Add Comment
                                </Button>
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
                        style={{ width: 310, border: "1px solid #ccc", margin: '10px 20px' }}
                        cover={
                            <img
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
                    </Card>
                );
            })}

        </div>
    )
}

export default UserPosts
