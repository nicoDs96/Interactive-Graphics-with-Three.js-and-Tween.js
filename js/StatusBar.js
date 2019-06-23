/**
 * @author: ig-final-LMN-sapienza-19
 * @description: This script creates a Status-Bar on your screen.
 *
 */

var sceneOrtho,
    cameraOrtho;

var spriteHungry,
    spriteSleep,
    spriteFunny;

var progressBarHungry,
    progressBarSleep,
    progressBarFunny;

function statusBar() {
    cameraOrtho = initOrthographicCamera();
    cameraOrtho.position.z = 10;
    sceneOrtho = new THREE.Scene();

    //Create Sprites
    new THREE
        .TextureLoader()
        .load(pathSB + sb1 + format, hungryBar);
    new THREE
        .TextureLoader()
        .load(pathSB + sb2 + format, sleepBar);
    new THREE
        .TextureLoader()
        .load(pathSB + sb3 + format, funnyBar);

    return new THREE.Vector2(sceneOrtho, cameraOrtho);
}

function hungryBar(texture) {
    var material = new THREE.MeshBasicMaterial({map: texture});

    var width = material.map.image.width;
    var height = material.map.image.height;

    progressBarHungry = createProgressBar();
    spriteHungry = new THREE.Sprite(material);

    progressBarHungry
        .geometry
        .translate(0, -1, 0);

    spriteHungry
        .center
        .set(0, 0);
    spriteHungry
        .scale
        .set(width / 3 + 5, height / 3 + 5, 1);

    console.log("Debug ProgressBar (hungry) :" + getValue(progressBarHungry));

    sceneOrtho.add(spriteHungry);
    sceneOrtho.add(progressBarHungry);
    updateHungryBar();
}

function updateHungryBar() {
    var swidth = window.innerWidth / 3;
    var sheight = window.innerHeight / 3;
    spriteHungry
        .position
        .set(-swidth, -sheight, 1); // bottom-left
    progressBarHungry
        .position
        .set(-swidth, -sheight - (sheight / 5), 1);
}

/**
 * Sleep-Bar
 */

function sleepBar(texture) {
    var material = new THREE.MeshBasicMaterial({map: texture});

    var width = material.map.image.width;
    var height = material.map.image.height;

    progressBarSleep = createProgressBar();
    progressBarSleep
        .geometry
        .translate(0, -1, 0);

    spriteSleep = new THREE.Sprite(material);

    spriteSleep
        .center
        .set(0, 0);
    spriteSleep
        .scale
        .set(width / 3 + 5, height / 3 + 5, 1);

    console.log("Debug ProgressBar (sleep) :" + getValue(progressBarSleep));

    sceneOrtho.add(spriteSleep);
    sceneOrtho.add(progressBarSleep);
    updateSleepBar();
}

function updateSleepBar() {
    var swidth = window.innerWidth / 3;
    var sheight = window.innerHeight / 3;
    spriteSleep
        .position
        .set(0, -sheight, 1);
    progressBarSleep
        .position
        .set(0, -sheight - ((sheight / 5)), 1);
}

/**
 * Funny-Bar
 */

function funnyBar(texture) {

    var material = new THREE.MeshBasicMaterial({map: texture});

    var width = material.map.image.width;
    var height = material.map.image.height;

    progressBarFunny = createProgressBar();
    progressBarFunny
        .geometry
        .translate(0, -1, 0);

    spriteFunny = new THREE.Sprite(material);

    spriteFunny
        .center
        .set(0, 0);
    spriteFunny
        .scale
        .set(width / 3 + 5, height / 3 + 5, 1);

    console.log("Debug ProgressBar (funny) :" + getValue(progressBarSleep));

    sceneOrtho.add(spriteFunny);
    sceneOrtho.add(progressBarFunny);
    updateFunnyBar();
}

function updateFunnyBar(texture) {
    var swidth = window.innerWidth / 3;
    var sheight = window.innerHeight / 3;
    spriteFunny
        .position
        .set(swidth, -sheight, 1);
    progressBarFunny
        .position
        .set(swidth, -sheight - ((sheight / 5)), 1);
}

/**
 * Getter
 */

function getProgressBarHungry() {
    return progressBarHungry;
}

function getProgressBarSleep() {
    return progressBarSleep;
}

function getProgressBarFunny() {
    return progressBarFunny;
}