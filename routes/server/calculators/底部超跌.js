//stg_3
let SendResult = require('./popupResult');
//strategy name=底部突破
function calculate(data, stock){
    if(data.length < 155){
        return false;
    }
    let latestRecord = data[data.length-1];
    let compare = data[data.length-2];

    let m144_13 = latestRecord.m144 - latestRecord.m13;
    m144_13 = m144_13/latestRecord.close;
    if(m144_13 >=0.02){
        let m55_13  = latestRecord.m55 - latestRecord.m13;
        m55_13 = Math.abs(m55_13);
        if(m55_13/latestRecord.close <= 0.005){
            let m34_13 = latestRecord.m34 - latestRecord.m13;
            m34_13 = Math.abs(m34_13);
            if(m34_13/latestRecord.close <= 0.005){
                let m_p_13 = latestRecord.m13 - latestRecord.close;
                m_p_13 = m_p_13/latestRecord.close;
                if(m_p_13>=0.009){
                    SendResult.sendResultToServer(stock, 'stg_3', latestRecord.day);
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