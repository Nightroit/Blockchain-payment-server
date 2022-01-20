
import express from 'express'; 
import userModel from '../models/User';
import hashAndSaveToDB from '../util/hashAndSave';
import Validator from '../util/validator';


const validator = require("validator"); 
const userRoutes = express.Router();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')


userRoutes.post('/login', (req, res) => {
    const userName=req.body.userName;  
    const password = req.body.password; 
    var error = []; 
    function callback(err: any) {
        if(err.length != 0) {
            console.log(err); 
        } else {
            userModel.findOne({userName}).then((user) => {
                if(user) {
                    bcrypt.compare(password, user.password, function(err:any, result:boolean) {
                        if(result) {
                            const userForToken = {
                                username: user.username,
                                id: user._id,
                            }
                            const token = jwt.sign(userForToken, process.env.SECRET);
                            res.status(200).send({found: true, token, msg: ""}); 
                        } else res.json({found: false, msg: ""});
                        });
                 } else res.json({found: "false", msg: "wrong password"});
            })
            error.push(err);
            console.log(err); 
        }
    }

    Validator({
        userName, 
        password, 
    }, callback)
  
})

userRoutes.post('/register', (req, res) => {
    const userName = req.body.userName; 
    const password = req.body.password; 
    const email = req.body.email;  
    const confirmPassword = req.body.confirmPassword; 
    var error = []; 
    function callback(err: any) {
        if(err.length == 0) {
            userModel.find({}).sort({uniqueId: -1}).limit(1).then((user: any) => {
                console.log(user); 
                let id = user[0].uniqueId;
                return hashAndSaveToDB({
                    userName, 
                    email, 
                    password, 
                    confirmPassword, 
                    uniqueId: id + 1,
                }, res)

            });
        } else {
            error.push(err); 
        }
    }

    Validator({
        userName, 
        email, 
        password, 
        confirmPassword
    }, callback)
})

export default userRoutes;