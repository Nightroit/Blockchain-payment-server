import axios from 'axios'; 

import secrects from '../util/secret'

function makeRequest(type, userData) {
    if(type == 'GET') {
        axios.get(secrects.MAINSERVER).then((data) => {
            console.log(data); 
        })
    } else {
        axios.post(secrects.MAINSERVER, userData).then((data) => {
            console.log(data); 
        })
    }
}

export default makeRequest; 