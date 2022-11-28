const selectAutonomous = document.getElementById("select-autonomous");
const batteryLabel = document.getElementById("battery-label");


selectAutonomous.onchange = function(event) {
    // If the user presses the "Enter" key on the keyboard
    setAutonomous(event.target.value, true);
};

function setAutonomous(mode, applyOnRobot){
    console.log(mode)
    if (applyOnRobot) alive.setState(mode);
    selectAutonomous.value = mode;
}


setInterval(async function () {
   setAutonomous(await alive.getState(), false)
   
   batteryLabel.innerHTML = "Battery: " + await battery.getBatteryCharge() + " %";
}, 500);