$(function ($) {
  // 页面加载重置input的值并渲染历史记录模版
  $('.lt_search input').val('');
  $('.lt_history').html(template('historyTemplate',{keyWord: getSearchData()}));

  // 点击搜索按钮储存关键词
  $('.lt_search a').on('tap',function () {
    var key = $.trim($('.lt_search input').val());
    // 跳转去搜索列表页并带上关键字并判断当用户没有输入关键字时提示用户'请输入关键字'
    if (!key) {
      mui.toast('请输入关键字');
      return false;
    }

    // 添加关键字
    addSearchData(key);

    // 携带关键字跳转
    // location.href = 'searchList.html?key='+ key;
  });

  // 点击清除记录按钮清除关键词
  $('.lt_history .icon_clear').on('tap', function () {
    localStorage.clear();
    $('.lt_history').html(template('historyTemplate',{keyWord: getSearchData()}));
  });

  // 点击具体的关键词删除按钮
  $('.lt_history .icon_delete').on('tap', function () {
    var dataKey = $(this).parent().find('[data-key]').data('key');
    console.log(dataKey);
    removeSearchData(String(dataKey));
    $('.lt_history').html(template('historyTemplate',{keyWord: getSearchData()}));
  });

  // 点击历史关键词跳转
  $('.lt_history [data-key]').on('tap', function () {
    // window.location.href = 'searchList.html?' + $(this).data('key');
  });
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
