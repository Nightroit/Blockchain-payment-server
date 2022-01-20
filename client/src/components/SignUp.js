import React from 'react'
import {useState} from 'react'; 
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri'
import { MdOutlineAlternateEmail } from "react-icons/md";
import Validator  from '../util/validator';
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

        if(e.target.name == "email") {    
            setEmail(e.target.value)
        }
        else if(e.target.name === "username") {
            setUsername(e.target.value); 
        } else if(e.target.name === "password") {
            setPassword(e.target.value); 
        } else {
            setConfirmPassword(e.target.value); 
        }
      
    }

    const onSubmit = async (e) => {
        e.preventDefault();     
        let errs = []
        async function callback(err) {
            if(err.length == 0) {
               await Axios('SIGNUP', {
                   userName, 
                   email, 
                   password, 
               }, setError)
               console.log(errs); 
               setError(errs);
            } else setError(err); 
        }
        Validator({
            userName, 
            email, 
            password, 
            confirmPassword
        }, callback)
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
                    <input onChange = {onChange}  id="login__username" type="text" name="username" class="form__input" placeholder="Username" />
                </div>
                <div class="form__field">
                    <label for="login_email">
                        <MdOutlineAlternateEmail class = "icon"/>
                    <span class="hidden">Email</span>
                    </label>
                    <input onChange = {onChange} id="login__username" type="text" name="email" class="form__input" placeholder="Email" />
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
                    <input  onChange = {onChange} id="login__password" type="password" name="Confirm_password" class="form__input" placeholder="Confirm Password" />
                </div>
                <div class="form__field">
                    <input type="submit" value="Sign Up" />
                </div>
            </form>
            {
                error.map(err => {
                    return (
                        <p class="text--center error">
                            {err+ "!"}
                        </p>
                    )
                })
            }
            
            <p class=  'text--center '>
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