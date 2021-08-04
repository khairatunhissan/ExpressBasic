const express=require('express')
const router=express.Router()
const {ensureAuthenticated,addUserData}=require('./../middlewares/auth.middleware')
const{getMO,postMO,getMOList, deleteMO,paymentDoneMO,selectMO,geteditMO,posteditMO}=require('./../controllers/mathOlympiad.controller')
const { route } = require('./index.routes')

router.get('/register',ensureAuthenticated,addUserData,getMO)
router.post('/register',ensureAuthenticated,addUserData,postMO)
router.get('/list',ensureAuthenticated,addUserData,getMOList)
router.get('/delete/:id',ensureAuthenticated,addUserData,deleteMO)
router.get('/paymentDone/:id',ensureAuthenticated,addUserData,paymentDoneMO)
router.get('/select/:id',ensureAuthenticated,addUserData,selectMO)
router.get('/edit/:id',ensureAuthenticated,addUserData,geteditMO)
router.post('/edit',ensureAuthenticated,addUserData,posteditMO)


module.exports=router