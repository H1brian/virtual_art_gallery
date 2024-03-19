// Group 6, Liang Geng and Qixuan Li
// Contributor: Liang Geng
import * as THREE from 'three';

export const createCeiling = (scene, textureLoader) => {
// Create the ceiling texture
const ceilingTexture = textureLoader.load('src/public/img/ceiling2.jpg');
ceilingTexture.wrapS = THREE.RepeatWrapping;  //wrapS means repeating along horizontal direction
ceilingTexture.wrapT = THREE.RepeatWrapping;  // wrapT means repeating along vertical direction
ceilingTexture.repeat.set(3, 3);  // How many time the texture should be repeated

// Create the ceiling
const ceilingGeometry = new THREE.PlaneGeometry(50, 120); // BoxGeometry is the shape of the objects
const ceilingMaterial = new THREE.MeshBasicMaterial({
	// color: "yellow",
	map: ceilingTexture,
	side: THREE.DoubleSide
});

const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingPlane.rotation.x = Math.PI / 2;  // rotate the ceiling 90 degree
ceilingPlane.position.y = 10;
scene.add(ceilingPlane);
};