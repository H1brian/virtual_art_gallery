// Display painting infomation in the DOM
export const displayInfo = (info) => {
    const infoElement = document.getElementById('painting_info');
    // set the html content inside info element
    infoElement.innerHTML = 
    <h3>${info.title}</h3>;
    <p>Artist: ${info.artist}</p>;
    <p>Description: ${info.description}</p>;
    <P>Year: ${info.year}</P>;
    infoElement.classList.add('show'); // Add the show class
};

// Hide painting infomation in the DOM
export const hideInfo = () => {
    const infoElement = document.getElementById('painting_info');
    infoElement.classList.remove('show');  // Remove the class
};
