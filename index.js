const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


app.get('/', (req, res) => res.render('pages/index'))


app.all('/ajax/hdgame_h.jsp*', function(req, res){
  console.log('req.query:', req.query);

  var r = { rt: 0 }
  //设置成绩
  if( req.query.cmd == 'setAchieve'){
    r.isSuc = true
  }
  //排行榜
  if( req.query.cmd == 'getRankList'){
    var playerId = req.query.playerId
    var limit = req.query.limit
    var list = []
    for( var i = 0; i<limit; i++){
      var info = {
        headImg:'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJR8XicKtnzHnBNlVDlus4ljibQtfWtgNDzgTmnHQJuMoMjmXx3jGSMNERzvl1YFvKxWy6icvBAYkwSA/132'
      }
      list.push( { name: 'david'+i, achievement: i*10, scoreUnit: '分', info: JSON.stringify( info )})
    }
    r.rankList = list
    r.rank = Math.floor(list.length * Math.random())
    r.isRankAll = true
  }
  //我的奖品
  if( req.query.cmd == 'getGiftList'){
    var list = []
    r.success = true
    var awardModel = {awardtype:1,cbt:(new Date()).toISOString(), cet:(new Date()).toISOString(), deadline:'这是使用期限'}
    // 0: 未领"; 1:已核销 2:未核销 3:已过期 4:已作废 5:已失效
    var award = { anwei: false, awardLevel: 0, level: 1, codeStatus: 0, awardCode: 'awardCode', awardStyle:'几等奖', awardName:'奖品名称', awardInfo:  JSON.stringify(awardModel) }
    list.push( award )
    r.list = list
  }
  //取得抽奖结果
  if( req.query.cmd == 'getResult'){
    r.success = true
    r.awardStyle = '几等奖'
    r.awardName = '奖品名称'
    r.awardCode = '兑奖码'
    r.awardTypeNum = ''
    //giftImage:result.awardImage,
    //r.awardImageW = '6rem'
    //r.awardImageH = '6rem'
    r.awardIndex = 1
  }
  res.send( JSON.stringify( r ))
})

app.all('/ajax/log_h.jsp*', function(req, res){
  console.log('req.query:', req.query);
  var r = { rt: 0 }
  res.send( JSON.stringify( r ))
})

app.all('/ajax/logJsErr_h.jsp*', function(req, res){
  console.log('req.query:', req.query);
  var r = { rt: 0 }
  res.send( JSON.stringify( r ))
})

app.all('/ajax/logAjaxErr_h.jsp*', function(req, res){
  console.log('req.query:', req.query);
  var r = { rt: 0 }
  res.send( JSON.stringify( r ))
})
