const MathOlympiad=require('../models/MathOlympiad.model')

const getMO=(req,res)=>{
    res.render('math-olympiad/register.ejs',{error:req.flash('error')})

}

const postMO=(req,res)=>{
    const{name,category,contact,email,institution,tshirt}=req.body
    console.log(name)
    console.log(category)
    console.log(contact)
    console.log(email)
    console.log(institution)
    console.log(tshirt)

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
     let error=""

     MathOlympiad.findOne({name:name,contact:contact}).then((participant)=>{
         if(participant){
             error="Participant with same name and contact exists"
             
             req.flash('error',error)
             res.redirect('register')
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
                 tshirt
             })
             participant.save().then(()=>{
                error='Participant has been registered successfully!!'
                req.flash('error',error)
                res.redirect('register')
             }).catch(()=>{
                error='Unexpected error'
                req.flash('error',error)
                res.redirect('register')


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
    const id=req.param.id
    console.log(id)
    res.render('math-olympiad/list.ejs')
}

module.exports={getMO,postMO,getMOList, deleteMO}

