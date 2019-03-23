/* 后台管理系统的公共文件 */

/* 进度条配置 */
NProgress.configure({
  showSpinner: false
});

/* 进度条 */
$(window).ajaxStart(function () {
  NProgress.start();
});
$(window).ajaxStart(function () {
  NProgress.done();
});

/* 侧边栏菜单的显示与隐藏 */
$('[data-menu]').on('click', function () {
  $('.ad_aside').toggle();
  $('.ad_section').toggleClass('menu');
});

/* 二级菜单的显示与隐藏 */
$('.menu [href="javascript:;"]').on('click', function () {
  $(this).siblings('.child').slideToggle();
});

/* 登出 */
// 由于每个页面都需要登出模态框，所以将模态框存为js变量追加到每个页面中
var logoutModal = ['<div id="logoutModal" class="modal fade" tabindex="-1">',
                    '  <div class="modal-dialog modal-sm">',
                    '    <div class="modal-content">',
                    '      <div class="modal-header">',
                    '        <button type="button" class="close" data-dismiss="modal"><span',
                    '          aria-hidden="true">&times;</span></button>',
                    '        <h4 class="modal-title">温馨提示</h4>',
                    '      </div>',
                    '      <div class="modal-body">',
                    '        <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span>您确定要退出后台管理系统吗？</p>',
                    '      </div>',
                    '      <div class="modal-footer">',
                    '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
                    '        <button type="button" class="btn btn-primary">确定</button>',
                    '      </div>',
                    '    </div>',
                    '  </div>',
                    '</div>'].join("");
$('body').append(logoutModal);
$('.ad_nav [data-logout]').on('click', function () {
  var $logoutModal = $('#logoutModal');
  $logoutModal.modal('show').find('.btn-primary').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      data: '',
      dataType: 'json',
      success: function (data) {
        if (data.success == true) {
          $logoutModal.show('hide');
          location.href = '/admin/login.html';
        } else {

        }
      }
    });
  });
});