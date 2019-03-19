$(function ($) {
  // 区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false
  });

  /*1.页面初始化的时候：关键字在输入框内显示*/
  // 获取关键
  var urlParams = LT.getParamsByUrl();
  var $input = $('.lt_search input').val(urlParams.key || '');

  /*2.页面初始化的时候：根据关键字查询第一页数据4条*/
  // 下拉刷新自动加载了一次数据  重复操作
  // getSearchData(
  //   {proName: urlParams.key, page: 1, pageSize: 4},
  //   function (data) {
  //     $('.lt_product').html(template('searchTemplate', data));
  //   }
  // );
  /*3.用户点击搜索的时候 根据新的关键字搜索商品 重置排序功能*/
  $('.lt_search a').on('tap', function () {
    var key = $input.val();
    if (!key) {
      mui.toast('请输入关键字');
      return false;
    }
    getSearchData(
      {proName: key, page: 1, pageSize: 4},
      function (data) {
        $('.lt_product').html(template('searchTemplate', data));
      }
    );
  });
  /*4.用户点击排序的时候  根据排序的选项去进行排序（默认的时候是 降序  再次点击的时候 升序）*/
  $('.lt_order a').on('tap', function () {

    var $this = $(this);

    if (!$this.hasClass('now')) {

      $this.addClass('now').siblings().removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

    } else {

      if ($this.find('span').hasClass('fa-angle-down')) {
        $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
      } else {
        $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
      }

    }

    // 获取当前点击的功能参数 price 1(升序) 2(降序) nun 1 2
    var order = $this.attr('data-order');
    var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
    var key = $input.val();
    if (!key) {
      mui.toast('请输入关键字');
      return false;
    }
    var params = {proName: key, page: 1, pageSize: 4};

    params[order] = orderVal;

    // 获取数据
    getSearchData(
      params,
      function (data) {
        $('.lt_product').html(template('searchTemplate', data));
      }
    );

  });
  /*5.用户下拉的时候  根据当前条件刷新 上拉加载重置  排序功能也重置 */
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          // 组件对象
          var that = this;

          var key = $input.val();
          if (!key) {
            mui.toast('请输入关键字');
            return false;
          }

          // 重置排序样式
          $('.lt_order a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

          // 拉去数据
          getSearchData(
            {proName: key, page: 1, pageSize: 4},
            function (data) {
              $('.lt_product').html(template('searchTemplate', data));
              // 停止下拉刷新加载状态
              that.endPulldownToRefresh();
              // 重置上拉加载
              that.refresh(true);
            }
          );
        }
      },
      up: {
        callback: function () {
          // 组件对象
          var that = this;

          var key = $input.val();
          if (!key) {
            mui.toast('请输入关键字');
            return false;
          }
          window.currentPage++;

          // 获取当前排序的属性(排序)
          var order = $('.lt_order a.now').attr('data-order');
          var orderVal = $('.lt_order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;

          var params = {
            proName: key,
            page: window.currentPage,
            pageSize: 4,
          };

          // 排序属性
          params[order] = orderVal;

          getSearchData(
            params,
            function (data) {
              $('.lt_product').append(template('searchTemplate', data));
              // 停止下拉刷新加载状态
              if (data.data.length) {
                that.endPullupToRefresh();
              } else {
                that.endPullupToRefresh(true);
              }
            }
          );
        }
      }
    }
  });
  /*6.用户上拉的时候  加载下一页（没有数据不去加载了）*/
});

var getSearchData = function (params, callback) {
  $.ajax({
    type: 'get',
    url: '/product/queryProduct',
    data: params,
    dataType: 'json',
    success: function (data) {
      // 储存当前页码
      window.currentPage = data.page;
      callback && callback(data);
    },
    error: function () {
      console.log('获取搜索商品数据失败');
    }
  });
};