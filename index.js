const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello, World!</h1>');
});

app.listen(3000);