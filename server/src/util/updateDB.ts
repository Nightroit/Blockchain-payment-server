import Blockchain from "../../blockchain";
import BlockchainModel from "../models/Blockchain";

export default function(billi: Blockchain, PORT: any, callback: any) {
    BlockchainModel.findOneAndUpdate({userId: PORT}, 
            JSON.parse(JSON.stringify(billi))
        ).then((data) => {
            callback(null, true); 
        }).catch((err) => {
            console.log(err)
            console.log("HERE"); 
            callback(err, false); 
        })
}