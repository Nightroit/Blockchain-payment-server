import React from 'react'; 
import CreatePost from './CreatePost';
import Feeds from './Feeds';
import './Main.css'

function Main() {
    return (
        <div class = "main">
            <div class = "container">

                <div class = "left">
                    <a class ="profile">
                        <div class = "profile-photo">
                            <img src = "https://avatars.githubusercontent.com/u/58775932?v=4" alt = ""/>
                        </div>
                        <div class = "handle">
                            <h4>nightroit</h4>
                            <p class = "text-muted">
                             @nightroit
                            </p>
                        </div>
                    </a>

                    <div class = "sidebar">
                        <a href = "#" class = "menu-item active">
                                            <span>
                                                <span class = "uil uil-home">
                                                <h3>Home</h3>
                                                </span>
                                            </span>
                        </a>
                        <a href = "#" class = "menu-item" >
                                            <span>
                                            <span class = "notification-count">2</span>
                                                <span class = "uil uil-bell">
                                                <h3>Notification</h3>
                                                </span>
                                            </span>
                                            <div class = "notification-popup">
                                                <div>
                                                    <div class ="profile-photo">
                                                        <img src = "https://avatars.githubusercontent.com/u/58775932?v=4" alt =""/>
                                                    </div>
                                                    <div class = "notification-body">
                                                        <b>Keke Benjamin</b> Send you 50 coins
                                                       <br></br>
                                                        <small class = "text-muted" >2 Days Ago</small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class ="profile-photo">
                                                        <img src = "https://avatars.githubusercontent.com/u/58775932?v=4" alt =""/>
                                                    </div>
                                                    <div class = "notification-body">
                                                        <b>Keke Benjamin</b>Send you 50 coins
                                                        <br></br>
                                                        <small class = "text-muted" >2 Days Ago</small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class ="profile-photo">
                                                        <img src = "https://avatars.githubusercontent.com/u/58775932?v=4" alt =""/>
                                                    </div>
                                                    <div class = "notification-body">
                                                        <b>Keke Benjamin</b>Send you 50 coins
                                                        <br></br>
                                                        <small class = "text-muted" >2 Days Ago</small>
                                                    </div>
                                                </div>
                                            </div>
                        </a>
                        <a href = "#" class = "menu-item">
                                            <span>
                                                <span class = "uil uil-wallet">
                                                    <h3>Wallet</h3>
                                                </span>
                                            </span>
                        </a>
                        <a href = "#" class = "menu-item">
                            <span>
                                <span class = "uil uil-setting">
                                <h3>Settings</h3>
                                </span>
                            </span>
                        </a>
                                        
                    </div>

                </div>
                
                <div class = "middle">
                    <CreatePost/>
                    <Feeds/>
                </div>
                <div class = "right">
                    
                </div>
        </div>
    </div>
    )
}

export default Main; 