const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.port || 8000;
const db=require('./config/mongoose');
const router = require('./routes/index');

app.use(express.static('./assets'));
app.use(express.urlencoded({extended:true}));

//setting the routes
app.use('/',router);

// setting view
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('error in server starting',err);
    }
    console.log('server is running on the port: ',port);
})