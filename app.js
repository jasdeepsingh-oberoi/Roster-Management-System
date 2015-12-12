
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,landingPage = require('./routes/landingPage')
  ,home = require('./routes/home')
  ,polls = require('./routes/polls')
  , user = require('./routes/user')
  , groups = require('./routes/groups')
  ,shoppinglist = require('./routes/shoppinglist')
  , taskstats = require('./routes/taskstats')
  , http = require('http')
  , path = require('path')
  ,task =require('./routes/task');

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
app.get('/login_signup', landingPage.loginSignupLoad);



app.post('/signup', landingPage.signup);
app.post('/login', landingPage.login);

app.get('/home', home.load);
//app.get('/fetchTasks', task.fetchTask);
app.get('/fetchName', home.fetchName);

//Loading Existing Polls for the Group
app.get('/polls', polls.existingPolls);
app.get('/pollsPageLoad', polls.pollsPageLoad);

app.get('/groupsPageLoad',groups.callgroups);
//Opening individual Polls
app.post('/pollDetails', polls.pollDetails);

app.get('/groups',groups.callgroups);
app.post('/groups/create',groups.creategroup);
app.post('/groups/addmember',groups.addMemberToGroup);


// Create new poll question
app.post('/polls/create', polls.createPoll);

//Opening individual Polls
app.post('/pollDetails', polls.pollDetails);

//Poll Unique Answers
app.post('/pollAnswers', polls.pollAnswers);

//Sending Poll Opinion to DB
app.post('/pollAnswerSelect', polls.pollAnswerSelect);

//All Task Routes
app.post('/createtask', task.createtask);
app.post('/addmember', task.addmember);
app.get('/fetchTasks', task.fetchTask); //fetches tasks overdue for last one month.
app.get('/fetchUpcomingTask', task.fetchUpcomingTask);
app.get('/fetchTodayTask', task.fetchTodayTask);
app.post('/signofftask', task.signOffTask);
app.get('/fetchName', home.fetchName);
app.get('/loadTasksPage',home.loadTasksPage);
app.get('/createTaskForm',task.loadForm);

// All Task Stats
app.get('/taskStats1',taskstats.taskStats1);
app.get('/taskStats2',taskstats.taskStats2);
app.get('/taskstatLoad',taskstats.taskstatLoad);


//All Shopping Routes
app.get('/loadshoppingPage', shoppinglist.load);

//Add Shopping Item
app.post('/shoppinglist', shoppinglist.addshoppingItem);

//Sign Off Shopping Item
app.post('/shoppinglist/complete', shoppinglist.removingshoppingItem);

app.get('/fetchshopitems',shoppinglist.fetchShopItem);




//Logout
app.get('/logout',home.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
