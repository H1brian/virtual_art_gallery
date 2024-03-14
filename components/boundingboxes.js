import * as THREE from 'three';

export const createBoundingBox = (objects) => {

const wallBBoxGroup = [];

for (let index = 0; index < objects.children.length; index++) {
    const wall = objects.children[index];
    wall.geometry.computeBoundingBox();
    const wallBBox = new THREE.Box3();
    wallBBox.setFromObject(wall);
    wallBBoxGroup.push(wallBBox);
    };
return wallBBoxGroup;
};