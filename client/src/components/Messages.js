import React from 'react'; 

function Message() {
    return (
        <div class = "right">
            <div class = "messages"> 
                <div class = "header">
                    <h4>Messages</h4>
                    <i class = "uil uil-edit"></i>
                </div>
                <div class = "search-bar">
                    <i class = "uil uil-search">
                        <input type = "search" placeholder = "search messages" id = "message-search"></input>
                    </i>
                </div>
            </div>
        </div>
    )
}


export default Message; 