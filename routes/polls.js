/**
 * New node file
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var app = require('../app');
var session = require('client-sessions');



//Loading Existing Polls for the Group
	exports.pollsPageLoad = function(req,res){
			console.log("I will load polls page");
			res.render('polls');
	
	}

		exports.existingPolls = function(req, res){
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			    groupId = "1";
			    
			console.log("Polls page for " + emailId);
			
			var existingPollQue = "select * from roster.pollquestion where pollquestion.groupId = '"+groupId+"'";
			
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

		
//Opening individual Poll Details

		exports.pollsDetailsLoad = function(req,res){
		
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			    groupId = "1";
			
			var poll_Id = req.body.poll_Id;
			
			console.log("The username is: "+emailId+" and the Poll id is: "+poll_Id);
			
			//var pollName = atrName.replace(/-/g, ' ');
			
			console.log("Loading Poll Details page");
			
		
		}
		
		
		exports.pollDetails = function(req, res){
			var emailId = req.session.emailId;
			var groupId = req.session.groupId;
			    groupId = "1";
			
			//var atrName = req.params.name;
			//console.log("The username is: "+emailId+" and the Poll Name is: "+atrName);
			//var pollName = atrName.replace(/-/g, ' ');
			//console.log(pollName);
			var poll_Id = req.body.poll_Id;
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
		
		
		

/*

//create new group

		exports.newgroupsPage = function(req, res){
			//functionality goes here
				
				var username = req.session.username;
				console.log(req.session.username);
				
				var group_name = req.param("group_name");
				if (req.session.username){
				
				// check which groups this user exists into
				//create a new group

				var newGroup =  "INSERT INTO test.group_names (group_name) VALUES ('"+group_name+"');";
				console.log("New Groups Query is :"+ newGroup);
				//var newGroupID = null;
				
				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
						
						//res.redirect('/groups_page');
					}	
				},newGroup);	
				
				var newGroupIDQuery =  "SELECT group_id from test.group_names WHERE group_name='"+group_name+"'";
				console.log(newGroupIDQuery);
				mysql.fetchData(function(err,resultsNew){
					if(err){
						throw err;
					}
					else 
					{
						console.log("In success");
						if(resultsNew.length>0){
							var newGroupID = resultsNew[0].group_id;
							req.session.newGroupID = newGroupID;
							console.log(req.session.newGroupID);
							//res.redirect('/groups_page');
							
							if (req.session.newGroupID){
								console.log(req.session.newGroupID);
								var addGroupMember = "insert into test.group_members (group_id , group_members) VALUES ('"+ req.session.newGroupID +"', '"+ username +"');";
								console.log("Add Member Query is: "+addGroupMember);
								
								
								mysql.fetchData(function(err,results){
									if(err){
										throw err;
									}
									else 
									{
											
										res.redirect('/groups_page');
											
										}
										},addGroupMember);
							
							
					}//end
						} else{
							console.log("Zero rows fetched");
						}
						
					}	
				},newGroupIDQuery);
				
				}
		};


// add member in a group

		exports.addGroupMembers = function(req, res){
			//functionality goes here
				
				var emailid = req.param("group_member");
				var username = req.session.username;
				
				
				
				
				if (req.session.username){
					groupId = req.session.groupId ;
					
					if (req.session.groupId){
					
				var addGroupMember = "insert into test.group_members (group_id , group_members) VALUES ('"+ groupId +"', '"+ emailid +"');";
				console.log("Add Member Query is: "+addGroupMember);
				
				
				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
							
						res.redirect('/groups_page');
							
						}
						},addGroupMember);
				
					
					
					}};
		}	
		

// show members in the group

		exports.showMembers = function(req, res){
			//functionality goes here
			
				var username = req.session.username;
				var atrName = req.params.name;
				console.log("The username is: "+username+" and the groupName is: "+atrName);
				var groupName = atrName.replace(/-/g, ' ');
				console.log(groupName);
				if (req.session.username && groupName!=''){
				var groupMembersQuery = "select * from test.group_names natural join test.group_members inner join test.users on test.users.emailid = test.group_members.group_members where group_name = '"+ groupName +"'"; 
					//"select * from group_names natural join group_members where group_name = '"+ groupName +"'";
				console.log("Existing Groups Query is: "+groupMembersQuery);

				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
						if(results.length > 0){
							console.log("Displaying Existing Groups Members");
							req.session.groupId = results[0].group_id;
							console.log(req.session.groupId);
							ejs.renderFile('./views/existinggmembers.ejs',  { data: results } , function(err, result) {
								
								 if (!err) {
							            res.end(result);
							        }
							        // render or error
							        else {
							            res.end('An error occurred');
							            console.log(err);
							        }
								
							});
							
						}}
						},groupMembersQuery);
				}};
						

// delete members in the group

				exports.deleteGroupMembers = function(req, res){
					//functionality goes here
						
						var emailid = req.param("group_member");
						console.log("Email ID is"+ emailid);
						var username = req.session.username;
						
						if (req.session.username){
							groupId = req.session.groupId ;
							
							if (req.session.groupId){
							
						var deleteGroupMember = "DELETE FROM test.group_members WHERE group_id ='"+ groupId +"' && group_members = '"+ emailid +"'"; 
							//"insert into group_members (group_id , group_members) VALUES ('"+ groupId +"', '"+ emailid +"');";
						console.log("Delete Member Query is: "+deleteGroupMember);

						mysql.fetchData(function(err,results){
							if(err){
								throw err;
							}
							else 
							{
									
								res.redirect('/groups_page');
									
								}
								},deleteGroupMember);
						}};
				}	

// delete the group

				exports.deletegroupsPage = function(req, res){
					//functionality goes here
						
						var username = req.session.username;

						var group_name = req.param("group_name");
						if (req.session.username){
							groupId = req.session.groupId ;
							if (req.session.groupId){
						// check which groups this user exists into
						//create a new group

						var deleteGroup =  "DELETE FROM test.group_names WHERE group_id ='"+ groupId +"' && group_name = '"+ group_name +"'";
							//"INSERT INTO group_names (group_name) VALUES ('"+group_name+"');";
						console.log("Delete Groups Query is :"+ deleteGroup);

						mysql.fetchData(function(err,results){
							if(err){
								throw err;
							}
							else 
							{
								res.redirect('/groups_page');
									
								}	
						},deleteGroup);	
							}};
				}	
		
		
*/