var camera;
var renderer;
function bedroom(){

    var model,modelChar, box, checkGlasses;
    var glasses = null;
    var rootBone = [];
    var robotSkeleton;
    var invisibleBox;
    var collidableBoxes = [];
    var collided;
    var tween;
    loaded = false;
    var robotLookingAt = new THREE.Vector3( 0, -1, 0 ).normalize();

    var OPACITY = 0.0;


    GYM_SPH_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:3.5,y:3.5,z:4},
        scale : {x:1,y:1,z:1}
    }
    BED_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:-6,y:-9,z:2.5},
        scale : {x:3.2,y:2.8,z:1}
    }
    CHAIR_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:3,y:-12.5,z:2.5},
        scale : {x:0.8,y:1.1,z:1}
    }
    LIBRARY_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:5,y:12,z:2.5},
        scale : {x:3.7,y:0.5,z:3.1}
    }
    LAMP_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:13.5,y:10,z:3},
        scale : {x:0.4,y:0.6,z:2.3}
    }
    WALL_1 = { // library wall
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:0,y:13.5,z:4.5},
        scale : {x:5,y:0.5,z:3.4}
    }
    WALL_2 = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:-13,y:0,z:4.5},
        scale : {x:0.5,y:5,z:3.4}
    }
    WALL_3 = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:15,y:-3.5,z:4.5},
        scale : {x:0.5,y:5,z:3.4}
    }
    WALL_4 = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: OPACITY,
                transparent: true
            } )
        ),
        position : {x:3,y:-13.5,z:4.5},
        scale : {x:5,y:0.5,z:3.4}
    }

    collidableBoxes.push( WALL_4 );
    collidableBoxes.push( WALL_3 );
    collidableBoxes.push( WALL_2 );
    collidableBoxes.push( WALL_1 );
    collidableBoxes.push( LAMP_BOX );
    collidableBoxes.push( LIBRARY_BOX);
    collidableBoxes.push( CHAIR_BOX );
    collidableBoxes.push( BED_BOX );
    collidableBoxes.push( GYM_SPH_BOX );


    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    /*
    Utility used to add boxes to the room


    var gui = new dat.GUI();
    var  boxmeshutil = new THREE.Mesh(
    new THREE.CubeGeometry( 5 , 5, 5 ),
    new THREE.MeshStandardMaterial( {
    opacity: 0.3,
    transparent: true
} )
);

scene.add(
boxmeshutil
);

var f1 = gui.addFolder('Box Position');
f1.add( boxmeshutil.position , 'x', -20, 20 ).step(0.5);
f1.add( boxmeshutil.position , 'y', -20, 20 ).step(0.5);
f1.add( boxmeshutil.position , 'z', -20, 20 ).step(0.5);

var f2 = gui.addFolder('Box Size');
f2.add( boxmeshutil.scale , 'x', 0, 5 ).step(0.1);
f2.add( boxmeshutil.scale , 'y', 0, 5 ).step(0.1);
f2.add( boxmeshutil.scale , 'z', 0, 5 ).step(0.1);
*/


camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(15,-1,13);
camera.up = new THREE.Vector3(0,0,1);
camera.lookAt(new THREE.Vector3(0,0,20));

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
if(document.querySelector('canvas') != undefined ){
    document.body.replaceChild( renderer.domElement, document.getElementsByTagName('canvas')[0] );
    document.querySelector('canvas').setAttribute('hidden','true');
}
else{
    document.body.appendChild( renderer.domElement );
    document.querySelector('canvas').setAttribute('hidden','true');
}

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableZoom = true;
controls.enabled = true ;
//controls.enableZoom = false;
//controls.enabled = false ;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


var ambientLight = new THREE.AmbientLight( 0xcccccc );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 1, 1 ).normalize();
scene.add( directionalLight );

var loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
    // resource URL
    'models/bedroom/scene.gltf',
    // called when the resource is loaded (onLoad)
    function ( gltf ) {

        //Load room model
        model = gltf.scene;
        model.traverse( function ( object ) {
            if ( object.isMesh ){
                object.castShadow = true;
            }
        });
        scene.add(model);
        model.rotation.x += Math.PI/2;
        box = new THREE.Box3().setFromObject( model );

        //Define walls, floor, roof of the room
        var path = './img/bedroom/';
        var format = '.jpg';
        var geometry = new THREE.BoxGeometry(box.getSize().x*1.2, box.getSize().y*1.5, box.getSize().z*1.2);
        var cubeMaterials = [
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + 'px' + format),
                side: THREE.DoubleSide
            }), //front

            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + 'nx' + format),
                side: THREE.DoubleSide
            }), //behind

            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + 'py' + format),
                side: THREE.DoubleSide
            }), //roof

            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + 'ny' + format),
                side: THREE.DoubleSide
            }), //floor

            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + 'pz' + format),
                side: THREE.DoubleSide
            }), //right

            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + 'nz' + format),
                side: THREE.DoubleSide
            }) //left
        ];
        //add the cube walls to the scene
        //var cube = new THREE.Mesh(geometry, cubeMaterials);//sub w physi
        //scene.add(cube);
        //cube.rotation.set(0, Math.PI/2+Math.PI/4, 0);

        //ground definition
        var cube = new THREE.Mesh(geometry, cubeMaterials);
        cube.position.z +=  box.getSize().z/2;
        cube.scale.x = 0.7;
        cube.scale.y = 0.55;
        scene.add(cube);

    },
    // called while loading is progressing (onProgress)
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){ //if they are all number variables
            if(  (xhr.loaded / xhr.total) > 0.90  ){
                console.log('room scene loaded');
                loaded = true;
            }
        }else{ //loading utily non working
            alert('the loading utility is currently down, please wait the models load before starting to play.');
            loaded = true;
        }

    },
    // called when loading has errors (on Error)
    function ( error ) {
        console.log( 'An error happened' );
        console.error(error);
    }
); //end loader.load()

var loaderChar = new THREE.GLTFLoader();

// Load a glTF resource
loaderChar.load(
    // resource URL
    'models/character/robot1/RobotExpressive.glb',
    // called when the resource is loaded
    function ( gltf ) {


        modelChar = gltf.scene;

        modelChar.traverse( function ( object ) {
            if ( object.isMesh ){
                object.castShadow = true;
                //console.log(object.name);
            }
            if( object.name == 'RobotArmature'){
                rootBone.push(object.children[0]);
                //console.log("added rootBone number " + rootBone.length);
            }
            if(object.name == 'FootL' || object.name == 'FootR' ){
                object.visible = false;
            }
        } );

        modelChar.rotation.x += Math.PI/2;
        modelChar.position.z += 2;
        scene.add( modelChar );


        //gltf.scene.scale.set(1, 5, 5);

        /*var box = new THREE.Box3().setFromObject( gltf.scene );
        gltf.scene.position.set(0, -box.getSize().y/2 +0.5, 0);*/

        robotSkeleton = new THREE.Skeleton( rootBone ); //get as input an array of bones

        //physijs box
        var size = new THREE.Box3().setFromObject( modelChar).getSize();
        invisibleBox = new THREE.Mesh(
            new THREE.CubeGeometry( size.x/2, size.y, size.z ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        );
        invisibleBox.position.z = size.z/2+2;
        invisibleBox.position.x = 10;
        scene.add(invisibleBox);
        modelChar.position.z -=invisibleBox.position.z;
        invisibleBox.add(modelChar);


        if( getCookie('glasses') == 'yes'){
            glasses = drawGlasses();
            checkGlasses = setInterval(function(){
                if(glasses == null){
                    //console.log('glasses null');
                }else{
                    //console.log('glasses not null');
                    clearInterval(checkGlasses);
                    glassesAreLoaded = true;
                    var box = new THREE.Box3().setFromObject( modelChar );
                    glasses.scale.set(0.11,0.15,0.15);
                    //glasses.rotation.x += Math.PI/2;
                    glasses.position.z += box.getSize().z/2 -0.7;
                    glasses.position.y = box.getSize().y + 1 ;
                    modelChar.add(glasses);
                }
            }, 500);
        }

    },
    // called while loading is progressing
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
        console.error(error);
    }
);

/*
Collisions utils: adding invisible boxes that helps to detect collisions
*/
for (var i = 0; i < collidableBoxes.length ; i++ ){

    var mesh = collidableBoxes[ i ].mesh;
    mesh.position.set (collidableBoxes[ i ].position.x, collidableBoxes[ i ].position.y, collidableBoxes[ i ].position.z );
    mesh.scale.set (collidableBoxes[ i ].scale.x, collidableBoxes[ i ].scale.y, collidableBoxes[ i ].scale.z );

    scene.add(
        mesh
    );
}


/*
Listeners for extra animation
*/
document.getElementById("hello").onclick = function(e){
    e.stopPropagation();
    clicking=true;
    console.log("animation hello executing");
    helloanimation(robotSkeleton,glasses);
};

document.getElementById("dabdance").onclick = function(e){
    e.stopPropagation();
    clicking=true;
    console.log("animation dabdance executing");
    dabdanceanimation(robotSkeleton, glasses);
};

document.getElementById("affermative_movement").onclick = function(e){
    e.stopPropagation();
    clicking=true;
    console.log("animation affermative movement executing");
    affermativeanimation(robotSkeleton,glasses);
};

/**
RAYCASTER
*/


function onMouseClick( event ) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.linePrecision = 0.1;
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children );

    var point = intersects[intersects.length -1].point; //cube
    //console.log('Point intersected');
    //console.log(point);
    if(modelChar!= null){ //animate

        if ( ! isNaN( invisibleBox.position.angleTo(point) ) ){

            //Definire il vettore nella direzione che va dal personaggio al punto da raggiungere
            var newLookingAt = new THREE.Vector3( );
            newLookingAt = newLookingAt.subVectors( point, invisibleBox.position ).normalize();  //direction from 2nd param to 1st param, namley from char to clicked point
            //CALCOLARE L'ANGOLO TRA LE DUE DIREZIONI
            var angleOfRotation = robotLookingAt.angleTo(newLookingAt);
            //RUOTARE PERSONAGGIO E VETTORE robotLookingAt
            invisibleBox.rotation.z += angleOfRotation;
            //update robotLookingAt
            var axis = new THREE.Vector3( 0, 0, 1 ); //axis deve essere l'asse intorno cui ruotare lookat (l'asse che va verso l'alto)
            robotLookingAt.applyAxisAngle( axis, angleOfRotation );

        }

        var rootInit = { x : invisibleBox.position.x , y : invisibleBox.position.y };
        var rootFinal = { x : point.x , y : point.y };
        var mainB = robotSkeleton.bones;
        var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
        var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
        var head = mainB[0].children[1].children[2].children[0].children[0].children[0].children[0];
        var legL = mainB[0].children[1].children[0];
        var legR = mainB[0].children[1].children[1];

        tween = new TWEEN.Tween(rootInit).to(rootFinal, 1500);

        tween.onUpdate(function(){

            collided = checkCollision( invisibleBox, collidableBoxes);

            if(collided){
                tween.stop();
                var func = setInterval(function(){
                    console.log('gameOver')
                    alert("Game Over\nThe Robot Collided in bedroom");
                    window.location.replace("index.html");
                    clearInterval(func);

                }, 500);
            }else{
                invisibleBox.position.x = rootInit.x;
                invisibleBox.position.y = rootInit.y;
            }
        });

        tween.onComplete(function() {
            tweenHEAD1.stop();
            tweenLEGR1.stop();
            tweenLEGL1.stop();
            tweenARMR1.stop();
            tweenARML1.stop();
            tweenHEAD2.stop();
            tweenLEGR2.stop();
            tweenLEGL2.stop();
            tweenARMR2.stop();
            tweenARML2.stop();
        });

        tween.start();

        var tweenLEGL1 = new TWEEN.Tween(legL.rotation).to({
            x: 1,
            y: 0,
            z: 0.2
        }, 300);

        var tweenLEGL2 = new TWEEN.Tween(legL.rotation).to({
            x: 2.7,
            y: -0.16,
            z: -0.075
        }, 300);

        var tweenLEGR1 = new TWEEN.Tween(legR.rotation).to({
            x: 4,
            y: 0,
            z: 0.2
        }, 300);

        var tweenLEGR2 = new TWEEN.Tween(legR.rotation).to({
            x: 2.7,
            y: 0.25,
            z: 0.12
        }, 300);

        var tweenHEAD1 = new TWEEN.Tween(head.rotation).to({
            x: -0.3,
            y: -0.031,
            z: 0.055
        }, 300);

        var tweenHEAD2 = new TWEEN.Tween(head.rotation).to({
            x: -0.086,
            y: -0.031,
            z: 0.055
        }, 300);

        var tweenARML1 = new TWEEN.Tween(armL.rotation).to({
            x: -0.9,
            y: 0,
            z: -2.7
        }, 300);

        var tweenARML2 = new TWEEN.Tween(armL.rotation).to({
            x: -0.11,
            y: 0,
            z: -2.7
        }, 300);

        var tweenARMR1 = new TWEEN.Tween(armR.rotation).to({
            x: -0.9,
            y: 0,
            z: 2.7
        }, 300);

        var tweenARMR2 = new TWEEN.Tween(armR.rotation).to({
            x: -0.11,
            y: 0,
            z: 2.7
        }, 300);

        tweenHEAD1.chain(tweenHEAD2);
        tweenLEGR1.chain(tweenLEGR2);
        tweenLEGL1.chain(tweenLEGL2);
        tweenARML1.chain(tweenARML2);
        tweenARMR1.chain(tweenARMR2);
        tweenHEAD2.chain(tweenHEAD1);
        tweenLEGR2.chain(tweenLEGR1);
        tweenLEGL2.chain(tweenLEGL1);
        tweenARML2.chain(tweenARML1);
        tweenARMR2.chain(tweenARMR1);
        tweenHEAD1.start();
        tweenLEGR1.start();
        tweenLEGL1.start();
        tweenARMR1.start();
        tweenARML1.start();
    }
}
window.addEventListener( 'click', onMouseClick, false );

function animate() {

    renderer.render( scene, camera );
    requestAnimationFrame( animate );

    TWEEN.update();
}
animate();

}
