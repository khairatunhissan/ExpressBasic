const ProgrammingContest=require('../models/ProgrammingContest.model')
const sendMails = require('../config/email');
var crypto = require('crypto');


const getPC=(req,res)=>{
    res.render('programming-contest/register.ejs',{error:req.flash('error')})
    
}

const postPC=(req,res)=>{
    const{teamname,institution,coachname,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt}=req.body
    

    const total=500
     const paid=0
     const selected=false
     let error=""

     ProgrammingContest.findOne({teamname:teamname,coachname:coachname}).then((participant)=>{
         if(participant){
             error="Team with same team name and coach name exists"
             
             req.flash('error',error)
             res.redirect('/ProgrammingContest/register')
         }else{
             const participant=new ProgrammingContest({
                teamname,
                institution,
                coachname,
                coachcontact,
                coachemail,
                coachtshirt,
                leadername,
                leadercontact,
                leaderemail,
                leadertshirt,
                member1name,
                member1contact,
                member1email,
                member1tshirt,
                member2name,
                member2contact,
                member2email,
                member2tshirt,
                paid,
                total,
                selected,
             })
             participant.save().then(()=>{
                error="Team has been registered successfully"
                req.flash('error',error)
                res.redirect('/ProgrammingContest/register')
             }).catch(()=>{
                error='Unexpected error'
                req.flash('error',error)
                res.redirect('/ProgrammingContest/register')


             })
         }
     })
  
}

const getPCList=(req,res)=>{
    let all_participant=[]
    let error =""
    ProgrammingContest.find().then((data)=>{
        all_participant=data
        res.render('programming-contest/list.ejs',{
            error:req.flash('error'),
            participants:all_participant,
        })

    }).catch(()=>{
        error='Failed to fetch participants'
        res.render('programming-contest/list.ejs',{
            error:req.flash('error',error),
            participants:all_participant,
        })
    })
}

const deletePC=(req,res)=>{
    let error=''
    const id=req.param.id
    
    ProgrammingContest.deleteOne({_id:req.params.id}).then(()=>{
        error='Data has been deleted successfully!'
            req.flash('error',error)
            res.redirect('/ProgrammingContest/list')

    }).catch(()=>{
        error='Failed to delete data!'
            req.flash('error',error)
            res.redirect('/ProgrammingContest/list')

    })
}

const paymentDonePC=(req,res)=>{
    const id=req.params.id

    ProgrammingContest.findOne({_id:id})
    .then((participant)=>{
        participant.paid=participant.total
        participant.save().then(()=>{
            let error="Payment completed succesfully"
            req.flash('error',error)
            res.redirect('/ProgrammingContest/list')
        })
        .catch(()=>{
            let error="Data could not be updated"
            req.flash('error',error)
            res.redirect("/ProgrammingContest/list")
        })
    })
    .catch(()=>{
        let error="Data could not be updated"
        req.flash('error',error)
        res.redirect("/ProgrammingContest/list")

    })
}

const selectPC=(req,res)=>{
    const id=req.params.id

    ProgrammingContest.findOne({_id:id})
    .then((participant)=>{
        participant.selected=true
        participant.save().then(()=>{
            let error="Team has been selcted succesfully"
            req.flash('error',error)
            res.redirect('/ProgrammingContest/list')
        })
        .catch(()=>{
            let error="Data could not be updated"
            req.flash('error',error)
            res.redirect("/ProgrammingContest/list")
        })
    })
    .catch(()=>{
        let error="Data could not be updated"
        req.flash('error',error)
        res.redirect("/ProgrammingContest/list")

    })
}

const geteditPC=(req,res)=>{
    const id =req.params.id
    let participantInfo=[]
    let error =""
    ProgrammingContest.findOne({_id:id})
    .then((data)=>{
        participantInfo=data
        res.render('programming-contest/edit.ejs',{
            error:req.flash('error'),
            participant:participantInfo,
        })

    }).catch(()=>{
        error='Failed to fetch participants'
        res.render('programming-contest/edit.ejs',{
            error:req.flash('error',error),
            participants:participantInfo,
        })
    })
}

const posteditPC=async(req,res)=>{
    const{teamname,institution,coachname,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt}=req.body
  
    const data = await ProgrammingContest.findOneAndUpdate(
      { teamname: teamname, coachname: coachname },
      {institution,coachcontact,coachemail,coachtshirt,leadername,leadercontact,leaderemail,leadertshirt,member1name,member1contact,member1email,member1tshirt,member2name,member2contact,member2email,member2tshirt}
    )
    .then((data)=>{
        if(data==req.params.teamname||data==req.params.coachname){
            error="Team name and coach name cannot be edited"
            req.flash('error',error)
            res.redirect("/ProgrammingContest/list")
        }
        else{
      error="Team has been edited successfully!!"
        req.flash('error',error)
        res.redirect("/ProgrammingContest/list")}

    }).catch(()=>{
        error="Unexpected Error"
        req.flash('error',error)
        res.redirect("/ProgrammingContest/list")
    })
    
}

module.exports={getPC,postPC,getPCList,deletePC,paymentDonePC,selectPC,geteditPC,posteditPC}