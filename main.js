import * as THREE from 'three';
import { PointerLockControls, ThreeMFLoader } from 'three-stdlib';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const width = window.innerWidth, height = window.innerHeight;

// // init

// const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
// camera.position.z = 1;

// const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
// const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

// const renderer = new THREE.WebGLRenderer( { antialias: true } );
// renderer.setSize( width, height );
// renderer.setAnimationLoop( animation );
// document.body.appendChild( renderer.domElement );

// // animation

// function animation( time ) {

// 	mesh.rotation.x = time / 2000;
// 	mesh.rotation.y = time / 1000;

// 	renderer.render( scene, camera );

// }

// Scene
const scene = new THREE.Scene(); // create the scene
const textureLoader = new THREE.TextureLoader(); // create image loader

// Camera
const camera = new THREE.PerspectiveCamera(
	75, // field of view
	window.innerWidth / window.innerHeight,// aspect ratio (width of the window divede height)
	0.1, // near
	1000 // far
);
scene.add(camera); // Currently the camera is next to the window
camera.position.z = 5; // Move the camera back 5 units

// Renderer (WebGL)
const renderer = new THREE.WebGLRenderer({antialias: true}); // For smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffff, 1);  // Background color
document.body.appendChild(renderer.domElement); // add renderer to HTML

// Lights
const ambientLight = new THREE.AmbientLight(0x101010, 1);  // color, intensity
ambientLight.position.x = camera.position.x; // Light follows camera
ambientLight.position.y = camera.position.y; // Light follows camera
scene.add(ambientLight);

// Directional Light
const sunLight = new THREE.DirectionalLight(0xddddd, 1); // color intensity
sunLight.position.y = 15;
scene.add(sunLight);

// Creating a cube, name is mesh, a combination of geometry (shape) and material(how it looks)
const geometry = new THREE.BoxGeometry(1, 1, 1); // the shape of the object, parameters are the size of the box
const material = new THREE.MeshBasicMaterial({color: 'blue'}); // color
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Controls
// Event listener when user presee the keys
document.addEventListener('keydown', onkeyDown, false);

// Texture of the floor
// let floorTexture = new THREE.ImageUtils.loadTexture('img/floor.jpg') // for new version of threejs
const floorTexture = textureLoader.load('src/public/img/floor.jpg');

// Create the floor plane
const planeGeometry = new THREE.PlaneGeometry(50, 50); // BoxGeometry is the shape of the object // Alternative PlaneBufferGeometry
const planeMaterial =  new THREE.MeshBasicMaterial({
	map: floorTexture,
	side: THREE.DoubleSide,
});
const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = Math.PI /2  // rotate 90 degree
floorPlane.position.y = -Math.PI  // move the plane below

scene.add(floorPlane);

// Create the walls group
const wallGroup = new THREE.Group();
scene.add(wallGroup);
// Create the texture of the wall
const wallTexture = textureLoader.load('src/public/img/wall.jpg');

// Front wall
const frontWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({
		// color: "red",
		map: wallTexture
	})
);
frontWall.position.z = -20;  // push the frontwall to the rear position

// Back wall
const backWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({
		// color: "red",
		map: wallTexture
	})
);
backWall.position.z = 20;  // push the frontwall to the rear position

// Left wall
const leftWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({map: wallTexture})
);
leftWall.rotation.y = Math.PI / 2;  // rotate the leftwall 90 degree
leftWall.position.x = -20;   // move the leftwall to the left

// Right wall
const rightWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({map: wallTexture})
);
rightWall.rotation.y = Math.PI / 2;  // rotate the leftwall 90 degree
rightWall.position.x = 20;   // move the leftwall to the left

wallGroup.add(frontWall, backWall, leftWall, rightWall);  // add walls to the wallGroup

// Look through each wall and create the bounding box
// for (let i = 0; i < wallGroup.children.length; i++) {
// 	wallGroup.children[i].Box3
// }

// Create the ceiling texture
const ceilingTexture = textureLoader.load('src/public/img/ceiling.jpg');
// Create the ceiling
const ceilingGeometry = new THREE.PlaneGeometry(50, 50); // BoxGeometry is the shape of the objects
const ceilingMaterial = new THREE.MeshBasicMaterial({
	// color: "yellow",
	map: ceilingTexture,
	side: THREE.DoubleSide
});

const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingPlane.rotation.x = Math.PI / 2;  // rotate the ceiling 90 degree
ceilingPlane.position.y = 10;
scene.add(ceilingPlane);

// Create paintings

function createPainting(imageURL, width, height, position) {  // A fucntion to load a image texture and create a painting mesh
	const paintingTexture = textureLoader.load(imageURL);   // Load image texture
	const paintingGeometry = new THREE.PlaneGeometry(width, height); // Create geometry
	const paintingMaterial = new THREE.MeshBasicMaterial({   //Create material
		// color: "red",
		map: paintingTexture,
	});
	const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
	painting.position.set(position.x, position.y, position.z);
	// painting.position.z = -15;
	// painting.rotation.y = Math.PI /2;
	// painting.position.x = -19;
	return painting;
};

const painting1 = createPainting(
	"./src/public/paintings/zhangdaqian1.jpg", 
	10, 
	5, 
	new THREE.Vector3(-10, 3, -19.99)
);
const painting2 = createPainting(
	"./src/public/paintings/zhangdaqian2.jpg", 
	10, 
	5, 
	new THREE.Vector3(10, 3, -19.99)
);

scene.add(painting1, painting2);

// Controls
const controls = new PointerLockControls(camera, document.body);

// Lock the pointer (controls are activated)
// And hide the menu when the experience starts
function startExperience(){
	// Lock the pointer
	controls.lock();
	// Hide the menu
	hideMenu();
};
const startButton = document.getElementById("start_button");
startButton.addEventListener("click", startExperience);

// Hide the menu
function hideMenu(){
	const menu = document.getElementById('menu');
	menu.style.display = "none";
};

// Show the menu
function showMenu(){
	const menu = document.getElementById('menu');
	menu.style.display = "block";
};

// Press "ESC" to exit and show the menu
controls.addEventListener('unlock', showMenu);

// Function when a key is pressed, execute this function
function onkeyDown(event) {
	let keycode = event.which;

	//right arrow key or letter d
	if (keycode === 39 || keycode === 68) {
		controls.moveRight(0.2);
	}
	// left arrow key or letter a
	else if (keycode === 37 || keycode === 65) {
		controls.moveRight(-0.2);
	}
	// up arrow key or letter w
	else if (keycode === 38 || keycode === 87) {
		controls.moveForward(0.2);
	}
	// down arrow key or letter s
	else if (keycode === 40 || keycode === 83) {
		controls.moveForward(-0.2);
	}
};

// Animation   request amimation frame
let render = function() {
	cube.rotation.x += 0.01;  // move render move render
	cube.rotation.y += 0.01;

	// Render, is like a screenshot, we need the camera and the scene to take the screenshot
	renderer.render(scene, camera); //render the scene 
	requestAnimationFrame(render);  // Frame rate
};

render(); // call the render

