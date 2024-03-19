// Group 6, Liang Geng and Qixuan Li
// Contributor: Liang Geng
import * as THREE from 'three';

let sound;
let bufferLoaded = false;

// Setup the audio
export const setupAudio = (camera) => {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("./src/public/sound/backgroundmusic.mp3", function (buffer) {
        sound.setBuffer(buffer); // set the audio source buffer
        sound.setLoop(true);  // set the audio source to loop
        sound.setVolume(0.5);  // set the audio source volume
        bufferLoaded = true;
    });
    
}

export const startAudio = () => {
    if (sound && bufferLoaded) {
        sound.play();
    }
};

export const stopAudio = () => {
    if (sound) {
        sound.pause();
    }
};