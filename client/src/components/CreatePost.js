import React from 'react'; 

export default function CreatePost() {
    return (
        <div>
            <form class = "create-post">
                <div class = "profile-photo">
                    <img src = "https://avatars.githubusercontent.com/u/58775932?v=4" alt = ""></img>
                </div>
                <input type = "text" placeholder= "What on your mind?" id = "create-post"></input>
                <input type = "submit" value = "post" class = "btn btn-primary"></input>
            </form>
        </div>
    )
}