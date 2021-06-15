import React, {useState, useEffect} from 'react';
import axios from "axios";
import Share from "../share/Share";
import Post from "../post/Post";
import "./Feed.css";


const Feed = ({username}) => {
    const [posts, setPosts]=useState([]);

    useEffect(()=>{
        const fetchPosts=async ()=>{
            const res=username 
                ? await axios.get("/posts/profile/" + username) 
                : await axios.get("/posts/timeline/60c86f6617f0cf08a4866d57");
            console.log(res.data);
            setPosts(res.data);
        } 
        fetchPosts();  
    }, [username]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((p)=>(
                    <Post key={p._id} post={p} />
                ))}   
            </div>
        </div>
    )
}

export default Feed
