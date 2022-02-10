(function(){
    let limits = 10;
    let pages = 1
    let  user_grader = localStorage.getItem("user_grader")
    console.log(user_grader)
    let operation_userId = $("#user_id").text()
    // console.log(operation_userId)
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
    let form_data = new FormData()
        form_data.append('page',pages)
        form_data.append('limit',limits)
        form_data.append('operation_userId',operation_userId)
        $.ajax({
            url:"/user/info",
            type:'POST',
            data:form_data,
            processData: false,  // tell jquery not to process the data
            contentType: false,
            success:function(res){
                console.log(res)
                let team_list = res.data
                let enmessage = $(".enmessage")
               
           
                $(".count_num").text(res.count)
                for(let ii of team_list){
                    let user_status = ""
                    if(ii.account_status == 0){
                        user_status ="未激活"
                    }else{
                        user_status = "已激活"
                    }
                    let teamlist = '';
                    $(".tbContent").append( ` 
                    <tr class="objectx_join_tr">
                    <td class="all-choose">
                    <input type="checkbox" class="object_dl-choose" name="dl-choose">
                    </td>
                    <td style="display: none;" class="object_uuid">${ii.user_id}</td>
                    <td ><img class="head_portrait" src="${ii.head_portrait}" alt=""></td>
                    <td class="objectx_join username_th">${ii.username}</td>
                    <td class="objectx_join name_th">${ii.name}</td>
                    <td class="objectx_join gender_th">${ii.gender}</td>
                    <td class="objectx_join phone_number_th">${ii.phone_number}</td>
                    <td class="objectx_join team_th">${ii.team}</td>
                    <td class="objectx_join position_th">${ii.position}</td>
                    <td class="objectx_join account_status_th">
                    <div class="div_btn">
                    <button class="jihuo_button ${ii.account_status  == 0 ?'success_button': 'danger_button'}">${user_status}</button>
                    </div>
                </td>           
              </tr>`)           
                }

            }
        }).then(()=>{
            let counts = $(".count_num").text()  
            new Pagination({
                element: '#pages', // 渲染的容器  [必填]
                type: 1, // 样式类型，默认1 ，目前可选 [1,2] 可自行增加样式   [非必填]
                layout: 'total, sizes, home, prev, pager, next, last, jumper', // [必填]
                // pageIndex:  // 当前页码 [非必填]
                pageSize: 10, // 每页显示条数   TODO: 默认选中sizes [非必填]
                pageCount: 9, // 页码显示数量，页码必须大于等于5的奇数，默认页码9  TODO:为了样式美观，参数只能为奇数， 否则会报错 [非必填]
                total: counts, // 数据总条数 [必填]
                singlePageHide: false, // 单页隐藏， 默认true  如果为true页码少于一页则不会渲染 [非必填]
                pageSizes: [10, 20, 50,100], // 选择每页条数  TODO: layout的sizes属性存在才生效
                prevText: '上一页', // 上一页文字，不传默认为箭头图标  [非必填]
                nextText: '下一页', // 下一页文字，不传默认为箭头图标 [非必填]
                ellipsis: true, // 页码显示省略符 默认false  [非必填]
                disabled: true, // 显示禁用手势 默认false  [非必填]
                currentChange: function(index, pageSize) { // 页码改变时回调  TODO:第一个参数是当前页码，第二个参数是每页显示条数数量，需使用sizes第二参数才有值。
                    var admin_name = $("#username").text()
                    let limit = pageSize;
                    let page = index
                    console.log(limit,page)
                    let form_data = new FormData()
                        form_data.append('user_name',admin_name)
                        form_data.append('page',page)
                        form_data.append('limit',limit)
                        form_data.append('operation_userId',operation_userId)
                    $.ajax({
                        url:"/user/info",
                        type:'POST',
                        data:form_data,
                        processData: false,  // tell jquery not to process the data
                        contentType: false,
                        success:function(res){
                            $(".tbContent").children().remove()
                            // console.log(res)
                            let team_list = res.data
                            $(".count_num").text(res.count)
                            for(let ii of team_list){
                                let user_status = ""
                                // console.log(ii.account_status)
                                if(ii.account_status == 0){
                                    user_status ="未激活"
                                }else{
                                    user_status = "已激活"
                                }
                                $(".tbContent").append( ` 
                                <tr class="objectx_join_tr">
                                    <td class="all-choose">
                                    <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                    </td>
                                    <td style="display: none;" class="object_uuid">${ii.user_id}</td>
                                    <td ><img class="head_portrait" src="${ii.head_portrait}" alt=""></td>
                                    <td class="objectx_join username_th">${ii.username}</td>
                                    <td class="objectx_join name_th">${ii.name}</td>
                                    <td class="objectx_join gender_th">${ii.gender}</td>
                                    <td class="objectx_join phone_number_th">${ii.phone_number}</td>
                                    
                                    <td class="objectx_join team_th">${ii.team}</td>
                                    <td class="objectx_join position_th">${ii.position}</td>
                                    <td class="objectx_join account_status_th">
                                    <div class="div_btn">
                                    <button class="jihuo_button ${ii.account_status  == 0 ?'success_button': 'danger_button'}">${user_status}</button>
                                    </div>
                                </td>           
                             </tr>`) 
                            }
                        
                        
                        }
                    })
              
            
                }
                
                
            })

        })            
        $(".password").blur(function(){
            let password = $(this).val()
            console.log(password)
            if(!reg.test(password)){
              $(".f_pass_t").text("密码格式为:大写英文+小写英文+数字6~20位").css({
                opacity:1
              })
            }else{
                $(".f_pass_t").css({
                    opacity: 0
                })
            }
            if(password.length < 6 || password.length > 20){
                layer.msg("密码长度为6-20位！")
            }
         })
         $(".password_second").blur(function(){
             let password_second = $(this).val()
             let password = $(".password").val()
             console.log(password_second)
             console.log(password)
             if(password != password_second){
                 $(".f_pass_s").text("两次输入的密码不一致，请重新输入！").css({
                    color:"#f00",
                    display: "block",
                    fontSize: "12px"
                 })
              }
             if(!reg.test(password)){
                $(".f_pass_s").text("密码格式为:大写英文+小写英文+数字6~20位").css({
                    opacity:1
                })
            }else{
                $(".f_pass_s").css({
                    opacity: 0
                })

            }
            if(password.length < 6 || password.length > 20){
                layer.msg("密码长度为6-20位！")
            }
         })
      

         //密码 跟密码确认绑定键盘大写检测事件
        // 新增
        $(".useradd_btn").click(function(){
            show("useradd")
            var admin_name = $("#username").text()
            // console.log(admin_name)
            let limits = 10;
            let pages = 1
            let form_data = new FormData()
                form_data.append('user_name',admin_name)
                form_data.append('page',pages)
                form_data.append('limit',limits)
                $.ajax({
                    url:"/user/get_all/team",
                    type:'POST',
                    data:form_data,
                    processData: false,  // tell jquery not to process the data
                    contentType: false,
                    success:function(res){
                        // console.log(res)
                        let team_list = res.data
                        $(".count_num").text(res.count)
                         $(".team_name").children().remove()
                         $(".team_name").append(`<option value="0">请选择</option>`)
                        for(let ii of team_list){
                            let team_select = `
                           
                            <option value="${ii.id}">${ii.team_name}</option>
                            `
                            $(".team_name").append(team_select)
                          
                        }
                    }
                 })       


        })
        $(".team_name").change(function(){
            let leader_val = $(this).val()
            var admin_name = $("#username").text()
            let form_data = new FormData()
                form_data.append('user_name',admin_name)
                $.ajax({
                    url:"/user/get_all/team",
                    type:'POST',
                    data:form_data,
                    processData: false,  // tell jquery not to process the data
                    contentType: false,
                    success:function(res){
                        // console.log(res)
                        let team_list = res.data

                        for(let ii of res.data){
                              if(ii.id == leader_val){
                                  $(".team_leader").val(ii.team_leader)
                              }

                        }
                    }
                 })  

        })
        $(".useraddTrue").click(function(e){
            // hide("useradd")
            if(!e.isPropagationStopped()){
                let username = $(".username").val()
                // let name = $(".Name").val()
                let name = ""
                let password = $(".password").val()
                // let id_number = $(".id_number").val()
                let id_number = ""
                let phone_number = $(".phone_number").val()
                let position = $(".position").val()
                // let job_number = $(".job_number").val()
                let job_number =""
                
                let self_description = $(".self_description").val()
                let head_portrait = ""//头像
                let gender = $(".sex").find("option:selected").text()
                let team_name_num = $(".team_name").val()//团队编号
                let team_leader  = $(".team_leader").val()
                let operation_userId= $("#user_id").text()
                // let team_leader = $(".team_leader").val()
                console.log(team_leader)
                let form_data = new FormData()
                sessionStorage["old_password"] = password
                // console.log(name)
                // console.log(gender)
                form_data.append('name',name)
                form_data.append('operation_userId',operation_userId)
                form_data.append('username',username)
                form_data.append('password',password)
                form_data.append('id_number',id_number)
                form_data.append('gender',gender)
                form_data.append('phone_number',phone_number)
                form_data.append('position',position)
                form_data.append('job_number',job_number)
                form_data.append('self_description',self_description)
                form_data.append('head_portrait',head_portrait)
                // console.log(user_grader)
                if(user_grader == 1){
                    form_data.append('team_name_num',team_name_num)
                    form_data.append('team_leader',team_leader)
                    if(username == ""){
                        layer.msg("请输入您的用户名！")
                    }else if(password == ""){
                        layer.msg("请输入您的密码！")
                    }else if($(".team_name").val() == 0){
                        layer.msg("请选择您的团队")
                    }else if(team_leader == ""){
                        layer.msg("姓名不能为空")
                    }else{
                        hide("useradd")
                        $.ajax({
                            url:"/user/create",
                            type:'POST',
                            data:form_data,
                            processData: false,  // tell jquery not to process the data
                            contentType: false,
                            success:function(res){
                                // console.log(res)
                                if(res.code == 1){
                                    layer.msg(res.Message)
                                    setTimeout(function(){
                                        location.reload()
        
                                    },1000)
                                   
                                }else{
                                    layer.msg(res.Message)
                                }
        
                            }
                        })   

                    }
                }else{
                       if(username == ""){
                        layer.msg("请输入您的用户名！")
                    }else if(password == ""){
                        layer.msg("请输入您的密码！")
                    }else{
                        hide("useradd")
                        $.ajax({
                            url:"/user/create",
                            type:'POST',
                            data:form_data,
                            processData: false,  // tell jquery not to process the data
                            contentType: false,
                            success:function(res){
                                // console.log(res)
                                if(res.code == 1){
                                    layer.msg(res.Message)
                                    setTimeout(function(){
                                        location.reload()
                                    },1000)
                                   
                                }else{
                                    layer.msg(res.Message)
                                }
        
                            }
                        })   
                    }
                }
            }
            e.stopPropagation();
        })

        //修改密码
        $(".updatepassword_btn").click(function(){
            let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
            // console.log(choose)
            if(choose ==1){
                show("update_pass")
                $("input[class='object_dl-choose']:checked").each(function(){
                    let username =  $(this).parent().next().next().next().text()
                    $(".u_username").val(username)
              })
            }else if(choose > 1){
                layer.msg("请勾选一个用户")
            }else{
                layer.msg("请勾选您要更改密码的用户")
            }
        })
        $('.u_passwordTrue').click(function(e){
          
            if(!e.isPropagationStopped()){
            let username = $(".u_username").val()
            let old_psd = $(".old_psd").val();
            let new_psd = $(".new_psd").val()
            let form_data = new FormData()
            form_data.append('username',username)
            form_data.append('old_psd',old_psd)
            form_data.append('new_psd',new_psd)
            $.ajax({
                url:"/user/password/update",
                type:'POST',
                data:form_data,
                processData: false,  // tell jquery not to process the data
                contentType: false,
                success:function(res){
                    // console.log(res)
                    if(res.code == 1){
                        hide("update_pass")
                        layer.msg(res.Message)
                        location.reload()
                    }else{
                        layer.msg(res.Message)
                    }
                    
                }
            })    





            }
            e.stopPropagation();

        })
        //重置密码
        $(".resetpassword_btn").click(function(){
            let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
            // console.log(choose)
            
            if(choose == 1){
                show("reset_pass")
                $("input[class='object_dl-choose']:checked").each(function(){
                    let username =  $(this).parent().next().next().next().text()
                  $(".r_username").val(username)
              })
            }else if(choose > 1){
                layer.msg("请勾选一个用户！")
            }
            else{
                layer.msg("请勾选您要重置的用户")
            }

          
        })
        $(".resetTrue").click(function(e){
        
            if(!e.isPropagationStopped()){
                let username =   $(".r_username").val()
                let new_password = $(".new_password").val()
                let form_data = new FormData()
                form_data.append('user_name',username)
                form_data.append('new_password',new_password)
                if(new_password == ""){
                    layer.msg("请输入您要重置的密码")

                }else{
                    layer.open({
                        type:0, //设置类型 默认为0 1页面层 2ifream层
                        title:"提示", //标题
                        content:'确定重置吗？',//内容 type=0为内容
                        skin:'layui-layer-molv',//皮肤
                        area:['200px','150px'], //宽高
                        icon:1, //只对type=0有效
                        btn:['确定','取消'],
                        yes: function(index,layero){
                            $.ajax({
                                url:"/user/password/reset",
                                type:'POST',
                                data:form_data,
                                processData: false,  // tell jquery not to process the data
                                contentType: false,
                                success:function(res){
                                    // console.log(res)
                                    if(res.code == 1){
                                            hide("reset_pass")
                                        layer.close(index)
                                        layer.msg(res.Message)
                                       setTimeout(function(){
                                        location.reload()
                                       },1000)
                                    }else{
                                        layer.msg(res.Message)
                                    }
                                }
                            })
                        },
                        btn2:function (index,layero) {
                            layer.close(index);
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
            e.stopPropagation();

        })
        //删除用户

        $(".userdelete_btn").click(function(){
            let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
            // console.log(choose)
            if(choose == 1){
                layer.open({
                    type:0, //设置类型 默认为0 1页面层 2ifream层
                    title:"提示", //标题
                    content:'确定删除吗？',//内容 type=0为内容
                    skin:'layui-layer-molv',//皮肤
                    area:['200px','150px'], //宽高
                    icon:1, //只对type=0有效
                    btn:['确定','取消'],
                    yes: function(index,layero){
                        $("input[class='object_dl-choose']:checked").each(function(){
                            // console.log($(this))
                            let uuid =  $(this).parent().next().text()
                            $.ajax({
                                url: '/user/delete',
                                type: 'GET',
                                data: {
                                    user_id:uuid,
                                },
                                success: (res) => {
                                if(res.code == 1){
                                  layer.msg(res.chMessage);
                                  setTimeout(function(){
                                      location.reload()
                                  },1000)
                                }else{
                                  layer.msg(res.chMessage);
                                }
                                }
                            })
                            
                        })
                     
                    
                       
                    },
                    btn2:function (index,layero) {
                        layer.close(index);
                    },
                    cancel:function (index,layero) {
                        layer.close(index);
                    },
                    btnAlign:'c', //按钮对齐方式
                    shade:[0.8,'#393D49'], //遮罩
                    shadeClose:true //当点击遮罩是否关闭弹层
        
                    });
               

            }else if(choose > 1){
                layer.msg("请选择一个用户进行删除!")
            }else{
                layer.msg("请选择您要删除的用户")
            }
        })
        //编辑用户
        let userid = ""
        $(".userupdate_btn").click(function(){
            let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
            if(choose == 1){
                show("userupdate")
                $("input[class='object_dl-choose']:checked").each(function(){
                      userid =  $(this).parent().parent().children("td.object_uuid").text()
                    let old_username = $(this).parent().parent().children("td.username_th").text()
                    let old_name = $(this).parent().parent().children("td.name_th").text()
                    let old_teamname = $(this).parent().parent().children("td.team_th").text()
                    let old_gender = $(this).parent().parent().children("td.gender_th").text()
                    let old_phone_number = $(this).parent().parent().children("td.phone_number_th").text()
                    let old_position = $(this).parent().parent().children("td.position_th").text()
                    console.log(old_name)
                    console.log(old_phone_number)
                    sessionStorage['username'] = old_username
                    sessionStorage['teamname'] = old_teamname
                    sessionStorage['gender'] = old_gender
                    sessionStorage['phone_number'] = old_phone_number
                    sessionStorage['name'] = old_name
                    sessionStorage['position'] = old_position
                    $(".newusername").val(old_username)
                    $(".newteam_name").val(old_teamname)
                    $(".new_name").val(old_name)
                   if(old_gender == "男"){
                       $(".newsex").val(1)
                   }else if(old_gender == "女"){
                       $(".newsex").val(2)
                   }else if(old_gender =="请选择"){
                    $(".newsex").val(3)
                   }
                   if(old_position == "总监"){
                       $(".newpos").val(1)
                   }else if(old_position == "主任"){
                    $(".newpos").val(2)
                   }else if(old_position == "助理"){
                    $(".newpos").val(3)
                   }else if(old_position == "请选择"){
                    $(".newpos").val(0)
                   }
                $(".newphone_number").val(old_phone_number)

                })

            }else if(choose > 1){
                layer.msg("请选择一个用户进行编辑!")
            }else{
                layer.msg("请选择您要编辑的用户")
            }
            
        })
        $(".userupdateTrue").click(function(){
            let old_name = sessionStorage.getItem('name')
            let old_gender  = sessionStorage.getItem('gender')
            let old_position = sessionStorage.getItem('position')
            let old_phone_number = sessionStorage.getItem('phone_number')
            let old_teamname = sessionStorage.getItem('teamname')
            let phone_number = $(".newphone_number").val()
            let team_name = $(".newteam_name").val()
            let gender = $(".newsex").find("option:selected").text()
            let position = $(".newpos").find("option:selected").text()
            let name = $(".new_name").val()
            let flag = true
            if(old_position == position && old_gender == gender && old_phone_number == phone_number && old_teamname == team_name && old_name == name){
                  flag = false
                layer.msg("您当前未作任何修改！")
            }else{
                if(name == ""){
                    flag = false
                    layer.msg("请输入您的姓名！")
                }else if(team_name == ""){
                    flag = false
                    layer.msg("请输入您的部门！")
                }else if(phone_number == ""){
                    flag = false
                    layer.msg("请输入您的电话！")
                }else if(position == "请选择"){
                    flag = false
                    layer.msg("请选择您的职位！")
                }else if(gender == "请选择"){
                    flag = false
                    layer.msg("请选择您性别！")
                }
               if(flag == true){
                axios.get('/user/update',{params:{
                    user_id:userid,
                    dict_info:{
                        phone_number:phone_number,
                        gender:gender,
                        team:team_name,
                        name:name,
                        position:position
                    } 
                }       
                }).then(res=>{
                    console.log(res)
                    if(res.data.code == 1){
                        layer.msg(res.data.Message)
                        setTimeout(function(){
                            location.reload()
                        },1000)
                    }else{
                        layer.msg(res.data.Message)
                    }
                })

               }
              
              
            }

        })
        //激活
        $("body").on("click",".jihuo_button",function(){
            let user_id  = $(this).parent().parent().parent().children("td.object_uuid").text()
            let account_status = 1
            console.log(user_id)
            console.log(account_status)
            console.log($(this).text())
            let form_data = new FormData()
            form_data.append("user_id",user_id)
            form_data.append("account_status",account_status)
            if($(this).text() == "已激活"){

            }else{
                $.ajax({
                    url:"/user/activate/procedure",
                    type:'POST',
                    data:form_data,
                    processData: false,  // tell jquery not to process the data
                    contentType: false,
                    success:function(res){
                        console.log(res)
                        if(res.code == 1){
                            layer.msg(res.Message)
                            setTimeout(function(){
                                location.reload()
                            },2000)
                        }else{
                            layer.msg(res.Message)
                            
                        }
    
    
    
    
                    }
                })

            }
       

        })



        var inp = document.getElementsByClassName('al-choose')
        var inps = document.getElementsByClassName("object_dl-choose")
        // console.log(inps)
         $(".al-choose").click(function(){
              for(var i = 0;i<inps.length;i++){
                inps[i].checked = this.checked;
              }
         })
         for (var i = 0; i < inps.length; i++) {
            inps[i].onclick = function() {
            //flag 控制全选按钮是否全部选中
            // console.log(1111)
            var flag = true;
            // 判断每个按钮是否被选中
            for (var i = 0; i < inps.length; i++) {
            //存在某个按钮没有被选中的情况，flag=flase;否则flag=true;
            if (!inps[i].checked) {
            flag = false;
            break;
            }
            }
            inp.checked = flag;
            }
            }
      
              //   时间转换函数
              function rTime(date) {
                  var json_date = new Date(date).toJSON();
                  return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              } 
      
              function show(w){
                  $(`#${w}`).modal('show');
                  $(".modal-content input").val("")
              }
                //弹框隐藏
              function hide(w){
                  $(`#${w}`).modal('hide');
              }

              //键盘检测大小写
         
})()