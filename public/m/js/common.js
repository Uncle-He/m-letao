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