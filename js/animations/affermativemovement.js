let scene,
  camera,
  renderer;

let loader,
  model;

var rootBone = [];


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 11);
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  scene.background = new THREE.Color( 0xffffff );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  light();
  control();
  loadRobot();

}

function loadRobot() {
  loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    'models/character/robot1/RobotExpressive.glb',
    // called when the resource is loaded
    function(gltf) {

      console.log('gltf');
      console.log(gltf);
      console.log('gltf.scene (model)');
      console.log(gltf.scene);
      console.log('gltf');
      console.log('gltf');

      model = gltf.scene;

      model.traverse(function(object) {
        if (object.isMesh) {
          object.castShadow = true;
          //console.log(object.name);
        }
        if (object.name == 'RobotArmature') {
          rootBone.push(object.children[0]);
          console.log("added rootBone number " + rootBone.length);
        }
        if (object.name == 'FootL' || object.name == 'FootR') {
          object.visible = false;
        }
      });

      scene.add(model);

      gltf.scene.scale.set(2, 2, 2);

      var box = new THREE.Box3().setFromObject(gltf.scene);
      gltf.scene.position.set(0, -box.getSize().y / 2 + 0.5, 0);

      robotSkeleton = new THREE.Skeleton(rootBone); //get as input an array of bones
      console.log(robotSkeleton);
      var helper = new THREE.SkeletonHelper(rootBone[0]); /*get as input the root bone*/
      helper.material.linewidth = 6;
      scene.add(helper);

      if (robotSkeleton.bones != null) {
        var arrayB = robotSkeleton.bones;

      }

      var mainB = robotSkeleton.bones;
      var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
      var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
      var head = mainB[0].children[1].children[2].children[0].children[0].children[0].children[0];
      var legL = mainB[0].children[1].children[0];
      var legR = mainB[0].children[1].children[1];

      head.rotation.x = -0.3;
      head.rotation.y = -0.031;
      head.rotation.z = 0.055;

      // add tweenHEAD
      var tweenHEAD = new TWEEN.Tween(head.rotation).to({
        x: 0.9,
        y: -0.031,
        z: 0.055
      }, 500).delay(200).start();
      tweenHEAD.easing(TWEEN.Easing.Cubic.InOut);
      tweenHEAD.repeat(Infinity);
      tweenHEAD.yoyo(true);

      //ADD EVENTS TO TWEEN
      tweenHEAD.onStart(function() {
        console.log("start")
      });
      tweenHEAD.onComplete(function() {
        console.log("complete")
      });

            // add tweenARML
            var tweenARMLup = new TWEEN.Tween(armL.rotation).to({
              x: 0,
              y:0,
              z: -2.7
            }, 500).delay(200).start();
            tweenARMLup.repeat(Infinity);
            tweenARMLup.yoyo(true);
            tweenARMLup.easing(TWEEN.Easing.Cubic.InOut);

            // add tweenARMR
            var tweenARMR = new TWEEN.Tween(armR.rotation).to({
              x: 0,
              y:0,
              z: 2.7
            }, 500).delay(200).start();
            tweenARMR.easing(TWEEN.Easing.Cubic.InOut);
            tweenARMR.repeat(Infinity);
            tweenARMR.yoyo(true);

            //ADD EVENTS TO TWEEN
            tweenARMR.onStart(function() {
              console.log("start")
            });
            tweenARMR.onComplete(function() {
              console.log("complete")
            });



    },
    // called while loading is progressing
    function(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function(error) {
      console.log('An error happened');
      console.error(error);
    }
  );

}

function control() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
}

function light() {
  var ambientLight = new THREE.AmbientLight( 0xcccccc );
  scene.add( ambientLight );

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, 1, 1 ).normalize();
  scene.add( directionalLight );
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}

init();
animate();
