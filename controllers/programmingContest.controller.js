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
     var verificationCode = crypto.randomBytes(20).toString('hex');

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
                verificationCode
             })
             participant.save().then(()=>{
                error="Team has been registered successfully"

                let allEmails = [{name:leadername,email:leaderemail}, 
                    {name:member2name,email:member2email},
                     {name:member1name, email:member1email},
                      {name:coachname, email:coachemail}];



                allEmails.forEach((person) => {
              const mailOptions = {
                from: 'ictfest7@gmail.com',
                to: person.email,
                subject: 'Registration on ICT Fest 2021',
                text: `You ${person.name} and your team ${teamname} has successfully registered for programming contest.This is the verification code: ${verificationCode}`,
              };

              sendMails(mailOptions);
            });


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

const geteditPC = (req, res) => {
    const id = req.params.id;
    let info = [];
    ProgrammingContest.findOne({ _id: id })
      .then((data) => {
        info = data;
       
        res.render("programming-contest/edit.ejs", {
          error: req.flash("error"),
          participant: info,
        });
      })
      .catch((e) => {
        console.log(e);
        error = "Failed to fetch participants";
        res.render("programming-contest/edit.ejs", {
          error: req.flash("error", error),
          participant: info,
        });
      });
  };

  const posteditPC = async (req, res) => {
    const {
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
        
    } = req.body;
  
    const data = await ProgrammingContest.findOneAndUpdate(
      { teamname: teamname, coachname:coachname },
      {  institution,
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
        member2tshirt, }
    );
    if (data) {
        let  error='Team has been edited successfully!!'
        req.flash('error',error)
      res.redirect("/ProgrammingContest/list");
    }
  };

module.exports={getPC,postPC,getPCList,deletePC,paymentDonePC,selectPC,geteditPC,posteditPC}