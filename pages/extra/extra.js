import * as echarts from '../components/ec-canvas/echarts';

const app = getApp();

var a = new Array();
var b = new Array();
var i = 5;

while (i >= 0) {
  a.push(parseInt(Math.random() * (500 - 100 + 1) + 100, 10))
  b.push(parseInt(Math.random() * (500 - 100 + 1) + 100, 10))
  i--;
}

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    color: ["red", "black"],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      shape: 'circle',
      indicator: [{
        name: '智商',
        max: 500
      },
      {
        name: '情商',
        max: 500
      },
      {
        name: '德商',
        max: 500
      },
      {
        name: '财商',
        max: 500
      },
      {
        name: '健商',
        max: 500
      },
      {
        name: '心商',
        max: 500
      }
      ]
    },
    series: [{
      name: '你 vs TA',
      type: 'radar',
      data: [{
        value: a,
        name: '你'
      }, {
        value: b,
        name: 'TA'
      }
      ]
    }]
  };
  chart.setOption(option);
  return chart;
}

function getMsg(){
  var msg = ``,i;
  for(i = 0 ; i < 6 ; i++){
    if(b[i] - a[i] >= 50){
      if(i == 0)
        msg += '恕我直言, 你的智商可能低了点...\n'
      if(i == 1)
        msg += '唔... 情商太低了吧? 找到对象了么\n'
      if(i == 2)
        msg += '没事没事...德商又不能当饭吃\n'
      if(i == 3)
        msg += '许多人之所以没钱, 是因为他们太穷了\n'
      if(i == 4)
        msg += '健康的身体是个好东西, 我希望你也有一个\n'
      if(i == 5)
        msg += '那个... 如果你有什么心理压力一定要找人倾诉啊!!'
    }
  }
  return msg
}
Page({
  data: {
    ec: {
      onInit: initChart,
    },
    msg: getMsg()
  },
  onLoad(){
    if(app.globalData.extraCount == 2){
      wx.showModal({
        content: '你以为数据可以刷新么?',
        showCancel: false
      })
    } else if (app.globalData.extraCount > 2){
      wx.showModal({
        content: '孩子...别挣扎了!',
        showCancel: false
      })
    }
  }
});
