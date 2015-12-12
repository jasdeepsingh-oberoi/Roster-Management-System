
/*
 * GET home page.
 */
var mysql = require("./mysql");
var ejs = require("ejs");


function addshoppingItem(req,res){
	var groupId = req.session.groupId;
	groupId = 1;
	var ItemName= req.body.ItemName;
	
	var add= "INSERT INTO roster.shopping(groupId, shopping_item,statusFlag) VALUES (" + "'" + groupId+ "'" + "," 
	+ "'" + ItemName + "'" + "," 
	+ "'" + 0 + "');";
    
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.redirect('/loadshoppingPage');		   
				
		}
	},add);
	}



function removingshoppingItem(req,res){
	var groupId = req.session.groupId;
	groupId = 1;
	var itemId = req.body.itemId;
	
	var update= " UPDATE `roster`.`shopping` SET `statusFlag`='1' WHERE `itemId`='"+itemId+"' and groupId='"+groupId+"'; "; 
		
	
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{	
			
			res.send(results);
			console.log("I will reload shopping page");
				   
				
		}
	},update);
	}

/*
function DeleteshoppingItem(req,res){
	var groupId  = 1; //= var groupid=req.sessiongroupid;
	groupId = 1;
	var ItemId = 2;//=req.session.ItemId; 
	
	
	var Delete= "DELETE from roster.shopping where ItemId='" + ItemId +  "' and groupId = '" + groupId + "';";
    
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.redirect('/loadshoppingPage');			   
				
		}
	},Delete);
	}

*/

function fetchShopItem(req,res){
	 var groupId = req.session.groupId;
	 groupId = 1;
	
	 var items = "Select * from roster.shopping where groupId='" + groupId + "' and statusFlag = '0';";
    
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.send(results);			   
				
		}
	},items);
	
}


function load(req,res){
	console.log("Hi i will load shopping page");
	res.render('shoppinglist');
}


exports.load = load;
exports.addshoppingItem=addshoppingItem;
exports.removingshoppingItem=removingshoppingItem;
//exports.DeleteshoppingItem=DeleteshoppingItem;
exports.fetchShopItem = fetchShopItem;

