import { keysPressed } from './movement';
import { startAudio, stopAudio } from './audio';

export const eventHandling = (controls) => {
// Lock the pointer (controls are activated)
// And hide the menu when the experience starts
function startExperience(){
	// Lock the pointer
	controls.lock();
	hideMenu();
};
const startButton = document.getElementById("start_button");
startButton.addEventListener("click", startExperience);

// Hide the menu
function hideMenu(){
	const menu = document.getElementById('menu');
	menu.style.display = "none";
};

// Show the menu
function showMenu(){
	const menu = document.getElementById('menu');
	menu.style.display = "block";
};

// Press "ESC" to exit and show the menu
controls.addEventListener('unlock', showMenu);

// Add event listeners for the audio guide buttons
document.getElementById("start_audio").addEventListener("click", startAudio);
document.getElementById("stop_audio").addEventListener("click", stopAudio);

// Event listener for when keys were pressed
document.addEventListener('keydown', (event) => {  // Keydown is an event that fires when a key is pressed
	if (event.key in keysPressed) { // Check if the key pressed is in the keysPressed
		keysPressed[event.key] = true; // if it is, set the value to true
	}
}, false
);

// Event listener for when keys were pressed
document.addEventListener('keyup', (event) => {  // Keyup is an event that fires when a key is released
	if (event.key in keysPressed) { // Check if the key released is in the keysPressed
		keysPressed[event.key] = false; // if it is, set the value to false
	}
}, false
);
}