fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        const {regular} = data.urls;
        document.body.style.backgroundImage = `url(${regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(() => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Ahmad`
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        const {small} = data.image;
        document.getElementById("crypto-top").innerHTML = `
            <img src=${small}  alt="Crypto logo."/>
            <span>${data.name}</span>
        `
        const {market_data} = data;
        const {low_24h, high_24h, current_price} = market_data;
        const {usd} = current_price;
        const {usd: usd1} = high_24h;
        const {usd: usd2} = low_24h;
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${usd}</p>
            <p>👆: $${usd1}</p>
            <p>👇: $${usd2}</p>
        `
    })
    .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const {name, weather, main} = data;
            const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
            const {temp} = main;
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl}  alt="Weather icon."/>
                <p class="weather-temp">${Math.round(temp)}º</p>
                <p class="weather-city">${name}</p>
            `
        })
        .catch(err => console.error(err))
});
