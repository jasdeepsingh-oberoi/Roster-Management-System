
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,landingPage = require('./routes/landingPage')
  ,home = require('./routes/home')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

//Session code 
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({   
	cookieName: 'session',    
	secret: 'This is my secret string for encryption',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));

// session code ends here


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', landingPage.load);
app.post('/login', landingPage.login);
app.get('/home', home.load);
app.get('/fetchTasks', task.fetchTask);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
