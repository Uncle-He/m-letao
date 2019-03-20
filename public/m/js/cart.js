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
  // 3.侧滑 点击删除 弹出确认框
  // 4.点击刷新按钮刷新
  $('.fa-refresh').off('tap').on('tap', function () {
    mui('#refreshContainer').pullRefresh().pulldownLoading();
  });
  // 5.点击复选框 计算总金额



});

var getCartData = function (callback) {
  LT.loginAjax({
    type: 'get',
    url: '/cart/queryCart',
    data: '',
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    }
  });
};