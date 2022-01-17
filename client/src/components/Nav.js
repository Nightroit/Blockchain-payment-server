import React from 'react'; 
import './Nav.css'

function Nav() {
    return (
        <div class = "nav">
            <div class = "container">
                Chainer
                <div class = "search-bar">
                    <i class = "uil uil-search">
                        <input type = "search" placeholder = "Search for users">

                        </input>
                    </i>
                </div>
                
                <div class = "create">
                    <label class = "btn btn-primary" for="create-post">Create</label>
                    <div class = "profile-photo">
                        <img src = "https://avatars.githubusercontent.com/u/58775932?v=4"></img>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Nav; 