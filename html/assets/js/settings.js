const selectAutonomous = document.getElementById("select-autonomous");
const batteryLabel = document.getElementById("battery-label");
const blinkingButton = document.getElementById("blinking-button");

selectAutonomous.onchange = function (event) {
    // If the user presses the "Enter" key on the keyboard
    setAutonomous(event.target.value, true);
};

function setAutonomous(mode, applyOnRobot) {
    if (applyOnRobot) alive.setState(mode);
    selectAutonomous.value = mode;
}

async function toggleBlinking() {
    const blink = await blinking.isEnabled();
    await blinking.setEnabled(!await blink);
    setBlinkingLabel(blink);
}
function showSettingsOnTalbet(){
    raiseEvent("PepperRemote/ShowInternalSettings")
}

function setBlinkingLabel(value) {
    if(value) {
        blinkingButton.innerHTML = "Disable blinking";
    } else {
        blinkingButton.innerHTML = "Enable blinking";
    }
}

function hands(data){
    if(data === "open"){
        motion.openHand("LHand");
        motion.openHand("RHand");
    }else if(data === "close"){
        motion.closeHand("LHand");
        motion.closeHand("RHand");
    }else if(data === "raiseRight"){
        raiseEvent('PepperRemote/RightHand', 'RightHand')
    }else if(data === "raiseLeft"){
        raiseEvent('PepperRemote/LeftHand', 'LeftHand')
    }

}


setInterval(async function () {
    setAutonomous(await alive.getState(), false)

    batteryLabel.innerHTML = "Battery: " + await battery.getBatteryCharge() + " %";

    setBlinkingLabel(await blinking.isEnabled());
}, 500);