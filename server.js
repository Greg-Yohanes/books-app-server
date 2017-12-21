'use strict'

//these first three lines of code are to impliment our "dependencies" from package.json "express, cors", and "pg".
const express = require('express');
const cors = require('cors');
const pg = require('pg');

//APP Setup
const app = express();
const PORT = process.env.PORT;
//this next line of coded added from scots lecture example
const DATABASE_URL = process.env.DATABASE_URL;
const CLIENT_URL = process.env.CLIENT_URL;

//DATABASE setup.
const client = new pg.Client(DATABASE_URL) //This is scotts code vs ours below
// const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());
//line above is a "middleware" that approves access. "cors" makes it completely open api. "white listed" is the term used, oppositie from "blacklisted"

//app.get('/avi/vi1/books'...) #Time Stamp 2:30pm-2:43pm pt.1
// app.get('/', (req, res) => res.send('Testing 1, 2, 3'));

app.get('/api/v1/books', (req, res) => {
  client.query(`SELECT book_id, title, author, image_url, isbn FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('/api/v1/books/:id', (req, res) => {
  client.query(`SELECT * FROM books WHERE book_id=$1;`, [req.params.id])
    .then(result => res.send(result.rows))
    .catch(console.error);
});

// app.get('/api/v1/books/:id', (req, res) => {
//   client.query(`SELECT * FROM books WHERE id = $1`, [req.params.id]);
  
// });

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

//TEST IN SERVER WITHOUT FRONT END
//api.jquery.com
//$.get(http://localhost:3000/avi/vi1/books')
//.then(console.log)
//TIMESTAMP 3:15 for 
//terminal: curl "http url thing like above paste here no postophies" and will run your back end work

//
