const express = require('express');
const userRouter = require('./routes/userRouter');
const deviceRouter = require('./routes/deviceRouter');
const app = express();

app.use(express.json());

// Define Router .
app.use('/users', userRouter);
app.use('/', deviceRouter);

module.exports = app; 