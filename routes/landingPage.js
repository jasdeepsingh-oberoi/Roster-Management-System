var mysql = require("./mysql");
var ejs = require("ejs");

function load(req,res){
	console.log("load Page");
	//res.render('landingPage');
	ejs.renderFile('./views/landingPage.ejs',function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end("An error occured");
			console.log(err);
		}
	});
}



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
		else{
			console.log(result[0].emailId);
			console.log(result[0].password);
			if(emailId == result[0].emailId && password == result[0].password){
				req.session.emailId = emailId;
				req.session.firstName = result[0].firstName;
				res.send(result);
			}
			
		}
	},checkUser);
}
 
      


exports.login = login;
exports.load = load;