
var express = require('express');
var router = express.Router();
const jsonfile = require('jsonfile');
let taskchain = require('task-chain');
let analysisor = require('./server/AnalysisCenter');

let GetDataEngine = require('./server/Get15MinDataEngine');
const JSONFILEPATH = __dirname+"/server/stocks.json";
let stopFlag = false;
let taskRunner = new taskchain.ChainTaskRunner();
/* GET home page. */

function getNext15MinsTimeOut(){

    let now = new Date();
    let target = new Date();
    let targetMins = 0;
    let targetHour = 1;
    if(0<Number(now.getMinutes()) && Number(now.getMinutes())<15){
        targetMins = 15;
    } else if (15<=Number(now.getMinutes()) && Number(now.getMinutes())<30){
        targetMins = 30
    } else if (30<=Number(now.getMinutes()) && Number(now.getMinutes())<45){
        targetMins = 45
    } else {
        targetHour = 1;
    }
    target.setHours(now.getHours() + targetHour);
    target.setMinutes(targetMins);
    return target.getTime()-now.getTime();
}

router.get('/startMonitor', function(req, res, next) {
  stopFlag = false;
  function analysisStocks(res, initialFlag){
    let stocks = jsonfile.readFileSync(JSONFILEPATH);
    //res.json(stocks);
    stocks.forEach((item, index)=>{
      let task = new taskchain.ChainTask(()=>{
        GetDataEngine.getDataOfStock(item, (data)=>{
          analysisor.analysis(data, item);
          task.end();
          if(index == stocks.length-1 && !stopFlag){
            setTimeout(()=>{
              analysisStocks();
            }, getNext15MinsTimeOut());
            
            if(initialFlag){
              res.end("success");
            }
          }
        });
      });
      taskRunner.addTask(task);
    });
  }
  analysisStocks(res, true);
});

router.get('/stopMonitor', function(req, res, next) {
  stopFlag = true;
  res.json({result:true});
});

router.get('/isMonotoring', function(req, res, next) {
  res.json({result:stopFlag});
});

router.get('/setStocks', function(req, res, next) {
  let stocks = req.query.stocks;
  if(stocks.length>0){
    stocks=stocks.split('_');
    jsonfile.writeFileSync(JSONFILEPATH, stocks);
    res.end('success');
  } else {
    res.end('error')
  }
});

router.get('/getConfiguredStock', function(req, res, next) {
  res.json(jsonfile.readFileSync(JSONFILEPATH));
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addStocks', function(req, res, next) {
  let stocks = req.query.stocks;
  if(stocks.length>0){
    stocks=stocks.split('_');
    let oldStocks = jsonfile.readFileSync(JSONFILEPATH);
    stocks = stocks.concat(oldStocks);
    jsonfile.writeFileSync(JSONFILEPATH, stocks);
    res.end('success');
  } else {
    res.end('error')
  }
});

module.exports = router;
