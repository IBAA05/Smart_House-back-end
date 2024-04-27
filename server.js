const express = require('express') ;
const mongoose = require('mongoose') ;
const dotenv = require('dotenv')
const app = require('./app') ;
const ws = require('./socket');

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

// we upgrade the server to web socket connection . 


app.on('upgrade', function upgrade(request, socket, head) {
    // const { pathname } = new URL(request.url, 'wss://base.url');
  
   
        ws.handleUpgrade(request, socket, head, function done(ws) {
            ws.emit('connection', ws, request);
        });
    
    
})
const server = app.listen(3000, _ => { 
    console.log('server is running') ;
});

