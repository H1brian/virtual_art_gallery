import * as THREE from 'three';

// Create the walls group
export const createWalls = (scene, textureLoader) => {
const wallGroup = new THREE.Group();
scene.add(wallGroup);
// Create the texture of the wall
const wallTexture = textureLoader.load('src/public/img/wall.jpg');
wallTexture.wrapS = THREE.RepeatWrapping;  //wrapS means repeating along horizontal direction
wallTexture.wrapT = THREE.RepeatWrapping;  // wrapT means repeating along vertical direction
wallTexture.repeat.set(2, 2);  // How many time the texture should be repeated

// Front wall
const frontWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({
		color: '#325271'
		// map: wallTexture
	})
);
frontWall.position.z = -20;  // push the frontwall to the rear position

// Back wall
const backWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({
		color: '#325271'
		// map: wallTexture
	})
);
backWall.position.z = 20;  // push the frontwall to the rear position

// Left wall
const leftWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({color: '#325271'
	// map: wallTexture
	})
);
leftWall.rotation.y = Math.PI / 2;  // rotate the leftwall 90 degree
leftWall.position.x = -20;   // move the leftwall to the left

// Right wall
const rightWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({color: '#325271'
	// map: wallTexture
	})
);
rightWall.rotation.y = Math.PI / 2;  // rotate the leftwall 90 degree
rightWall.position.x = 20;   // move the leftwall to the left

wallGroup.add(frontWall, backWall, leftWall, rightWall);  // add walls to the wallGroup

return wallGroup;
};