const characters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let firstPasswordField = document.getElementById("first-password-field");
let secondPasswordField = document.getElementById("second-password-field");

firstPasswordField.addEventListener('click', function() {
    copyToClipboard(firstPasswordField.textContent);
});

secondPasswordField.addEventListener('click', function() {
    copyToClipboard(secondPasswordField.textContent);
});


const generatePassword = (length) => {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
}

function renderPasswords() {
    firstPasswordField.textContent = generatePassword(15);
    secondPasswordField.textContent = generatePassword(15);
}

function copyToClipboard(text) {
    const tempText = document.createElement('input');
    tempText.value = text;
    document.body.appendChild(tempText);
    tempText.select();
    document.execCommand('copy');
    document.body.removeChild(tempText);
    alert("Copied to clipboard!");
}