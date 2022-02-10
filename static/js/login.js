(function(){
    // let user_grader = localStorage.getItem("user_grader")
  let   index_url = 'zdyppf.com:8009'
  let check = true
    $(".tpl-login-btn").click(function(e) {
             //获取用户名与密码的值
            //  console.log("点击")
           var user = $(".username").val();
           var pwd = $(".password").val();
           console.log(user,pwd)
           var l = pwd.length;
            var reg =/^\w+$/;
            if(!pwd){
                $("#textmes").css({
                    opacity: 1,
                    color: "red"
                }).text("密码不符合规范");
              
                return false;
            }
            if(l <6|| l>20){
                $("#textmes").css({
                    opacity: 1,
                    color: "red"
                }).text("密码长度至少6-20位");
             
                return false;
            }
            login()
            check = false
             
    })
    //回车键触发登录函数
    function login(){
        var user = $(".username").val();
        var pwd = $(".password").val();
        if(check){
            $.ajax({
                url: '/login/index/',
                type: 'POST',
                data: {
                    username: user,
                    password: pwd
                },
                success: (res) => {
                    console.log(res)
                    check = false
                    if(res.code == 1){
                        let user_grader = res.data.user_grader
                        localStorage["user_grader"] = user_grader
                        $("#textmes").css({
                            opacity: 1
                        }).text(res.chMessage);
                        $(".username").val("");
                         if(user_grader == 0){
                            setTimeout(function(){
                                window.location.href ='/user/usermanage';
                            },2000)
                         }
                         else{
                            setTimeout(function(){
                                window.location.href ='/';
                            },2000)
                         }
                      
                    }else{
                        $("#textmes").css({
                            opacity: 1
                        }).text(res.chMessage);
                    }
                   
                }
            })

        }
      

    }
})()
$("body").keydown(function(event){
    if(event.keyCode ==13){
        $(".tpl-login-btn").click();

    }
})