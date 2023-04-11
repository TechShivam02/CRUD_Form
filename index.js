let express = require("express");
const app = express();



let dbs = require('./database');   // importing the dbs 


// path to view , set the view ending and body parser

var path = require("path");


app.use(express.urlencoded({extended:false}));
app.set("views" , path.join(__dirname,'view'));
app.set('view engine' , 'ejs');







app.get("/" , function(req,res){
    
    
    res.render("menu");


});




app.get("/adduser" , function(req,res){   // if got req      .../adduser  then show addusere.js page
    res.render('adduser');
})


app.get("/listuser" , function(req,res){ 
    res.render('userlistview');
})



app.post("/addusersubmit" , function(req,res){

    // req.body.textbox   --> app.post      , req.query['textbox']  ---> app.get


    let name = req.body.name;   // adduser.js       name="name"
    let email = req.body.Email;  // adduser.js       name="Email"
    let pass = req.body.pass;
    let adress = req.body.adress;
    let mobile = req.body.mobile;
    let gen = req.body.gender;     // adduser.js       name="gender"
    let dob = req.body.dob;


    // string type data passes in ''
    // rest number passes in normal way 
    
    
    let sql = "insert into user(name , email , pass , adress , mobile , dob , gender) values('"+name+"' , '"+email+"' ,  '"+pass+"'  , '"+adress+"' , "+mobile+" , '"+dob+"'  , '"+gen+"' )"; 





    let msg="";



     dbs.query(sql , function(error , result , field){
         
        if(error){
            msg="error during user addition";
            console.log(error);
        }

        else{

            //res.write()  accept the text/string   
            // res.write(result);   // error  we r passing obj 


            msg="user added sucfully";
            res.redirect("/?msg="+msg);



        }

     });



    




})

app.listen(8080);
console.log("server running at port 8080");

