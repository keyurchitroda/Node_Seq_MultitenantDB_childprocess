const createError = require('http-errors');
const express = require('express');
const accountRouter = require('./src/routes/');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// allow-cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
    //move on
    next();
  }
});

app.use('/api/v1', accountRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    status: 'error',
    data: err.message,
    message: 'Something went wrong!!! Please try again later.'
  });
});

app.listen(4005,()=>{
  console.log("4005 Server Running..!");
})

module.exports = app;
