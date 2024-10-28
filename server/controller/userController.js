import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
let saltRound=10

export const register=async(req,res)=>{
    try {
        console.log("masss");
        let user=await User.findOne({email:req.body.email})
        if(!user){
            bcrypt.hash(req.body.password,saltRound,async(error,result)=>{
                if(result){
                    try {
                        let newUser=await new User({
                            name:req.body.name,
                            email:req.body.email,
                            password:result,
                            balance:req.body.balance,
                            bin:req.body.bin
                        })
                        let savedUser=await newUser.save()
                        res.status(201).send({message:'register succesfull',user:savedUser})
                    } catch (error) {
                        console.log(error.message);
                    }
                }else{
                    console.log(error);
                }
                
            })
            
        }
        else{
            res.status(400).send({message:'already exist'})
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const login=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).send({message:'user not found...register first'})
        }
        else{
            bcrypt.compare(req.body.password,user.password,async(error,result)=>{
                if(!error){

                    let token=await Jwt.sign({id:user._id},process.env.JWT)
                    res.header("token",token).status(200).send({message:'login successed',token})
                }
                else{
                    res.status(400).send({message:'password wrong'})
                }
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}


export const deposit=async(req,res)=>{
    let id=req.params.id
    let user = await User.findById(id)
    let balance=user.balance
    let depAmount=req.body.depAmount
    let upBalance=Number(balance)+Number(depAmount)
    try {
        if(upBalance){
            await User.findByIdAndUpdate(id,{$set:{balance:upBalance}},{new:true})
            res.status(200).send({message:"Deposit success"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const withdraw=async(req,res)=>{
    let id=req.params.id
    let user = await User.findById(id)
    let balance=user.balance
    let withdrawAmount=req.body.withdrawAmount
    let upBalance=0
    if(balance >= 0 && balance>=Number(withdrawAmount)){
        upBalance=Number(balance)-Number(withdrawAmount)
        try {
            await User.findByIdAndUpdate(id,{$set:{balance:upBalance}},{new:true})
            res.status(200).send({message:"Withdraw success"})
            
        } catch (error) {
            console.log(error.message);
        }
    }else{
        upBalance=balance
        res.status(400).send({message:"insufficient balance"})
    }
    
}

export const getByToken=async(req,res)=>{
    try {
        const get = await User.findById({_id:req.user.id})
        res.status(200).send(get)
    } catch (error) {
        console.log(error.message);
    }
}