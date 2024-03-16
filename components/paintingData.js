import * as THREE from 'three';

function PaintingData (imgSrc, width, height, position, rotationY, info) {
    this.imgSrc = imgSrc;
    this.width = width;
    this.height =height;
    this.position = new THREE.Vector3(position.x, position.y, position.z);
    this.rotation = rotationY;
    this.info = info;

};
export const paintingData = [];

// Create paintings
const painting1 = new PaintingData(
    './src/public/paintings/zhangdaqian1.jpg', 
    6, 
    9, 
    new THREE.Vector3(0, 3, -59.9), //qian1
    0,
    {title: "Buddha", 
    author: "Daqian Zhang", 
    description: "Bodhisattva portrait"}
    );
const painting2 = new PaintingData(
    './src/public/paintings/zhangdaqian2.jpg', 
    4, 
    9, 
    new THREE.Vector3(0, 3, 19.9), //hou1
    -Math.PI,
    {title: "Man on horse", 
    author: "Daqian Zhang", 
    description: "A man is taming a horse"}
    );
const painting3 = new PaintingData(
    './src/public/paintings/zhangdaqian3.jpg', 
    10, 
    5, 
    new THREE.Vector3(-13, 3, -35.1), 
    Math.PI,
    {title: "Folding Fan", 
    author: "Daqian Zhang", 
    description: "The front of the folding fan"}
    );
const painting4 = new PaintingData(
    './src/public/paintings/zhangdaqian4.jpg', 
    10, 
    5, 
    new THREE.Vector3(-19.99, 3, -47), 
    Math.PI / 2,
    {title: "Folding Fan", 
    author: "Daqian Zhang", 
    description: "The back of the folding fan"}
    );
const painting5 = new PaintingData(
    './src/public/paintings/zhangdaqian5.jpg', 
    10, 
    5, 
    new THREE.Vector3(19.99, 3, -47), 
    -Math.PI / 2,
    {title: "Folding Fan", 
    author: "Daqian Zhang", 
    description: "A man rows a boat across a stream"}
    );
const painting6 = new PaintingData(
    './src/public/paintings/zhangdaqian6.jpg', 
    10, 
    5, 
    new THREE.Vector3(13, 3, -35.1), 
    Math.PI,
    {title: "Folding Fan", 
    author: "Daqian Zhang", 
    description: "A man rows a boat among mountains"}
    );
const painting7 = new PaintingData(
    './src/public/paintings/zhangdaqian7.jpg', 
    10, 
    5,
    new THREE.Vector3(-19.99, 3, 0), 
    Math.PI / 2,
    {title: "Landscape", 
    author: "Daqian Zhang", 
    description: "Play a song to my best friend"}
    );
const painting8 = new PaintingData(
    './src/public/paintings/zhangdaqian8.jpg', 
    10, 
    5, 
    new THREE.Vector3(-13, 3, -19.99),  
    0,
    {title: "Plant", 
    author: "Daqian Zhang", 
    description: "Plants"}
    );
const painting9 = new PaintingData(
    './src/public/paintings/zhangdaqian9.jpg', 
    10, 
    5, 
    new THREE.Vector3(13, 3, -19.99), 
    0,
    {title: "Flowers", 
    author: "Daqian Zhang", 
    description: "Lotus and chrysanthemum"}
    );
const painting10 = new PaintingData(
    './src/public/paintings/zhangdaqian10.jpg', 
    10, 
    5, 
    new THREE.Vector3(19.99, 3, 0), 
    -Math.PI / 2,
    {title: "Flowers", 
    author: "Daqian Zhang", 
    description: "Lotus"}
    );

paintingData.push(
    painting1, painting2, painting3, painting4, painting5, 
    painting6, painting7, painting8, painting9, painting10
    );
