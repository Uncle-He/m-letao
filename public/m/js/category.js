$(function ($) {
  // 一级分类
  getFirstCategoryData(function (data) {
    /*渲染一级分类模版*/
    $('.cate_left ul').html(template('firstTemplate', data));

    /*一级分类绑定tap事件*/
    initSecondCategoryTabHandle();

    /*渲染一级分类对应的二级分类模版*/
    var firstCategoryId = $('.cate_left ul li:first-child a').data('id');
    randerSecondCategory(firstCategoryId);
  });
});
// 一级分类获取数据
var getFirstCategoryData = function (callback) {
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    data: '',
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    },
    error: function () {
      console.log('ajax请求一级分类数据失败');
    }
  });
};

// 二级分类获取数据
var getSecondCategoryData = function (id,callback) {
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategory',
    data: id,
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    },
    error: function () {
      console.log('ajax请求二级分类数据失败');
    }
  });
};

// 绑定事件，点击一级分类加载对应的二级分类
var initSecondCategoryTabHandle = function () {
  $('.cate_left ul li a').on('tap', function (e) {
    if ($(this).parent().hasClass('now')) return false;
    $('.cate_left ul li').removeClass('now');
    $(this).parent('li').addClass('now');
    var firstCategoryId = $(this).data('id');
    randerSecondCategory(firstCategoryId);
  });
};

// 二级分类渲染
var randerSecondCategory = function (firstCategroyId) {
  getSecondCategoryData({id: firstCategroyId},function (data) {
    $('.cate_right ul').html(template('secondTemplate', data));
  });
};