import * as THREE from 'three';
import { PointerLockControls, ThreeMFLoader } from 'three-stdlib';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { loadStatueModel } from "./components/statue";
import { createWalls } from './components/walls';
import { createBoundingBox } from './components/boundingboxes';
import { createFloors } from './components/floor';
import { createCeiling } from './components/ceiling';
import { createPaintings } from './components/paintings';
import { paintingInfo } from './components/paintingInfo';
import { setupAudio } from './components/audio';
import { updateMovement } from './components/movement';
import { eventHandling } from './components/events';

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
camera.position.y = 2; // Move the camera up 2 units

// Renderer (WebGL)
const renderer = new THREE.WebGLRenderer({antialias: true}); // For smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffff, 1);  // Background color
document.body.appendChild(renderer.domElement); // add renderer to HTML

// Controls
const controls = new PointerLockControls(camera, document.body);

// loadStatueModel(scene); // Add external statue

const walls = createWalls(scene, textureLoader);  // Return wallGroup
const wallBoundingBox = createBoundingBox(walls);  // Return an array of wall bounding box 
const paintings = createPaintings(scene, textureLoader); // Return an array of paintings
createFloors(scene, textureLoader);  //
createCeiling(scene, textureLoader);
setupAudio(camera);  
eventHandling(controls);

// Add the movement to the scene, press the arrow keys or wsad to move
const clock = new THREE.Clock();  // Create a clock to keep track of the time between frames

// Animation   request amimation frame
const render = function() {
	const delta = clock.getDelta(); // get the time between frames
	updateMovement(delta, camera, controls, wallBoundingBox); // update the movement with the time between frames
	paintingInfo(paintings, camera);
	// Render, is like a screenshot, we need the camera and the scene to take the screenshot
	renderer.render(scene, camera); //render the scene 
	requestAnimationFrame(render);  // Frame rate
};

render(); // call the render