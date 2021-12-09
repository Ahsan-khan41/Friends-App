import React,{useState,useEffect} from 'react'
import { Card } from 'antd';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../../components/firebase';
const { Meta } = Card;

const UserCard = (props) => {
    let userObj = localStorage.getItem('user')
    userObj = JSON.parse(userObj)
    const [imgURL, setImgURL] = useState('')
    
    useEffect(() => {
        getDownloadURL(ref(storage, userObj.uid))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                // Or inserted into an <img> element
                // const img = document.getElementById('myimg');
                // img.setAttribute('src', url);
                setImgURL(url)
                console.log(url)
            })
            .catch((error) => {
                // Handle any errors
                console.log(error)
            });

    }, [])
    return (
        <div>
            <Card 
                hoverable
                style={{ width: 310 ,border:'1px solid #ccc'}}
                cover={<img className='userImg' alt="example" src={imgURL} />}
            >
                <Meta title={'Name : '+props.name} description={'Email : '+props.email} />
                <p>hello</p>
            </Card>
        </div>
    )
}

export default UserCard
