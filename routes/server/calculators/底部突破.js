//13, 34向上，在55线下方，144线走平，13，34，55走势粘合，不超过一个点。股价在13，34，55上方。

let SendResult = require('./popupResult');

function calculate(data, stock){
    if(data.length < 150){
        return false;
    }
    let latestRecord = data[data.length-1];
    let compare = data[data.length-2];
    if(latestRecord.m13 > compare.m13 && latestRecord.m34 >= compare.m34){//13, 34上攻
        let cha13 = Math.abs(latestRecord.m13 - latestRecord.m55)/latestRecord.open;
        let cha34 = Math.abs(latestRecord.m34 - latestRecord.m55)/latestRecord.open;
        if(cha13<0.01 && cha34<0.01){//均线粘合
            let cha144 = latestRecord.m144 - data[data.length-6].m144;
            cha144 = Math.abs(cha144);
            if(cha144<=0.04){//144走平
                let cha = latestRecord.m144 - latestRecord.close;
                cha = cha/latestRecord.close;
                if(cha>0.025){//144高过两个点
                    if(latestRecord.close>latestRecord.m13 && latestRecord.close>latestRecord.m34 && latestRecord.close>latestRecord.m55){
                        //股价站上所有均线
                        SendResult.sendResultToServer(stock, '底部突破', latestRecord.day);
                    }
                }
            }
        }
    }
}

exports.calculate = calculate;