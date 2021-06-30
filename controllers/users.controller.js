const User=require('../models/User.model')
const bcrypt=require('bcryptjs')

const getLogin=(req,res)=>{
    res.render('users/login.ejs')

}

const postLogin=(req,res)=>{
    const{email,password}=req.body
    console.log(email)
    console.log(password)

}

const getRegister=(req,res)=>{

    res.render('users/register.ejs',{errors:req.flash('errors')})
}

const postRegister=(req,res)=>{
    const{name,email,password,confirm_password}=req.body
    /*console.log(name)
    console.log(email)
    console.log(password)
   console.log(confirm_password)*/
  
   //Data validation
   const errors=[];
   if(!name||!email||!password||!confirm_password){
       errors.push("All fields are required")
   }
   if(password.length<6){
       errors.push("Password atleast 6 characters")
   }
   if(password!==confirm_password){
       errors.push("Passwords do not match")
   }
   if(errors.length>0){
       req.flash('errors',errors)
       res.redirect('/users/register')
   }
   //Create New User
   else{
    User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push("User already exists with this email!");
          req.flash("errors", errors);
          res.redirect("/users/register");
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              errors.push(err);
              req.flash("errors", errors);
              res.redirect("/users/register");
            } else {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                  errors.push(err);
                  req.flash("errors", errors);
                  res.redirect("/users/register");
                } else {
                  const newUser = new User({
                    name,
                    email,
                    password: hash,
                  });
                  newUser
                    .save()
                    .then(() => {
                      res.redirect("/users/login");
                    })
                    .catch(() => {
                      errors.push("Saving User to the database failed!");
                      req.flash("errors", errors);
                      res.redirect("/users/register");
                    });
                }
              });
            }
          });
        }
      });
    }
   }

module.exports={
    postLogin,getLogin,postRegister,getRegister
}