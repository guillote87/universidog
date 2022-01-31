var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cookies = require("cookie-parser")
const session = require("express-session")
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware")
const cors = require("cors")
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DEL

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cursosRouter = require('./routes/cursos')
const usersAPIRoute = require('./routes/api/usersAPIRoute')
const cursosAPIRoute = require('./routes/api/cursosAPIRoute')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "Llave secreta", resave: false, saveUninitialized: false }))
app.use(cookies())
app.use(userLoggedMiddleware)
app.use(cors());

//RUTAS

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cursos',cursosRouter)

app.use('/api/users',usersAPIRoute)
app.use('/api/cursos',cursosAPIRoute)
app.use(cors())


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
