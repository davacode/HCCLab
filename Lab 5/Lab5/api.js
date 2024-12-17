/*
ITSE 2402  - Lab 5
Web Api and Fetch API
Description: This is the api.js file where you will develop your API calls.
*/
const apiKey = 'a1d3818b8fe4ac136019b60d90658dfb';// do not modify this line.
const countryCode = 'us'; // do not modify this line.
const zipCode = 77012; //use the zip of the city where you live.

/**TASK 1 
TODO: Create a const variable for every HTML file so you can manipulate it from JavaScript.
For your convenience, use the method document.getElementById('id-name'). More info at https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
Variables should be weatherElement, getWeatherElement, icon and temperatureElement
Example of this: const temperatureElement = document.getElementById('temperature');
*/

const temperature = document.getElementById('temperature')
const weather = document.getElementById('weather')
const icon = document.getElementById('icon')
const getWeatherElement = document.getElementById('get-weather')

/**TASK 2
TODO: the given function getWeather() will be called when the button "get-weather" is clicked.
In this function, you will use the fetch() method to fetch the data from the API OpenWeather.
This is an example of the URL:

https://api.openweathermap.org/data/2.5/weather?zip=77012,us&appid=a1d3818b8fe4ac136019b60d90658dfb
In that URL, you need to put the zipCode, countryCode and apiKey as variables. You can use string literals for it: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
Consult the OpenWeather documentation on how to create this API call: https://openweathermap.org/current#zip
NOTE: THE BUILDING OF THE API IS CRUCIAL FOR THIS PROJECT
*/
function getWeather(){

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=imperial`)
    .then(response => {

        return response.json();
    })
    .then(data => {
        /**
         * In this then(), you are going to use the API doumentation to know
         * how to pull the required information that you will render in your html: description, temperature and icon.
         * -Create a variable called description: in the JSON response, the description is reached by accessing data.weather[0].description. Assign it to the variable.
         * -Create a variable called temperature: in the JSON response, the temperature is reached by accessing data.main.temp. Assign it to the variable.
         * -Create a variable called icon_code: in the JSON response, the icon code is reached by accessing data.weather[0].icon. Assign it to the variable.
         * -Use the DOM property textContent so you can add the weather description and temperature that comes from the API response into your HTML paragraphs: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
         * -Use the DOM function setAttribute so you can set the icon inside of the HTML image this icon will be linked to: https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
         * The url for the icon is defined as: https://openweathermap.org/img/wn/${icon_code}.png`, More info about the icons here: https://openweathermap.org/weather-conditions#Icon-list
         */

        const currentTemp = data.main.temp;
        const description = data.weather[0].description;
        const icon_code = data.weather[0].icon;


        weather.textContent = description;
        temperature.textContent = currentTemp;
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${icon_code}.png`)
       })
       .catch(error =>{
        alert(`Error: ${error}`); // DO NOT modify this line
       });
}

// add event listener to button - Modify only to the name you chose for the const variable for the html button
getWeatherElement.addEventListener('click',getWeather); 

