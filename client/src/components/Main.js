import React from 'react'; 
import Ledger from './Ledger';
import Transact from './Trasact';
import './Main.css'
function Main() {
    return (
        <div class = "main">
            <Transact/>
            <Ledger/>
        </div>
    )
}

export default Main;