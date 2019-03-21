$(function ($) {
  // 初始化区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators:false // 滚动条
  });
  // 初始化上拉下拉
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",
      down: {
        /* 1.初始化页面 自动下拉刷新 */
        auto: true,
        callback: function () {
          var that = this;

          getCartData(function (data) {

            $('.mui-table-view').html(template('cartTemplate', {cartList: data}));
            that.endPulldownToRefresh();

          });
        }
      }
    }
  });


  // 2.侧滑 点击编辑 弹出对话框（尺码、数量）
  $('.mui-table-view').on('tap', '.mui-icon-compose', function () {

    /* 根据id去获取缓存的数据 */
    var cartId = $(this).parent().data('id');

    var currObj = LT.getItemById(window.cartData,cartId);

    var html = template('editTemplate', currObj);

    /*html字符会渲染\n,需要清除*/
    html = html.replace(/\n/g, '');

    mui.confirm(html, '商品编辑', ['确定','取消'], function(e) {

      if (e.index == 0) {
        /* 发送ajax请求更新数据 */
        var size = $('.btn_size.now').html();
        var num = $('.p_number input').val();
        LT.loginAjax({
          type: 'post',
          url: '/cart/updateCart',
          data: {id: cartId, size: size, num: num},
          dataType: 'json',
          success: function (data) {
            if (data.success == true) {
              /* 利用缓存的数据更新列表 */
              currObj.size = size;
              currObj.num = num;

              $('.mui-table-view').html(template('cartTemplate', {cartList: window.cartData}));
            }
          }
        });

      } else {
        // TODO
      }
    })

  });
  /* 对弹出框的事件绑定 */
  $('body').on('tap', '.p_size .btn_size', function () {
    $(this).addClass('now').siblings().removeClass('now');
  });

  $('body').on('tap', '.p_number span', function () {
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

      if (currNum <= 1) {
        mui.toast('不能在少啦！');
        return false;
      }
      currNum--;
    }

    $input.val(currNum);

  });
  // 3.侧滑 点击删除 弹出确认框
  $('.mui-table-view').on('tap', '.mui-icon-trash', function () {
    var $this = $(this);
    var cartId = $this.parent().data('id');
    mui.confirm('您确认是否删除该商品！', '商品删除', ['确定','取消'], function(e) {

      if (e.index == 0) {
        LT.loginAjax({
          type: 'get',
          url: '/cart/deleteCart',
          data: {id: cartId},
          dataType: 'json',
          success: function (data) {
            if (data.success == true) {
              $this.parent().parent().remove();
              setAmount();
            }
          }
        });
      } else {
        // TODO
      }

    })
  });
  // 4.点击刷新按钮刷新
  $('.fa-refresh').off('tap').on('tap', function () {
    mui('#refreshContainer').pullRefresh().pulldownLoading();
  });
  // 5.点击复选框 计算总金额
  $('.mui-table-view').on('change', '[type=checkbox]', function () {
    setAmount();
  });


});
// 获取购物车数据
var getCartData = function (callback) {
  LT.loginAjax({
    type: 'get',
    url: '/cart/queryCart',
    data: '',
    dataType: 'json',
    success: function (data) {
      // 缓存数据
      window.cartData = data;
      callback && callback(data);
    }
  });
};

// 计算总金额
var setAmount = function () {

  var amountSum = 0;
  var $checked = $('[type=checkbox]:checked');

  $checked.each(function (i, item) {
    var id = $(this).data('id');

    var currentObj = LT.getItemById(window.cartData, id);

    var num = currentObj.num;
    var price = currentObj.price;

    var amount = num * price;

    amountSum += amount;

  });

  /* 保留两位小数 并 向下取整 */
  amountSum = Math.floor(amountSum * 100) / 100;

  $('#cartAmount').html(amountSum);

};