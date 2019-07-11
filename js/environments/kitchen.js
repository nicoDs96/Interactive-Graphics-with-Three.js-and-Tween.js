/**
 * @author: ig-final-LMN-sapienza-19
 * @description: environment Kitchen.
 *
 */
function kitchen(){

    var model,modelChar, box, checkHat, checkGlasses,hier;
    var hat = null;
    var glasses = null;
    var rootBone = [];
    var robotSkeleton;
    var robotLookingAt = new THREE.Vector3( 0, -1, 0 ).normalize();
    var clicking = false;

//collision boxes
    var invisibleBox;
    var collidableMeshList = [];
    var collidableBoxes = [];
    var collided;


    CHAIR_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 1.7, 1.9, 2.9 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:-16,y:-16,z:+8},
        scale : {x:5,y:5,z:5}
    }
    KIT1_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 10, 2.3, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:0,y:4,z:+6},
        scale : {x:5,y:5,z:5}
    }
    KIT2_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 2.3, 2.8, 2.8 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:23,y:-9,z:6},
        scale : {x:5,y:5,z:5}
    }

    FLOWER1_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 1, 1, 4.1 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:22,y:-19,z:0},
        scale : {x:5,y:5,z:5}
    }
    FLOWER2_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 1.6, 1.8 , 4.1 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:-29,y:-5,z:0},
        scale : {x:5,y:5,z:5}
    }
    FLOWER3_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 1.6, 1.8 , 4.1 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:-28,y:6,z:0},
        scale : {x:5,y:5,z:5}
    }
    TABLE_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 2.4, 3.3, 3.6 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:-41,y:-25,z:0},
        scale : {x:5,y:5,z:5}
    }
    WALL_1 = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 10, 1, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:-48,y:10,z:12},
        scale : {x:5,y:5,z:5}
    }
    WALL_2 = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 0.8, 10, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:27,y:-18,z:0},
        scale : {x:5,y:5,z:5}
    }
    WALL_3 = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 1.1, 10, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:-59,y:-15,z:0},
        scale : {x:5,y:5,z:5}
    }
    WALL_4 = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 20, 1.3, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
                transparent: true
            } )
        ),
        position : {x:-20,y:-42,z:0},
        scale : {x:5,y:5,z:5}
    }

        collidableBoxes.push( CHAIR_BOX );
        collidableBoxes.push( KIT1_BOX );
        collidableBoxes.push( KIT2_BOX );
        collidableBoxes.push( FLOWER1_BOX );
        collidableBoxes.push( FLOWER2_BOX );
        collidableBoxes.push( FLOWER3_BOX );
        collidableBoxes.push( TABLE_BOX );
          collidableBoxes.push( WALL_1 );
            collidableBoxes.push( WALL_2 );
            collidableBoxes.push( WALL_3 );
            collidableBoxes.push( WALL_4 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(20,-25,30);
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(new THREE.Vector3(0,0,20));

    var renderer = new THREE.WebGLRenderer({ antialias: true });
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

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    if(document.querySelector('canvas') != undefined ){
        document.body.replaceChild( renderer.domElement, document.getElementsByTagName('canvas')[0] );
    }
    else{
        document.body.appendChild( renderer.domElement );
    }

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
        'models/kitchen/scene.gltf',
        // called when the resource is loaded (onLoad)
        function ( gltf ) {

            //Load room model
            model = gltf.scene;

            model.traverse( function ( object ) {
              console.log(object.name);
                if ( object.isMesh ){
                    object.castShadow = true;
                    collidableMeshList.push(object);
                }

            });
            scene.add(model);
            model.rotation.x += Math.PI/2;
            box = new THREE.Box3().setFromObject( model );

            //Define walls, floor, roof of the room
            var path = './img/kitchen/';
            var format = '.jpeg';
            var geometry = new THREE.BoxGeometry(box.getSize().x*2, box.getSize().y*2.5, box.getSize().z);

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

            //ground definition
            var cube = new THREE.Mesh(geometry, cubeMaterials);
            cube.position.z +=  box.getSize().z/2 +0.5;
            cube.position.y -= 15.9;
            cube.position.x -= 16.9;
            cube.scale.x = 0.7;
            cube.scale.y = 0.55;
            scene.add(cube);
            loaded = true;

        },
        // called while loading is progressing (onProgress)
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){
                if(  (xhr.loaded / xhr.total) > 0.90  ){
                    console.log('room scene loaded');

                }
            }else{
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

    //Kitchen
    var loader = new THREE.GLTFLoader();
    loader.load('models/kitchen/table/scene.gltf',
  	function ( gltf ) {
    var model = gltf.scene;
    var modelMeshes = [];
    model.traverse( function ( object ) {
        if ( object.isMesh ){
            object.castShadow = true;
            object.geometry.scale(10,10,10);
            object.geometry.rotateZ(-1.5708);
            modelMeshes.push(new Physijs.BoxMesh(object.geometry,object.material,0));
            modelMeshes[modelMeshes.length-1].position.set(-40,-25,0);
            scene.add(modelMeshes[modelMeshes.length-1]);
            modelMeshes[modelMeshes.length-1].addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
              alert("collision");
            tween.stop();
            });
        }
    })},
    function ( xhr ) {
  	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  	},
  	function ( error ) {
    console.log( 'An error happened' );
    });


    var loaderChar = new THREE.GLTFLoader();

    // Load a glTF resource
    loaderChar.load(
        // resource URL
        'models/character/robot1/RobotExpressive.glb',
        // called when the resource is loaded
        function ( gltf ) {


            modelChar = gltf.scene;
            console.log(modelChar);
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

            modelChar.scale.set(1.9,1.9,1.9);

            scene.add( modelChar );


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
            invisibleBox.position.y = -15;
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

                        glasses.position.z += box.getSize().z/2 -2.8;
                        glasses.position.y = box.getSize().y - 1.5 ;
                        glasses.position.x += -0.1 ;
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
      helloanimation(robotSkeleton,glasses,"kitchen");
        clicking=false; //reset the animation
    };

    document.getElementById("dabdance").onclick = function(e){
      e.stopPropagation();
      clicking=true;
      console.log("animation dabdance executing");
      dabdanceanimation(robotSkeleton, glasses,"kitchen");
      clicking=false; //reset the animation
    };

    document.getElementById("affermative_movement").onclick = function(e){
      e.stopPropagation();
      clicking=true;
      console.log("animation affermative movement executing");
      affermativeanimation(robotSkeleton,glasses,"kitchen");
      clicking=false; //reset the animation
    };

    /**
    RAYCASTER
    */

    function onMouseClick( event ) {

      console.log("debug click" + clicking);

      if(clicking==false) {


        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( scene.children );

        var point = intersects[intersects.length -1].point; //cube

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
  }

    window.addEventListener( 'click', onMouseClick, false );

    function walkingAnimation(robotSkeleton) {
      var mainB = robotSkeleton.bones;
      var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
      var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
      var head = mainB[0].children[1].children[2].children[0].children[0].children[0].children[0];
      var legL = mainB[0].children[1].children[0];
      var legR = mainB[0].children[1].children[1];
      tween.start();
      var tweenLEGL1 = new TWEEN.Tween(legL.rotation).to({
          x: 1,
          y: 0,
          z: 0.2
      }, 500).delay(100); //start
      tweenLEGL1.easing(TWEEN.Easing.Cubic.InOut);
      tweenLEGL1.yoyo(true);

      tweenLEGL1.onStart(function() {
          //console.log("start")
      });
      tweenLEGL1.onComplete(function() {
          //console.log("complete")
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
    }

    function animate() {

        renderer.render( scene, camera );
        requestAnimationFrame( animate );

        TWEEN.update();
    }
    animate();

}
