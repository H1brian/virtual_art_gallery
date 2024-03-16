import { VRButton } from 'three/addons/webxr/VRButton.js';

export const setupVR = (renderer, scene, camera) => {
  renderer.xr.enabled = true;

  renderer.xr.addEventListener("sessionstart", () => {
    const menu = document.getElementById('menu');
    menu.style.display = "none";
    console.log("WebXR session started");
  });

  renderer.xr.addEventListener("sessionend", () => {
    console.log("WebXR session ended");
  });

  renderer.setAnimationLoop( function () {

    renderer.render( scene, camera );
  
  } );

  document.body.appendChild(VRButton.createButton(renderer));
};