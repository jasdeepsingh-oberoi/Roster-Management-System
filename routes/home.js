var mysql = require('./mysql');
var ejs = require('ejs');

function load(req,res){
	res.render('userHome');
}


function fetchName(req,res){
	var emailId = req.session.emailId;
	var namequery = "select * from userinfo where emailId =" + "'" + emailId + "';";
	mysql.fetchData(function(err,result){
		if(err){
			console.log("error occured");
		}
		else{
			console.log("sending result back to controller");
			console.log(result);
			res.send(result);
		}
	},namequery);
}



//Logout the user - invalidate the session
exports.logout = function(req,res)
{
req.session.destroy();
res.redirect('/');
};	      


exports.fetchName = fetchName;
exports.load = load;