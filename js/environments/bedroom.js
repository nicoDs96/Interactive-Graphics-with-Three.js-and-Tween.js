
function bedroom(){

    var model,modelChar, box, checkHat, checkGlasses,hier;
    var hat = null;
    var glasses = null;
    var hatIsLoaded = false;
    var custFlag =false
    var glassesAreLoaded = false;
    var modelMeshes =[];
    var rootBone = [];
    var robotSkeleton;
    var invisibleBox;
    var collidableBoxes = [];
    var collided;
    var tween;
    var loading;
    loaded = false;


    GYM_SPH_BOX = {
        mesh: new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshStandardMaterial( {
                opacity: 0.0,
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
                opacity: 0.0,
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
                opacity: 0.0,
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
                opacity: 0.0,
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
                opacity: 0.0,
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
                opacity: 0.0,
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
                opacity: 0.0,
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
                opacity: 0.0,
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
                opacity: 0.0,
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


    var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(15,-1,13);
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
    //controls.enableZoom = false;
    //controls.enabled = false ;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();


    var ambientLight = new THREE.AmbientLight( 0xcccccc );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, 1, 1 ).normalize();
    scene.add( directionalLight );

    /*var axesHelper = new THREE.AxesHelper( 30 );
    scene.add( axesHelper );*/
    hier= new THREE.Group(); //hierarchical model

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

    var loaderChar = new THREE.GLTFLoader();

    // Load a glTF resource
    loaderChar.load(
        // resource URL
        'models/character/robot1/RobotExpressive.glb',
        // called when the resource is loaded
        function ( gltf ) {

            /*console.log('gltf');  console.log(gltf);
            console.log('gltf.scene (model)');	console.log(gltf.scene);
            console.log('gltf');	console.log('gltf');*/

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
                        hat.position.set(0, 4.25, 0);

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
                        //var box = new THREE.Box3().setFromObject( modelChar );
                        //hat.rotation.x += Math.PI/2;
                        //hat.position.z += box.getSize().z*2 ;
                        //hat.position.x -= box.getSize().x ;
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
                    var func = setInterval(function(){
                        console.log('gameOver')
                       alert("Game Over\nThe Robot Collided");
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

            return  true;
       }//endif
   }//endfor
    return false;

}
