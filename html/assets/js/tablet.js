const inputWebPage = document.getElementById("input-web-page");
const inputVideo = document.getElementById("input-video");
const inputImage = document.getElementById("input-image");
const inputAlert = document.getElementById("input-alert");

//Untested - Poor documentation
inputWebPage.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && event.target.value !== "") {
        tablet.showWebview()
        tablet.loadUrl(event.target.value)
    }

});


inputImage.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        tablet.showWebview(event.target.value)
    }
});

inputAlert.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        tablet.showWebview(event.target.value)
    }
});


function imageShow(){
    tablet.showImage(inputImage.value)
}
function webPageReload(){
    tablet.reloadPage(false)
}
function webPageReloadNoCache(){
    tablet.reloadPage(true)
}

function webPageClean(){
    tablet.cleanWebview()
}

function videoPlay(){
    tablet.playVideo(inputVideo.value)
}

function videoPause(){
    tablet.pauseVideo()

}

function videoResume(){
    tablet.resumeVideo()

}
function videoStop(){
    tablet.stopVideo()

}