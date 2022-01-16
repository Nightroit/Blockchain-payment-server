import Blockchain from "../../blockchain";

export default function(billi: Blockchain, data: any, callback: any) {
    billi.userName = data[0].userName; 
    billi.date = data[0].date; 
    billi.userId  = data[0].userId; 
    billi.chain = data[0].chain; 
    billi.currentNodeUrl = data[0].currentNodeUrl;
    billi.pendingTransactions = data[0].pendingTransactions;
    billi.networkNodes = data[0].networkNodes;
    callback(null, true);
}