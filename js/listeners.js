function setUpListeners( ){
    document.getElementById("bedroom").onclick = function(e){
        e.stopPropagation();
        room = 'bedroom';
        var canv = document.querySelector('canvas');
        if(canv != null){
            canv.setAttribute('hidden','true');
        }

        bedroom();
    };
    document.getElementById("kitchen").onclick = function(e){
        e.stopPropagation();
        room = 'kitchen';
        var canv = document.querySelector('canvas');
        if(canv != null){
            canv.setAttribute('hidden','true');
        }
        kitchen();
    };
    document.getElementById("garden").onclick = function(e){
        e.stopPropagation();
        room = 'garden';
        var canv = document.querySelector('canvas');
        if(canv != null){
            canv.setAttribute('hidden','true');
        }
        garden();
    };
    window.addEventListener( 'resize', function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }, false );

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

    document.getElementById("hat").onclick = function(){
        if (document.getElementById("hat").innerHTML == "Add Hat"){
            drawHat();
            checkHat = setInterval(function(){
                if(hat == null){
                    document.getElementById("hat").setAttribute("disabled", "true");
                }else{
                    document.getElementById("hat").innerHTML = "Remove Hat";

                    clearInterval(checkHat);
                    hatIsLoaded = true;
                    document.getElementById("hat").removeAttribute("disabled");
                    hat.scale.set(
                        hat.scale.x*0.6,
                        hat.scale.y*0.4,
                        hat.scale.z*0.4
                    );
                    var box = new THREE.Box3().setFromObject( model );
                    hat.position.y += box.getSize().y * 3 / 6 ;
                    hier.add(hat);
                }

            }, 500);
        }else{
            hier.remove(hat);
            document.getElementById("hat").innerHTML = "Add Hat";
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
        if(document.getElementById("hat").innerHTML == "Add Hat"){
            document.cookie = "hat=no;";
        }
        else{
            document.cookie = "hat=yes;";
        }
        console.log('customization parameters:');
        console.log(document.cookie);
        window.location.replace("index2.html");

    };
}
