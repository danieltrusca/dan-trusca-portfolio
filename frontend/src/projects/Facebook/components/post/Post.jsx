import React, {useState} from 'react';
import { MoreVert } from "@material-ui/icons";
import {Users} from "../../dummyData";
import "./Post.css";

const Post = ({post}) => {
    const [like,setLike] = useState(post.like);
    const [isLiked,setIsLiked] = useState(false);
    let img=Users.filter(u=>u.id===post.userId)[0].profilePicture;
    let name=Users.filter(u=>u.id===post.userId)[0].username;

    const likeHandler =()=>{
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
      }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={`/${img}`} alt="profile" className="postProfileImg" />
                        <span className="postUsername">{name}</span>
                        <span className="postDate">{post.date}  ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText"> {post?.desc}</span>
                    <img src={`/${post.photo}`} alt="post" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/like.png" onClick={likeHandler}  alt="like" />
                        <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler}  alt="unlike" />
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