(function(){
     
    // console.log(user_grader)
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
                console.log(res)
                let team_list = res.data
                $(".count_num").text(res.count)
                for(let ii of team_list){
                    if(user_grader == 1){  
                        $(".tbContent").append(` 
                        <tr class="objectx_join_tr">
                        <td class="all-choose">
                        <input type="checkbox" class="object_dl-choose" name="dl-choose">
                        </td>
                        <td style="display: none;" class="object_uuid">${ii.id}</td>
                        <td class="objectx_join">${rTime(ii.create_time)}</td>
                        <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                        <td class="objectx_join name">${ii.team_name}</td>
                        <td class="object_type objectx_join abbreviation">${ii.team_abbreviation}</td>  
                        <td class="objectx_join leader">${ii.team_leader}</td>
                        <td class="objectx_join l_phone">${ii.leader_number}</td>
                        <td class="objectx_join l_remark">${ii.leader_remark}</td>
                  </tr>
                    `) 
                    }else{   
                        $(".tbContent").append(  ` 
                        <tr class="objectx_join_tr">
                        <td class="all-choose">
                        <input type="checkbox" class="object_dl-choose" name="dl-choose">
                        </td>
                        <td style="display: none;" class="object_uuid">${ii.id}</td>
                        <td class="objectx_join">${rTime(ii.create_time)}</td>
                        <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                        <td class="objectx_join name">${ii.team_name}</td>
                        <td class="object_type objectx_join abbreviation">${ii.team_abbreviation}</td>  
                     </tr>
                    ` )  
                    }
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
                    // console.log(admin_name)
                    let limits = pageSize;
                    let pages = index
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
                            $(".tbContent").children().remove()
                            // console.log(res)
                            let team_list = res.data
                            $(".count_num").text(res.count)
                            for(let ii of team_list){
                                if(user_grader == 1){  
                                    $(".tbContent").append(` 
                                    <tr class="objectx_join_tr">
                                    <td class="all-choose">
                                    <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                    </td>
                                    <td style="display: none;" class="object_uuid">${ii.id}</td>
                                    <td class="objectx_join">${rTime(ii.create_time)}</td>
                                    <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                                    <td class="objectx_join name">${ii.team_name}</td>
                                    <td class="object_type objectx_join abbreviation">${ii.team_abbreviation}</td>  
                                    <td class="objectx_join leader">${ii.team_leader}</td>
                                    <td class="objectx_join l_phone">${ii.leader_number}</td>
                                    <td class="objectx_join l_remark">${ii.leader_remark}</td>
                              </tr>
                                `) 
                                }else{   
                                    $(".tbContent").append(  ` 
                                    <tr class="objectx_join_tr">
                                    <td class="all-choose">
                                    <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                    </td>
                                    <td style="display: none;" class="object_uuid">${ii.id}</td>
                                    <td class="objectx_join">${rTime(ii.create_time)}</td>
                                    <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                                    <td class="objectx_join name">${ii.team_name}</td>
                                    <td class="object_type objectx_join abbreviation">${ii.team_abbreviation}</td>  
                                 </tr>
                                ` )  
                                }
                            }
                        }
                    })
              
            
                }
                
                
            })

        })
    
        // 新增
        $(".teamadd_btn").click(function(){
            show("teamadd")
        })
        $(".teamaddTrue").click(function(e){
            if(!e.isPropagationStopped()){
                let team_name = $(".team_name").val(),
                team_explain = $(".team_explain").val(),
                team_abbreviation = $(".team_abbreviation").val(),
                team_leader = $(".team_leader").val(),
                leader_number = $(".leader_number").val(),
                leader_remark = $(".leader_remark").val();
                console.log(team_leader)
                console.log(leader_number)
                console.log(leader_remark)
                let form_data = new FormData()
                   form_data.append('team_name',team_name)
                   form_data.append('team_explain',team_explain)
                   form_data.append('team_abbreviation',team_abbreviation)
                   form_data.append('team_leader',team_leader)
                   form_data.append('leader_number',leader_number)
                   form_data.append('leader_remark',leader_remark)
                   if(team_name == ""){
                       layer.msg("请输入团队名称")

                   }else if(team_abbreviation == ""){
                        layer.msg("请输入团队缩写")
                   }else if(team_leader == ""){
                    layer.msg("请输入领导人姓名")
                   }else if(leader_number == ""){
                    layer.msg("请输入领导人电话")
                   }else if(leader_remark == ""){
                       layer.msg("请输入领导人备注说明")
                   }else{
                    hide("teamadd")
                    $.ajax({
                        url:"/user/add/team",
                        type:'POST',
                        data:form_data,
                        processData: false,  // tell jquery not to process the data
                        contentType: false,
                        success:function(res){
                            // console.log(res)
                            if(res.code == 1){
                                layer.msg(res.Message)
                                setTimeout(function(){
                                    window.location.reload()
                                },1000)
                            }
                        }
                        })
                   }
                








            }
            e.stopPropagation();
        })
        //删除 
        $(".teamdelete_btn").click(function(){
            let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
            // console.log(choose)
            if(choose > 0){
                layer.open({
                    type:0, //设置类型 默认为0 1页面层 2ifream层
                    title:"提示", //标题
                    content:'确定删除吗？',//内容 type=0为内容
                    skin:'layui-layer-molv',//皮肤
                    area:['200px','150px'], //宽高
                    icon:1, //只对type=0有效
                    btn:['确定','取消'],
                    yes: function(index,layero){
                        let teamid_list = [];
                        $("input[class='object_dl-choose']:checked").each(function(){
                            // console.log($(this))
                            let team_id =  $(this).parent().next().text()
                            // console.log(team_id)
                            teamid_list.push(team_id)
                        })
                        // console.log(uuid_list)
                        $.ajax({
                            url: '/user/delete/team',
                            type: 'POST',
                            data: {
                                team_id:JSON.stringify(teamid_list),
                            },
                            success: (res) =>{
                                if(res.code == 1){
                                    layer.msg(res.chMessage)
                                    setTimeout(function(){
                                        location.reload()
                                    },1000)
                              }else{
                                  layer.msg(res.chMessage)
                              }
                            }
                        })
                       
                    },
                    btn2:function (index,layero) {
                        layer.close(index);
                    },
                    cancel:function () {
                        layer.close(index);
                    },
                    btnAlign:'c', //按钮对齐方式
                    shade:[0.8,'#393D49'], //遮罩
                    shadeClose:true //当点击遮罩是否关闭弹层
        
                    });
               
            
            }else{
                layer.msg("请选择您要删除的团队");
            }

        })
        //编辑
        $(".teamupdate_btn").click(function(){
            let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
            // console.log(choose)
            if(choose == 1){
                show("teamupdate")
                $("input[class='object_dl-choose']:checked").each(function(){
                    let old_team_id =  $(this).parent().parent().children("td.object_uuid").text()
                    let old_team_name=  $(this).parent().parent().children("td.name").text()
                   let old_team_explain =  $(this).parent().parent().children("td.explain").text()
                   let old_team_abbreviation =  $(this).parent().parent().children("td.abbreviation").text()
                   let old_team_leader =  $(this).parent().parent().children("td.leader").text()
                   let old_leader_number =  $(this).parent().parent().children("td.l_phone").text()
                   let old_leader_remark =  $(this).parent().parent().children("td.l_remark").text()
                   sessionStorage['team_name'] = old_team_name
                   sessionStorage['team_explain'] = old_team_explain     
                   sessionStorage['team_abbreviation'] = old_team_abbreviation
                   sessionStorage['team_id'] = old_team_id     
                   sessionStorage['team_leader'] = old_team_leader           
                   sessionStorage['team_phone'] = old_leader_number           
                   sessionStorage['team_remark'] = old_leader_remark                 
                    $(".newteam_name").val(old_team_name)
                    $(".newteam_explain").val(old_team_explain)
                    $(".newteam_abbreviation").val(old_team_abbreviation)
                    $(".new_team_leader").val(old_team_leader)
                    $(".new_leader_number").val(old_leader_number)
                    $(".new_leader_remark").val(old_leader_remark)
              })                
            }else if(choose > 1){
                layer.msg("请勾选一个团队")

            }else{
                layer.msg("请选择您要编辑的团队")
            }

        })
        $(".teamupdateTrue").click(function(e){
            if(!e.isPropagationStopped()){
                let team_name = $(".newteam_name").val(),
                team_explain = $(".newteam_explain").val(),
                team_abbreviation = $(".newteam_abbreviation").val();
                let team_id = sessionStorage.getItem("team_id")
                // console.log(team_id)
                let team_leader = $(".new_team_leader").val()
                let leader_number = $(".new_leader_number").val()
                let leader_remark = $(".new_leader_remark").val()
                let form_data = new FormData()
              
                let old_team_name= sessionStorage.getItem("team_name")
                let old_team_explain = sessionStorage.getItem("team_explain")
                let old_team_abbreviation =  sessionStorage.getItem("team_abbreviation")
                let old_team_leader =  sessionStorage.getItem("team_leader")
                let old_leader_number =  sessionStorage.getItem("team_phone")
                let old_leader_remark =  sessionStorage.getItem("team_remark")

               
                // form_data.append('team_leader',team_leader)
                // form_data.append('leader_number',leader_number)
                // form_data.append('leader_remark',leader_remark)

                // 对登录用户等级编辑团队信息时做出判断
                let user_grader = localStorage.getItem("user_grader")
                if(user_grader == 0){
                    if(team_name == ""){
                        layer.msg("请填写团队名称")
                    }else if(team_explain == ""){
                        layer.msg("请填写团队简介")
                    }else if(team_abbreviation == ""){
                        layer.msg("请填写团队缩写")
                    }else if(team_name == old_team_name && team_explain == old_team_explain && team_abbreviation == old_team_abbreviation ){
                        layer.msg("您当前未做任何修改")
                    }else {
                        hide("teamupdate")
                        form_data.append('user_grade',user_grader)
                        form_data.append('team_id',team_id)
                        form_data.append('team_name',team_name)
                        form_data.append('team_explain',team_explain)
                        form_data.append("team_abbreviation",team_abbreviation)
                        $.ajax({
                            url:"/user/edit/team",
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
                                }
    
                            }
                        })    
                    }

                }else if(user_grader == 1){
                    // console.log("以及用户")
                    if(team_leader == ""){
                        layer.msg("请填写领导人姓名")
                    }else if(leader_number == ""){
                        layer.msg("请填写领导人电话")
                    }else if(leader_remark == ""){
                        layer.msg("请填写领导人备注")
                    }else if(team_leader == old_team_leader && leader_number == old_leader_number &&  leader_remark == old_leader_remark){
                        layer.msg("您当前未做任何修改")
                    }else {
                        hide("teamupdate")
                        form_data.append('user_grade',user_grader)
                        form_data.append('team_id',team_id)
                        form_data.append('team_leader',team_leader)
                        form_data.append('leader_number',leader_number)
                        form_data.append("leader_remark",leader_remark)
                        $.ajax({
                            url:"/user/edit/team",
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
                                }
    
                            }
                        })    
                    }

                }

              



            }
            e.stopPropagation();

        })
        //   全选
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


})()