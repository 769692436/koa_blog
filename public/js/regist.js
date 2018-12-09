layui.use(['element', 'layer', 'form'], function(){
  var element = layui.element;
  var layer = layui.layer;
  var form = layui.form;
  var $ = layui.$;
  var $username = $(".layui-show input[name=username]");
  var $pwd = $(".layui-show input[name=password]");
  var $pwd2 = $(".layui-show input[name=confirmPWD]");

  $pwd2.on('blur', function(){
    var pwd = $pwd.val();
    if($(this).val() !== pwd){
      layer.msg("两次密码不一致");
      $(this).val("");
    }
  });
  console.log($('.layui-tab-item.layui-show .sub-btn'));
  $('.layui-tab-item.layui-show #regist-form .sub-btn').on('click', function(){
    var formElement = document.querySelector('.layui-tab-item.layui-show .layui-form');
    var formData = new FormData(formElement);
    $.ajax({
      type: 'post',
      url: '/user/reg',
      data: formData,
      processData: false,
      contentType: false,
      success: function(res){
        switch(res.status){
          case 'reg_success': layer.msg('注册成功！');break;
          case 'reg_failed': layer.msg('用户名已被注册！');break;
          case 'reg_error': layer.msg('注册失败，请刷新页面重试！');break;
          default: layer.msg('服务器没有回应！');
        }
        setTimeout(function(){
          location.href = res.url;
        },1500)
      }
    });
  });

  //监听提交
  form.on('submit(formDemo)', function(data){
    return false;
  });
});