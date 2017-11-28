var express = require('express');
var router = express.Router();
const jsonfile = require('jsonfile');
let taskchain = require('task-chain');

let GetDataEngine = require('./server/Get15MinDataEngine');

let stopFlag = false;
let taskRunner = new taskchain.ChainTaskRunner();
/* GET home page. */
router.get('/', function(req, res, next) {

  stopFlag = false;
  function analysisStocks(res, initialFlag){
    let stocks = jsonfile.readFileSync(__dirname+"/server/stocks.json");
    //res.json(stocks);
    stocks.forEach((item, index)=>{
      let task = new taskchain.ChainTask(()=>{
        GetDataEngine.getDataOfStock(item, (data)=>{
          task.end();
          if(index == stocks.length-1){
            analysisStocks();
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
  // GetDataEngine.getDataOfStock('sh601677', (data)=>{
  //   res.json(data);
  // });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
