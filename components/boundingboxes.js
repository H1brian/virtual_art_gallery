import * as THREE from 'three';

export const createBoundingBox = (objects) => {
// console.log(objects.children);

objects.children[0].geometry.computeBoundingBox();
const fwallBBox = new THREE.Box3();
fwallBBox.setFromObject(objects.children[0]);

objects.children[1].geometry.computeBoundingBox();
const bwallBBox = new THREE.Box3();
bwallBBox.setFromObject(objects.children[1]);

objects.children[2].geometry.computeBoundingBox();
const lwallBBox = new THREE.Box3();
lwallBBox.setFromObject(objects.children[2]);

objects.children[3].geometry.computeBoundingBox();
const rwallBBox = new THREE.Box3();
rwallBBox.setFromObject(objects.children[3]);

const wallBBox = [fwallBBox, bwallBBox, lwallBBox, rwallBBox];
return wallBBox;
};