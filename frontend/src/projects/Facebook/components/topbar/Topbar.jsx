import React from 'react';
import {Link} from "react-router-dom";
import "./Topbar.css";
import {Search, Person, Chat, Notifications} from "@material-ui/icons";

const Topbar = () => {
    return (
        <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/facebook" style={{textDecoration: "none"}}>
              <span  className="logo">
                Social App
              </span>
            </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to="/facebook/profile/dana">
              <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
          </Link>
          
        </div>
      </div>
    )
}

export default Topbar

