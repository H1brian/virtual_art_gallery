import * as THREE from 'three';
import { PointerLockControls, ThreeMFLoader } from 'three-stdlib';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { loadStatueModel } from "./components/statue";
// import { displayInfo, hideInfo } from './components/paintingInfo';
import { createWalls } from './components/walls';
import { createBoundingBox } from './components/boundingboxes';

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
const walls = createWalls(scene, textureLoader);  // Return wallGroup
const wallBoundingBox = createBoundingBox(walls);

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
floorTexture.wrapS = THREE.RepeatWrapping;  //wrapS means repeating along horizontal direction
floorTexture.wrapT = THREE.RepeatWrapping;  // wrapT means repeating along vertical direction
floorTexture.repeat.set(1, 1);  // How many time the texture should be repeated

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



// Check if the user intersects the wall
function checkCollision() {
	const playerBoundingBox = new THREE.Box3(); // Create a bounding box
	const cameraWorldPositon = new THREE.Vector3(); // Create a vector to hold the camera position
	camera.getWorldPosition(cameraWorldPositon);  // Get the camera's position and store them it in the vector(camera's position = player's position)
	playerBoundingBox.setFromCenterAndSize(cameraWorldPositon, new THREE.Vector3(1, 1, 1));/// a method to take the center and size of a box, set the player's bounding box size and center it on the camera's world position

	// loop through each wall
	if (playerBoundingBox.intersectsBox(wallBoundingBox[0]) ||
		playerBoundingBox.intersectsBox(wallBoundingBox[1]) ||
		playerBoundingBox.intersectsBox(wallBoundingBox[2]) ||
		playerBoundingBox.intersectsBox(wallBoundingBox[3])
	) {
		return true
	} else {
		return false
	}
	
};

// Create the ceiling texture
const ceilingTexture = textureLoader.load('src/public/img/ceiling.jpg');
ceilingTexture.wrapS = THREE.RepeatWrapping;  //wrapS means repeating along horizontal direction
ceilingTexture.wrapT = THREE.RepeatWrapping;  // wrapT means repeating along vertical direction
ceilingTexture.repeat.set(1, 1);  // How many time the texture should be repeated

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
const painting3 = createPainting(
	"./src/public/paintings/zhangdaqian2.jpg", 
	10, 
	5, 
	new THREE.Vector3(-19.99, 3, -15)
);
painting3.rotation.y = Math.PI /2;
const painting4 = createPainting(
	"./src/public/paintings/zhangdaqian2.jpg", 
	10, 
	5, 
	new THREE.Vector3(19.99, 3, -15)
);
painting4.rotation.y = -Math.PI /2;

scene.add(painting1, painting2, painting3, painting4);

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

	// const distanceThreHold = 8;  // Set a distance threshold
	// let paintingToShow;
	// const distanceToPainting = camera.position.distanceTo(painting1.position);
	// if (distanceToPainting < distanceThreHold) {
	// 	paintingToShow = paiting1;  // Set paintingToShow to this painting
	// };
	// if (paintingToShow) {
	// 	displayInfo(paintingToShow.userData.info); //display the painting info
	// } else {
	// 	hideInfo();
	// };

	cube.rotation.x += 0.01;  // move render move render
	cube.rotation.y += 0.01;

	// Render, is like a screenshot, we need the camera and the scene to take the screenshot
	renderer.render(scene, camera); //render the scene 
	requestAnimationFrame(render);  // Frame rate
};

render(); // call the render