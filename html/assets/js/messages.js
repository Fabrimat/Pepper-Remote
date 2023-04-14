const inputMessage = document.getElementById("input-message");
const volumeLabel = document.getElementById("volume-label");
const volumeRange = document.getElementById("volume-range");
const stopSpeech = document.getElementById("stop-speech");
const subVolume = document.getElementById("sub-volume");
const addVolume = document.getElementById("add-volume");
var volume = -1;

function setVolume(value) {
    value = Math.max(0, value);
    value = Math.min(value, 100);
    volumeLabel.innerHTML = "Volume: " + value + "%";
    changeVolume(value);

    volume = value;
    volumeRange.value = volume;

    return volume;
}


inputMessage.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        raiseEvent("PepperRemote/MessageInput", event.target.value);
    }
});


volumeRange.addEventListener("input", function (event) {
    setVolume(parseInt(event.target.value));

});


stopSpeech.onclick = async function (event) {
    tts.stopAll();
};

subVolume.onclick = async function (event) {
    setVolume(await audio.getOutputVolume() - 5)
};

addVolume.onclick = async function (event) {
    setVolume(await audio.getOutputVolume() + 5)
};

setInterval(async function () {
    const tempVolume = await audio.getOutputVolume();
    if (volume !== tempVolume) {
        setVolume(tempVolume);
    }
}, 500);


function addMessage(message) {
    if (message === "")
        return

    // Ottieni il nome del cookie corrente
    var currentCookieName = "message_1";
    var currentCookieValue = getCookie(currentCookieName);

    // Cerca il primo nome di cookie disponibile
    var cookieCount = 1;
    while (currentCookieValue !== null) {
        cookieCount++;
        currentCookieName = "message_" + cookieCount;
        currentCookieValue = getCookie(currentCookieName);
    }

    // Imposta il nuovo cookie con il messaggio
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // 7 giorni
    document.cookie = currentCookieName + "=" + message + "; expires=" + expirationDate.toUTCString() + "; path=/";

}


// Funzione per caricare tutti i messaggi presenti nei cookie e aggiungerli all'HTML

var insertedCookies = [];


function loadMessages() {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];

        // Rimuovi gli spazi bianchi iniziali e finali
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        // Dividi il cookie in nome e valore
        var parts = cookie.split('=');
        var name = parts[0];
        var value = parts[1];
        if (value == null || insertedCookies.includes(name))
            continue;

        // Fai qualcosa con il cookie, ad esempio visualizzalo in console
        console.log(name + " = " + value);
        var currentparam1 = "raiseEvent('PepperRemote/MessageInput',\' " + value + "\')"

        var currentparam = "\'" + name + "\'"
        var messageHtml = '<div class="input-group"><button type="button" onclick="' + currentparam1 + '" class="form-control list-group-item list-group-item-action rounded-0">' + value + '</button><div class="input-group-prepend"><button type="button" onclick="removeMessage(' + currentparam + ')" data-cookie="' + name + '" class="input-group list-group-item rounded-0 message-button remove-button">-</button></div></div>';
        document.getElementById("message-container").insertAdjacentHTML("beforebegin", messageHtml);
        insertedCookies.push(name);

    }


}


// Funzione di utilità per ottenere il valore di un cookie dato il suo nome
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}

// Rimuove il messaggio corrispondente al pulsante "-"
function removeMessage(datacookie) {
    var removeButtons = document.querySelectorAll(".remove-button");
    var theRight;

    removeButtons.forEach(function (button) {
        if (button.getAttribute("data-cookie") === datacookie)
            theRight = button;
    });
    document.cookie = datacookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Imposta una data di scadenza passata per rimuovere il cookie
    theRight.parentElement.parentElement.remove(); // Rimuove il div contenente il messaggio dal DOM
    var index = insertedCookies.indexOf(datacookie);
    if (index !== -1) {
        insertedCookies.splice(index, 1);
    }

}


loadMessages()




