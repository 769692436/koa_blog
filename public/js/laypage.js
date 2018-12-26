layui.use('laypage', function(){
  var laypage = layui.laypage;

  //执行一个laypage实例
  laypage.render({
    elem: 'laypage',
    count: parseInt(document.getElementById('laypage').getAttribute("data-maxnum")), //数据总数，从服务端得到
    limit: 5,
    groups: 4,
    curr: location.pathname.replace("/page/", ""),
    jump(obj, f){

      if(!f){
        return;
      }
      document.querySelectorAll('#laypage a').forEach((v, i) => {
        var pageValue = `/page/${v.getAttribute("data-page")}`;
        if(v.classList.contains('layui-disabled')){
          v.href="javascript:;"
        }else{
          v.href = pageValue;
        }
      });
    },
    theme : "#1E9FFF"
  });
});
