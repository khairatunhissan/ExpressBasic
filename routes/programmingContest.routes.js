const express=require('express')
const router=express.Router()
const {ensureAuthenticated,addUserData}=require('./../middlewares/auth.middleware')
const{getPC,postPC,getPCList, deletePC,paymentDonePC,selectPC,geteditPC,posteditPC}=require('./../controllers/programmingContest.controller')
const { route } = require('./index.routes')

router.get('/register',ensureAuthenticated,addUserData,getPC)
router.post('/register',ensureAuthenticated,addUserData,postPC)
router.get('/list',ensureAuthenticated,addUserData,getPCList)
router.get('/delete/:id',ensureAuthenticated,addUserData,deletePC)
router.get('/paymentDone/:id',ensureAuthenticated,addUserData,paymentDonePC)
router.get('/select/:id',ensureAuthenticated,addUserData,selectPC)
router.get('/edit/:id',ensureAuthenticated,addUserData,geteditPC)
router.post('/edit',ensureAuthenticated,addUserData,posteditPC)

module.exports=router