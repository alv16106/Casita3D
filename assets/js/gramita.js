function randNum(min,max,bool){

  var num = Math.floor(Math.random()*max) + min; // this will get a number between 1 and 99;
  if(bool || typeof bool == "undefined"){
    num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  }
  return num;
}

// Check of point is in radius
function pointInCircle(point,target, radius) {
  var distsq = (point.x - target.x) * (point.x - target.x) + (point.y - target.y) * (point.y - target.y) + (point.z - target.z) * (point.z - target.z);
  // returns bool , distance to target origin
  return [distsq <= radius * radius * radius,distsq];
}
var loader = new THREE.JSONLoader();
var texLoader = new THREE.TextureLoader();

var plants = [
	'gras',
	'dandelion',

]


var models = {

}
texLoader.load('assets/tex/map.png',function(texture){

	var material = new THREE.MeshPhongMaterial({
		color : new THREE.Color(0xffffff),
		side : THREE.DoubleSide,
		shininess :0,
		map : texture,
		bumpMap : texture,
		bumpScale : -.05,
		transparent : true,
		depthTest : true,
		depthWrite : true,
		alphaTest : .25,
	});

	function loadPlant(id,name,url){
		var ID = id;
		var name = name;
		loader.load(url,function(geometry){
			var plant = new THREE.Mesh(geometry,material);
				models[name] = plant;
				models[name].id = ID;

				creator(name);
		});
	}


	plants.forEach(function(p,index){
		loadPlant(index,p,'assets/modelos/'+p+'.json');
	});
});


var plantRadius = 70;

function creator(name){
			createRandomObject(2000,name,plantRadius);
	};


function calculatePointInCircle(r) {
			x = Math.random() * 2 * r - r;
			zlim = Math.sqrt(r * r - x * x);
			z = Math.random() * 2 * zlim - zlim;
    return [x,z];
}


function createRandomObject(count,name,r){
	var group = new THREE.Object3D();
		for(var g=0;g<count;g++){
			var p = calculatePointInCircle(r);
			group.children[g] = models[name].clone();
			group.children[g].position.x = p[0];
			group.children[g].position.z = p[1];
			group.children[g].rotation.y = randNum(0,360,true) * Math.PI / 180;
			var scaler = randNum(.92,1,false);
				group.children[g].scale.set(scaler,scaler,scaler);


		}
	scene.add(group);
	return group;
}


var planeMat = new THREE.MeshPhongMaterial({
	color : 0x455029,
	specular : 0x000000,
	shininess : 0,
	side : THREE.DoubleSide,
});

var radius = 70;
var segments = 64;
var circleGeometry = new THREE.RingGeometry(0, radius, segments, segments, 0, Math.PI * 2);

var ground = new THREE.Mesh(circleGeometry,planeMat);
		ground.rotation.x = 90 * Math.PI / 180;
		scene.add(ground);
