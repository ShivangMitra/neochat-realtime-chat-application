import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'

import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

function Chats() {

    const history = useHistory();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => {
        const res = await fetch(url);
        const data = await res.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.push('/')
            return
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "76860f34-d8c0-4707-8ebf-99059404d586",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then(() => {
            setLoading(false);
        }).catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users', 
                formdata, 
                { headers: { 'private-key': "677ac720-3b3c-4e5c-830b-17012eed4256" } }
                ).then(() => setLoading(false))
                .catch((err) => console.log(err))
            })
        })
    }, [user, history])

    if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Neochat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
                height="calc( 100vh - 66px )"
                projectID="76860f34-d8c0-4707-8ebf-99059404d586"
                userName={user.email}
                userSecret={user.uid} 
            />
        </div>
    )
}

export default Chats
