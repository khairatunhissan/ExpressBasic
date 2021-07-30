require('dotenv').config()
const express=require('express')
const app=express()
const session=require('express-session')
const flash =require('connect-flash')
const indexRoutes=require('./routes/index.routes')
const userRoutes=require('./routes/users.routes')
const MORoutes=require('./routes/mathOlympiad.routes')
const mongoose=require('mongoose')
const passport=require('passport')

//passport Strategy
require('./config/passport')(passport)


//connect to db
mongoose.connect(process.env.MongoURI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
console.log('Mongodb Connected')
}).catch(()=>{
    console.log(error)
})

app.use(express.static('public'))

//View Engine
app.set("view engine", "ejs");

//session and flash
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended:false}))
app.use(indexRoutes)
app.use('/users',userRoutes)
app.use('/MathOlympiad',MORoutes)

module.exports = app