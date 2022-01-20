import axios from 'axios'; 
import secrects from '../util/secret'

import React from 'react'; 

function setToken(token) {
    if(token) {
        localStorage.setItem('chainerToken', token); 
    }
}

function makeRequest(type, userData, setError) {
    let uniqueId; 
    if(type == 'LOGIN') {
        axios.post(secrects.MAINSERVER+"/login", userData).then((res) => {
            if(res.data.found == true) {
                setToken(res.data.token); 
                console.log(res.data); 
                localStorage.setItem('chainerUniqueId', res.data.uniqueId); 
                localStorage.setItem('userName', userData.userName)
                window.location.reload(false); 
            } else {
                setError([res.data.msg]); 
            }
        })
        return uniqueId; 
    } else {
        axios.post(secrects.MAINSERVER+"/register", userData).then((res) => {
            if(res.data.token) {
                setToken(res.data.token);
                console.log(res.data.token); 
                localStorage.setItem('userName', userData.userName)
                localStorage.setItem('chainerUniqueId', res.data.uniqueId) 
            } else {
                setError([res.data.msg])
                }
            })
    }
}

export default makeRequest; 