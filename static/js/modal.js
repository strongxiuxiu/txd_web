(function(){
    let user_grader = localStorage.getItem("user_grader")
    layui.use(['laydate', 'element', 'laypage', 'layer'], function () {
        $ = layui.jquery;//jquery
        // laydate = layui.laydate;//日期插件
        lement = layui.element();//面包导航
        laypage = layui.laypage;//分页
        layer = layui.layer;//弹出层

        let accuct_status = $("#status").text()
        console.log(accuct_status)
        if(accuct_status == 1){
            if(user_grader == 1 || user_grader == 2){
                layer.open({
                    type:0, //设置类型 默认为0 1页面层 2ifream层
                    title:"提示", //标题
                    content:'您需要完善信息确保用户安全',//内容 type=0为内容
                    skin:'layui-layer-molv',//皮肤
                    area:['200px','150px'], //宽高
                    icon:1, //只对type=0有效
                    btn:['进入个人中心','不再提示'],
                    yes: function(index,layero){
                        console.log(index)
                    //   window.location.href = "/user/own"
                    },
                    btn2:function (index,layero) {
                        let  userid = $("#user_id").text()
                        axios.get('/user/set/status',{params:{
                            user_id:userid
                        }}).then(res=>{
                            console.log(res)
                            if(res.data.code == 1){
                                layer.msg(res.data.Message)
                                layer.close(index);
                            }
                        })
                    },
                    cancel:function (index,layero) {
                        layer.close(index);
                    },
                    btnAlign:'c', //按钮对齐方式
                    shade:[0.8,'#393D49'], //遮罩
                    shadeClose:true //当点击遮罩是否关闭弹层
                });
            }
         
        }
})
    // let user_grader = load 
  

})()