// JavaScript source code
//counting function
function count() {
    for (let i = 1; i <= 5; i++) {
        console.log(i);
    }
}
// gives the function to the button when it's clicked
document.getElementById('startCountingBtn').addEventListener('click', count);
