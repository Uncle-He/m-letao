window.LT = {};
// 一对象的形式获取地址栏中的参数
LT.getParamsByUrl = function () {
  var params = {};
  var searchKey = window.location.search;

  if (searchKey) {
    searchKey = searchKey.replace('?', '');
    var arr = searchKey.split("&");
    arr.forEach(function (item, i) {

      var itemArr = item.split('=');

      params[itemArr[0]] = itemArr[1];
    });
  }

  return params;
};

LT.loginUrl = '/m/user/login.html';
LT.cartUrl = '/m/user/cart.html';
LT.userCoreUrl = 'm/user/index.html';
// 需要登录的ajax请求
LT.loginAjax = function (params) {
  /* params ====> {} */
  $.ajax({
    type: params.type || 'get',
    url: params.url || '#',
    data: params.data || '',
    dataType: params.dataType || 'json',
    success: function (data) {
      if (data.error == 400) {
        /*跳转到登录页，将当前地址传递到登录页*/
        location.href = LT.loginUrl + '?returnUrl=' + location.href;
        return false;
      } else {
        params.success && params.success(data);
      }
    },
    error: function () {
      mui.toast('服务器繁忙');
    }
  });
};

// 序列化表单数据转对象
LT.serialize2object = function (serializeStr) {
  var obj = {};
  var arr = serializeStr.split('&');
  arr.forEach(function (item, i) {
    var itemArr = item.split('=');
    obj[itemArr[0]] = itemArr[1];
  });
  return obj;
};

// 根据ID获取对应的数据
LT.getItemById = function (arr,id) {
  var obj = null;
  arr.forEach(function (item, i) {
    if (item.id == id) {
      obj = item;
    }
  });
  return obj;
};