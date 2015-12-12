var mysql = require('./mysql');
var ejs = require('ejs');


exports.callgroups = function(req,res)
{
res.render('groups');	

}

var newGroupId;
exports.creategroup=function(req,res)
{
	//var groupName=req.param('groupName');
	var groupName=req.body.groupName;
	var query= " INSERT INTO `roster`.`group` (`groupName`) VALUES ('"+groupName+"'); " ;
    
	
	mysql.fetchData(function(err,result){
		if(err){
			console.log("error occured");
		}
		else{
			console.log("sending result back to controller");
			console.log(result);
			newGroupId = result.insertId;
			req.session.groupId = newGroupId;
			console.log(newGroupId);
			res.redirect('/groups');
		}
	},query);

}

exports.addMemberToGroup = function(req,res)
{
//var emailId=req.param('emailId');
	
var emailid = req.body.emailid;
var groupId = 1;//req.session.groupId;
console.log("Group ID in groups page is " + req.session.groupId );
groupId = 1;
var insertMember="INSERT INTO `roster`.`groupmembers` (`groupId`, `emailId`) VALUES ('" + groupId + "', '" + emailid + "');";
 	mysql.fetchData(function(err,result){
 		if(err){
 			console.log("error");
 		}
 		else{
 			console.log(result);
 		}
 	},insertMember)
}