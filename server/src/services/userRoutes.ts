
import express from 'express'; 
import userModel from '../models/User';

const { v4: uuidv4 } = require('uuid');
const validator = require("validator"); 
const userRoutes = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')


userRoutes.post('/login', (req, res) => {
    var error = [];
    const username=req.body.username;  
    const password = req.body.password; 
    var key; 
    if(validator.isEmail(username)) {
        key = "email"; 
    } else key = "username"; 
    userModel.findOne({key: username}).then((user) => {
        if(user) {
            bcrypt.compare(password, user.password, function(err:any, result:boolean) {
                if(result) {
                    const userForToken = {
                        username: user.username,
                        id: user._id,
                    }
                    const token = jwt.sign(userForToken, process.env.SECRET)
                    res.status(200).send({msg: "registered successfully", token}); 
                } else res.json({msg: "wrong password!"})
                });
         } else res.json({msg: "user not found"})
    })
})

userRoutes.post('/register', (req, res) => {
    const userName = req.body.username; 
    const password = req.body.password; 
    const email = req.body.email; 
    console.log(req.body); 
    var error = []; 
    if(userName.length < 4) {
        error.push("invalid username")
    }
    if(!validator.isEmail(email)) {
        error.push("invalid email"); 
    } 
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if(!pattern.test(password)) {
        error.push("invalid password"); 
    }
    if(error.length > 0) {
        return res.json(error); 
    }

    bcrypt.genSalt(saltRounds, function(err:any, salt:number) {
        bcrypt.hash(password, salt, function(err:any, hash:string) {
            const user = new userModel({
                userName, 
                email,
                password: hash, 
                _id: uuidv4()
            })
            user.save().then(() => {
                const userForToken = {
                    username: user.username,
                    id: user._id,
                }
                const token = jwt.sign(userForToken, process.env.SECRET)
                res.status(200).send({msg: "registered successfully", token}); 
            })
        });
    });
})

export default userRoutes;