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

    if(latestRecord.m34 >= compare.m34){
        if(latestRecord.m55 >= compare.m55){
            let isBiggerThanBoll = false;
            for(let i = data.length - 9; i<= data.length-2; i++){
                if(data[i].close>data[i].Boll_ma){
                    isBiggerThanBoll = true;
                }
            }

            if(!isBiggerThanBoll){
                if(latestRecord.close>latestRecord.Boll_ma){
                    if(latestRecord.volume>compare.volume){
                        SendResult.sendResultToServer(stock, 'stg_2', latestRecord.day);
                    }
                }
            }
        }
    }

    // if(latestRecord.m13 > compare.m13 && latestRecord.m34 >= compare.m34){//13, 34上攻
    //     let cha13 = Math.abs(latestRecord.m13 - latestRecord.m55)/latestRecord.open;
    //     let cha34 = Math.abs(latestRecord.m34 - latestRecord.m55)/latestRecord.open;
    //     if(cha13<0.01 && cha34<0.01){//均线粘合
    //         let cha144 = latestRecord.m144 - data[data.length-8].m144;
    //         cha144 = Math.abs(cha144);
    //         if(cha144<=0.03){//144走平
    //             let cha = latestRecord.m144 - latestRecord.close;
    //             cha = cha/latestRecord.close;
    //             if(cha>0.025){//144高过两个点
    //                 if(latestRecord.close>latestRecord.m13 && latestRecord.close>latestRecord.m34 && latestRecord.close>latestRecord.m55){
    //                     //股价站上所有均线
    //                     SendResult.sendResultToServer(stock, 'stg_1', latestRecord.day);
    //                 }
    //             }
    //         }
    //     }
    // }
}

exports.calculate = calculate;