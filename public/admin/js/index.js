$(function () {
  barCharts();
  pieCharts();
});

var barCharts = function () {
  /* 1.引入echarts文件 */
  /* 2.指定DOM元素作为图标容器 */
  /* 3.配置参数 */
  var myCharts = echarts.init(document.querySelector('.picTable:first-child'));
  var options = {
    title: {
      text: '2017年注册人数'
    },
    legend: {

    },
    data: [
      {
        name: '注册人数'
      }
    ],
    color: ['#3398DB'],
    tooltip : {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        data : ['一月','二月','三月','四月','五月','六月','七月']
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'注册人数',
        type:'bar',
        barWidth: '60%',
        data:[10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  myCharts.setOption(options);
};

var pieCharts = function () {
  var myCharts = echarts.init(document.querySelector('.picTable:last-child'));
  var options = {
    title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myCharts.setOption(options);
};