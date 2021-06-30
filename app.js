const express=require('express')
const app=express()
const indexRoutes=require('./routes/index.routes')
const userRoutes=require('./routes/users.routes')
app.use(express.static('public'))

//View Engine
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}))
app.use(indexRoutes)
app.use('/users',userRoutes)

module.exports = app