import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js";
import "./Post.css";

const Post = ({post}) => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const userSignin = useSelector((state) => state.authFacebook);
    const { userInfo } = userSignin;
    const [user, setUser]=useState({});
    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(post.likes.includes(userInfo._id));
      }, [userInfo._id, post.likes]);

    useEffect(()=>{
        const fetchUser=async ()=>{
            const res=await axios.get(`/users?userId=${post.userId}`);
            
            setUser(res.data.user);
        };
        fetchUser();
        
    }, [post.userId]);

    
    

    const likeHandler =()=>{
        try{
            axios.put(`/posts/${post._id}/like`,
                {userId: userInfo._id});
        } catch(err){
            console.log(err);
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
      }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/facebook/profile/${user.username}`}>
                            <img src={user.profilePicture ? PF+ user.profilePicture : PF+ "/person/noAvatar.png"} alt="profile" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}  ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText"> {post?.desc}</span>
                    <img src={PF+ post.img} alt="post" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler}  alt="like" />
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler}  alt="unlike" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
