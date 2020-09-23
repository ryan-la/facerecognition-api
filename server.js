//A server is a computer designed to process requests and deliver data to another computer over the internet or a local network
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors') //middleware needed 
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//connect database to server
const db = knex({
    client: 'pg',
    connection: {
        //local host
        host: '127.0.0.1',
        user: 'ryanla',
        password: '',
        database: 'facerecognition'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

app.use(bodyParser.json())
app.use(cors());

//dont have database yet
// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             password: 'cookies',
//             email: 'john@gmail.com',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             password: 'bananas',
//             email: 'sally@gmail.com',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id: '987',
//             hash: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }

app.get('/', (req, res) => {
    res.send(database.users)
});

app.get('/profile', (req, res) => {
    res.send("Apps is working")
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db, bcrypt) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })



app.listen(3000, () => {
    console.log("App is running on port 3000")
})