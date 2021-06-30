const express=require('express')
const app=express()
const session=require('express-session')
const flash =require('connect-flash')
const indexRoutes=require('./routes/index.routes')
const userRoutes=require('./routes/users.routes')

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

app.use(express.urlencoded({extended:false}))
app.use(indexRoutes)
app.use('/users',userRoutes)

module.exports = app