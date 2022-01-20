import React from 'react'
import {useState} from 'react'; 
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri'
import {BsCoin} from 'react-icons/bs'

import { Link } from 'react-router-dom';
import Axios from '../util/axios'
import Validator from '../util/validator';

import './SignIn.css'

function SignIn() {
    const [amount, setAmount] = useState(''); 
    const [pin, setPin] = useState(''); 
    const [error, setError] = useState([]);
    const onChange = (e) => {
        console.log(e.target.name); 
    }

    function isNumberKey(txt, evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode == 46) {
          //Check if the text already contains the . character
          if (txt.value.indexOf('.') === -1) {
            return true;
          } else {
            return false;
          }
        } else {
          if (charCode > 31 &&
            (charCode < 48 || charCode > 57))
            return false;
        }
        return true;
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

    return (
    <div class = "transact">    
        <div class = "align">
            <div class="grid">
                <form method="POST" class="form login">
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
                </form>

                    <p class="text--center error">
                        {error[0] && "Enter valid " + error[0]}
                        {error[1] && " and " + error[1]}
                    </p>
                
    
            </div>
    
        </div>
   </div>
    )
}


export default SignIn;