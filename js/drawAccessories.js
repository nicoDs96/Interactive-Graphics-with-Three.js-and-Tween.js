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
