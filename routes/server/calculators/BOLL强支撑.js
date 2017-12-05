//4根均线有34和55是向上的，股价突破Boll线中规
//此前8天价格都在Boll线中轨下方

let SendResult = require('./popupResult');
//strategy name=底部突破
function calculate(data, stock){
    if(data.length < 155){
        return false;
    }
    let latestRecord = data[data.length-1];
    let compare = data[data.length-2];

    if(latestRecord.high<latestRecord.Boll_down || compare.high < compare.Boll_down){

    }

    // if(latestRecord.m34 >= compare.m34){
    //     if(latestRecord.m55 >= compare.m55){
    //         let isBiggerThanBoll = false;
    //         for(let i = data.length - 9; i<= data.length-2; i++){
    //             if(data[i].close>data[i].Boll_ma){
    //                 isBiggerThanBoll = true;
    //             }
    //         }

    //         if(!isBiggerThanBoll){
    //             if(latestRecord.close>latestRecord.Boll_ma){
    //                 if(latestRecord.volume>compare.volume){
    //                     SendResult.sendResultToServer(stock, 'stg_2', latestRecord.day);
    //                 }
    //             }
    //         }
    //     }
    // }

}

exports.calculate = calculate;