const express = require('express');
const config = require('./server/config')
const routes = require('./server/routes')

// Config app
var app = config(express());
// Routes
app = routes(app);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
})