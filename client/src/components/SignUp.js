import React from 'react'
import {useState} from 'react'; 
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri'
import Axios from '../util/axios'
import { Link } from "react-router-dom";

import './SignIn.css'

function SignUp() {
    const [userName, setUsername] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([]);
    
    const onChange = (e) => {
        console.log(e.target.name); 
        console.log(e.target.value)
        if(e.target.name === "username") {
            setUsername(e.target.value); 
        } else if(e.taget.name === "email") {
            setEmail(e.target.value)
        } else if(e.target.value === "password") {
            setPassword(e.target.value); 
        } else {
            setConfirmPassword(e.target.value); 
        }
      
    }

    const onSubmit = (e) => {
        e.preventDefault(); 
        let error = []; 
        if(userName == "") {
            error.push("username")
        }
        if(password == "") {
            error.push("password"); 
        }
        if(confirmPassword == "") {
            error.push("confirm password"); 
        }
        if(password !== confirmPassword) {
            error.push("Password does not match")
        }
        if(email == "") {
            error.push("email"); 
        }
        setError(error); 
        if(error.length == 0) {
            Axios('POST', {
                userName, 
                email, 
                password,
            }); 
        }
    }

    return (
    <div class = "align1">
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
                    <label for="login_email">
                        <FaUserAlt class = "icon"/>
                    <span class="hidden">Email</span>
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
                    <label for="login__Confirm_password">
                        <RiLockPasswordFill class = "icon"/>
                    <span class="hidden">Confirm password</span>
                    </label>
                    <input  onChange = {onChange} id="login__password" type="password" name="password" class="form__input" placeholder="Confirm Password" />
                </div>
                <div class="form__field">
                    <input type="submit" value="Sign In" />
                </div>
            </form>

                <p class="text--center error">
                    {error[0] && "Enter valid " + error[0]}
                    {error[1] && " and " + error[1]}
                </p>
            
            <p class=  'text--center'>
                Already a member? 
                <Link to ="/"> Sign in now</Link> 
                <svg class="icon">

                </svg>
            </p>
        </div>

   </div>
    )
}


export default SignUp;