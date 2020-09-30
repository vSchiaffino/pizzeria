const express = require('express');
const path = require('path')
const fs = require('fs');

module.exports = (app) => {
    // Global variables
    process.env.PORT = process.env.PORT || 3000;
    process.env.SUDO_KEY = fs.readFileSync(path.dirname(__filename) + '/key.txt');
    // console.log(process.env.SUDO_KEY)
    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded());
    
    return app;
}