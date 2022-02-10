(function(){
    // 进入页面获取案件信息
    //用户名
    let admin_name = $("#username").text()
    let pages = 5;
    let limits = 2;
    console.log(admin_name)
    let form_data = new FormData()
        form_data.append('user_name',admin_name)
        form_data.append('pages',pages)
        form_data.append('limits',limits)
    $.ajax({
        url:"http://39.107.242.243:80/auction/inquire_case/",
        type:'POST',
        data:form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false, 
        success:function(res){
            // 循环加入数据
            console.log(res)
            let  tablelist = res.data;
            for(let ii of tablelist){
                let content_list = [];
                content_list.push(`
                <tr>
                <td>${ii.proposer}</td>
                <td>${ii.proposer_phonenumber}</td>
                <td>${ii.executor}</td>
                <td>${ii.executor_phoneNumber}</td>
                <td>${ii.undertaker}</td>
                <td>${ii.undertaker_phoneNumber}</td>
                <td>${ii.project_leader}</td>
                <td>${ii.projectLeader_phone}</td>
                </tr>
                `)
                let table_content = `
                <tr>
                <td class="all-choose">
                    <input type="checkbox" class="dl-choose" name="dl-choose">
                </td>
                <td>${ii.law_case}</td>
                <td class="uuid">${ii.lawCase_uuid}</td>
                <td>${ii.court_name}</td>
               
                <td><a data-toggle="collapse" data-parent="#accordion"
                href="#${ii.lawCase_uuid}" class="more">查看更多</a>
                </td>
                <td>
                    <button class="updatebtn"> <i class="am-icon-pencil " style="top: 3px;"></i>编辑</button>
                    <button class="deletebtn"> <i class="am-icon-trash" style="top: 3px;"></i>删除</button>
                </td>
              </tr>
              <tr>
              <td colspan="10" style="background-color: #fff;padding: 0">
                  <div id="${ii.lawCase_uuid}" class="panel-collapse collapse">
                      <table class="coltable">
                          <thead>
                          <tr>
                           <th>申请人</th>
                           <th>申请人电话</th>
                           <th>被执行人</th>
                           <th>被执行人电话</th>
                           <th>承办人</th>
                           <th>承办人电话</th>
                           <th>项目负责人</th>
                           <th>负责人电话</th>
                          </tr>
                          </thead>
                          <tbody>
                          ${content_list.join("")}
                          </tbody>
                      </table>
                  </div>
              </td>
          </tr>
                `
                $(".main_tb").append(table_content)
                console.log()
              
              
            }
           
        }

    })

   // 编辑案件信息
   $("body").on("click",".updatebtn",function(){
       let uuid = $(this).parent().prev().prev().prev().text()
       console.log(uuid)
       sessionStorage['uuid'] = uuid;
       $(".case_table").css({
           display:"block"
       })
    })

    $(".savebtn").click(function(){
        console.log(111)
        let uuid = sessionStorage.getItem('uuid')
        let lawnum = $(".law_case").val(); //执行案号
        courtName = $(".mingcheng").val();//法院名称
        proposers = $(".shenqing").val(),//申请人
        proposernum = $(".shengqingnum").val(),//生情人电话
        xecutors = $(".zhixing").val(),//被执行人
        xecutorsnum = $(".zhixingnum").val(),//执行人电话
        undertaker = $(".chengban").val(),//承办人
        undertakernum = $(".chengbannum").val(),//承办人电话
        projectleader = $(".xiangmu").val(),//项目负责人
        projectLeadernum = $(".fuzenum").val(),//负责人电话
        beizhu = $(".remarks").val(),//备注
        projectmembers = $(".xiangmumembers").val();//项目成员
        user_id = $("#username").text();
        let  form_data = new  FormData();
        let  file_info = $(".poa")[0].files;
        let  file_other = $(".oa")[0].files;
         for(var i=0;i<file_info.length;i++){  
             form_data.append("power_attorney",file_info[i])
         }
         for(var i=0;i<file_other.length;i++){  
             form_data.append("other_attachments",file_other[i])
         }
         form_data.append('lawCase_uuid',uuid)
         form_data.append('user_id',user_id)
         form_data.append('law_case',lawnum)
         form_data.append('courtname',courtName)
         form_data.append('proposer',proposers)
         form_data.append('proposer_phonenumber',proposernum)
         form_data.append('executor',xecutors)
         form_data.append('executor_phoneNumber',xecutorsnum)
         form_data.append('undertaker',undertaker)
         form_data.append('undertaker_phoneNumber',undertakernum)
         form_data.append('project_leader',projectleader)
         form_data.append('projectLeader_phone',projectLeadernum)
         form_data.append('project_member',projectmembers)//项目成员
         form_data.append('remark',beizhu)
         form_data.append('lawCase_uuid',uuid)
         $.ajax({
             url:"http://39.107.242.243:80/auction/edit/case/",
             type:'POST',
             data:form_data,
             processData: false,  // tell jquery not to process the data
             contentType: false, 
             success:function(res){
                 console.log(res)
                 $(".case_table").css({
                    display:"none"
                })
                location.reload()
             }
         })
    })
    


   $(".quxiaobtn").click(function(){
        $(".case_table").css({
            display:"none"
        })
   })




    




    

})()