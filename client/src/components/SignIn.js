import React, { useEffect } from 'react'
import {useState} from 'react'; 
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../util/axios'
import Validator from '../util/validator';

import './SignIn.css'

function SignIn() {

    const navigate = useNavigate(); 
    const navigateToMain = () => {
        navigate("/")
    }
    useEffect(() => {
        let token = localStorage.getItem('chainerToken') 
        if(token != null || token != undefined){
            navigateToMain(); 
        }
    }, [])
    const [userName, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState([]);

    const onChange = (e) => {
        if(e.target.name === "username") {
            setUsername(e.target.value); 
        } else setPassword(e.target.value)
      
    }
    const onSubmit = (e) => {
        e.preventDefault();     
        console.log("thispart")
        async function callback(err) {
            if(err.length == 0) {
                Axios('LOGIN', {
                   userName,  
                   password
               }, setError);
            } else {
                setError(err);
                //console.log(err); 
            }
        }

        Validator({
            userName, 
            password,
        }, callback)
    }


    return (
    <div class = "align">
        <div class="grid">
            <form onSubmit = {onSubmit} method="POST" class="form login">
                <div class="form__field">
                    <label for="login__username">
                        <FaUserAlt class = "icon"/>
                    <span class="hidden">Username</span>
                    </label>
                    <input onChange = {onChange} autocomplete="username" id="login__username" type="text" name="username" class="form__input" placeholder="Username" />
                </div>
                <div class="form__field">
                    <label for="login__password">
                        <RiLockPasswordFill class = "icon"/>
                    <span class="hidden">Password</span>
                    </label>
                    <input  onChange = {onChange} id="login__password" type="password" name="password" class="form__input" placeholder="Password" />
                </div>
                <div class="form__field">
                    <input type="submit" value="Sign In" />
                </div>
            </form>

                <p class="text--center error">
                    {error[0] && error[0]}
                    {error[1] &&  + error[1]}
                </p>
            
            <p class=  'text--center'>
                Not a member? <Link to="/signUp">Sign Up now </Link>
                <svg class="icon">

                </svg>
            </p>
        </div>
  
   </div>
    )
}


export default SignIn;