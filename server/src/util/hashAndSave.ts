import userModel from '../models/User';
import { UserData } from "../../blockchain/types";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

function hashAndSaveToDB(userData: UserData, res: any) {
    bcrypt.genSalt(saltRounds, function(err:any, salt:number) {
        bcrypt.hash(userData.password, salt, function(err:any, hash:string) {
            const user = new userModel({
                userName: userData.userName, 
                email: userData.email,
                password: hash, 
                _id: uuidv4()
            })
            user.save().then(() => {
                const userForToken = {
                    username: user.username,
                    id: user._id,
                }
                const token = jwt.sign(userForToken, process.env.SECRET)
                return res.status(200).send({msg: "registered successfully", token}); 
            })
        });
    });
}

export default hashAndSaveToDB;