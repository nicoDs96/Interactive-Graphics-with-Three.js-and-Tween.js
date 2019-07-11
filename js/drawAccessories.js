function drawGlasses(){
    var radius = 5;
    var height = 0.5;
    var group = new THREE.Group();

    var geometry = new THREE.CylinderGeometry( radius, radius, height, 10 );
    var material = new THREE.MeshBasicMaterial( {
        color: 0xe0eeee,
        opacity: 0.8,
        transparent: true
    }); //E0EEEE
    var len1 = new THREE.Mesh( geometry, material );
    var len2 = new THREE.Mesh( geometry, material );

    var box = new THREE.Box3().setFromObject( len1 );
    var size = box.getSize();

    len1.position.x -=size.x/1.5;
    len2.position.x +=size.x/1.5;
    len1.rotation.x += Math.PI/2;
    len2.rotation.x += Math.PI/2;
    group.add(len1);
    group.add(len2);

    geometry = new THREE.BoxGeometry( radius, height, height );
    material = new THREE.MeshBasicMaterial( {color: 0x233000} );
    var cube = new THREE.Mesh( geometry, material );
    group.add(cube);

    geometry = new THREE.BoxGeometry( 3*radius, height, height );
    material = new THREE.MeshBasicMaterial( {color: 0x233000} );
    var stick1 = new THREE.Mesh( geometry, material );
    stick1.rotation.y = Math.PI/2;

    box = new THREE.Box3().setFromObject( group );
    size = box.getSize();
    stick1.position.x += size.x/2;
    stick1.position.z -= 1.5*radius;
    group.add(stick1);

    var stick2 = new THREE.Mesh( geometry, material );
    stick2.rotation.y = Math.PI/2;
    stick2.position.x -= size.x/2;
    stick2.position.z -= 1.5*radius;
    group.add(stick2);

    return group;

}

function drawWizardHat(){

  //var gui = new dat.GUI();

  var group = new THREE.Group();

  var geometry = new THREE.ConeGeometry( 5, 20, 32 );
  var material = new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('textures/txtuhat.jpg')} );
  var cone = new THREE.Mesh( geometry, material );

  var geometry2 = new THREE.CylinderGeometry( 10, 0.5, 0 );
  var material2 = new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('textures/txtuhat.jpg')} );
  var base = new THREE.Mesh( geometry2, material2 );

  group.add (cone);
  group.add (base);

  cone.position.x = 0;
  cone.position.y = 12.5;
  cone.position.z= -12
  cone.rotation.x = -0.2;

  base.position.x = 0;
  base.position.y = 2.5;
  base.position.z= -10
  base.rotation.x = -0.2;

/*
  var f1 = gui.addFolder('wizardHat Position');
  f1.add( base.position , 'x', -100, 100 ).step(1);
  f1.add( base.position , 'y', -100, 100 ).step(1);
  f1.add( base.position , 'z', -100, 100 ).step(1);

  var f2 = gui.addFolder('wizardHat Size');
  f2.add( base.scale , 'x', 0, 5 ).step(0.1);
  f2.add( base.scale , 'y', 0, 5 ).step(0.1);
  f2.add( base.scale , 'z', 0, 5 ).step(0.1);

  var f3 = gui.addFolder('wizardHat Rotation');
  f3.add( base.rotation , 'x', -10, 10 ).step(0.1);
  f3.add( base.rotation , 'y', -10, 10 ).step(0.1);
  f3.add( base.rotation , 'z', -10, 10 ).step(0.1);*/

  return group;
  /*  var radius = 10;
    var height = 0.5;
    var group = new THREE.Group();

    var geometry = new THREE.CylinderGeometry( radius, radius, height, 10 );
    var material = new THREE.MeshBasicMaterial( {
        color: 0xe0eeee,
        opacity: 0.8,
        transparent: true
    }); //E0EEEE
    var len1 = new THREE.Mesh( geometry, material );
    var len2 = new THREE.Mesh( geometry, material );

    var box = new THREE.Box3().setFromObject( len1 );
    var size = box.getSize();

    len1.position.x -=size.x/1.5;
    len2.position.x +=size.x/1.5;
    len1.rotation.x += Math.PI/2;
    len2.rotation.x += Math.PI/2;
    group.add(len1);
    group.add(len2);

    geometry = new THREE.BoxGeometry( radius, height, height );
    material = new THREE.MeshBasicMaterial( {color: 0x233000} );
    var cube = new THREE.Mesh( geometry, material );
    group.add(cube);

    geometry = new THREE.BoxGeometry( 3*radius, height, height );
    material = new THREE.MeshBasicMaterial( {color: 0x233000} );
    var stick1 = new THREE.Mesh( geometry, material );
    stick1.rotation.y = Math.PI/2;

    box = new THREE.Box3().setFromObject( group );
    size = box.getSize();
    stick1.position.x += size.x/2;
    stick1.position.z -= 1.5*radius;
    group.add(stick1);

    var stick2 = new THREE.Mesh( geometry, material );
    stick2.rotation.y = Math.PI/2;
    stick2.position.x -= size.x/2;
    stick2.position.z -= 1.5*radius;
    group.add(stick2);

    return group;*/

}
