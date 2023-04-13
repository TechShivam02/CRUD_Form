let express = require("express");
const app = express();



let dbs = require('./database');   // importing the dbs 


// path to view , set the view ending and body parser

var path = require("path");
const { error } = require("console");
const { rmSync } = require("fs");


app.use(express.urlencoded({extended:false}));
app.set("views" , path.join(__dirname,'view'));
app.set('view engine' , 'ejs');







app.get("/" , function(req,res){
    
    let msg = "";

    if(req.query['msg'] != ""){
        msg = req.query['msg'];
    }



    res.render("menu" , {msg:msg});

});




app.get("/listuser" , function(req,res){

    let sql = "select * from user ";

    dbs.query(sql , function(error , result,field){
        if(error){
            res.redirect("/");
        }

        else{
            res.render("userlistview" , {data:result});
        }
    })
    
});





app.get("/adduser" , function(req,res){   // if got req      .../adduser  then show addusere.js page
    res.render('adduser');
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



app.get('/edituser' , function(req,res){
    let sql = "select * from user where id="+req.query['id'];


    res.write(sql);

    dbs.query(sql,function(err,result , field){
        if(err){
            res.redirect('/');
        }

        else{
            console.log(result);
        }
    });

    res.end();

})

app.listen(8080);
console.log("server running at port 8080");

