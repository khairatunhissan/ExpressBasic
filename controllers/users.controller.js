const getLogin=(req,res)=>{
    res.render('users/login.ejs')

}

const postLogin=(req,res)=>{
    const{email,password}=req.body
    console.log(email)
    console.log(password)

}

const getRegister=(req,res)=>{

    res.render('users/register.ejs')
}

const postRegister=(req,res)=>{
    const{name,email,password,confirm_password}=req.body
    console.log(name)
    console.log(email)
    console.log(password)
   console.log(confirm_password)

}

module.exports={
    postLogin,getLogin,postRegister,getRegister
}