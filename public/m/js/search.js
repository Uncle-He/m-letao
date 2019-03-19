$(function ($) {
  // 页面加载重置input的值并渲染历史记录模版
  $('.lt_search input').val('');
  $('.lt_history').html(template('historyTemplate',{keyWord: getSearchData()}));

  // 注册委托事件
  $('body').on('tap','.search_btn', function () {
    // 跳转去搜索列表页并带上关键字并判断当用户没有输入关键字时提示用户'请输入关键字'
    var key = $.trim($('.lt_search input').val());
    if (!key) {
      mui.toast('请输入关键字');
      return false;
    }

    // 添加关键字
    addSearchData(key);

    // 携带关键字跳转
    location.href = 'searchList.html?key='+ key;
  }).on('tap','.lt_history .icon_clear',function () {
    // 点击清除记录按钮清除关键词
    localStorage.clear();
    $('.lt_history').html(template('historyTemplate',{keyWord: getSearchData()}));
  }).on('tap','.lt_history .icon_delete', function () {
    // 点击具体的关键词删除按钮
    var dataKey = $(this).parent().find('[data-key]').data('key');
    removeSearchData(String(dataKey));
    $('.lt_history').html(template('historyTemplate',{keyWord: getSearchData()}));
  }).on('tap', '.lt_history [data-key]', function () {
    // 点击历史关键词跳转
    window.location.href = 'searchList.html?' + $(this).data('key');
  })
});
// 获取搜索记录
var getSearchData = function(){
  return JSON.parse(localStorage.getItem('leTaoSearchHistory') || '[]');
};

// 添加搜索记录
var addSearchData = function (key) {

  var keyArray = getSearchData();

  // 如果有相同的关键词就删除原来的关键词
  $.each(keyArray,function (i, item) {
    if (item === key) {
      keyArray.splice(i,1);
    }
  });

  keyArray.push(key);

  // 限制关键词的储存数量（10个）
  if (keyArray.length > 10) {
    keyArray.splice(0, keyArray.length - 10);
  }

  localStorage.setItem('leTaoSearchHistory',JSON.stringify(keyArray));
};

// 删除关键词
var removeSearchData = function (dataKey) {
  var keyArray = getSearchData();
  $.each(keyArray,function (i,item) {
    if (item === dataKey) {
      keyArray.splice(i,1);
    }
  });

  localStorage.setItem('leTaoSearchHistory', JSON.stringify(keyArray));
};
