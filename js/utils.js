function getCookie(c_name) {

  var i, x, y, ARRcookies = document.cookie.split(";");

  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
}



function checkCollision(invisibleBox, boxList) {

  var firstobj = invisibleBox.clone();
  firstobj.scale.x = 0.5;
  var firstBB = new THREE.Box3().setFromObject(firstobj);

  var secondBB;
  collided = false;

  for (var i = 0; i < boxList.length; i++) {
    var obj = boxList[i].mesh;
    obj.position.set(boxList[i].position.x, boxList[i].position.y, boxList[i].position.z);
    obj.scale.set(boxList[i].scale.x, boxList[i].scale.y, boxList[i].scale.z);

    secondBB = new THREE.Box3().setFromObject(obj);
    collision = firstBB.intersectsBox(secondBB);

    if (collision) {

      var helpmesh = new THREE.Mesh(
        new THREE.CubeGeometry(secondBB.getSize().x, secondBB.getSize().y, secondBB.getSize().z),
        new THREE.MeshStandardMaterial({
          opacity: 0.0,
          transparent: true,
          color: Math.random() * 0xffffff
        })
      );
      helpmesh.position.set(obj.position.x, obj.position.y, obj.position.z);
      scene.add(helpmesh);

      //remove helpmesh
      var remover = setInterval(function() {
        scene.remove(helpmesh);
        clearInterval(remover);
      }, 1000);

      return true;
    } //endif
  } //endfor
  return false;

}

/*
Animations
*/
function dabdanceanimation(robotSkeleton, glasses, room) {
  var mainB = robotSkeleton.bones;
  var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
  var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
  var head = mainB[0].children[1].children[2].children[0].children[0].children[0].children[0];
  var legL = mainB[0].children[1].children[0];
  var legR = mainB[0].children[1].children[1];


  if (room == 'garden') {
    console.log("To Implement");
  }

  if (room == "kitchen") {
    if (getCookie('glasses') == 'yes') {
      console.log("glasses in dab animation - kitchen environment")

      var tweenGlasses = new TWEEN.Tween(glasses.rotation).to({
        x: 0.6,
        y: 1.2,
        z: 0
      }, 500).delay(200).start();
      tweenGlasses.easing(TWEEN.Easing.Cubic.InOut);
      tweenGlasses.repeat(1);
      tweenGlasses.yoyo(true);

//edit position
var tweenGlasses2 = new TWEEN.Tween(glasses.position).to({
  x: 1.4
}, 500).delay(200).start();
tweenGlasses2.easing(TWEEN.Easing.Cubic.InOut);
tweenGlasses2.repeat(1);
tweenGlasses2.yoyo(true);


    }

  }
  if (room == "bedroom") {
    console.log("To Implement");
  }



  // add tweenHEAD
  var tweenHEAD = new TWEEN.Tween(head.rotation).to({
    x: 0.6,
    y: 1.2,
    z: 0
  }, 500).delay(200).start();
  tweenHEAD.easing(TWEEN.Easing.Cubic.InOut);
  tweenHEAD.repeat(1);
  tweenHEAD.yoyo(true);

  //ADD EVENTS TO TWEEN
  tweenHEAD.onStart(function() {
    console.log("start")
  });
  tweenHEAD.onComplete(function() {
    console.log("complete")
  });


  // add tweenARML
  var tweenARML = new TWEEN.Tween(armL.rotation).to({
    x: -1.5,
    y: -0.3,
    z: -2.7
  }, 500).delay(200).start();
  tweenARML.easing(TWEEN.Easing.Cubic.InOut);
  tweenARML.repeat(1);
  tweenARML.yoyo(true);

  //ADD EVENTS TO TWEEN
  tweenARML.onStart(function() {
    console.log("start")
  });
  tweenARML.onComplete(function() {
    console.log("complete")
  });

  // add tweenARMR
  var tweenARMR = new TWEEN.Tween(armR.rotation).to({
    x: 1,
    y: -1,
    z: 1
  }, 500).delay(200).start();
  tweenARMR.easing(TWEEN.Easing.Cubic.InOut);
  tweenARMR.repeat(1);
  tweenARMR.yoyo(true);

  //ADD EVENTS TO TWEEN
  tweenARMR.onStart(function() {
    console.log("start")
  });
  tweenARMR.onComplete(function() {
    console.log("complete")
    //  clicking=false; //reset the animation
  });

}

function affermativeanimation(robotSkeleton, glasses, room) {
  var mainB = robotSkeleton.bones;
  var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
  var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
  var head = mainB[0].children[1].children[2].children[0].children[0].children[0].children[0];
  var legL = mainB[0].children[1].children[0];
  var legR = mainB[0].children[1].children[1];

  head.rotation.x = -0.3;
  head.rotation.y = -0.031;
  head.rotation.z = 0.055;

  if (room == 'garden') {
    console.log("To Implement");
  }

  if (room == "kitchen") {
    if (getCookie('glasses') == 'yes') {
      console.log("glasses ACTIVE IN affermative ANIMATION!")

      var tweenGlasses = new TWEEN.Tween(glasses.rotation).to({
        x: 0.9,
        y: -0.031,
        z: 0.055
      }, 500).delay(200).start();
      tweenGlasses.easing(TWEEN.Easing.Cubic.InOut);
      tweenGlasses.repeat(1);
      tweenGlasses.yoyo(true);

      var tweenGlasses2 = new TWEEN.Tween(glasses.position).to({
        y: 2
      }, 500).delay(200).start();
      tweenGlasses2.easing(TWEEN.Easing.Cubic.InOut);
      tweenGlasses2.repeat(1);
      tweenGlasses2.yoyo(true);
    }

  }

  if (room == "bedroom") {
    console.log("To Implement");
  }

  // add tweenHEAD
  var tweenHEAD = new TWEEN.Tween(head.rotation).to({
    x: 0.9,
    y: -0.031,
    z: 0.055
  }, 500).delay(200).start();
  tweenHEAD.easing(TWEEN.Easing.Cubic.InOut);
  tweenHEAD.repeat(1);
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
    y: 0,
    z: -2.7
  }, 500).delay(200).start();
  tweenARMLup.repeat(1);
  tweenARMLup.yoyo(true);
  tweenARMLup.easing(TWEEN.Easing.Cubic.InOut);

  // add tweenARMR
  var tweenARMR = new TWEEN.Tween(armR.rotation).to({
    x: 0,
    y: 0,
    z: 2.7
  }, 500).delay(200).start();
  tweenARMR.easing(TWEEN.Easing.Cubic.InOut);
  tweenARMR.repeat(1);
  tweenARMR.yoyo(true);

  //ADD EVENTS TO TWEEN
  tweenARMR.onStart(function() {
    console.log("start")
  });
  tweenARMR.onComplete(function() {
    console.log("complete")
    //clicking=false; //reset the animation
  });

}



function helloanimation(robotSkeleton, glasses) {
  var mainB = robotSkeleton.bones;
  var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
  var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
  var head = mainB[0].children[1].children[2].children[0].children[0].children[0].children[0];

  if (getCookie('glasses') == 'yes') {
    console.log("glasses ACTIVE IN hello ANIMATION!")

    var tweenGlasses = new TWEEN.Tween(glasses.rotation).to({
      x: 0,
      y: 0,
      z: 0
    }, 500).delay(200).start();
    tweenGlasses.easing(TWEEN.Easing.Cubic.InOut);
    tweenGlasses.repeat(1);
    tweenGlasses.yoyo(true);



  }

  // add tweenHEAD
  var tweenHEAD = new TWEEN.Tween(head.rotation).to({
    x: 0,
    y: 0,
    z: 0
  }, 500).delay(200).start();
  tweenHEAD.easing(TWEEN.Easing.Cubic.InOut);
  tweenHEAD.repeat(1);
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
    x: -1.2,
    y: -0.3,
    z: -1.8
  }, 500).delay(200).start();
  tweenARMLup.repeat(1);
  tweenARMLup.yoyo(true);
  tweenARMLup.easing(TWEEN.Easing.Cubic.InOut);

  // add tweenARMR
  var tweenARMR = new TWEEN.Tween(armR.rotation).to({
    x: 0,
    y: 0,
    z: 2.7
  }, 500).delay(200).start();
  tweenARMR.easing(TWEEN.Easing.Cubic.InOut);
  tweenARMR.repeat(1);
  tweenARMR.yoyo(true);

  //ADD EVENTS TO TWEEN
  tweenARMR.onStart(function() {
    console.log("start")
  });
  tweenARMR.onComplete(function() {
    console.log("complete")
    //  clicking=false; //reset the animation
  });

}
