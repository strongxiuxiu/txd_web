(function(){
    //点击保存 取消按钮   关闭表单
    $(".case_submit").click(function(){
        //  确定添加弹出框弹出
          show("caseadd")
        
    })
    //  保存取消按钮
    $(".case_off").click(function(){
    $(".case_form").css({
        display:"none"
    })      
  
    })
     //添加案件确定
    //  $(".caseTrue").click(function(){
    //     $(".case_form").css({
    //         display:"none"
    //     })
    //  })

    $(".caseTrue").click(function(){ 
        let lawCase_uuid;
        lawCase_uuid =hex_md5(Math.random() + '' + Math.random())
        console.log(lawCase_uuid)
      // 获取输入内容
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
          user_id = $("#username").text(),
          project_member = $(".project_member").val()
          let  form_data = new  FormData();
          let  file_text = $(".poa_text")[0].files;
          let file_img = filesArr
          let  file_other = $(".oa")[0].files;
          for(var i = 0;i<file_text.length;i++){
              form_data.append("power_attorney_file",file_text[i])
          }
          for(var i=0;i<file_img.length;i++){  
              form_data.append("power_attorney",file_img[i])
          }

          for(var i=0;i<file_other.length;i++){  
              form_data.append("other_attachments",file_other[i])
          }
          form_data.append('project_member',project_member)//项目成员
          form_data.append('lawCase_uuid',lawCase_uuid)
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
          form_data.append('remark',beizhu)
          sessionStorage['lawCase_uuid'] = lawCase_uuid;
             //对于用户提交输入的内容进行非空判断
                 hide("caseadd")
               if(lawnum == "" || courtName =="" || proposers=="" || proposernum == "" || xecutors == "" || xecutorsnum == "" || undertaker ==""|| projectleader ==""|| projectLeadernum =="" || beizhu == ""|| project_member == ""){
                  alert("请填写完全部必填信息！")
               }else{
                lawajax()  
               }
                  function lawajax(){
                  $.ajax({
                      url:"/auction/add/case/",
                      type:'POST',
                      data:form_data,
                      processData: false,  // tell jquery not to process the data
                      contentType: false, 
                      success:function(res){
                          console.log(res);
                          if(res.code == 1){
                              $(".anjianwaper").css({
                                  display:"none"
                              })
                              console.log(lawCase_uuid)
                              axios.get('/auction/a/case/',{
                                  params:{lawCase_uuid:lawCase_uuid}}).then(res=>{
                                      console.log(res)
                                      console.log(res.data.data)
                                      for(let ii of res.data.data){
                                          let table_content = `
                                          <tr class="object_join_a">
                                          <td class="all-choose">
                                              <input type="checkbox" class="dl-choose" name="dl-choose">
                                          </td>
                                            <td>${ii.law_case}</td>
                                            <td class="uuid" style="display:'none'">${ii.lawCase_uuid}</td>
                                            <td>${ii.court_name}</td>
                                            <td>${ii.proposer}</td>
                                            <td>${ii.proposer_phonenumber}</td>
                                            <td>${ii.executor}</td>
                                            <td>${ii.executor_phoneNumber}</td>
                                            <td>${ii.undertaker}</td>
                                            <td>${ii.undertaker_phoneNumber}</td>
                                            <td>${ii.project_leader}</td>
                                            <td>${ii.projectLeader_phone}</td>
                                            <td>${ii.project_member}</td>
                                            <td>${ii.remark}</>
                                      </tr>    
                                          `
                                          $(".tbContent").append(table_content)
                              } 

                                         $(".case_table").css({
                                             display:"none"
                                         })
                                      let arr_idlist = res.data.object_uuid_list;
                                       let arr_len = arr_idlist.length
                                       var  arr_str = JSON.stringify(arr_idlist);
                                            sessionStorage.setItem("str",arr_str)
                                       var a = JSON.parse(sessionStorage.getItem("str")) 
                                       console.log(a)
                                       console.log(typeof(a))

                                  })//ajxj结束
                              //     // 标的添加显示
                          }
                          // $(".case_table").remove()
                      }
                  })
                  // location.reload()
              } 
                       
                                   

    })






           //模态框弹框弹出
function show(w){
    $(`#${w}`).modal('show');
    $(".modal-content input").val("")
}
  //弹框隐藏
function hide(w){
    $(`#${w}`).modal('hide');
}

})()