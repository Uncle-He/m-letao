$(function ($) {
  /* 初始化验证表单,并配置参数 */
  $('#login').bootstrapValidator({
    // 配置校验时不同状态不同显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 成功状态
      invalid: 'glyphicon glyphicon-remove', // 失败状态
      validating: 'glyphicon glyphicon-refresh' // 正在验证状态
    },
    // 需要验证的表单元素 通过name属性关联
    fields: {
      username: { // 对应的input元素name值
        validators: { // 校验规则
          notEmpty: { // 非空校验
            message: '用户名不能为空'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_]+$/,
            message: '用户名只能包含大写、小写、数字和下划线'
          },
          callback: { // 自己定义的错误消息提示 和 插件无关
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 18,
            message: '密码长度必须在6到18位之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
  }).on('success.form.bv', function(e) { //校验成功时触发
    e.preventDefault(); // 阻止表单默认提交

    var $form = $(e.target);

    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serializeArray(),
      dataType: 'json',
      success: function (data) {
        if (data.success == true) {
          location.href = '/admin/';
        } else if(data.error == 1000) { // 用户名错误
          /*设置用户名这个表单元素的校验状态为失败*/
          /*插件校验的状态 NOT_VALIDATED 还没校验, VALIDATING 校验中, INVALID 失败,  VALID 成功*/
          /*1.获取校验组件*/
          /*2.调用更改状态的函数*/
          /*3.校验的表单，改成什么状态，使用哪个校验规则*/

          $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');

        } else if(data.error == 1001) { // 密码错误
          $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    });
  });
});