/**
 * app.js
 * DO NOT ALTER THIS CODE
 */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define the port to listen on

// Middleware for parsing request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (e.g., stylesheets)
app.use(express.static(__dirname + '/public'));

// Import and use the books router
const deviceRouter = require('./routes/devices');
app.use('/', deviceRouter);

// Start the server
app.listen(port, () => {
  console.log(`App started and running on port ${port}`);
});

