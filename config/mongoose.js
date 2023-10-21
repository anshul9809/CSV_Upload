// MONGODB CONNECTION THROUGH MONGOOSE MODULE
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongo:mongo@anshulcluster.k7iipbc.mongodb.net/');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB ......"));

db.once('open',function(){
    console.log('Connected to Database :: Mongodb')
});

module.exports = db;