import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Navbar from "./NavBar";



const Profile = ({ setUserInfo }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
  
    useEffect(() => {
        async function createUser() {
            try {
                const response = await fetch('http://127.0.0.1:5000/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: user.name,
                        email: user.email,
                    })
            });
                const data = await response.json();
                console.log(data)
                setUserInfo(data);
                
            } catch (error) {
                console.error(error);
            }
        }
        createUser();
        }, [user]);
  
    if (isLoading) {
      return <div>Loading ...</div>;
    }
  
    return (
      isAuthenticated && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <Navbar/>
        </div>
      )
    );
  };
  
export default Profile;

// export default withAuthenticationRequired(Profile);

