//ALTO Y ANCHO DE LA VENTANA
let width = window.innerWidth;
let height = window.innerHeight;
let main_color = 0x2174ca;
let casa, cama, mesa, arbol;
let estado = 1;
let figura = 1;
let wireframe = 1;

//INICIALIZACION DEL RENDERER, DE TAMA;O DE LA VENTANA
let renderer = new THREE.WebGLRenderer({antialias:true,alpha: true,transparent : true});
let container = document.getElementById('canvas');
let w = container.offsetWidth;
let h = container.offsetHeight;
renderer.setSize(w, h);
container.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//AGREGAR A LA WP EL RENDERER
//document.body.appendChild(renderer.domElement);


//NUEVA ESCENA
let scene = new THREE.Scene;

//HACEMOS LA CAMARA
let camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 10000);

//SKYBOX (APRENDER A PONERLE TEXTURA)
let texture = new THREE.TextureLoader().load( 'assets/tex/cielo.jpg' );
let skyboxGeometry = new THREE.SphereGeometry( 70, 32, 32 );;
let skyboxMaterial = new THREE.MeshLambertMaterial({ map: texture, side: THREE.BackSide });
let skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

let objetin = [];
let objetin2 = [];

let geometry = new THREE.PlaneGeometry( 12, 10, 32 );
let concreto = new THREE.TextureLoader().load( 'assets/tex/concreto.png' );
concreto.wrapS = THREE.RepeatWrapping;
concreto.wrapT = THREE.RepeatWrapping;
concreto.repeat.set( 4, 3 );
let placa = new THREE.MeshPhongMaterial({ map: concreto, side: THREE.DoubleSide });
let plane = new THREE.Mesh( geometry, placa );
plane.position.y += 0.1;
plane.position.x += 2.5;
plane.rotation.x += 3.14/2;
scene.add( plane );

let pivot = new THREE.Object3D();
pivot.position.set(0,2,0);

var spotLightCa = new THREE.SpotLight( 0x6666ff, 0, 10, 0.8 );
spotLightCa .position.set( 0, 7, 0 );
spotLightCa .castShadow = true;
spotLightCa .shadow.camera.near = 500;
spotLightCa .shadow.camera.far = 4000;
spotLightCa .shadow.camera.fov = 30;
scene.add( spotLightCa  );

var spotLightArb = new THREE.SpotLight( 0x6666ff, 5 , 10, 0.6);
spotLightArb .position.set( 6, 7, 0 );
spotLightArb .castShadow = true;
spotLightArb .shadow.camera.near = 500;
spotLightArb .shadow.camera.far = 4000;
spotLightArb .shadow.camera.fov = 30;
scene.add( spotLightArb  );

let loader = new THREE.ObjectLoader();
loader.load(
	"assets/modelos/gen/generic-houses-1.json",
	function(object){
		camera.lookAt(object.position);
		casa = object;
		casa.position.set(0,-2,0);
		let madera = new THREE.TextureLoader().load( 'assets/tex/puerta.png' );
		let geo = new THREE.BoxBufferGeometry( 1.4, 2.2, 0.1);
		let materialPuerta = new THREE.MeshPhongMaterial( { map: madera } );
		puerta = new THREE.Mesh( geo, materialPuerta );
		puerta.position.set(1.2,1.1,3.2);
		// puerta.position.x += 1.2;
		// puerta.position.y += 1.1;
		// puerta.position.z += 3.2;
		//pivot = object;
		casa.add(puerta)
		pivot.add(spotLightCa);
		pivot.add(casa);
		//pivot.add(puerta);
		objetin.push(pivot);
		scene.add(pivot);
		console.log("Casa");
	}
);


let loader2 = new THREE.ObjectLoader();
loader2.load(
	"assets/modelos/cama/cama.json",
	function(object2){
		object2.position.y += 0.85-2;
		object2.position.z -= 2;
		objetin.push(object2);
		object2.position.x -= 0.7;
		scene.add(object2);
		cama = object2;
		pivot.add(cama);
		console.log("Cama");
	}
);



let loader4 = new THREE.ObjectLoader();
loader4.load(
	"assets/modelos/low-poly-dead-tree.json",
	function(object4){
		object4.position.x += 6;
		object4.add(spotLightArb);
		objetin2.push(object4);
		scene.add(object4);
		arbol = object4;
		console.log("Arbol");
	}
);

// create an AudioListener and add it to the camera
let listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
let sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
let audioLoader = new THREE.AudioLoader();
audioLoader.load( 'assets/sounds/close.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setVolume( 0.5 );
});

//POSICION Y A DONDE VE
camera.position.y = 10;
camera.position.z = 30;
control = new THREE.OrbitControls(camera, renderer.domElement);
control.damping = 0.2;
control.minPolarAngle = 60 * Math.PI/180;
control.maxPolarAngle = 85 * Math.PI/180;
control.minDistance = 8;
control.maxDistance = 45;
//AGREGAR LA CAMARA
scene.add(camera);

let planeMat = new THREE.MeshPhongMaterial({
	color : 0x455029,
	specular : 0x000000,
	shininess : 0,
	side : THREE.DoubleSide,
});

let radius = 70;
let segments = 64;
let circleGeometry = new THREE.RingGeometry(0.1, radius, segments, segments, 0, Math.PI * 2);

let ground = new THREE.Mesh(circleGeometry,planeMat);
		ground.rotation.x = 90 * Math.PI / 180;
		scene.add(ground);



// movement - please calibrate these values
let xSpeed = 1;
let ySpeed = 1;
let rotSpeed = 0.3;
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    let keyCode = event.which;
		//MOVIMIENTO
    if (keyCode == 87) {
			if(figura%2){
				arbol.position.y += ySpeed;
			}else {
				pivot.position.y += ySpeed;
			}
    } else if (keyCode == 83) {
			if(figura%2){
				arbol.position.y -= ySpeed;
			}else {
				pivot.position.y -= ySpeed;
			}
    } else if (keyCode == 68) {
			if(figura%2){
				arbol.position.x += xSpeed;
			}else {
				pivot.position.x += xSpeed;
			}
    } else if (keyCode == 65) {
			if(figura%2){
				arbol.position.x -= xSpeed;
			}else {
				pivot.position.x -= xSpeed;
			}
		//ROTACIONES
    } else if (keyCode == 81) {
			if(figura%2){
				arbol.rotation.y -= rotSpeed;
			}else {
				pivot.rotation.y -= rotSpeed;
			}
    }else if (keyCode == 69) {
			if(figura%2){
				arbol.rotation.y += rotSpeed;
			}else {
				pivot.rotation.y += rotSpeed;
			}
    }else if (keyCode == 49) {
			if(figura%2){
				arbol.rotation.z -= rotSpeed;
			}else {
				pivot.rotation.z -= rotSpeed;
			}
    }else if (keyCode == 50) {
			if(figura%2){
				arbol.rotation.z += rotSpeed;
			}else {
				pivot.rotation.z += rotSpeed;
			}
    }else if (keyCode == 51) {
			if(figura%2){
				arbol.rotation.x -= rotSpeed;
			}else {
				pivot.rotation.x -= rotSpeed;
			}
    }else if (keyCode == 52) {
			if(figura%2){
				arbol.rotation.x += rotSpeed;
			}else {
				pivot.rotation.x += rotSpeed;
			}
    } //ABRIR Y CERRAR PUERTA
		else if (keyCode == 70) {
			if (estado%2){
				puerta.scale.set(0.0714,1,14);
				puerta.position.x -= 0.7;
				puerta.position.z += 0.7;
				console.log("abrir");
				sound.play();
			}else{
				puerta.scale.set(1, 1, 1);
				puerta.position.x += 0.7;
				puerta.position.z -= 0.7;
				console.log("cerrar");
				sound.play();
			}
			estado++;
		//ESCALADO
    }else if (keyCode == 107) {
			if(figura%2){
				arbol.scale.x *= 1.2;
				arbol.scale.y *= 1.2;
				arbol.scale.z *= 1.2;
			}else {
				pivot.scale.x *= 1.2;
				pivot.scale.y *= 1.2;
				pivot.scale.z *= 1.2;
			}
    }else if (keyCode == 109) {
			if(figura%2){
				arbol.scale.x *= 0.8;
				arbol.scale.y *= 0.8;
				arbol.scale.z *= 0.8;
			}else {
				pivot.scale.x *= 0.8;
				pivot.scale.y *= 0.8;
				pivot.scale.z *= 0.8;
			}
    } //SHEAR
		else if (keyCode == 90) {
			if(figura%2){
				Shear(arbol, 0.1, 0);
			}else {
				Shear(casa, 0.1, 0);
			}
    }else if (keyCode == 88) {
			if(figura%2){
				Shear(arbol, -0.1, 0);
			}else {
				Shear(casa, -0.1, 0);
			}
    }else if (keyCode == 67) {
			if(figura%2){
				Shear(arbol, 0, 0.1);
			}else {
				Shear(casa, 0, 0.1);
			}
    }else if (keyCode == 86) {
			if(figura%2){
				Shear(arbol, 0, -0.1);
			}else {
				Shear(casa, 0, -0.1);
			}
    }else if (keyCode == 16) {
    	figura++;
			if (figura%2) {
				spotLightArb.intensity = 5;
				spotLightCa.intensity = 0;
			}else {
				spotLightCa.intensity = 2;
				spotLightArb.intensity = 0;
			}
			console.log(figura);
    }else if (keyCode == 82) {
			if(wireframe%2){
				setWireframe(casa, true);
				setWireframe(arbol, true);
			}else {
				setWireframe(casa, false);
				setWireframe(arbol, false);
			}
			wireframe++;
    }
};

function setWireframe( object, boolean ) {
	object.traverse( ( child ) => {
		if ( child.isMesh ) {
			console.log("Hey, un mesh");
			if ( ! Array.isArray( child.material ) ) {
				if ( child.material.wireframe !== undefined ) child.material.wireframe = boolean;
			} else child.material.forEach( ( mat ) => {
			    if ( mat.wireframe !== undefined ) mat.wireframe = boolean;
		    } );
		}
	} );
}

function Shear (object, Sx, Sy){
  let matrix = new THREE.Matrix4();
  matrix.set(
      1,   Sx,    0,  0,
    	Sy,    1,    0,  0,
      0,    0,    1,  0,
      0,    0,    0,  1
  );
  object.applyMatrix(matrix);
}

let i = 0;

let ambient = new THREE.AmbientLight(0xFFFFFF, 0.8);
scene.add(ambient);


//TIEMPO
let clock = new THREE.Clock;

function render() {
	skybox.rotation.x += 0.0005;
	i++;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
