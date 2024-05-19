import { Router } from "express";
import { activeUser, loginUser, logoutUser, registerUser, updateAccessToken, updatePassword, userDetails } from "../controller/user.controller";
import { isAuthenticated, isSeller, isUser } from "../middleware/isAuthenticated";
import {createAddress, deleteAddress, getAddress, getSingleAddress, updateAddress} from '../controller/profile.controller'
const router : Router = Router()

router.post('/register',registerUser)
router.post('/active-user',activeUser)
router.post('/login',loginUser)
router.get('/logout',[isAuthenticated],logoutUser)


router.get('/update-token',updateAccessToken)
router.get('/me',[isAuthenticated],userDetails)
router.post('/change-password',[isAuthenticated],updatePassword)

//address
router.post('/address',[isAuthenticated,isUser], createAddress)
router.put('/address/:id',[isAuthenticated,isUser],updateAddress)
router.delete('/address/:id',[isAuthenticated,isUser],deleteAddress)
router.get('/address',[isAuthenticated,isUser], getAddress)
router.get('/address/:id',[isAuthenticated,isUser], getSingleAddress)


export default router;