function getActivityIdea() {
    fetch("https://apis.scrimba.com/bored/api/activity")
        .then(res => res.json())
        .then(({activity}) => {
            document.getElementById("idea").textContent = activity
            document.body.classList.add("fun")
            document.getElementById("title").textContent = "🦾HappyBot🦿"
        })
}

document.getElementById("bored-button").addEventListener("click", getActivityIdea)