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
