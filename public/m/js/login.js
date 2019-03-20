$(function () {

  $('.btn_login').on('tap', function () {
    // 获取表单序列化数据
    var formData = $('.form_box').serialize();

    // 数据校验(因为序列化的数据是字符串格式因此需要转成对象形式)
    var dataObject = LT.serialize2object(formData);

    if (!dataObject.username) {
      mui.toast('请您输入用户名');
      return false;
    }

    if (!dataObject.password) {
      mui.toast('请您输入密码');
      return false;
    }

    // 提交数据
    $.ajax({
      type: 'post',
      url: '/user/login',
      /* 支持 serialize serializeArray dataObject */
      data: formData,
      dataType: 'json',
      success: function (data) {
        if (data.success == true) {
          /* 携带地址 和 未携带地址 */
          var returnUrl = location.search.replace('?returnUrl=', '');

          if (returnUrl) {
            location.href = returnUrl;
          } else {
            location.href = LT.userCoreUrl;
          }
        } else {
          mui.toast(data.message);
        }
      }
    });
  });
});