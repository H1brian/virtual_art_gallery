import * as THREE from 'three';
import { PointerLockControls, ThreeMFLoader } from 'three-stdlib';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

import { loadStatueModel } from "./components/statue";



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

loadStatueModel(scene); // Add external statue

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
// scene.add(cube);

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

// Loop through each wall and create the bounding box for each wall
frontWall.geometry.computeBoundingBox();
const fwallBBox = new THREE.Box3();
fwallBBox.setFromObject(frontWall);

backWall.geometry.computeBoundingBox();
const bwallBBox = new THREE.Box3();
bwallBBox.setFromObject(backWall);

leftWall.geometry.computeBoundingBox();
const lwallBBox = new THREE.Box3();
lwallBBox.setFromObject(leftWall);

rightWall.geometry.computeBoundingBox();
const rwallBBox = new THREE.Box3();
rwallBBox.setFromObject(rightWall);


// Check if the user intersects the wall
function checkCollision() {
	const playerBoundingBox = new THREE.Box3(); // Create a bounding box
	const cameraWorldPositon = new THREE.Vector3(); // Create a vector to hold the camera position
	camera.getWorldPosition(cameraWorldPositon);  // Get the camera's position and store them it in the vector(camera's position = player's position)
	playerBoundingBox.setFromCenterAndSize(cameraWorldPositon, new THREE.Vector3(1, 1, 1));/// a method to take the center and size of a box, set the player's bounding box size and center it on the camera's world position

	// loop through each wall
	if (playerBoundingBox.intersectsBox(fwallBBox) ||
		playerBoundingBox.intersectsBox(bwallBBox) ||
		playerBoundingBox.intersectsBox(lwallBBox) ||
		playerBoundingBox.intersectsBox(rwallBBox)
	) {
		return true
	} else {
		return false
	}
	
};

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

// Object to hold the key pressed
const keysPressed = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowLeft: false,
	ArrowRight: false,
	w: false,
	s: false,
	a: false,
	d: false
};

// Event listener for when keys were pressed
document.addEventListener('keydown', (event) => {  // Keydown is an event that fires when a key is pressed
	if (event.key in keysPressed) { // Check if the key pressed is in the keysPressed
		keysPressed[event.key] = true; // if it is, set the value to true
	}
}, false
);

// Event listener for when keys were pressed
document.addEventListener('keyup', (event) => {  // Keyup is an event that fires when a key is released
	if (event.key in keysPressed) { // Check if the key released is in the keysPressed
		keysPressed[event.key] = false; // if it is, set the value to false
	}
}, false
);

// Add the movement to the scene, press the arrow keys or wsad to move
const clock = new THREE.Clock();  // Create a clock to keep track of the time between frames

function updateMovement(delta) {
	const moveSpeed = 5 * delta;  // the distance the camera will move per second, to make the movement framerate independent. This means the movement will the same regardless of the framerate
	const previousPosition = camera.position.clone(); // clone the position before movement
	//right arrow key or letter d
	if (keysPressed.ArrowRight || keysPressed.d) {
		controls.moveRight(moveSpeed);
	}
	// left arrow key or letter a
	if (keysPressed.ArrowLeft || keysPressed.a) {
		controls.moveRight(-moveSpeed);
	}
	// up arrow key or letter w
	if (keysPressed.ArrowUp || keysPressed.w) {
		controls.moveForward(moveSpeed);
	}
	// down arrow key or letter s
	if (keysPressed.ArrowDown || keysPressed.s) {
		controls.moveForward(-moveSpeed);
	}
	// check the collision
	if (checkCollision()) {
		camera.position.copy(previousPosition); // reset the camera position to previouspositon 
	}
};

// Animation   request amimation frame
let render = function() {
	const delta = clock.getDelta(); // get the time between frames
	updateMovement(delta); // update the movement with the time between frames
	cube.rotation.x += 0.01;  // move render move render
	cube.rotation.y += 0.01;

	// Render, is like a screenshot, we need the camera and the scene to take the screenshot
	renderer.render(scene, camera); //render the scene 
	requestAnimationFrame(render);  // Frame rate
};

render(); // call the render