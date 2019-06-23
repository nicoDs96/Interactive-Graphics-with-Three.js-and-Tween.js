var geometry,
    material,
    bar;

const MIN_BAR = 0;
const MAX_BAR = 100;

const HEIGHT_BAR = 10;

function createProgressBar() {

    geometry = new THREE.PlaneGeometry(MAX_BAR, HEIGHT_BAR, 1);
    material = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
    bar = new THREE.Mesh(geometry, material);
   
    return bar;
}

function incProgressBar(bar, val) 
{
    newVal = getValue(bar) + val;

    if (newVal > MAX_BAR) 
        newVal = MAX_BAR;
    else {
        geometry = new THREE.PlaneGeometry(newVal + val, HEIGHT_BAR, 1);
        bar = new THREE.Mesh(geometry, material);
    }
}

function decProgressBar(bar, val) 
{
    newVal = getValue(bar) + val;

    if (newVal < MIN_BAR) 
        newVal = MIN_BAR; //Your Puppy is dead: i'll edited this part.
    else {
        geometry = new THREE.PlaneGeometry(newVal - val, HEIGHT_BAR, 1);
        bar = new THREE.Mesh(geometry, material);
    }
}

function getValue(bar) {
    return bar.geometry.parameters.width;
}

/*//game logic
var update = function () {
    value -= 0.5;

    if (value == 0) {
        alert("Your puppy is dead!");
    } else if (value < 0) {
        window.location.href = 'index.html';
    } else {
        basegeometry = new THREE.PlaneGeometry(wid, 2, 2);
        scene.remove(baseplane);
        baseplane = new THREE.Mesh(basegeometry, material);
        scene.add(baseplane);
    }
};
*/