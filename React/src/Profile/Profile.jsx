import React from "react";
import "./Profile.css";
import Posts from "../Main/Post/Posts/Posts";

const Profile = () => {
    return <div className="Profile">
        <img src="" alt="avatar" />
        <div className="personal-info">
            <p>
                <span>Email: </span>
                myemail@mail.com
            </p>
            <p>
                <span>Posts: </span>
                Last 3
            </p>
        </div>
        <Posts />
    </div>
}

export default Profile;