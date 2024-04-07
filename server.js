const express = require('express') ;
const mongoose = require('mongoose') ;
const dotenv = require('dotenv')
const app = require('./app') ;


dotenv.config({path :'./config.env'})
process.noDeprication = true ;
process.traceDeprecation = true ;

const query_string = process.env.DATABASE_LOCAL ; 


mongoose.connect(query_string , {
    useNewUrlParser: true ,
    useCreateIndex: true ,
    useFindAndModify: false,
    useUnifiedTopology : true,
    

}).then(con => {
    console.log("connection success");
})

app.listen(3000, _ => {
    console.log('server is running') ;
});