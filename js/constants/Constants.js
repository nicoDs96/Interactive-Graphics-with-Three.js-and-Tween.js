/**
 * @author: ig-final-LMN-sapienza-19
 * @description: This class contains constants and useful-functions for the whole program.
 */

//Window params.
const width = window.innerWidth;
const height = window.innerHeight;

//Camera params. Perspective Projection.
const fov = 75;
const aspect = width / height;
const near = 1;
const far = 1000;

//Positions Camera.
const cameraX = -0.5;
const cameraY = 0.3;
const cameraZ = 0.1;

//Scene init function.
function initScene() {
    return new THREE.Scene();
}

//Camera Perspective init function.
function initCamera() {
    return new THREE.PerspectiveCamera(fov, aspect, near, far);
}

//Camera Orthographic init function.
function initOrthographicCamera() {
    return new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 10);
}

//Renderer init function.
function initRenderer() {
    return new THREE.WebGLRenderer();
}

//Format images.  Volendo si può eliminare
const format = '.png';

//Paths for status-bar.
const pathSB = 'img/statusbar/';
const sb1 = 'hungry';
const sb2 = 'sleep';
const sb3 = 'funny';

//Paths for assets.
const pathKitchen = 'img/kitchen/';
