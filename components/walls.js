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

// Front wall - rear
const frontWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({
		color: '#51829B'
		// map: wallTexture
	})
);
frontWall.position.z = -60;  // push the frontwall to the rear position

// Back wall
const backWall = new THREE.Mesh(
	new THREE.BoxGeometry(50, 20, 0.001),
	new THREE.MeshBasicMaterial({
		color: '#51829B'
		// map: wallTexture
	})
);
backWall.position.z = 20;  // push the frontwall to the rear position

// Left wall
const leftWall1 = new THREE.Mesh(
	new THREE.BoxGeometry(120, 20, 0.001),
	new THREE.MeshBasicMaterial({color: '#51829B'
	// map: wallTexture
	})
);
leftWall1.rotation.y = Math.PI / 2;  // rotate the leftwall 90 degree
leftWall1.position.x = -20;   // move the leftwall to the left

// Right wall
const rightWall1 = new THREE.Mesh(
	new THREE.BoxGeometry(120, 20, 0.001),
	new THREE.MeshBasicMaterial({color: '#51829B'
	// map: wallTexture
	})
);
rightWall1.rotation.y = Math.PI / 2;  // rotate the rightwall 90 degree
rightWall1.position.x = 20;   //  move the rightwall to the right

// Middle wall left near
const middleWall1 = new THREE.Mesh(
	new THREE.BoxGeometry(20, 20, 0.001),
	new THREE.MeshBasicMaterial({
		color: '#51829B'
		// map: wallTexture
	})
);
middleWall1.position.z = -20;
middleWall1.position.x = -15;

// Middle wall right near

const middleWall2 = new THREE.Mesh(
	new THREE.BoxGeometry(20, 20, 0.001),
	new THREE.MeshBasicMaterial({
		color: '#51829B'
		// map: wallTexture
	})
);
middleWall2.position.z = -20;
middleWall2.position.x = 15;

// Middle wall hallway left
const middleWall3 = new THREE.Mesh(
	new THREE.BoxGeometry(15, 20, 0.001),
	new THREE.MeshBasicMaterial({color: '#51829B'
	// map: wallTexture
	})
);
middleWall3.rotation.y = Math.PI / 2;
middleWall3.position.x = -5;
middleWall3.position.z = -27.5;

// Middle wall hallway right
const middleWall4 = new THREE.Mesh(
	new THREE.BoxGeometry(15, 20, 0.001),
	new THREE.MeshBasicMaterial({color: '#51829B'
	// map: wallTexture
	})
);
middleWall4.rotation.y = Math.PI / 2;
middleWall4.position.x = 5;
middleWall4.position.z = -27.5;

// Middle wall left rear
const middleWall5 = new THREE.Mesh(
	new THREE.BoxGeometry(20, 20, 0.001),
	new THREE.MeshBasicMaterial({
		color: '#51829B'
		// map: wallTexture
	})
);
middleWall5.position.z = -35;
middleWall5.position.x = -15;

// Middle wall right rear

const middleWall6 = new THREE.Mesh(
	new THREE.BoxGeometry(20, 20, 0.001),
	new THREE.MeshBasicMaterial({
		color: '#51829B'
		// map: wallTexture
	})
);
middleWall6.position.z = -35;
middleWall6.position.x = 15;

wallGroup.add(
	frontWall, backWall, leftWall1, rightWall1, 
	middleWall1, middleWall2, middleWall3, middleWall4, 
	middleWall5, middleWall6);  // add walls to the wallGroup

return wallGroup;
};