//144 55多头排列
//BOLL线中轨平稳
//股价靠近上轨

let SendResult = require('./../popupResult');
//strategy name=底部突破
function calculate(data, stock){
    if(data.length < 155){
        return false;
    }
    let latestRecord = data[data.length-1];
    let compare = data[data.length-2];

    if(latestRecord.m55 > compare.m55){
        if(latestRecord.m144 > compare.m144){
            //BOLL中轨平稳
            if(Math.abs(latestRecord.Boll_ma-data[data.length-9].Boll_ma) <= 0.04){
                let up = Math.abs(latestRecord.close-latestRecord.Boll_up);
                let md = Math.abs(latestRecord.close-latestRecord.Boll_ma);
                if(md > up){
                    SendResult.sendResultToServer(stock, 'stg_fantan_1', latestRecord.day);
                }
            }
        }
    }

}

exports.calculate = calculate;