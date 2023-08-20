import { menuArray } from "./data.js";

const menuContainers = document.getElementById("menus");
let totalPrice = 0;
let orderArray = [];

menuArray.forEach((item) => {
    menuContainers.innerHTML += `
    <div class="menu" id="menu-${item.id}">
        <p class="menu-emoji">${item.emoji}</p>
        <div>
            <h3>${item.name}</h3>
            <p class="ingredients">${item.ingredients.join(", ")}</p>
            <p>$${item.price}</p>
        </div>
        <button class="add-to-cart" data-${item.name}="${item.id}">+</button>
    </div>
    `
})

document.getElementById("menus").addEventListener("click", (e) => {
    if(e.target.dataset.pizza){
        addItemToOrder(e.target.dataset.pizza)
    } else if(e.target.dataset.hamburger){
        addItemToOrder(e.target.dataset.hamburger)
    } else if(e.target.dataset.beer){
        addItemToOrder(e.target.dataset.beer)
    }
})

document.getElementById("order-button").addEventListener("click", () => {
    const cardDetailsEl = document.getElementById("card-details-container")

    if(!cardDetailsEl.classList.contains("hidden")){
        return
    }
    cardDetailsEl.classList.toggle("hidden")
})


function addItemToOrder(orderedItem){
    const item = menuArray.find((item) => item.id === parseInt(orderedItem));
    addTotalPrice(item.price);
    addToOrderArray(item);
}

function removeItemFromOrder(unOrderedItem) {
    const item = menuArray.find((item) => item.id === parseInt(unOrderedItem));
    subtractTotalPrice(item.price);

    const index = orderArray.findIndex((item) => item.id === parseInt(unOrderedItem));
    orderArray.splice(index, 1);

    renderOrdersArray();
}

function renderOrdersArray(){
    document.getElementById("ordered-items").innerHTML = "";
    let orderHTMLString = "";

    orderArray.forEach((item) => {
        orderHTMLString += `
        <div class="order-item" id="order-item-${item.id}">
            <p>${item.name}</p>
            <button class="remove-from-order" data-${item.name}="${item.id}">remove</button>
            <p class="order-item-price">$${item.price}</p>
        </div>
        `
    })

    document.getElementById("ordered-items").innerHTML = orderHTMLString;

    addEventListenersToRemoveButtons();
}

function addToOrderArray(item){
    orderArray.push(item);
    renderOrdersArray();
}

function addTotalPrice(amount){
    totalPrice += amount;
    document.getElementById("total-amount").innerHTML = `$${totalPrice}`;
}

function subtractTotalPrice(amount){
    totalPrice -= amount;
    document.getElementById("total-amount").innerHTML = `$${totalPrice}`;
}

function addEventListenersToRemoveButtons(){
    document.querySelectorAll(".remove-from-order").forEach((button) => {
        button.addEventListener("click", (e) => {
            if(e.target.dataset.pizza){
                removeItemFromOrder(e.target.dataset.pizza)
            } else if(e.target.dataset.hamburger){
                removeItemFromOrder(e.target.dataset.hamburger)
            } else if(e.target.dataset.beer){
                removeItemFromOrder(e.target.dataset.beer)
            }
        })
    })
}