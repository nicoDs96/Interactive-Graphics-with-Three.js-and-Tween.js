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

  scene.background = new THREE.Color(0xffffff);

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

      var tweenLEGL1 = new TWEEN.Tween(legL.rotation).to({
        x: 1,
        y: 0,
        z: 0.2
      }, 500).delay(100); //start
      tweenLEGL1.easing(TWEEN.Easing.Cubic.InOut);
      tweenLEGL1.yoyo(true);

      tweenLEGL1.onStart(function() {
        console.log("start")
      });
      tweenLEGL1.onComplete(function() {
        console.log("complete")
      });

      var tweenLEGL2 = new TWEEN.Tween(legL.rotation).to({
        x: 2.7,
        y: -0.16,
        z: -0.075
      }, 500).delay(100); //start
      tweenLEGL2.easing(TWEEN.Easing.Cubic.InOut);
      tweenLEGL2.yoyo(true);


      // add tweenLEGR
      var tweenLEGR1 = new TWEEN.Tween(legR.rotation).to({
        x: 4,
        y: 0,
        z: 0.2
      }, 500).delay(100);
      tweenLEGR1.easing(TWEEN.Easing.Cubic.InOut);
      tweenLEGR1.yoyo(true);

      var tweenLEGR2 = new TWEEN.Tween(legR.rotation).to({
        x: 2.7,
        y: 0.25,
        z: 0.12
      }, 500).delay(100);
      tweenLEGR2.easing(TWEEN.Easing.Cubic.InOut);
      tweenLEGR2.yoyo(true);

      var tweenHEAD1 = new TWEEN.Tween(head.rotation).to({
        x: -0.3,
        y: -0.031,
        z: 0.055
      }, 500).delay(100);
      tweenHEAD1.easing(TWEEN.Easing.Cubic.InOut);
      tweenHEAD1.yoyo(true);

      var tweenHEAD2 = new TWEEN.Tween(head.rotation).to({
        x: -0.086,
        y: -0.031,
        z: 0.055
      }, 500).delay(100);
      tweenHEAD2.easing(TWEEN.Easing.Cubic.InOut);
      tweenHEAD2.yoyo(true);

      // add tweenARML
      var tweenARML1 = new TWEEN.Tween(armL.rotation).to({
        x: -0.9,
        y: 0,
        z: -2.7
      }, 500).delay(100);
      tweenARML1.easing(TWEEN.Easing.Cubic.InOut);
      tweenARML1.yoyo(true);

      var tweenARML2 = new TWEEN.Tween(armL.rotation).to({
        x: -0.11,
        y: 0,
        z: -2.7
      }, 500).delay(100);
      tweenARML2.easing(TWEEN.Easing.Cubic.InOut);
      tweenARML2.yoyo(true);

      // add tweenARMR
      var tweenARMR1 = new TWEEN.Tween(armR.rotation).to({
        x: -0.9,
        y: 0,
        z: 2.7
      }, 500).delay(100);
      tweenARMR1.easing(TWEEN.Easing.Cubic.InOut);
      tweenARMR1.yoyo(true);

      var tweenARMR2 = new TWEEN.Tween(armR.rotation).to({
        x: -0.11,
        y: 0,
        z: 2.7
      }, 500).delay(100);
      tweenARMR2.easing(TWEEN.Easing.Cubic.InOut);
      tweenARMR2.yoyo(true);


        tweenHEAD1.chain(tweenHEAD2);
        tweenLEGR1.chain(tweenLEGR2);
        tweenLEGL1.chain(tweenLEGL2);
        tweenARML1.chain(tweenARML2);
        tweenARMR1.chain(tweenARMR2);

        tweenHEAD1.start();
        tweenLEGR1.start();
        tweenLEGL1.start();
        tweenARMR1.start();
        tweenARML1.start();

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
  var ambientLight = new THREE.AmbientLight(0xcccccc);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 1, 1).normalize();
  scene.add(directionalLight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}

init();
animate();
