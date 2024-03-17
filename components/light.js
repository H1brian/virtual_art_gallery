import * as THREE from 'three';

// Lights
export const createLight = (scene, camera) => {
const ambientLight = new THREE.AmbientLight(0x101010, 1);  // color, intensity
ambientLight.position.x = camera.position.x; // Light follows camera
ambientLight.position.y = camera.position.y; // Light follows camera
scene.add(ambientLight);

// Directional Light
const sunLight = new THREE.DirectionalLight(0xddddd, 1); // color intensity
sunLight.position.y = 15;
scene.add(sunLight);

};