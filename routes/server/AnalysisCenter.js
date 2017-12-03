let raiseFromFlor = require('./calculators/底部突破');
let bollRaise = require('./calculators/突破布林线');
let chaodie = require("./calculators/底部超跌");

let calculators=[raiseFromFlor.calculate];


function analysis(data, stock){
    
    if(data.length>150){
        _generateFibla(data);
        _generateBoll(data);
        // calculators.forEach((calculator)=>{
        //     raiseFromFlor.calculate(data, stock);
        // });
        //bollRaise.calculate(data, stock);
        chaodie.calculate(data, stock);
    }
}

function _generateBoll(data){
    // MA（n）=n天均价
    // n=周期
    // c=收盘价
    // P=BOLL带宽度，一般为2
    // 设c-MA=D
    // 先计算标准差
    // 设标准差为MD
    // MD=(【D^2+前一天的D^2+...+（n-1)天的D^2】/n)再开平方
    // 上轨=MA+P*MD
    // 下轨=MA-p*MD
    for(let i = data.length-20; i<data.length; i++){
        let ma_n = 0;
        for(let j = i-19; j<=i; j++){
            ma_n = ma_n + Number(data[j].close);
        }
        ma_n = ma_n/20;
        let md = 0;
        for(let j = i-19; j<=i; j++){
            let squire = Number(data[j].close) - ma_n;
            squire = squire*squire;
            md = md + squire;
        }
        md = md/20;
        md = Math.sqrt(md);
        data[i].Boll_ma = ma_n;
        data[i].Boll_up = ma_n + 2*md;
        data[i].Boll_down = ma_n - 2*md;
    }

    return data;
}

function _generateFibla(data){

    for(let index = 144; index < data.length; index++){
        let m13=0,m34=0,m55=0,m144=0;
        for(let j = index-12; j<=index; j++){
            m13 += Number(data[j].close);
        }
        m13 = m13/13;

        for(let j = index-33; j<=index; j++){
            m34 += Number(data[j].close);
        }
        m34 = m34/34;
        for(let j = index-54; j<=index; j++){
            m55 += Number(data[j].close);
        }
        m55 = m55/55;
        for(let j = index-143; j<=index; j++){
            m144 += Number(data[j].close);
        }
        m144 = m144/144;
        data[index].m13 = m13;
        data[index].m34 = m34;
        data[index].m55 = m55;
        data[index].m144 = m144;
    }
}

exports.analysis = analysis;