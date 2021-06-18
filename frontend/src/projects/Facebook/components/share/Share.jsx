import React, {useState} from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons";
import "./Share.css";

const Share = () => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const userSignin = useSelector((state) => state.authFacebook);
    const { userInfo } = userSignin;
    const [desc, setDesc]=useState("");
    const [file, setFile] = useState(null);

    const submitHandler=async (e)=>{
        e.preventDefault();
        const newPost={
            userId: userInfo._id,
            desc: desc
        };

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try{
                await axios.post("/upload", data);
            } catch(err){}
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
          } catch (err) {
            console.log(err);
          }
        
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={
                        userInfo.profilePicture
                            ? PF + userInfo.profilePicture
                            : PF + "person/noAvatar.png"
                        } alt="" />
                    <input
                        placeholder={`What's in your mind ${userInfo.username}?`}
                        className="shareInput"
                        type="text"
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                    />
                </div>
                <hr className="shareHr"/>
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
