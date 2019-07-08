function setUpListeners( ){
    document.getElementById("bedroom").onclick = function(e){
        window.location.replace("bedroom.html");
    };
    document.getElementById("kitchen").onclick = function(e){
        window.location.replace("kitchen.html");

    };
    document.getElementById("garden").onclick = function(e){
        window.location.replace("garden.html");

    };
    window.addEventListener( 'resize', function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }, false );
    document.getElementById("exit").onclick = function(e){
        window.location.replace("index.html");
    };

}

function setUpMenuListeners(){

    document.getElementById("glasses").onclick = function(){

        if (document.getElementById("glasses").innerHTML == "Add Glasses"){
            glasses = drawGlasses();
            checkGlasses = setInterval(function(){
                if(glasses == null){
                    document.getElementById("glasses").setAttribute("disabled", "true");
                }else{

                    document.getElementById("glasses").innerHTML = "Remove Glasses";

                    clearInterval(checkGlasses);
                    glassesAreLoaded = true;
                    document.getElementById("glasses").removeAttribute("disabled");
                    var box = new THREE.Box3().setFromObject( model );
                    glasses.scale.set(0.3,0.4,0.4);
                    glasses.position.y += box.getSize().y * 5 / 12 ;
                    glasses.position.z += box.getSize().z /2 + 0.2 ;
                    hier.add(glasses);
                }
            }, 500);
        }
        else{ // remove glasses
            hier.remove(glasses);
            document.getElementById("glasses").innerHTML = "Add Glasses";
        }

    };


    document.getElementById("customize").onclick = function(){

        custFlag = !custFlag;
        if(custFlag){
            document.getElementById("customize-options").removeAttribute("hidden");;
        }else{
            document.getElementById("customize-options").setAttribute("hidden", "true");
        }
    };

    document.getElementById("new").onclick = function(){
        //save the model customization
        document.cookie= "path=/;";

        if(document.getElementById("glasses").innerHTML == "Add Glasses"){
            document.cookie = "glasses=no;";
        }
        else{
            document.cookie = "glasses=yes;";
        }
        console.log('customization parameters:');
        console.log(document.cookie);
        window.location.replace("bedroom.html");

    };
}
