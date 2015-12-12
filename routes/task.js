var mysql = require('./mysql');
var ejs = require('ejs');


var NewtaskId;

function createtask(req,res){
	console.log("In create Task");
	var groupId = req.session.groupId;
	groupId = 1;
	var repetition = req.body.repetition; 
	var taskName = req.body.taskName;
	var sliceitDate = req.body.dueDate;
	var dueTime = req.body.dueTime;
	var timeTaken = req.body.timeTaken;
	var dueDate = sliceitDate.slice(0,10);
	console.log(sliceitDate);
	console.log(taskName);
	console.log("new date");
	console.log(dueDate);
	console.log(dueTime);
	console.log(timeTaken);
	

	var insert1= "INSERT INTO roster.tasks(taskName,dueDate,dueTime,groupId,timeTaken,repetition)  VALUES (" + "'" + taskName+ "'" + "," 
	+ "'" + dueDate + "' "+","+"'"+ dueTime +"'"+","+"'" + groupId + "'"+","+"'" + timeTaken + "'" +","+"'" + repetition + "');"
	
	//var insert1= "INSERT INTO roster.tasks(taskName,date,time,groupId,timeTaken)  VALUES ( 'taskName','date','time','groupId','timeTaken');"
	
	mysql.fetchData(function(err,result){
		if(err){
			throw err;
		}
		else 
		{	console.log(result);
			NewtaskId = result.insertId;
			console.log("task Id is " + NewtaskId);
			//res.redirect("/");			   
				
		}
	},insert1);
	 	 
}


function addmember(req,res){
	var  taskId= NewtaskId;
	console.log("addmemeber task Id " + taskId);
	var groupId = req.session.groupId;
	groupId = 1;
	var flag=0;
	var emailId = req.body.emailId;
	var precedence = req.body.precedence;
	if(precedence == 1){
		flag = 1;
	}
	else{
		flag = 0;
	}
	var repetition= "2";//req.param("repetition");

var insert2= "INSERT INTO roster.tasksassignment( flag,groupId,emailId,precedence,repetition,taskId) VALUES (" + "'" + flag+ "'" + "," 
+ "'" + groupId + "'"+","+"'"+ emailId +"'"+","+"'" + precedence+ "'"+","+"'" + repetition + "'"+","+"'" + taskId + "');"

mysql.fetchData(function(err,result){
	if(err){
		throw err;
	}
	else 
	{
		console.log(result);
		//res.redirect("/");			   
			
	}
},insert2);
}



function fetchTask(req,res){
	console.log("fetch Overdue task function");
	var emailId = req.session.emailId;
	var groupId = req.session.groupId;
	groupId = 1;
	var dueTasks = "select tasks.taskId, taskName, dueDate, dueTime, timeTaken from tasks join tasksassignment on tasks.taskId = tasksassignment.taskId where tasksassignment.emailId ="
		 + "'" +emailId + "'" + "and tasksassignment.groupId =" + "'" + groupId + "'" + "and tasksassignment.flag = '1' and tasks.dueDate between DATE_sub(curdate(), interval 30 day) and curdate();";
	
	mysql.fetchData(function(err, result){
		if(err){
			console.log("an error occured");
			console.log(err);
		}
		else{
			
			console.log(result);
			res.send(result);
		}
	},dueTasks);
}


function fetchUpcomingTask(req,res){
	console.log("fetch Upcoming task function");
	var emailId = req.session.emailId;
	var groupId = req.session.groupId;
	groupId = 1;
	var upcomingTasks = "select tasks.taskId, taskName, dueDate, dueTime, timeTaken from tasks join tasksassignment on tasks.taskId = tasksassignment.taskId where tasksassignment.emailId ="
		 + "'" +emailId + "'" + "and tasksassignment.groupId =" + "'" + groupId + "'" + "and tasksassignment.flag = '1' and tasks.dueDate between curdate() and DATE_add(curdate(), interval 7 day);";
	
	mysql.fetchData(function(err, result){
		if(err){
			console.log("an error occured");
			console.log(err);
		}
		else{
			
			console.log(result);
			res.send(result);
		}
	},upcomingTasks);
}


function fetchTodayTask(req,res){
	console.log("fetch Today's task function");
	var emailId = req.session.emailId;
	var groupId = req.session.groupId;
	groupId = 1;
	var todaysTasks = "select tasks.taskId, taskName, dueDate, dueTime, timeTaken from tasks join tasksassignment on tasks.taskId = tasksassignment.taskId where tasksassignment.emailId ="
		 + "'" +emailId + "'" + "and tasksassignment.groupId =" + "'" + groupId + "'" + "and tasksassignment.flag = '1' and tasks.dueDate = curdate();";
	
	mysql.fetchData(function(err, result){
		if(err){
			console.log("an error occured");
			console.log(err);
		}
		else{
			
			console.log(result);
			res.send(result);
		}
	},todaysTasks);
}


function signOffTask(req,res){
	//var taskId = 1433; //var taskId = 
	var taskId = req.body.taskId;
	var emailId = req.session.emailId;
	var groupId = req.session.groupId;
	groupId = 1;
	var repetition;
	var precedence;
	var dueDate;
	var timeTaken;
	var maximumPrecedence;
	
	var fetchTaskDetail = "Select tasks.repetition, tasksassignment.precedence, tasks.dueDate, tasks.timeTaken from tasksassignment join tasks on tasksassignment.taskId = tasks.taskId where tasksassignment.taskId ='"
			+ taskId + "' and tasksassignment.emailId = '" + emailId + "' and tasksassignment.groupId = '" + groupId +"' and tasks.groupId = '" + groupId + "';";
	mysql.fetchData(function(err, result){ // First Query begins
		if(err){
			console.log("an error occured");
			console.log(err);
		}
		else{
			console.log("First Query Executed");
			console.log(result);
			repetition = result[0].repetition;
			precedence = result[0].precedence;
			dueDate = result[0].dueDate; 
			timeTaken = result[0].timeTaken;
			console.log(repetition + " " + precedence + " " + dueDate + " " + timeTaken);
			//res.send(result);
			
			/////  Maxpecedence Query begins
			var maxprecedence = "select max(precedence) as maximum from tasksassignment where taskId = '"+ taskId +"' and groupId = '"+ groupId +"';";
			mysql.fetchData(function(err, result){
				if(err){
					console.log("an error occured");
					console.log(err);
				}
				else{
					console.log(result);
					maximumPrecedence = result[0].maximum;
					console.log("Maximum precedence is "+ maximumPrecedence);
					
					/////////Fourth Query starts here
					var next;
					next = ((precedence) % maximumPrecedence) + 1 ;
					
					var setflagfornextmember = "update tasksassignment set flag = '1' where taskId = '"+ taskId +"' and groupId = '"+ groupId +"' and precedence = '"+ next +"';";
					mysql.fetchData(function(errfour, resultfour){
						if(errfour){
							console.log("an error occured");
							console.log(errfour);
							
						}
						else{
							
							console.log(resultfour);
							
						}
					},setflagfornextmember);  	//////// fourth query ends here
					
				}
			},maxprecedence);
			
			/////// Second Query starts here
			 var setflagzero = "update tasksassignment set flag = '0' where taskId = '" + taskId + "' and emailId = '" + emailId + "' and groupId = '" + groupId +"';";
				mysql.fetchData(function(errtwo, resulttwo){
					if(errtwo){
						console.log("an error occured");
						console.log(errtwo);
					}
					else{
						
						console.log(resulttwo);
					}
				},setflagzero);// Second query ends
				
			//////// Third query starts here
				var updatetaskduedate = "update tasks set dueDate = date_add(curdate(), interval "+ repetition +" day) where taskId = '"+ taskId +"' and groupId = '"+ groupId +"';"
				mysql.fetchData(function(errthree, resultthree){
					if(errthree){
						console.log("an error occured");
						console.log(errthree);
					}
					else{
						
						console.log(resultthree);
					}
				},updatetaskduedate);  //////// Third query ends here
				
				
				
				/////////// Fifth Query Starts here
				var updatetaskstats = "insert into taskstats(emailId,groupId,timeTaken,taskId,completedDate) VALUES ('"
					+ emailId +"','"+ groupId +"','"+ timeTaken +"','"+ taskId +"',CURDate());"
					mysql.fetchData(function(errfifth, resultfifth){
						if(errfifth){
							console.log("an error occured");
							console.log(errfifth);
						}
						else{
							console.log(resultfifth);
						}
					},updatetaskstats);  //////////// Fifth query starts here  
				
		}
		res.send(result);
	},fetchTaskDetail);		// First query ends 
	
	
} 



function loadForm(req,res){
	res.render('createTaskForm');
}

exports.loadForm = loadForm;
exports.signOffTask = signOffTask;
exports.fetchTodayTask = fetchTodayTask;
exports. fetchUpcomingTask = fetchUpcomingTask;
exports.createtask = createtask;
exports.addmember= addmember;
exports.fetchTask = fetchTask;

