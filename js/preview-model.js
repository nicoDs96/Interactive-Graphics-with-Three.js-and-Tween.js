var model, checkHat, checkGlasses, robotSkeleton,hier;
var rootBone = [];
var hat, glasses = null;
var hatIsLoaded = false;
var custFlag =false
var glassesAreLoaded = false;


var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,5,14);
camera.up = new THREE.Vector3(0,1,0);
camera.lookAt(new THREE.Vector3(0,0,0));

var renderer = new THREE.WebGLRenderer();
var container = document.getElementById('model-preview');
renderer.setSize($(container).width(), $(container).height());
container.appendChild(renderer.domElement);

controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableZoom = true;

var ambientLight = new THREE.AmbientLight( 0xcccccc );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 1, 1 ).normalize();
scene.add( directionalLight );

hier= new THREE.Group(); //hierarchical model

var loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'models/character/robot1/RobotExpressive.glb',
	// called when the resource is loaded
	function ( gltf ) {

		model = gltf.scene;

		model.traverse( function ( object ) {
			if ( object.isMesh ){
				object.castShadow = true;
				//console.log(object.name);
			}
			if( object.name == 'RobotArmature'){
				rootBone.push(object.children[0]);
			}
			if(object.name == 'FootL' || object.name == 'FootR' ){
				object.visible = false;
			}
		} );

		hier.add(model);
		scene.add( hier );


        gltf.scene.scale.set(2.5, 2.5, 2.5);

        var box = new THREE.Box3().setFromObject( gltf.scene );
        gltf.scene.position.set(0, -box.getSize().y/2 + 0.5 , 0);

		robotSkeleton = new THREE.Skeleton( rootBone ); //get as input an array of bones
		//console.log(robotSkeleton);
		/*var helper = new THREE.SkeletonHelper( rootBone[0] ); //get as input the root bone
		helper.material.linewidth = 6;
		scene.add( helper );*/

		/*if(robotSkeleton.bones != null){
			var arrayB = robotSkeleton.bones;
			addBonesControls(arrayB,0);
		}*/
		//console.log('robotSkeleton.bones');
		//console.log(robotSkeleton.bones);

		//add animation
		//animation code
		var mainB = robotSkeleton.bones;
		var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
		var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
		//console.log('armL');
		//console.log(armL);
		//console.log('armR');
		//console.log(armR);

		var rootInit = { x : robotSkeleton.bones[0].rotation.x };
		var rootFinal = { x : 0 };
		var armLInit ={ x : armL.rotation.x, z : armL.rotation.z  };
		var armLFinal = {x : -1.2, z : -1.2 };
		var armRInit ={ x : armR.rotation.x, z : armR.rotation.z  };
		var armRFinal = {x : -1.2, z : 1.2 };

		var tweenArmL = new TWEEN.Tween(armLInit).to(armLFinal, 1500);
		var tweenArmR = new TWEEN.Tween(armRInit).to(armRFinal, 1500);
		var tween = new TWEEN.Tween(rootInit).to(rootFinal, 1500);
		tween.onUpdate(function(){
		    robotSkeleton.bones[0].rotation.x = rootInit.x;
		});
		tweenArmL.onUpdate(function(){
			robotSkeleton.bones[0].children[1].children[2].children[0].children[0].children[1].rotation.x = armLInit.x;
			robotSkeleton.bones[0].children[1].children[2].children[0].children[0].children[1].rotation.z = armLInit.z;

		});
		tweenArmR.onUpdate(function(){
			robotSkeleton.bones[0].children[1].children[2].children[0].children[0].children[2].rotation.x = armRInit.x;
			robotSkeleton.bones[0].children[1].children[2].children[0].children[0].children[2].rotation.z = armRInit.z;
		});
		tween.start();
		tweenArmL.start();
		tweenArmR.start();


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
setUpMenuListeners();

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	//TWEEN.update();

}
animate();

/*For debug purpose
var gui = new dat.gui.GUI();
var f1 = gui.addFolder('Bones Rotation');
function addBonesControls(arrayB, level){
	if(arrayB == null  || level > 5 ){
		return;
	}
	else{
		for(var i = 0; i < arrayB.length; i++  ){
			var f;
			try {
  				f = gui.addFolder(arrayB[i].name + '__level_'+ level );
			}
			catch(err) {
  				f = gui.addFolder(arrayB[i].name +'__level_'+ level+ '__dup_' +Math.random() );
			}
			f.add(arrayB[i].rotation, 'x').min(-10).max(10).step(0.3);
			f.add(arrayB[i].rotation, 'y').min(-10).max(10).step(0.3);
			f.add(arrayB[i].rotation, 'z').min(-10).max(10).step(0.3);
		}
		for(var i = 0; i < arrayB.length; i++  ){
			addBonesControls(arrayB[i].children,level+1);
		}
	}

}*/
