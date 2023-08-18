const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: "21,492"
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feeling a bit stressed tbh",
        likes: "12,502"
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAG MI!",
        likes: "15,137"
    }
]

/* SOLUTION */
const mainEl = document.getElementById("main")
let html = ""
for (let i = 0; i < posts.length; i++) {
    html += `
        <article class="post">
            <div class="header container">
                <img class="avatar" src="${posts[i].avatar}" alt="Avatar image.">
                <div>
                    <div>
                        <span class="name">${posts[i].name}</span>
                    </div>
                    <span class="location">${posts[i].location}</span>
                </div>
            </div>
            <div>
                <img class="img" src="${posts[i].post}" alt="Post image.">
            </div>
            <div class="control-bar container">
                <img class="like-button" src="images/icon-heart.png" alt="Heart icon.">
                <img src="images/icon-comment.png" alt="Comment icon.">
                <img src="images/icon-dm.png" alt="DM icon.">                    
            </div>
            <div class="container">
                <span class="likes">${posts[i].likes} likes</span>
            </div>
            <div class="container">
                <p><span class="username">${posts[i].username}</span> ${posts[i].comment}</p>
            </div>
        </article>
    `
}

mainEl.innerHTML = html;

document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("dblclick", () => {
        if(button.classList.contains("liked")) {
            return
        }

        button.classList.add("liked")

        const likesEl = button.parentElement.parentElement.querySelector(".likes")
        const likes = parseInt(likesEl.innerText.replace(",", ""))
        likesEl.innerText = `${numberWithCommas(likes + 1)} likes`
    })
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}