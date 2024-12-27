const express = require('express'); 
const bodyParser = require('body-parser');
const app = express(); 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const userEmail = req.body.email;
    res.render('dashboard', { user: userEmail });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
