//ALTO Y ANCHO DE LA VENTANA
var width = window.innerWidth;
var height = window.innerHeight;

//INICIALIZACION DEL RENDERER, DE TAMA;O DE LA VENTANA
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(width,height);
//AGREGAR A LA WP EL RENDERER
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

scene.background = new THREE.CubeTextureLoader().setPath('text/').load( [
		'estrellas.png',
		'estrellas.png',
		'estrellas.png',
		'suelo.png',
		'estrellas.png',
		'estrellas.png'
	] );

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
//POSICION Y A DONDE VE
camera.position.y = 0;
camera.position.z = 4;

//AGREGAR LA CAMARA
scene.add(camera);

var ambient = new THREE.AmbientLight(0xFFFFFF, 1.0);
scene.add(ambient);

control = new THREE.OrbitControls(camera, renderer.domElement);

var texture = new THREE.TextureLoader().load( 'text/madera.jpg' );
				var geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
				var material = new THREE.MeshBasicMaterial( { map: texture } );
				mesh = new THREE.Mesh( geometry, material );
        scene.add(mesh);

//HACEMOS EL CUBO
var cubeGeometry = new THREE.CubeGeometry(1, 1, 1);
var Material = new THREE.MeshLambertMaterial({ color: 0x458796 }); //COLOR
var cube = new THREE.Mesh(cubeGeometry, Material); //MESH CUBO CON SU MATERIAL
scene.add(cube);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

var loop = function(){
  requestAnimationFrame(loop);
  render();
};

loop();
