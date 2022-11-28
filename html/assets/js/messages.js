const inputMessage = document.getElementById("input-message");
const volumeLabel = document.getElementById("volume-label");

const volumeRange = document.getElementById("volume-range");

const stopSpeech = document.getElementById("stop-speech");

const subVolume = document.getElementById("sub-volume");

const addVolume = document.getElementById("add-volume");
let volume = -1;

function setVolume(value){
    value = Math.max(0, value);
    value = Math.min(value, 100);
    volumeLabel.innerHTML = "Volume: " + value + "%";
    volumeLabel.value = value;
    changeVolume(value);

    volume = value;
    return value;
}


inputMessage.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        raiseEvent("PepperRemote/MessageInput", event.target.value);
    }
});


volumeRange.addEventListener("input", function(event) {


    setVolume(parseInt(event.target.value));

});



stopSpeech.onclick = async function(event){
    tts.stopAll();
};

subVolume.onclick = async function(event) {
    setVolume(await audio.getOutputVolume() - 5)
};

addVolume.onclick = async function(event) {
    setVolume(await audio.getOutputVolume() + 5)
};

setInterval(async function () {
    const tempVolume = await audio.getOutputVolume();
    if (volume !== tempVolume) {
        setVolume(tempVolume);
    }
}, 500);