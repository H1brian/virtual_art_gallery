import * as THREE from 'three';

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
let ambientLight = new THREE.AmbientLight(0x101010, 1);  // color, intensity
ambientLight.position.x = camera.position.x; // Light follows camera
ambientLight.position.y = camera.position.y; // Light follows camera
scene.add(ambientLight);

// Directional Light
let sunLight = new THREE.DirectionalLight(0xddddd, 1); // color intensity
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

// Function when a key is pressed, execute this function
function onkeyDown(event) {
	let keycode = event.which;

	//right arrow key or letter d
	if (keycode === 39) {
		camera.translateX(-0.05);
	}
	// left arrow key or letter a
	else if (keycode === 37) {
		camera.translateX(0.05)
	}
	// up arrow key or letter w
	else if (keycode === 38) {
		camera.translateY(-0.05)
	}
	// down arrow key or letter s
	else if (keycode === 40) {
		camera.translateY(0.05)
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

