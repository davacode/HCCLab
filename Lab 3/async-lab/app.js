// JavaScript source code
function showMessage(message, callback) {
    console.log(message);
    callback();
}

showMessage("Help me, Obi-Wan Kenobi. You're my only hope.", function () {
    console.log("Callback Done!");
});


//Delay Function with new Promise
function delay(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
//function to be called on success
function onSuccess() {
        handleDelayedAction();
}
//this happens if something goes wrong
function onError() {
    console.error("An error occurred:", error);
}


function handleDelayedAction() {
    console.log("Delayed Action Complete!");
}


//Calling the Delay function
delay(2000)
    .then(onSuccess)
    .catch(onError);