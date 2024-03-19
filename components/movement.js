// Group 6, Liang Geng and Qixuan Li
// Contributor: Liang Geng
import * as THREE from 'three';

// Object to hold the key pressed
export const keysPressed = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowLeft: false,
	ArrowRight: false,
	w: false,
	s: false,
	a: false,
	d: false
};

export const updateMovement = (delta, camera, controls, wallBoundingBox) => {
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
	if (checkCollision(camera, wallBoundingBox)) {
		camera.position.copy(previousPosition); // reset the camera position to previouspositon 
	}
};

// Check if the user intersects the wall
export const checkCollision = (camera, wallBoundingBox) => {
	const playerBoundingBox = new THREE.Box3(); // Create a bounding box
	const cameraWorldPositon = new THREE.Vector3(); // Create a vector to hold the camera position
	camera.getWorldPosition(cameraWorldPositon);  // Get the camera's position and store them it in the vector(camera's position = player's position)
	playerBoundingBox.setFromCenterAndSize(cameraWorldPositon, new THREE.Vector3(1, 1, 1));/// a method to take the center and size of a box, set the player's bounding box size and center it on the camera's world position

	// loop through each wall
	for (let index = 0; index < wallBoundingBox.length; index++) {
		if (playerBoundingBox.intersectsBox(wallBoundingBox[index])){
			return true
		}
	}
	return false;
};