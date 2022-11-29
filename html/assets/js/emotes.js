const buttonVacuum = document.getElementById("button-vacuum");
const buttonPicture = document.getElementById("button-picture");

buttonVacuum.onclick = function (event) {
    raiseEvent("PepperRemote/Emotes/Vacuum", 1)
}

buttonPicture.onclick = function (event) {
    raiseEvent("PepperRemote/Emotes/Picture", 1)


}