import * as THREE from 'three';

export const createFloors = (scene, textureLoader) => {
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
};