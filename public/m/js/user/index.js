$(function ($) {
  // 个人信息
  LT.loginAjax({
    type: 'get',
    url: '/user/queryUserMessage',
    data: '',
    dataType: 'json',
    success: function (data) {

      $('.mui-media-body').html(template('infoTemplate', data));

    }
  });

  // 登出
  $('.btn_outLogin').on('tap', function () {
    $.ajax({
      type: 'get',
      url: '/user/logout',
      data: '',
      dataType: 'json',
      success: function (data) {
        if (data.success == true) {
          location.href = LT.loginUrl;
        }
      }
    });
  });
});