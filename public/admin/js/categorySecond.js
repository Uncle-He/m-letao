$(function () {
  /* 1.默认第一页展示 */
  window.page = 1;
  var render = function () {
    getCategorySecondData(function (data) {
      // 辅助方法: 在模版内部可以使用外部的方法
      template.helper('getJquery', function () {
        return jQuery;
      });
      // 渲染模版
      $('.ad_content tbody').html(template('list', data));

      /* 2.分页展示 */
      // 初始化分页组建
      $('.pagination').bootstrapPaginator({
        /*对应的bootstrap版本*/
        bootstrapMajorVersion:3,
        /*分页按钮的大小*/
        size:'small',
        /*当前页码*/
        currentPage:data.page,
        /*一共多少页*/
        totalPages:Math.ceil(data.total/data.size),
        /*页码按钮的数量 默认是5*/
        numberOfPages:3,
        /*点击页码渲染*/
        /*监听按钮的点击事件 获取点击的时候的页码*/
        onPageClicked:function (event, originalEvent, type,page) {
          /*1. event jquery的事件對象*/
          /*2. originalEvent 原生dom的事件對象*/
          /*3. type 按鈕的類型 */
          /*4. 按鈕對應的頁碼*/
          //console.log(page);
          window.page = page;
          render();
        }
      });
    });
  };
  render();
  /* 3.点击添加分类按钮 弹出模态框内容 */
  getCategoryFirstData(function (data) {
    $('.dropdown-menu').html(template('dropDown', data)).on('click', 'a', function () {
      $('.dropdown-text').html($(this).html());
      $('[name=categoryId]').val($(this).data('id'));
    });
  });
  /* 4.点击确认按钮 提交（一级分类id,二级分类名称,二级分类logo） */
  $('#form').bootstrapValidator({
    /* 校验所有表单元素包含隐藏元素 */
    excluded:[],
    /*配置校验的不同状态下显示的图标*/
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    /*需要校验的表单元素 通过名称 name*/
    fields: {
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandLogo:{
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();

    var $form = $(e.target);

    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$form.serialize(),
      dataType:'json',
      success:function (data) {
        if(data.success == true){
          window.page = 1;
          render();
          $('#save').modal('hide');
        }
      }
    });
  });
});

var getCategorySecondData = function (callback) {
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategoryPaging',
    data: {page: window.page || 1, pageSize: 5},
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    }
  });
};

var getCategoryFirstData = function (callback) {
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {page: 1, pageSize: 5000},
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    }
  });
};

var initFileUpload = function () {
  // 初始化上传插件
  $('[name="pic1"]').fileupload({
    /*上传地址*/
    url:'/category/addSecondCategoryPic',
    /*返回格式*/
    dataType: 'json',
    /*上传成功*/
    done: function (e, data) {
      $('#uploadImage').attr('src',data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });
};