import React, { useEffect, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../components/firebase';
import { Link } from 'react-router-dom';
// import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';


const PostComments = (props) => {
  console.log(props);
  const [comments, setComments] = useState([])

  useEffect(async () => {

    console.log('comment added');
    const docsSnap = await getDocs(collection(db, `posts/${props.postElement.postUid}/comments`));
    let arr = []
    docsSnap.forEach((doc) => {
      arr.push(doc.data())
      console.log(doc.data()); // "doc1", "doc2" and "doc3"
    });

    setComments(arr)

  }, [props])

  return (
    <div>
      {comments.map((elem, index) => {

        {console.log(elem.timestamp)}
        return  (<Link to={`/users/${elem.adminUid}`}> <Comment key={index}

            author={elem.adminName}
            avatar={<Avatar src={elem.adminProfile} alt={elem.adminName} />}

            content={
              <p style={{ textAlign: 'left', color: 'black' }}>
                {elem.Comment}
              </p>
            }
            datetime={
              <Tooltip title={moment(elem.timestamp.toDate()).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(elem.timestamp.toDate()).fromNow()}</span>
              </Tooltip>
            }
          />
          </Link>)
        

      })}

    </div>
  )
}

export default PostComments
