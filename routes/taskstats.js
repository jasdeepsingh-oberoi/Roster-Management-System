
var mysql = require("./mysql");
var ejs = require("ejs");


function taskstatLoad(req,res){
	res.render('taskstats');
}

function taskStats1(req,res){
	
	var taskId ='8';// req.param("taskId");
	
	var stats1= "SELECT SUM(timeTaken) FROM roster.taskstats where taskId='"+ taskId +"' and  completedDate between DATE_sub(curdate(), interval 30 day) and curdate();";
    
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.send(results);			   
				
		}
	},stats1);
	}

function taskStats2 (req,res){
	
	 
	//var emailId = "anuj@gmail.com";//req.emailId");
	
	
	var stats2= "SELECT SUM(timeTaken) as totalWork, emailId FROM roster.taskstats where completedDate between DATE_sub(curdate(), interval 30 day) and curdate() group by(emailId);";
    
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			
			console.log(results);
			res.send(results);
				
		}
	},stats2);
	}


exports.taskstatLoad = taskstatLoad;
exports.taskStats1= taskStats1;
exports.taskStats2= taskStats2;