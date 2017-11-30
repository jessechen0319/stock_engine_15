const SERVERPATH="47.95.5.87:3838";
const GetRequest = require('../GetContent');

function sendResultToServer(stock, strategy, timeDate){
    let url = `http://${SERVERPATH}/addStarStock?stock=${stock}&strategy=${strategy}&timedate=${timeDate}`;
    GetRequest.download(url, (data)=>{
        console.log('---------data had been inserted--------');
        console.log(data);
    });
}

function cleanResultFromServer(){
    let url = `http://${SERVERPATH}/clean`;
    GetRequest.download(url, (data)=>{
        console.log('---------clean Data--------');
        console.log(data);
    });
}

exports.sendResultToServer = sendResultToServer;