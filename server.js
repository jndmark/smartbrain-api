const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({ // Running the knex function on line 5; this just looks cleaner
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'jndm',
    password : '',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) // *THIS WAS	THE FUNCTION THAT FIRST GOT MINIMIZED*

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(3001, () => {
	console.log('app is running on port 3001');
})


/*
/ --> res = this is working
/signin --> POST request (user information in JSON). Responds with success/fail
/register --> POST request (add the data to the variable in our server with our new user info) = user (this is the new user object that we will return)
/profile/:userId --> GET request (get the user info) = user (each user will have their own of these)
/image --> PUT request (because the user already exists, and we want to make sure there's an update on the user profile) = user

*/
