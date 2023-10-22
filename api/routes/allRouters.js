import express from "express";
import { google, signOut, signin, signup } from "../controllers/auth.controller.js";
import { verifyToken } from '../utils/verifyUser.js.js';
import { createListing, deleteListing, updateListing, getListing, getListings} from '../controllers/listing.controller.js';
import {deleteUser, test, updateUser, getUserListings, getUser} from '../controllers/user.controller.js';
const router = express.Router();


router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.get('/signout', signOut)


router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);


router.get('/test', test);
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router;