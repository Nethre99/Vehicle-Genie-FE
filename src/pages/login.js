import React, { useState } from "react";
import axios from 'axios';
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("Inside Handle Submit");
        e.preventDefault();

        const userinfo = {
            email: email,
            name: username
        };

        console.log("Is new user", isNewUser);

        const user = await axios.post(`http://127.0.0.1:8085/api/v1/vehicle-genie/usermgt/login`, userinfo)
        .then(response => {
            if(response == null){
                console.log("Null returned");
            }
            console.log(response.data , "hi");
            return response.data; 
        })
        .catch(error => {
            console.error(error);
        });

        

        if(user.client_Id === 1234){

            await axios.post(`http://127.0.0.1:8085/api/v1/vehicle-genie/usermgt/adduser`, userinfo)
            .then(response => {
                if(response == null){
                    console.log("Null returned");
                }
                console.log(response.data , "hi");

                navigate(`/mainpg?clientId=${response.data.client_Id}`);

                return response.data; 
            })
            .catch(error => {
                console.error(error);
            });

            setLogin(true);   
        }else{
            console.log("User Id {}", user.client_Id);
            navigate(`/mainpg?clientId=${user.client_Id}`);
            setLogin(true);
        }
            
    }

    return (
        <>
            <div className="sign-up-container">
                <div id="signup-card">
                    <p>Log in to your <b>Vehicle Genie</b> account.</p>
                    <form id="signupform">   
                        {/* <span htmlFor="checkUser"> Are You a New User ? </span>
                        <input 
                            type="checkbox" 
                            name="newuser" 
                            id="checkbx"
                            value="New"
                            checked={isNewUser}
                            onChange={(e) => setIsNewUser(e.target.checked)}
                        />
                        <br/> */}
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            className="tx"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>E-Mail</label>
                        <input
                            type="email"
                            name="email"
                            className="tx"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button id="b2" onClick={handleSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
