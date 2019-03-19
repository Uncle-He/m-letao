$(function () {
  // 数据加载
  getProductData(window.LT.getParamsByUrl().productId,function (data) {

    // 清除loading
    $('.loading').remove();

    // 渲染商品详情页
    $('.mui-scroll').html(template('detailTemplate', data));

    // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005,
      indicators: false
    });

    // 轮播图
    mui('.mui-slider').slider({
      interval: 2000
    });

    // 商品的添加和减少
    

  });


});

var getProductData = function (productId,callback) {
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {id: productId},
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    },
    error: function () {
      console.log('请求产品详情数据失败');
    }
  });
};