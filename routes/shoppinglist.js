
/*
 * GET home page.
 */
var mysql = require("./mysql");
var ejs = require("ejs");



function addshoppingItem(req,res){
	var groupId = 1;	//var groupid1=req.session.groupid;
 
	var ItemName= req.param("ItemName");
	
	var add= "INSERT INTO roster.shopping(groupId, shopping_item) VALUES (" + "'" + taskName+ "'" + "," 
	+ "'" + date + "' "+","+"'"+ time +"'"+","+"'" + groupId + "'"+","+"'" + timeTaken + "');";
    
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			
			res.redirect("/");			   
				
		}
	},add);
	}
function DeleteshoppingItem(req,res){
	var groupid1=req.sessiongroupid;
	var ItemName= req.param("ItemName"); 
	
	
	var Delete= "DELETE from roster.shopping where shopping_item='" + ItemName + "';";
    
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			
			res.redirect("/");			   
				
		}
	},Delete);
	}

function load(req,res){
	console.log("Hi i will load shopping page");
	res.render('shoppinglist');
}

exports.load = load;
exports.load = load;
exports.addshoppingItem=addshoppingItem;
exports.DeleteshoppingItem=DeleteshoppingItem;


