
function kitchen(){

    var model,modelChar, box, checkHat, checkGlasses,hier;
    var hat = null;
    var glasses = null;
    var hatIsLoaded = false;
    var custFlag =false
    var glassesAreLoaded = false;
    var modelMeshes =[];
    var rootBone = [];
    var robotSkeleton;

//collision boxes
    var invisibleBox;
    var collidableMeshList = [];
    var collidableBoxes = [];
    var collided;


    CHAIR_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 1.7, 1.9, 2.9 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
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

    /*var gui = new dat.GUI();
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
    f1.add( boxmeshutil.position , 'x', -100, 100 ).step(1);
    f1.add( boxmeshutil.position , 'y', -100, 100 ).step(1);
    f1.add( boxmeshutil.position , 'z', -100, 100 ).step(1);

    var f2 = gui.addFolder('Box Size');
    f2.add( boxmeshutil.scale , 'x', 0, 5 ).step(0.1);
    f2.add( boxmeshutil.scale , 'y', 0, 5 ).step(0.1);
    f2.add( boxmeshutil.scale , 'z', 0, 5 ).step(0.1);

    var f3 = gui.addFolder('Box Rotation');
    f3.add( boxmeshutil.rotation , 'x', -10, 10 ).step(0.1);
    f3.add( boxmeshutil.rotation , 'y', -10, 10 ).step(0.1);
    f3.add( boxmeshutil.rotation , 'z', -10, 10 ).step(0.1);*/

    var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(-12,-1,20);
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(new THREE.Vector3(0,0,20));

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

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

        },
        // called while loading is progressing (onProgress)
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){
                if( !(getCookie('hat') == 'yes') && (xhr.loaded / xhr.total) > 0.90  ){
                    console.log('room scene loaded');
                    loaded = true;
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

            scene.add( modelChar );


            robotSkeleton = new THREE.Skeleton( rootBone ); //get as input an array of bones

            //physijs box
            var size = new THREE.Box3().setFromObject( modelChar).getSize();
            invisibleBox = new THREE.Mesh(
                new THREE.CubeGeometry( size.x/2, size.y, size.z ),
                new THREE.MeshStandardMaterial( {
                    opacity: 0.3,
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
                        glasses.scale.set(0.1,0.15,0.15);
                        //glasses.rotation.x += Math.PI/2;
                        glasses.position.z += box.getSize().z/2 -0.7;
                        glasses.position.y = box.getSize().y + 1 ;
                        modelChar.add(glasses);
                    }
                }, 500);
            }
            if( getCookie('hat') == 'yes'){
                var loader = new THREE.GLTFLoader();
                loader.load(
                    // resource URL
                    'models/accessories/hat/scene.gltf',
                    // called when the resource is loaded
                    function ( gltf ) {

                        hat = gltf.scene;
                        //console.log(hat);
                        hat.traverse( function ( object ) {
                            if ( object.isMesh ){
                                object.castShadow = true;
                            }
                        } );
                        hat.scale.set(0.05, 0.05, 0.05);
                        hat.position.y = 4.5 ;
                          hat.position.x = 0 ;
                          hat.position.z= -6.6;
                        //hat.position.set(0, 0, 0);

                    },
                    // called while loading is progressing
                     function ( xhr ) {
                         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                         if(  xhr.loaded / xhr.total > 0.90  ){
                             if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){
                                 if( (xhr.loaded / xhr.total) > 0.90  ){
                                     console.log('hat scene loaded');
                                     loaded = true;
                                 }
                             }else{
                                 alert('the loading utility is currently down, please wait the models load before starting to play.');
                                 loaded = true;
                             }
                         }
                     },
                     // called when loading has errors
                     function ( error ) {
                         console.log( 'An error happened BOCCIATI' );
                         console.error(error);
                     }
 );
                checkHat = setInterval(function(){
                    if(hat == null){
                        ;
                    }
                    else{
                        //console.log('hat not null');
                        clearInterval(checkHat);
                        hatIsLoaded = true;
                        hat.scale.set(
                            hat.scale.x*0.3,
                            hat.scale.y*0.2,
                            hat.scale.z*0.2
                        );
                        var box = new THREE.Box3().setFromObject( modelChar );
                        //hat.rotation.x += Math.PI/2;
                        hat.position.z += box.getSize().z + 1.9;
                        modelChar.add(hat);
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



    /**
    RAYCASTER
    */


    function onMouseClick( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( scene.children );

        var point = intersects[intersects.length -1].point; //cube
        //console.log('Point intersected');
        //console.log(point);
        if(modelChar!= null){ //animate

            if ( ! isNaN( hier.position.angleTo(point) ) ){
                hier.rotation.z += hier.position.angleTo(point);
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
                }else{
                    invisibleBox.position.x = rootInit.x;
                    invisibleBox.position.y = rootInit.y;
                }
            });

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
    }
    window.addEventListener( 'click', onMouseClick, false );

    function animate() {

        renderer.render( scene, camera );
        requestAnimationFrame( animate );

        TWEEN.update();
    }
    animate();

}


function getCookie(c_name){

    var i,x,y,ARRcookies=document.cookie.split(";");

    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}



function checkCollision( invisibleBox, boxList){

    var firstobj = invisibleBox.clone();
    firstobj.scale.x = 0.5;
    var firstBB = new THREE.Box3().setFromObject(firstobj);
    console.log(invisibleBox);

    var helpmeshChar = new THREE.Mesh(
        new THREE.CubeGeometry( firstBB.getSize().x , firstBB.getSize().y, firstBB.getSize().z ),
        new THREE.MeshStandardMaterial( {
            opacity: 0.5,
            transparent: true,
            color: 0xffffff
        } )
    );
    helpmeshChar.position.set(firstobj.position.x,firstobj.position.y,firstobj.position.z);
    scene.add(helpmeshChar);
    setInterval(function(){
       scene.remove(helpmeshChar);
    }, 1000);

    var secondBB;
    collided = false;

    for (var i = 0; i< boxList.length ;i++ ){
        var obj = boxList[i].mesh;
        obj.position.set (boxList[ i ].position.x, boxList[ i ].position.y, boxList[ i ].position.z );
        obj.scale.set (boxList[ i ].scale.x, boxList[ i ].scale.y, boxList[ i ].scale.z );

        secondBB = new THREE.Box3().setFromObject( obj );
        collision = firstBB.intersectsBox(secondBB);

        if(collision){

            var helpmesh = new THREE.Mesh(
                new THREE.CubeGeometry( secondBB.getSize().x , secondBB.getSize().y, secondBB.getSize().z ),
                new THREE.MeshStandardMaterial( {
                    opacity: 0.5,
                    transparent: true,
                    color: Math.random() * 0xffffff
                } )
            );
            helpmesh.position.set(obj.position.x,obj.position.y,obj.position.z);
            scene.add(helpmesh);

            //remove helpmesh
            setInterval(function(){
               scene.remove(helpmesh);
            }, 1000);
            console.log('collision');

            return  true;
       }//endif
   }//endfor
    return false;

}