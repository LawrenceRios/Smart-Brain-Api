const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
/*const hash = bcrypt.hashSync("bacon");*/
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

//	local Postgres server
/*const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'socceR@56',
		database: 'smart-brain'
	}
});*/

//	Test connection here
// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

//	Heroku based Postgres server
const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

//	Server Endpoints
app.get('/', (req, res) => { res.send('it is working') });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => { console.log('app isrunning on port ${process.env.PORT}') });

/*
/ --> res = this is working
/	signin --> POST = success/fail
/	register --> POST = user
/	profile/:userId --> GTE = user
/	image --> PUT --> user

*/

//	bcrypt password implementation
/*const saltRounds = 10;
const userPassword = "supersecretpassword";
const randomPassword = "fakepassword";

const storeUserPassword = (password, salt) => {
	bcrypt.hash(password, salt).then(storehasInDatabase);
}

const storehasInDatabase = (hash) => {
	//	Store the hash in your password DB
	return hash;// for now we return hash for testing
}

//	Returns true if user password is correct, return false otherwise
const checkUserPassword = (enteredPassword, storedPasswordHash) => {
	bcrypt.compare(enteredPassword, storedPasswordHash);
}

//	This is for demonstration purposes only
storeUserPassword(userPassword, saltRounds)
.then(hash => checkUserPassword(userPassword, hash))
.then(console.log())
.catch(console.error);*/
