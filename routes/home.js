var mysql = require('./mysql');
var ejs = require('ejs');

function load(req,res){
	res.render('userHome');
}



exports.load = load;