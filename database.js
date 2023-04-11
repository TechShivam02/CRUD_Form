var mysql = require('mysql');

var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"backendcrud",
});



conn.connect(function(err){
    if(err){
        throw err;
    }

    else{
        console.log("Database Connected")
    }
});


module.exports = conn;
