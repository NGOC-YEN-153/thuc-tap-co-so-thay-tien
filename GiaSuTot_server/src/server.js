'use strict';
const express = require('express');
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
var admin = require("firebase-admin");
var serviceAccount = require("../src/config/serviceAcc.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://image-f5a2a.appspot.com'
    // 
});
const initialDatabase = require('./config/database/initialDatabase');
const AdminMiddleware = require("./middleware/AdminMiddleWare");
const UserMiddleware = require("./middleware/UserMiddleware");
const GuestMiddleware = require('./middleware/GuestMiddleware');

initialDatabase();
// config req.body 

app.use(express.json());// json
app.use(express.urlencoded({ extended: true }));//html form 
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// config middleware cors 
app.use('/guest', GuestMiddleware);
app.use('/admin', AdminMiddleware);
app.use('/user', UserMiddleware);
app.use((req, res) => {
    res.status(404).send('Sai url');
})
app.listen(port, hostname, (req, res) => {
    console.log(`Server is running on port ${port + ' ' + hostname}`);
});

