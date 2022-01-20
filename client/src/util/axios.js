import axios from 'axios'; 
import secrects from '../util/secret'
import { Navigate } from "react-router-dom";


function setToken(token) {
    if(token) {
        localStorage.setItem('chainerToken', token); 
        window.location.reload(); 
    }
}

function makeRequest(type, userData, setError) {
    if(type == 'LOGIN') {
        axios.post(secrects.MAINSERVER+"/login", userData).then((res) => {
            if(res.data.found) {
                setToken(res.data.token); 
            } else {
                setError([res.data.msg]); 
            }
        })
    } else {
        axios.post(secrects.MAINSERVER+"/register", userData).then((res) => {
            if(res.data.token) {
                setToken(res.data.token); 
            } else {
             
                setError([res.data.msg])
                }
            })
    }
}

export default makeRequest; 