import * as THREE from 'three';

function PaintingData (imgSrc, width, height, position, rotationY) {
    this.imgSrc = imgSrc;
    this.width = width;
    this.height =height;
    this.position = new THREE.Vector3(position.x, position.y, position.z);
    this.rotation = rotationY
};
export const paintingData = [];

const painting1 = new PaintingData(
    './src/public/paintings/zhangdaqian1.jpg', 
    10, 
    5, 
    new THREE.Vector3(-10, 3, -19.99), 
    0
    );
const painting2 = new PaintingData(
    './src/public/paintings/zhangdaqian2.jpg', 
    10, 
    5, 
    new THREE.Vector3(-19.99, 3, -15), 
    Math.PI /2
    );
const painting3 = new PaintingData(
    './src/public/paintings/zhangdaqian2.jpg', 
    10, 
    5, 
    new THREE.Vector3(10, 3, -19.99), 
    0
    );


paintingData.push(painting1, painting2, painting3);
console.log(paintingData);
