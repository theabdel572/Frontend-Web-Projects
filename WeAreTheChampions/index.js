import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    get,
    set
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-f9e51-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementContainersInDB = ref(database, "Posts")

const textAreaEl = document.getElementById("endorsement-textarea")
const fromInputEl = document.getElementById("from-parameter")
const toInputEl = document.getElementById("to-parameter")
const endorsementsContainerEl = document.getElementById("endorsements")

document.getElementById("publish-button").addEventListener("click", function() {
    if(!textAreaEl.value) {
        alert("Please enter an endorsement text")
        return
    }

    let endorsementDivContent = `<div class="endorsement-container">`

    if(toInputEl.value) {
        endorsementDivContent += `<p class=parameter-text> To ${toInputEl.value}</p>`
    }

    endorsementDivContent += `<p class="endorsement-text">${textAreaEl.value}</p>`

    if(fromInputEl.value) {
        endorsementDivContent += `<p class=parameter-text> From ${fromInputEl.value}</p>`
    }

    endorsementDivContent += `<div id="like-buttons-container">❤<button class="like-button">0</button></div></div>`

    push(endorsementContainersInDB, {
        Content: endorsementDivContent,
        Likes: 0
    })
    clearInputFields();
})

onValue(endorsementContainersInDB, function(snapshot) {
    if(!snapshot.exists()) {
        return
    }

    const endorsementContainersArray = Object.entries(snapshot.val())

    endorsementsContainerEl.innerHTML = ""

    for(let i = endorsementContainersArray.length - 1; i >= 0; i--) {
        let currentEndorsementContainer = endorsementContainersArray[i][1].Content

        renderEndorsementContainer(currentEndorsementContainer.
            replace("❤<button class=\"like-button\">0",
            "❤<button class=\"like-button\">"+endorsementContainersArray[i][1].Likes).
            replace("❤<button class=\"like-button\">",
            `❤<button class="like-button" id='${endorsementContainersArray[i][0]}'>`))
    }

    addEventListenersToLikeButtons()
})


function clearInputFields() {
    textAreaEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

function renderEndorsementContainer(container){
    endorsementsContainerEl.innerHTML += container
}

function addEventListenersToLikeButtons() {
    document.querySelectorAll(".like-button").forEach(likeButton => {
        likeButton.addEventListener("click", function(event) {
            if(localStorage.getItem(event.target.id) !== null) {
                return
            }

            const exactLocationOfItemInDB = ref(database, `Posts/${event.target.id}/Likes`)

            get(exactLocationOfItemInDB).then(snapshot => {
                if(snapshot.exists()) {
                    set(exactLocationOfItemInDB, snapshot.val() + 1)
                }
            })

            localStorage.setItem(event.target.id, "d3ff0d8c5db763c137321e969ccfee67")
        })
    })
}