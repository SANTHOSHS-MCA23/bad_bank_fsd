import express from "express";
import { login, register ,deposit,withdraw,getByToken} from "../controller/userController.js";
import auth from "../middleware/auth.js";


const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.put("/deposit/:id",deposit)
router.put("/withdraw/:id",withdraw)
router.get("/getbytoken",auth,getByToken)

export default router