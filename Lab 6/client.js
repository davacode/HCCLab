const http = require('http'); //for http requests
const prompt = require('prompt-sync')(); //for receiving text input in commandline from client side
const hostname = 'localhost';
const port = 3000;
const request = http.request(
    {
        hostname: hostname,
        port: port,
        path: '/submit', // Path for submitting the person's name
        method: 'POST', // Using POST method to send data
        headers: {
          'Content-Type': 'text/plain',
        },
    },
      (res) => {
        let data = '';

        res.on('data',(chunk)=>{
            data += chunk;
        });
        res.on('end', () => {
     
            console.log(`Server response: ${data}`)
          
        });
      }
);

request.on('error', (error)=>{
    console.log(`There was a reques error ${error}`);
});

console.log("Client has started!!\n=====================");

const color = prompt(`Please type one of these colors [red, blue, green, yellow]: `);

request.write(color);

request.end();