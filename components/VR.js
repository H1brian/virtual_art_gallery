// Group 6, Liang Geng and Qixuan Li
// Contributor: Liang Geng

import { VRButton } from 'three/addons/webxr/VRButton.js';

export const setupVR = (renderer, scene, camera) => {
  // renderer.xr.enabled = true;

  // renderer.xr.addEventListener("sessionstart", () => {
  //   const menu = document.getElementById('menu');
  //   menu.style.display = "none";
  //   console.log("WebXR session started");
  // });

  // renderer.xr.addEventListener("sessionend", () => {
  //   console.log("WebXR session ended");
  // });

  // document.body.appendChild(VRButton.createButton(renderer));

  renderer.xr.enabled = true;

  document.body.appendChild(VRButton.createButton(renderer));
  
  renderer.setAnimationLoop( function () {

    renderer.render( scene, camera );
  
  } );


};