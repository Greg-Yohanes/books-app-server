'use strict'

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = experess();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/', (req, res) => res.send('Testing 1, 2, 3'));

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

//run EACH code one at a time into ternminal within directory that has server.js
//export PORT=3000
//export CLIENT_URL=http://localhost:8080
//Mac:     export DATABASE_URL=postgres://localhost:5432/books_app
//Windows: export DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/books_app

//then run: heroku create gn-yd-booklist
//Time stamp 5:30 book.js file api code in video

//ACP Heroku style: git push heroku branch_name

//Automatically sync git ACP's: Hit deploy tab, connect github, select organization from drop down menu, search repo name and connect!



