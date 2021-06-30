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
    console.log(name)
    console.log(email)
    console.log(password)
   console.log(confirm_password)
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
<<<<<<< HEAD
       req.flash('errors',errors)
       res.redirect('/users/register')
   }else{
       res.redirect('/users/login')
=======
       console.log(errors)
   }else{
       res.redirect('/users.login')
>>>>>>> e9d30ac263a6761c638acdc8fb23d78daa3d5017
   }

}

module.exports={
    postLogin,getLogin,postRegister,getRegister
}