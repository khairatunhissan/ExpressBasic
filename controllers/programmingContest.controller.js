const ProgrammingContest=require('../models/ProgrammingContest.model')

const getPC=(req,res)=>{
    res.render('programming-contest/register.ejs')
    
}

const postPC=(req,res)=>{
    const{teamname,institution,coachname,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt}=req.body
    console.log(teamname)
    console.log(institution)
    console.log(coachname)
    console.log(coachcontact)
    console.log(coachemail)
    console.log(coachtshirt)
    console.log(leadername)
    console.log(leadercontact)
    console.log(leaderemail)
    console.log(leadertshirt)
    console.log(member1name)
    console.log(member1contact)
    console.log(member1email)
    console.log(member1tshirt)
    console.log(member2name)
    console.log(member2contact)
    console.log(member2email)
    console.log(member2tshirt)
    res.render('programming-contest/register.ejs')
}

const getPCList=(req,res)=>{
    res.render('programming-contest/list.ejs')
}

const deletePC=(req,res)=>{
    const id =req.params.id
    console.log(id)
    res.render('programming-contest/list.ejs')
}

const paymentDonePC=(req,res)=>{
    const id =req.params.id
    console.log(id)
    res.render('programming-contest/list.ejs')
}

const selectPC=(req,res)=>{
    const id =req.params.id
    console.log(id)
    res.render('programming-contest/list.ejs')
}

module.exports={getPC,postPC,getPCList,deletePC,paymentDonePC,selectPC}
