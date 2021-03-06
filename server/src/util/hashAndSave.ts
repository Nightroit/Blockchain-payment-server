import userModel from '../models/User';
import { UserData } from "../../blockchain/types";
import { buildNewServer } from '../index';

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

function hashAndSaveToDB(userData: any, res: any) {
    bcrypt.genSalt(saltRounds, function(err:any, salt:number) {
        bcrypt.hash(userData.password, salt, function(err:any, hash:string) {
            console.log(userData)
            const user = new userModel({
                userName: userData.userName, 
                email: userData.email,
                password: hash, 
                uniqueId: userData.uniqueId,
                _id: uuidv4()
            })
            user.save().then(() => {
                const userForToken = {
                    username: user.username,
                    id: user._id,
                }
                const token = jwt.sign(userForToken, process.env.SECRET)
                buildNewServer(user.uniqueId + 3000)
                return res.status(200).json({msg: "registered successfully", token, uniqueId: user.uniqueId}); 
            })
        });
    });
}

export default hashAndSaveToDB;