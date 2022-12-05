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

function setBlinkingLabel(value) {
    if(value) {
        blinkingButton.innerHTML = "Disable blinking";
    } else {
        blinkingButton.innerHTML = "Enable blinking";
    }
}

function openHands() {
    motion.openHand("LHand");
    motion.openHand("RHand");
}
function closeHands() {
    motion.closeHand("LHand");
    motion.closeHand("RHand");
}

setInterval(async function () {
    setAutonomous(await alive.getState(), false)

    batteryLabel.innerHTML = "Battery: " + await battery.getBatteryCharge() + " %";

    setBlinkingLabel(await blinking.isEnabled());
}, 500);