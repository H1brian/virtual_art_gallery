// Group 6, Liang Geng and Qixuan Li
// Contributor: Liang Geng

//Painting information
export const paintingInfo = (paintings, camera) => {
    const distanceThreHold = 8;  // Set a distance threshold
	let paintingToShow;
	paintings.forEach((painting) => {
	let distanceToPainting = camera.position.distanceTo(painting.position);
	if (distanceToPainting < distanceThreHold) {
		paintingToShow = painting;  // Set paintingToShow to this painting
	}
	});

	if (paintingToShow) {
		displayInfo(paintingToShow.userData.info); //display the painting info
	} else {
		hideInfo();
	};
};

// Display painting infomation in the DOM
const displayInfo = (info) => {
    const infoElement = document.getElementById('painting_info');
    // set the html content inside info element
    infoElement.innerHTML = 
    `<h3>${info.title}</h3>
    <p>Author: ${info.author}</p>
    <p>Description: ${info.description}</p>`
    infoElement.classList.add('show'); // Add the show class
};

// Hide painting infomation in the DOM
const hideInfo = () => {
    const infoElement = document.getElementById('painting_info');
    infoElement.classList.remove('show');  // Remove the class
};
