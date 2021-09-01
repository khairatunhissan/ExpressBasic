const MathOlympiad=require('../models/MathOlympiad.model')
const sendMails = require('../config/email');
var crypto = require('crypto');

const getMO=(req,res)=>{
    res.render('math-olympiad/register.ejs',{error:req.flash('error')})

}

const postMO=(req,res)=>{
    const{name,category,contact,email,institution,tshirt}=req.body
    

    let registrationFee=0
    if(category=='School')
    {
        registrationFee=250
    }
    else if (category=='College')
    {
        registrationFee=400
    }
     else{
         registrationFee=500
     }
     const total=registrationFee
     const paid=0
     const selected=false
     var verificationCode = crypto.randomBytes(20).toString('hex');

     let error=""

     MathOlympiad.findOne({name:name,contact:contact}).then((participant)=>{
         if(participant){
             error="Participant with same name and contact exists"
             
             req.flash('error',error)
             res.redirect('/MathOlympiad/register')
         }else{
             const participant=new MathOlympiad({
                 name,
                 category,
                 contact,
                 email,
                 institution,
                 paid,
                 total,
                 selected,
                 tshirt,
                 verificationCode
             })
             participant.save().then(()=>{
                error='Participant has been registered successfully!!'
                
                const mailOptions = {
                    from: 'ictfest7@gmail.com',
                    to: email,
                    subject: 'Registration on ICT Fest 2021',
                    text:
                      'You have registered successfully for Math Olympiad.This is the Verification code ' +
                      verificationCode,
                  };

                  sendMails(mailOptions);



                req.flash('error',error)
                res.redirect('/MathOlympiad/register')
             }).catch((err)=>{
                 console.log(err);
                 
                error='Unexpected error'
                req.flash('error',error)
                res.redirect('/MathOlympiad/register')


             })
         }
     })
  
}

const getMOList=(req,res)=>{
    let all_participant=[]
    let error =""
    MathOlympiad.find().then((data)=>{
        all_participant=data
        res.render('math-olympiad/list.ejs',{
            error:req.flash('error'),
            participants:all_participant,
        })

    }).catch(()=>{
        error='Failed to fetch participants'
        res.render('math-olympiad/list.ejs',{
            error:req.flash('error',error),
            participants:all_participant,
        })
    })
    
}

const deleteMO=(req,res)=>{
    let error=''
    const id=req.param.id
    
    MathOlympiad.deleteOne({_id:req.params.id}).then(()=>{
        error='Data has been deleted successfully!'
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')

    }).catch(()=>{
        error='Failed to delete data!'
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')

    })
  
}

const paymentDoneMO =(req,res)=>{
    const id=req.params.id

    MathOlympiad.findOne({_id:id})
    .then((participant)=>{
        participant.paid=participant.total
        participant.save().then(()=>{
            let error="Payment completed succesfully"
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')
        })
        .catch(()=>{
            let error="Data could not be updated"
            req.flash('error',error)
            res.redirect("/MathOlympiad/list")
        })
    })
    .catch(()=>{
        let error="Data could not be updated"
        req.flash('error',error)
        res.redirect("/MathOlympiad/list")

    })
}

const selectMO =(req,res)=>{
    const id=req.params.id

    MathOlympiad.findOne({_id:id})
    .then((participant)=>{
        participant.selected=true
        participant.save().then(()=>{
            let error="Participant has been selcted succesfully"
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')
        })
        .catch(()=>{
            let error="Data could not be updated"
            req.flash('error',error)
            res.redirect("/MathOlympiad/list")
        })
    })
    .catch(()=>{
        let error="Data could not be updated"
        req.flash('error',error)
        res.redirect("/MathOlympiad/list")

    })
}


const geteditMO =(req,res)=>{
    const id =req.params.id
    let participantInfo=[]
    let error =""
    MathOlympiad.findOne({_id:id})
    .then((data)=>{
        participantInfo=data
        res.render('math-olympiad/edit.ejs',{
            error:req.flash('error'),
            participant:participantInfo,
        })

    }).catch(()=>{
        error='Failed to fetch participants'
        res.render('math-olympiad/edit.ejs',{
            error:req.flash('error',error),
            participants:participantInfo,
        })
    })
}


const posteditMO = async (req, res) => {
    const { name, contact, category, email, institution, tshirt } = req.body;
  
    const data = await MathOlympiad.findOneAndUpdate(
      { name: name, contact: contact },
      { category, email, institution, tshirt }
    )
    .then((data)=>{
        if(data==req.params.teamname||data==req.params.coachname){
            error="Participant's name and contact number cannot be edited"
            req.flash('error',error)
            res.redirect("/MathOlympiad/list")
        }
        else{
      error="Participant has been edited successfully!!"
        req.flash('error',error)
        res.redirect("/MathOlympiad/list")
    }
    }).catch(()=>{
        error="Unexpected Error"
        req.flash('error',error)
        res.redirect("/MathOlympiad/list")
    })
    
  }

  


module.exports={getMO,postMO,getMOList, deleteMO,paymentDoneMO,selectMO,geteditMO,posteditMO}

