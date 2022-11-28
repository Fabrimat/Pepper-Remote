

const s = function(sel) {
    return document.querySelector(sel);
};
const sId = function(sel) {
    return document.getElementById(sel);
};

const joysticks = {
    left: {
        zone: sId('joy-left'),
        color: '#424242',
        dynamicPage: true
    },
    center: {
        zone: sId('joy-center'),
        mode: 'static',
        position: {
            left: '50%',
            top: '50%'
        },
        color: 'red',
        lockX: true,
        dynamicPage: true
    },
    right: {
        zone: sId('joy-right'),
        color: '#424242',
        dynamicPage: true
    }
};

const joyLeft = nipplejs.create(joysticks["left"]);
const joyCenter = nipplejs.create(joysticks["center"]);
const joyRight = nipplejs.create(joysticks["right"]);

let leftData = {};
let centerData = {};
let rightData = {};

registerEvents();

function registerEvents() {
    joyLeft.on('move', function(evt, data) {
        updateLeftData(data)
    }).on('end', function(evt, data) {
        resetLeftData();
    })
    joyCenter.on('move', function(evt, data) {
        updateCenterData(data)
    }).on('end', function(evt, data) {
        resetCenterData();
    })
    joyRight.on('move', function(evt, data) {
        updateRightData(data)
    }).on('end', function(evt, data) {
        resetRightData();
    })
}

resetLeftData();
resetCenterData();
resetRightData();

function updateLeftData(data) {
    rightData.force = Math.min(data.force, 3);

    leftData.x = Math.cos(data.angle.radian) * data.distance * rightData.force / 150;
    leftData.y = Math.sin(data.angle.radian) * data.distance * rightData.force / 150;
}
function resetLeftData() {
    leftData.force = 0;
    leftData.x = 0;
    leftData.y = 0;
}
function updateCenterData(data) {
    centerData.x = Math.cos(data.angle.radian) * data.distance / 50;
}
function resetCenterData() {
    centerData.x = 0;
}
function updateRightData(data) {
    rightData.force = Math.min(data.force, 3);
    rightData.distance = data.distance;

    rightData.x = Math.cos(data.angle.radian) * data.distance * rightData.force / 150;
    rightData.y = Math.sin(data.angle.radian) * data.distance * rightData.force / 150;
}
function resetRightData() {
    rightData.force = 0;
    rightData.distance = 0;
    rightData.x = 0;
    rightData.y = 0;
}

let joyLeftZero = false;
let joyCenterZero = false;
let joyRightZero = false;

setInterval(function () {
    let names, changes, fractionMaxSpeed;

    let headX = leftData.x;
    let headY = leftData.y;
    //motion.setStiffnesses("Head", 1.0);

    if (headX !== 0 || !joyLeftZero) {
        names = "HeadYaw";
        changes = headX*-1;
        fractionMaxSpeed = Math.abs(headX);

        motion.changeAngles(names, changes, fractionMaxSpeed/150);
        joyLeftZero = false;
    }
    if (headY !== 0 || !joyLeftZero) {
        names = "HeadPitch";
        changes = headY*-1;
        fractionMaxSpeed = Math.abs(headY);

        motion.changeAngles(names, changes, fractionMaxSpeed/150);
        joyLeftZero = false;
    }
    if(headX + headY === 0) {
        joyLeftZero = true;
    }

    //motion.setStiffnesses("Head", 0.0);

    let rotate = centerData.x;
    if (rotate !== 0 || !joyCenterZero) {

        if(rotate !== 0) {
            motion.move(0, 0, rotate*-1);
            joyCenterZero = false;
        } else {
            motion.stopMove();
            joyCenterZero = false;
        }
    }

    let moveX = rightData.x*-1;
    let moveY = rightData.y;
    if (moveX !== 0 || moveY !== 0 || !joyRightZero) {
        if (moveX + moveY !== 0) {
            motion.move(moveY, moveX, 0);
            joyRightZero = false;
        } else {
            motion.stopMove();
            joyRightZero = true;
        }
    }

}, 250);

