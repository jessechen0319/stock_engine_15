
let GetContent = require('./GetContent');

function getDataOfStock(stock, callback){
    let currentMoment = Date.parse(new Date());
    let url = `http://money.finance.sina.com.cn/quotes_service/api/jsonp_v2.php/var%20_${stock}_15_${currentMoment}=/CN_MarketData.getKLineData?symbol=${stock}&scale=15&ma=no&datalen=1023`;
    let callbackData = [];
    GetContent.download(url, (data)=>{
        data = data.substring(data.indexOf('(')+1, data.indexOf(')'));
        let script = `callbackData = ${data}`;
        eval(script);
        callback(callbackData);
    });
}

exports.getDataOfStock = getDataOfStock;