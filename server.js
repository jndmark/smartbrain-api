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
  	connectionString : process.env.DATABASE_URL,
  	ssl: true,
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('it is working!') })

app.post('/signin', (req, res) => { signin.handleSignin(db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) // *THIS WAS	THE FUNCTION THAT FIRST GOT MINIMIZED*

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})


/*
/ --> res = this is working
/signin --> POST request (user information in JSON). Responds with success/fail
/register --> POST request (add the data to the variable in our server with our new user info) = user (this is the new user object that we will return)
/profile/:userId --> GET request (get the user info) = user (each user will have their own of these)
/image --> PUT request (because the user already exists, and we want to make sure there's an update on the user profile) = user

*/
