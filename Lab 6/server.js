const http = require('http'); //for http requests

const server = http.createServer((request,response)=>{
    if(request.method==='POST')
    {
       // this comes from the console
        let data = '';
        request.on('data',(chunk)=>{
            data+=chunk;
            response.writeHead(200,{
                'Content-Type' : 'text/plain'
            });

            response.end(`Color received successfully`);
            if (data == 'red') {
                console.log(`\x1b[41m`, "This is the message in red");
                console.log("\x1b[0m");
            }
            else if (data == 'blue') {
                console.log(`\x1b[34m`, "This is the message in blue");
                console.log("\x1b[0m");
            }
            else if (data == 'green') {
                console.log(`\x1b[32m`, "This is the message in green");
                console.log("\x1b[0m");
            }
            else if (data == 'yellow') {
                console.log(`\x1b[33m`, "This is the message in yellow");
                console.log("\x1b[0m");
            }
            else {
                console.log("The color you typed is not allowed. Please try again");
            }
        });
    }
   

});

const port = 3000;
server.listen(port,()=>{
    console.log(`Server has started and is listening through port ${port} `)
});
