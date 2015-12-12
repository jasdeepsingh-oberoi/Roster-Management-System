var mysql = require("./mysql");
var ejs = require("ejs");
var groupId;
function load(req,res){
	console.log("load Page");
	res.render('index');
	
	/*
	ejs.renderFile('./views/landingPage.ejs',function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end("An error occured");
			console.log(err);
		}
	});
*/
}

function loginSignupLoad(req,res){

	ejs.renderFile('./views/landingPage.ejs',function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end("An error occured");
			console.log(err);
		}
	});
	

};


function signup(req,res){
	
	var signup1 = "insert into roster.userinfo (emailId,password,firstName,lastName) VALUES ('"+req.body.emailid+"', '"+req.body.password+"', '"+req.body.firstName+"' , '"+req.body.lastName+"')";
	     
			
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			
			res.redirect("/");			   
				
		}
	},signup1);
	}

exports.signup=signup;



function login(req,res){
	
	var emailId = req.body.emailId;
	var password = req.body.password;
	console.log("email id and password " + emailId + " " + password);
	var checkUser = "select * from userinfo where emailId =" + "'"  + emailId  + "'" 
	+ "and password =" + "'" + password + "'" +";";
	mysql.fetchData(function(err, result){
		if(err){
			console.log(err);
		}
		else if(result.length > 0){
			console.log(result[0].emailId);
			console.log(result[0].password);
			console.log(result);
			if(emailId == result[0].emailId && password == result[0].password){
				req.session.emailId = emailId;
				req.session.firstName = result[0].firstName;
				
				res.send(result);
			}
			
		}
		else{
			console.log("This is not a valid password");
			result = "fail";
			res.send(result);
		}
	/*	
		/////// Fetching groupId for sessions
		var fetchGroupId = "select groupId from groupmembers where emailId = '"+ emailId +"';"
		mysql.fetchData(function(errnew,resultnew){
			if(errnew){
				throw errnew;
			}
			else 
			{	console.log(resultnew);
				
			groupId = resultnew[0].groupId;
			req.session.groupId = groupId;
				
				console.log("group id in session is " + req.session.groupId);
			}
		},fetchGroupId);
		/// Fetch group Id ends 
		*/
		console.log("Variable Session Group ID is " + req.session.groupId );
		

		
	},checkUser);

}





exports.loginSignupLoad = loginSignupLoad;
exports.login = login;
exports.load = load;