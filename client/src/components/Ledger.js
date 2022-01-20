import axios from 'axios';
import React, { useEffect, useState } from 'react'; 

function Ledger() {
    const [ledgers, setLedger] = useState();

    useEffect(() => {
        let id = localStorage.getItem('chainerUniqueId');
        axios.get("http://localhost:300" +id).then((res) => {
            setLedger(res.data)
        }) 
    },[])

    return (
        <div class = "ledger">
            <pre class = "json">{JSON.stringify(ledgers, null, 2)}</pre>
        </div>
    )
}

export default Ledger; 