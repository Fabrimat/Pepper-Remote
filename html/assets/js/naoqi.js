let memory;
let motion;
let tablet;
let pose;
let alive;
let audio;
let battery;
let tts;


try {
    QiSession( function (session) {
        console.log('connected!');

        session.service("ALMemory").then(function (ALMemory) {
            memory = ALMemory;
            console.log(memory);
            session.service("ALMotion").then(function (ALMotion){
                motion = ALMotion;
                console.log("movement ready");
            });
            session.service("ALTabletService").then(function (ALTabletService) {
                tablet = ALTabletService;
                console.log("tablet ready");
            });
            session.service("ALRobotPosture").then(function (ALRobotPosture) {
                pose = ALRobotPosture;
                console.log("pose ready");
            });
            session.service("ALAutonomousLife").then(function (ALAutonomousLife ) {
                alive = ALAutonomousLife ;
                console.log("alive ready");
            });
            session.service("ALAudioDevice").then(function (ALAudioDevice ) {
                audio = ALAudioDevice ;
                console.log("volume reday");
            });

            session .service("ALBattery").then(function (ALBattery ) {
                battery = ALBattery ;
                console.log("battery reday");
            })

            session .service("ALTextToSpeech").then(function (ALTextToSpeech ) {
                tts = ALTextToSpeech ;
                console.log("tts reday");
            })

            console.log("raised controlReady");
        });
    });
} catch (err) {
    console.log("Error when initializing QiSession: " + err.message);
    console.log("Make sure you load this page from the robots server.")
}

function goToPose(poseName) {
    pose.goToPosture(poseName, 0.8)
}
function raiseEvent(event, data) {
    memory.raiseEvent(event, data);
}
function changeVolume(volume){
    audio.setOutputVolume(volume);
}

function setWebView(state) {
    if (state) {
        tablet.hideWebView();
    } else {
        tablet.showWebView();
    }
}
function setAlive(state) {
    if (state) {
        alive.setState('solitary')
    } else {
        alive.setState('disabled')
    }
}