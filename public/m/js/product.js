$(function () {
  var productId = window.LT.getParamsByUrl().productId;
  // 数据加载
  getProductData(productId,function (data) {

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

    // 尺码选择
    $('.p_size .btn_size').on('tap', function () {
      $(this).addClass('now').siblings().removeClass('now');
    });

    // 数量选择
    $('.p_number span').on('tap', function () {
      var $input = $(this).siblings('input');
      var currNum = $input.val();
      var maxNum = $input.data('max');

      if ($(this).hasClass('jia')) {

        if (currNum >= maxNum) {
          setTimeout(function () {
            mui.toast('我们没有那么多货啦！');
          },100);
          return false;
        }
        currNum++;
      } else {

        if (currNum <= 0) {
          return false;
        }
        currNum--;
      }

      $input.val(currNum);

    });

    // 加入购物车
    $('.btn_addCart').on('tap', function () {
      // 数据校验
      var $changeBtn = $('.btn_size.now');
      if (!$changeBtn.length){
        mui.toast('请您选择尺码');
        return false;
      }
      var $inputVal = $('.p_number input').val();
      if ($inputVal <= 0) {
        mui.toast('请您选择数量');
        return false;
      }

      // 提交数据
      LT.loginAjax({
        type: 'post',
        url: '/cart/addCart',
        data: {productId: productId, num: $inputVal, size: $changeBtn.html()},
        dataType: 'json',
        success: function (data) {

          if (data.success == true) {
            /*提示框提醒*/
            mui.confirm('添加成功,去购物车看看', '温馨提示', ['是','否'], function(e) {
              if (e.index == 0) {
                location.href = LT.cartUrl;
              } else {
                // TODO
              }
            })
          }

        }
      });

    });

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