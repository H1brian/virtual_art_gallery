// Group 6, Liang Geng and Qixuan Li
// Contributor: Liang Geng

// Create paintings
import * as THREE from 'three';
import { paintingData } from './paintingData';

const paintings = [];

export const createPaintings = (scene, textureLoader) => {  // A fucntion to load a image texture and create a painting mesh
        paintingData.forEach((data) => {
        const paintingTexture = textureLoader.load(data.imgSrc);   // Load image texture
	    const paintingGeometry = new THREE.PlaneGeometry(data.width, data.height); // Create geometry
	    const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTexture});
        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
        painting.position.set(data.position.x, data.position.y, data.position.z);
        painting.rotation.y = data.rotation;
        //Add 3D Object 
        painting.userData = {
            type: "painting",
            info: data.info,
        }

        scene.add(painting);
        paintings.push(painting);
    })
    return paintings;
};
