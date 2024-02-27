import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
const loader = new THREE.TextureLoader(); // create image loader

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
let geometry = new THREE.BoxGeometry(1, 1, 1); // the shape of the object, parameters are the size of the box
let material = new THREE.MeshBasicMaterial({color: 'blue'}); // color
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Controls
// Event listener when user presee the keys
document.addEventListener('keydown', onkeyDown, false);

// Texture of the floor
// let floorTexture = new THREE.ImageUtils.loadTexture('img/floor.jpg') // for new version of threejs
const floorTexture = loader.load('img/floor.jpg');

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
const wallTexture = loader.load('./img/wall.jpg');

// Front wall
const frontWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({
		// color: "red",
		map: wallTexture
	})
);
frontWall.position.z = -20;  // push the frontwall to the rear position
// wallGroup.add(frontWall);  // add walls to the wallGroup

// Left wall
const leftWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({map: wallTexture})
);
leftWall.rotation.y = Math.PI / 2;  // rotate the leftwall 90 degree
leftWall.position.x = -20;   // move the leftwall to the left
// wallGroup.add(leftWall);  // add walls to the wallGroup

// Right wall
const rightWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({map: wallTexture})
);
rightWall.rotation.y = Math.PI / 2;  // rotate the leftwall 90 degree
rightWall.position.x = 20;   // move the leftwall to the left

wallGroup.add(frontWall, leftWall, rightWall);  // add walls to the wallGroup

// Look through each wall and create the bounding box
// for (let i = 0; i < wallGroup.children.length; i++) {
// 	wallGroup.children[i].Box3
// }

// Create the ceiling
// Create the ceiling texture
const ceilingTexture = loader.load('img/ceiling.jpg');
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

// Function when a key is pressed, execute this function
function onkeyDown(event) {
	let keycode = event.which;

	//right arrow key or letter d
	if (keycode === 39) {
		camera.translateX(0.05);
	}
	// left arrow key or letter a
	else if (keycode === 37) {
		camera.translateX(-0.05)
	}
	// up arrow key or letter w
	else if (keycode === 38) {
		camera.translateY(0.05)
	}
	// down arrow key or letter s
	else if (keycode === 40) {
		camera.translateY(-0.05)
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

