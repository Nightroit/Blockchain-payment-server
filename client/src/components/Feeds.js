import React from 'react'; 
function Feeds() {
    return (
        <div class = "feeds">
            <div class = "head">
                <div class = "user">
                    <div class = "profile-photo">
                        <img src ="https://avatars.githubusercontent.com/u/58775932?v=4">
                        </img>
                        <span class = "edit">
                            <i class = "uil uil-ellipsis-h"></i>
                        </span>
                    </div>
                        <span class = "ingo">
                            <h3>Lana Rose</h3>
                            <small>&nbsp;Dubai, 15 Minutes ago</small>
                        </span>
                </div>
                <br></br>
                <div class = "post-photo">
                    <img src = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
                </div>
                <div class = "action-button">
                    <div class ="iteraction-buttons">
                        <span><i class = "uil uil-heart"></i></span>
                        <span><i class = "uil uil-comment-dots"></i></span>
                        <span><i class = "uil uil-share-alt"></i></span>
                    </div>
                    <div class = "bookmark">
                        <span><i class = "uil uil-bookmark-full"></i></span>
                    </div>
                </div>
                <br></br>
                <div class = "liked-by">
                    <span><img class = "liked-by-img" src ="https://avatars.githubusercontent.com/u/58775932?v=4"></img> </span>
                    <span><img class = "liked-by-img" src ="https://avatars.githubusercontent.com/u/58775932?v=4"></img> </span>
                    <span><img class = "liked-by-img" src ="https://avatars.githubusercontent.com/u/58775932?v=4"></img> </span>
                    <p>&nbsp;Liked by <b>Ernest baby</b> &nbsp;and <b>2, 232 others</b></p>
                </div>
                <div class = "caption">
                    <p> Lana Rose lorem ipsomasdfdf.....</p>
                </div>
                <div class = "comments text-muted">View all 277 comments</div>
            </div>
        </div>
    )
}

export default Feeds; 