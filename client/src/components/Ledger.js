import axios from 'axios';
import React, { useEffect, useState } from 'react'; 

function Ledger() {
    const [ledgers, setLedger] = useState();

    useEffect(() => {
        let id = localStorage.getItem('chainerUniqueId');
        axios.get("http://localhost:300" +id).then((data) => {
            console.log(data); 
        }) 
    },[])

    return (
        <div class = "ledger">
            
        </div>
    )
}

export default Ledger; 