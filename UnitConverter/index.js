/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const inputEl = document.getElementById('input-el');
const convertBtn = document.getElementById('convert-btn');
const lengthResultEl = document.getElementById('length-result');
const weightResultEl = document.getElementById('mass-result');
const volumeResultEl = document.getElementById('volume-result');

convertBtn.addEventListener('click', function() {
    const inputValue = Number(inputEl.value).toFixed(3);
    const lengthResult = (inputValue * 3.281).toFixed(3);
    const volumeResult = (inputValue * 0.264).toFixed(3);
    const weightResult = (inputValue * 2.204).toFixed(3);

    const metersResult = (inputValue / 3.281).toFixed(3);
    const gallonsResult = (inputValue / 0.264).toFixed(3);
    const poundsResult = (inputValue / 2.204).toFixed(3);


    lengthResultEl.textContent = `${inputValue} meters = ${lengthResult} feet | ${inputValue} feet = ${metersResult} meters`;
    volumeResultEl.textContent = `${inputValue} liters = ${volumeResult} gallons | ${inputValue} gallons = ${gallonsResult} liters`;
    weightResultEl.textContent = `${inputValue} kilos = ${weightResult} pounds | ${inputValue} pounds = ${poundsResult} kilos`;
})