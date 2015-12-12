/**
 * New node file
 */


var ejs = require("ejs");
var mysql = require('./mysql');
var app = require('../app');
var session = require('client-sessions');
var poll_Id;


//Loading Existing Polls for the Group
	exports.pollsPageLoad = function(req,res){
			console.log("I will load polls page");
			res.render('polls_original');
	
	}

		exports.existingPolls = function(req, res){
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			groupId = 1;
			    
			console.log("Polls page for " + emailId);
			
			var existingPollQue = "select * from roster.pollquestion where pollquestion.groupId = '"+groupId+"' ";
			
			mysql.fetchData(function(err,result){
				if(err){
					console.log("error occured");
				}
				else{
					console.log("sending result back to polls controller");
					console.log(result);
					res.send(result);
				
				}
			},existingPollQue);
		}

// Creating New Poll Question		
		
		exports.createPoll = function(req, res){
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			var groupId = 1;
			var question = req.body.question;
			    
			    
			console.log("Create poll for " + emailId + "under group " + groupId );
			
			var createPollQuestion = " INSERT INTO roster.pollquestion (`groupId`, `question`) VALUES ('"+groupId+"', '"+question+"'); " 
				
				//"select * from roster.pollresponse natural join roster.userinfo natural join roster.pollquestion where pollresponse.groupId = '"+groupId+"' and poll_Id = '"+poll_Id+"' "  
				
			
			mysql.fetchData(function(err,result){
				if(err){
					console.log("error occured");
				}
				else{
					console.log("sending result back to polls controller");
					console.log(result);
					res.redirect('/pollsPageLoad');
					
				}
			},createPollQuestion);
		}	
		
		
		
		
//Opening individual Poll Details

		exports.pollsDetailsLoad = function(req,res){
		
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			var groupId = 1;
			
			 poll_Id = req.body.poll_Id;
			
			console.log("The username is: "+emailId+" and the Poll id is: "+poll_Id);
			
			//var pollName = atrName.replace(/-/g, ' ');
			
			console.log("Loading Poll Details page");
			
		
		}
	
		
		// Load Poll Details
		exports.pollDetails = function(req, res){
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			var groupId = 1;
			
			poll_Id = req.body.poll_Id;
			var id = req.body.id;
			console.log(id)
			console.log( "and the Poll id is: "+poll_Id);    
			    
			    
			console.log("Polls page for " + emailId);
			
			var existingPollDetails = "select * from roster.pollresponse natural join roster.userinfo natural join roster.pollquestion where pollresponse.groupId = '"+groupId+"' and poll_Id = '"+poll_Id+"' "  
				
			
			mysql.fetchData(function(err,result){
				if(err){
					console.log("error occured");
				}
				else{
					console.log("sending result back to polls controller");
					console.log(result);
					
					res.send(result);
				}
			},existingPollDetails);
		}	
		
		
//Get Poll's Distinct Choices		
		exports.pollAnswers = function(req, res){
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			var groupId = 1;
			
			poll_Id = req.body.poll_Id;
			var id = req.body.id;
			console.log(id)
			console.log( "and the Poll id is: "+poll_Id);    
			    
			    
			console.log("Polls page for " + emailId);
			
			var pollDistinctAnswers = " select distinct(response) from roster.pollresponse where poll_Id='"+poll_Id+"' ORDER BY response "; 
			
			mysql.fetchData(function(err,result){
				if(err){
					console.log("error occured");
				}
				else{
					console.log("sending unique poll options back to polls controller");
					console.log(result);
					
					res.send(result);
				}
			},pollDistinctAnswers);
		}			
		
		
//Get Poll's Distinct Choices		
		exports.pollAnswerSelect = function(req, res){
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			var groupId = 1;
			
			var id = req.body.id;
			var response = req.body.response;
			console.log(id)
			console.log( "and the Poll id is: "+poll_Id + " and response " + response);    
			    
			    
			console.log("Polls page for " + emailId);
			
			var pollSelectedAnswer = " INSERT INTO `roster`.`pollresponse` (`poll_Id`, `groupId`, `response`, `emailId`) VALUES ('"+poll_Id+"', '"+groupId+"', '"+response+"', '"+emailId+"'); ";
				
				 
			
			mysql.fetchData(function(err,result){
				if(err){
					console.log("error occured");
				}
				else{
					console.log("sending poll opinion to db and returning back to polls controller");
					console.log(result);
					
					res.send(result);
				}
			},pollSelectedAnswer);
		}			
		
		
		
