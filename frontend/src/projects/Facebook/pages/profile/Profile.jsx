import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from "react-router";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import "./profile.css";

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log(PF+"person/noCover.png");
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(()=>{
            const fecthUser=async ()=>{
                const res = await axios.get(`/users?username=${username}`);
                setUser(res.data.user);
                // console.log(res.data.user);
            }
            fecthUser();
    }, [username]);

    return (
        <>
          <Topbar />
          <div className="profile">
                <Sidebar />   
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                // src="/assets/post/3.jpeg"
                                src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.png"}
                                alt="my profile"
                            />
                            <img
                                className="profileUserImg"
                                // src="/assets/person/7.jpeg"
                                src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"}
                                alt="user profile"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div> 
          </div>  
        </>
    )
}

export default Profile
