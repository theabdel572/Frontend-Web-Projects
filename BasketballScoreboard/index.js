let homeScore = 0;
let guestScore = 0;
let homeScoreElement = document.getElementById('home-score');
let guestScoreElement = document.getElementById('guest-score');

function updateScore() {
    homeScoreElement.innerText = homeScore;
    guestScoreElement.innerText = guestScore;
}
function addScore(team, points) {
    if (team === 'home') {
        homeScore += points;
    } else {
        guestScore += points;
    }
    updateScore();
    highlightWinner();
}

function resetScore() {
    homeScore = 0;
    guestScore = 0;
    updateScore();
    homeScoreElement.style.textShadow = 'none';
    guestScoreElement.style.textShadow = 'none';
}

function highlightWinner(){
    if(homeScore > guestScore){
        guestScoreElement.style.textShadow = 'none';
        homeScoreElement.style.textShadow = '0 0 30px #fff, 0 0 150px #ff00de';
    } else if(homeScore < guestScore){
        homeScoreElement.style.textShadow = 'none';
        guestScoreElement.style.textShadow = '0 0 30px #fff, 0 0 150px #ff00de';
    } else {
        homeScoreElement.style.textShadow = 'none';
        guestScoreElement.style.textShadow = 'none';
    }
}