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
                    opacity: 0.0,
                    transparent: true,
                    color: Math.random() * 0xffffff
                } )
            );
            helpmesh.position.set(obj.position.x,obj.position.y,obj.position.z);
            scene.add(helpmesh);

            //remove helpmesh
            var remover = setInterval(function(){
               scene.remove(helpmesh);
               clearInterval(remover);
           }, 1000);

            return  true;
       }//endif
   }//endfor
    return false;

}
