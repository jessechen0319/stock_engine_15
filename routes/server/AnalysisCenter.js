function analysis(data, stock){
    console.log(JSON.stringify(data));
    if(data.length>150){
        _generateFibla(data);
        console.log(data[data.length-1]);
    }
    
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