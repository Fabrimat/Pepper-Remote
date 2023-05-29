const selectAutonomous = document.getElementById("select-autonomous");
const batteryLabel = document.getElementById("battery-label");
const blinkingButton = document.getElementById("blinking-button");
const breathingButton = document.getElementById("breathing-button");

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

async function toggleBreathing() {
    const breath = await motion.getBreathEnabled("All");
    await motion.setBreathEnabled("All", !await breath)
    setBreathingLabel(breath);

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

function setBreathingLabel(value) {
    if(value) {
        breathingButton.innerHTML = "Disable breathing";
    } else {
        breathingButton.innerHTML = "Enable breathing";
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
    setBreathingLabel(await motion.getBreathEnabled("All"));

}, 500);