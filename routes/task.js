var mysql = require('./mysql');
var ejs = require('ejs');
var taskId;



function createtask(req,res){
	 var groupId = '1';	//var groupid1=req.session.groupid;
	 
	var taskName="sjsu"; //req.param("taskName");
	var date="24-11-2015";// req.param("date");
	var time="11:45:34:243"; req.param("time");
	//var groupId="1";// req.param("groupId");
	var timeTaken="00:00:00";// req.param("timeTaken");

	var insert1= "INSERT INTO roster.tasks(taskName,date,time,groupId,timeTaken)  VALUES (" + "'" + taskName+ "'" + "," 
	+ "'" + date + "' "+","+"'"+ time +"'"+","+"'" + groupId + "'"+","+"'" + timeTaken + "');"
	
	//var insert1= "INSERT INTO roster.tasks(taskName,date,time,groupId,timeTaken)  VALUES ( 'taskName','date','time','groupId','timeTaken');"
	
	mysql.fetchData(function(err,result){
		if(err){
			throw err;
		}
		else 
		{	console.log(result);
			taskId= result.insertId;
			console.log("task Id is " + taskId);
			//res.redirect("/");			   
				
		}
	},insert1);
	 
	 
}

function addmember(req,res){
	//var  taskId= res.taskId;
	var groupId = '1';
var flag='1'; //req.param("flag");
	var emailId="pawan@gmail.com";// req.param("emailId");
	var precedence="1";// req.param("precedence");
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

	

exports.createtask = createtask;
	exports.addmember= addmember;
//exports.load = load;