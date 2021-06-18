import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import Share from "../share/Share";
import Post from "../post/Post";
import "./Feed.css";


const Feed = ({username}) => {
    const [posts, setPosts]=useState([]);
    const userSignin = useSelector((state) => state.authFacebook);
    const { userInfo } = userSignin;
    useEffect(()=>{
        const fetchPosts=async ()=>{
            const res=username 
                ? await axios.get("/posts/profile/" + username) 
                : await axios.get("/posts/timeline/"+ userInfo._id);
            console.log(res.data);
            setPosts(res.data.sort((p1, p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        } 
        fetchPosts();  
    }, [username, userInfo._id]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username===userInfo.username) && <Share />}
               
                {posts.map((p)=>(
                    <Post key={p._id} post={p} />
                ))}   
            </div>
        </div>
    )
}

export default Feed
