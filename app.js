const express=require('express')
const app=express()
const indexRoutes=require('./routes/index.routes')

app.use(express.static('public'))

app.use(indexRoutes)

module.exports = app