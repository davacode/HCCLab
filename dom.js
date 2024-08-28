// Event listener for the button click
document.getElementById('my-button').addEventListener('click', function () {
    // Change the background color of the paragraph to a random color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector('p').style.backgroundColor = randomColor;

    // Change the text of the link
    document.getElementById('my-link').textContent = 'Visit Example';
});