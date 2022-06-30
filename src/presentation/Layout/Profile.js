import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Button, Menu, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import firebase from "../../config/api/firebase";
import { setStorageItem, getStorageItem, removeStorageItem } from "../../infrastructure/common/local";
import { routes } from "../common/Routes/routes";
import { useProfileStore } from '../Profile/store';


const auth = firebase.auth();


const Profile = () => {
    const [email, setEmail] = useState("");

    const [
        { customerList, profile },
        {
          setVisible,
          getPayments,
          setSearchData,
          onEdit,
          onDelete,
          setVisibleEdit,
          setVisibleCreate,
          profileDetails,
        },
      ] = useProfileStore();

    useEffect(() => {
        profileDetails()
    }, [profileDetails]);
   

    console.log("email in profile", profile)
    const signOut = () => {
      localStorage.removeItem("tokenTime")
       localStorage.removeItem("expireTime")
        localStorage.removeItem("token");
        window.location.replace(routes.LOGIN);
    }
    const menu = (
        <div className="profileBody">
            <div className="top">
                <div className="left">
                    <Avatar
                        style={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                        }}
                    >
                        {profile?.user?.first_name?.substring(0, 1).toUpperCase()}
                    </Avatar>
                </div>
                <div className="right">
                    <span className="email">
                   {profile?.user?.first_name+" "+profile?.user?.last_name}
                    </span>
                </div>
            </div>
            <Divider />
            <div className="bottom">
                <Button style={{background:"#B32642",border:"none"}} type="primary" onClick={signOut}>Sign Out</Button>
            </div>
        </div>
    );
    return (
        <div className="profile">
            <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                <Avatar
                    style={{
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                    }}>
                    {profile?.user?.first_name?.substring(0, 1).toUpperCase()}
                </Avatar>
            </Dropdown>
        </div>
    );
};

export default Profile;