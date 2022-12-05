const s = function (sel) {
    return document.querySelector(sel);
};
const sId = function (sel) {
    return document.getElementById(sel);
};

const joysticks = {
    head: {
        zone: sId('joy-head'),
        color: '#424242',
        dynamicPage: true
    },
    rotation: {
        zone: sId('joy-rotation'),
        mode: 'static',
        position: {
            left: '50%',
            top: '50%'
        },
        color: 'red',
        lockX: true,
        dynamicPage: true
    },
    move: {
        zone: sId('joy-move'),
        color: '#424242',
        dynamicPage: true
    }
};

const joyHead = nipplejs.create(joysticks["head"]);
const joyRotation = nipplejs.create(joysticks["rotation"]);
const joyMove = nipplejs.create(joysticks["move"]);

let headData = {};
let rotationData = {};
let moveData = {};

registerEvents();

function registerEvents() {
    joyHead.on('move', function (evt, data) {
        updateHeadData(data)
    }).on('end', function (evt, data) {
        resetHeadData();
    })
    joyRotation.on('move', function (evt, data) {
        updateRotationData(data)
    }).on('end', function (evt, data) {
        resetRotationData();
    })
    joyMove.on('move', function (evt, data) {
        updateMoveData(data)
    }).on('end', function (evt, data) {
        resetMoveData();
    })
}

resetHeadData();
resetRotationData();
resetMoveData();

function updateHeadData(data) {
    moveData.force = Math.min(data.force, 3);

    headData.x = Math.cos(data.angle.radian) * data.distance * moveData.force / 150;
    headData.y = Math.sin(data.angle.radian) * data.distance * moveData.force / 150;
}

function resetHeadData() {
    headData.force = 0;
    headData.x = 0;
    headData.y = 0;
}

function updateRotationData(data) {
    rotationData.x = Math.cos(data.angle.radian) * data.distance / 50;
}

function resetRotationData() {
    rotationData.x = 0;
}

function updateMoveData(data) {
    moveData.force = Math.min(data.force, 3);
    moveData.distance = data.distance;

    moveData.x = Math.cos(data.angle.radian) * data.distance * moveData.force / 150;
    moveData.y = Math.sin(data.angle.radian) * data.distance * moveData.force / 150;
}

function resetMoveData() {
    moveData.force = 0;
    moveData.distance = 0;
    moveData.x = 0;
    moveData.y = 0;
}

let joyHeadZero = true;
let joyRotationZero = true;
let joyMoveZero = true;

setInterval(function () {
    let names, changes, fractionMaxSpeed;

    let headX = headData.x;
    let headY = headData.y;
    //motion.setStiffnesses("Head", 1.0);

    if (headX !== 0 || !joyHeadZero) {
        names = "HeadYaw";
        changes = headX * -1;
        fractionMaxSpeed = Math.abs(headX);

        motion.changeAngles(names, changes, fractionMaxSpeed / 5);
        joyHeadZero = false;
    }
    if (headY !== 0 || !joyHeadZero) {
        names = "HeadPitch";
        changes = headY * -1;
        fractionMaxSpeed = Math.abs(headY);

        motion.changeAngles(names, changes, fractionMaxSpeed / 5);
        joyHeadZero = false;
    }
    if (headX + headY === 0) {
        joyHeadZero = true;
    }

    //motion.setStiffnesses("Head", 0.0);

    let rotate = rotationData.x;
    if (rotate !== 0 || !joyRotationZero) {

        if (rotate !== 0) {
            motion.move(0, 0, rotate * -1);
            joyRotationZero = false;
        } else {
            motion.stopMove();
            joyRotationZero = false;
        }
    }

    let moveX = moveData.x * -1;
    let moveY = moveData.y;
    if (moveX !== 0 || moveY !== 0 || !joyMoveZero) {
        if (moveX + moveY !== 0) {
            motion.move(moveY, moveX, 0);
            joyMoveZero = false;
        } else {
            motion.stopMove();
            joyMoveZero = true;
        }
    }

}, 250);

function wakeUp() {
    motion.wakeUp();
}

function rest() {
    motion.rest();
}