const inputMessage = document.getElementById("input-message");
const volumeLabel = document.getElementById("volume-label");

const volumeRange = document.getElementById("volume-range");

const subVolume = document.getElementById("sub-volume");

const addVolume = document.getElementById("add-volume");


function setVolume(volume){
    volume = Math.max(0, volume);
    volume = Math.min(volume, 100);
    volumeLabel.innerHTML = "Volume: " + volume + "%";

    changeVolume(volume);

    return volume;
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




subVolume.onclick = async function(event) {


    console.log(setVolume(await audio.getOutputVolume() - 5));


};

addVolume.onclick = async function(event) {



    console.log(
        );

        setVolume(await audio.getOutputVolume() + 5)
};
