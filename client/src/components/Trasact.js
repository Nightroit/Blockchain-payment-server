import React from 'react'
import {useState} from 'react'; 
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri'
import {BsCoin} from 'react-icons/bs'
import axios from 'axios';

import './SignIn.css'

function Transact() {
    const [amount, setAmount] = useState(''); 
    const [pin, setPin] = useState(''); 
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState([]);
    const [minee, setMinee] = useState(); 
    let uniqueId = localStorage.getItem('chainerUniqueId');

    const onChange = (e) => {
        setRecipient(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault(); 
        let sender = localStorage.getItem('userName'); 
        axios.post('http://localhost:300' + uniqueId + '/transaction/broadcast', {
            amount, 
            sender, 
            recipient
        }).then((data) => {
            console.log(data); 
            setRecipient('');  
            setAmount('');
            setPin(''); 
        })

    }
      
      const handleDepositeAmountChange = (evt) => {
        const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
        if (rx_live.test(evt.target.value))
            setAmount(evt.target.value);
     }

     const handlePinChange = (evt) => {
        const rx_live = /^[0-9]*$/;
        if (rx_live.test(evt.target.value) && evt.target.value.length <= 6)
            setPin(evt.target.value);
     }
     const mine = () => {
         axios.post('http://localhost:300' + uniqueId + '/mine').then((res) => {
            setMinee(res.data.msg)
         })
         setTimeout(function() {
             setMinee()
         }, 2000)
     }
    return (
    <div class = "transact">    
        <div class = "align">
            <div class="grid">
                <form onSubmit = {onSubmit} class="form login">
                    <div class="form__field">
                        <label for="amount">
                            <BsCoin class = "icon"/>
                        </label>
                        <input 
                            value={amount}
                            onChange={handleDepositeAmountChange}
                            pattern="[+-]?\d+(?:[.,]\d+)?" 
                        
                            autocomplete="username" 
                            id="login__username" 
                            type="text" 
                            name="amount" 
                            class="form__input" 
                            placeholder="Amount" />
                    </div>
                    <div class="form__field">
                        <label for="login__pin">
                            <FaUserAlt class = "icon"/>

                        </label>
                        <input  
                            value = {recipient}
                            onChange = {onChange} 
                            id="login__password" 
                            type="text" 
                            name="recipient" 
                            class="form__input" 
                            placeholder="Recipient" />
                    </div>
                    <div class="form__field">
                        <label for="recipient">
                            <RiLockPasswordFill class = "icon"/>

                        </label>
                        <input 
                            value={pin}
                            onChange={handlePinChange}
                            pattern= "^[0-9]*$"

                            autocomplete="username" 
                            id="login__username" 
                            type="text" 
                            name="amount" 
                            class="form__input" 
                            max = {6}
                            placeholder="Pin" />
                    </div>
            
                    <div class="form__field">
                        <input type="submit" value="Send" />
                    </div>
                    <br></br>
                    <br></br>
                    <div class="form__field mine">
                        <input type="submit" value="Mine" onClick = {mine} />
                    </div>
                </form>

                    <p class="text--center error">
                        {error[0] && "Enter valid " + error[0]}
                        {error[1] && " and " + error[1]}
                    </p>
                    <p class="text--center error">
                        {minee &&  "Block found! Nonce: " + minee}
                    </p>
    
            </div>
    
        </div>
   </div>
    )
}


export default Transact;