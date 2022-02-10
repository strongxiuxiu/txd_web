(function(){
    // // 标底信息提交
    // 竞买人描述
    $(".potential_purchaser").change(function(){
        var text =  $(".potential_purchaser").find("option:selected").val()
        console.log(text)
        if(text == 2){
            $(".miaoshu").css({
                display:"block"
            })
        }else{ 
            $(".miaoshu").css({
                display:"none"
            })
           
        }
       
    })
    // 选择激活显示
    // 1.拍卖栏显示情况  拍卖状态
    $(".auction_state").change(function(){
        let val = $(this).find("option:selected").val();
        console.log(val)
        if(val == 2|| val == 3 || val == 4){
          $(".paimai").css({
            display:"block"
          })
      
        }else{
            $(".paimai").css({
                display:"none"
              })
        }
        if(val == 6){
            $(".creason").css({
                display:"block"
              })
        }else{
            $(".creason").css({
                display:"none"
              })

        }
        if(val ==5 || val == 7){
            $(".qingkaung").css({
                display:"block"
            })
        }else{
            $(".qingkaung").css({
                display:"none"
            })
            
        }
    })
    // 2.评估栏显示情况
    $(".assess_state").change(function(){
        let val = $(this).find("option:selected").val();
        if(val == 2){
            $(".pinggustate").css({
                display:"block"
            })
        }else{
            $(".pinggustate").css({
                display:"none"
            })

        }

    })

    //3.售后状态显示情况
    $(".after_state").change(function(){
        let val = $(this).find("option:selected").val();
        if(val == 2){
            $(".shouhoustate").css({
                display:"block"
            })
        }else{
         
            $(".shouhoustate").css({
                display:"none"
            })

        }

    })
    //   4.收费信息表单部分显示情况
    $(".have_ticket").change(function(){
        let val = $(this).find("option:selected").val();
        console.log(val)
        if(val == 1){
            $(".kaipiao").css({
                display:"block"
            })

        }else{
            $(".kaipiao").css({
                display:"none"
            })


        }

    })
    //  5.增值服务显示情况
    $(".valueadded_services").change(function(){
        let val = $(this).find("option:selected").val();
        console.log(val)
        if(val == 1){
            $(".zengzhi").css({
                display:"block"
            })
        }else{
            $(".zengzhi").css({
                display:"none"
            })
            
        }

    })
      //溢价率
    $(".transaction_price").blur(function(){
        let num_reg = /^[0-9]*$/
        starting_price = $(".starting_price").val(),
        transaction_price = $(".transaction_price").val(),
        cha = (transaction_price - starting_price),
        premium_rate = Math.round(cha / transaction_price*10000)/ 100.00+"%";
        // console.log(starting_price,transaction_price)
        if( starting_price == "" || transaction_price == ""){
           $(".price_text").css({
               opacity:1
           })
            
        }else{
            $(".price_text").css({
                opacity:0
            })
            if( transaction_price < 0 ||  transaction_price ==0 ){
                premium_rate = "0%"
            }else{
              $(".premium_rate").val(premium_rate)
            }
        }
        if(num_reg.test($(this).val()) == false){
            $(this).val("请输入数字").css({
                color:"red"
            })
        }else{
            $(this).css({
                color:"black"
            })
        }
       
        

    })
    $(".payment_receive").change(function(){
        let val = $(this).find("option:selected").val();
        if(val == 1){
            $(".kaipiao1").css({
                display:"block"
            })
        }else{
            $(".kaipiao1").css({
                display:"none"
            })
        }

    })
 
     // 新建案件信息
     var law_id = sessionStorage.getItem('lawCase_uuid')
     $(".add_btn").click(function(e){
            if(law_id == null){
                $(".textlist1").css({
                    display:"none"
                })
                $(".case_table").css({
                    display:"block"
                })
                
            }else{
                show("newcaseadd")
            }
          
    })
    $(".newcaseTrue").click(function(){
        //清除案件信息以及所有换缓存
        sessionStorage.removeItem("lawCase_uuid");
        sessionStorage.clear();
        // hide("newcaseadd")
        location.reload();  //实现页面重新加载
      setTimeout(function(){
        $(".case_table").css({
            display:"block"
        })
      },10000)
       
    })
    $("body").on("click",".quxiaobtn",function(){
        $(".case_table").css({
            display:"none"
        })

    })
    $("body").on("click",".savebtn",function(){
      show("caseadd");
     })
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
            let  file_info = $(".poa")[0].files;
            let  file_other = $(".oa")[0].files;
            console.log(file_info)
            console.log(file_other)
            console.log(project_member)
            for(var i=0;i<file_info.length;i++){  
                form_data.append("power_attorney",file_info[i])
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
                        url:"http://39.107.242.243:80/auction/add/case/",
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
                                axios.get('http://39.107.242.243/auction/a/case/',{
                                    params:{lawCase_uuid:lawCase_uuid}}).then(res=>{
                                        console.log(res)
                                        console.log(res.data.data)
                                        for(let inf of res.data.data){
                                          let anjian_content = `
                                          <div class="newobject case_from">
                                          <table class="main_tb">
                                            <thead>
                                            <tr>
                                                <th class="all-choose first_dl">
                                                </th>
                                                <th>执行案号</th>
                                                <th>法院名称</th>
                                                <th>申请人</th>
                                                <th>申请人电话</th>
                                                <th>被执行人</th>
                                                <th>被执行人电话</th>
                                                <th class="casebtn_th"><span class="case_update">编辑</span><th>
                                            </tr>
                                            </thead>
                                            <tbody class="tbContent fress_maintb">
                                              <tr  class="c_first">
                                                <td class="all-choose first_dl">
                                                    <input type="checkbox" class="dl-choose" name="dl-choose">
                                                </td>
                                                <td>${inf.law_case}</td>
                                                <td>${inf.court_name}</td>
                                                <td>${inf.proposer}</td>
                                                <td>${inf.proposer_phonenumber}</td>
                                                <td>${inf.executor}</td>
                                                <td>${inf.executor_phoneNumber}</td>
                                                <td><a data-toggle="collapse" data-parent="#accordion" href="#111" style="color:'orange'"><span class="more"><i class="am-icon-plus"></i>查看更多</span></a>
                                                </td>
                                               </tr>
                                               <tr>
                                                <td colspan="10" style="background-color:F5F5F5;padding: 0">
                                                    <div id="111" class="panel-collapse collapse">
                                                        <table class="coltable">
                                                            <thead>
                                                            <tr>
                                                             <th>承办人</th>
                                                             <th>承办人电话</th>
                                                             <th>项目负责人</th>
                                                             <th>项目负责人电话</th>
                                                             <th>项目成员</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr class="c_second">
                                                              <td>${inf.undertaker}</td>
                                                              <td>${inf.undertaker_phoneNumber}</td>
                                                              <td>${inf.project_leader}</td>
                                                              <td>${inf.projectLeader_phone}</td>
                                                              <td>${inf.project_member}</td>
                                                              </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>   
                                        </table>
                                         </div>
                                          `
                                          $(".case_wapper").append(anjian_content)      
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
    //   标的信息保存
    var sum = 0;
    // var objectid_list = []
    $(".objectsave").click(function(){
        show("objectadd")//弹框显示
    })

    $(".objectTrue").click(function(){
            object_uuid = hex_md5(Math.random() + '' + Math.random())
            console.log(object_uuid) //新建标的物id
            // var objectid_list = []
            // objectid_list.push(object_uuid)
            // console.log(JSON.stringify(objectid_list))
            // sessionStorage.setItem("objectid_list",JSON.stringify(objectid_list))
       
            var id =  sessionStorage.getItem("lawCase_uuid")
            console.log(id)
        // 头部信息
        let object_name = $(".object_name").val(),
        sheng = $("#sheng").find("option:selected").text(),
        shi = $("#shi").find("option:selected").text(),
        qu = $("#qu").find("option:selected").text(),
        object_location = sheng+shi+qu,   // 标的物所在地
        property_type = $(".property_type").find("option:selected").text(), 
        estimated_price = $(".estimated_price").find("option:selected").text(),
        potential_purchaser = $(".potential_purchaser").find("option:selected").text(),
        bidder_describe = $(".bidder_describe").val(),
        // 标的文件
          form_data = new  FormData(),
        //   objectPhoto_file =  $("#file")[0].files,
          objectInvestigate_file =  $(".objectInvestigate_file")[0].files,
        // 拍卖栏
        auction_state = $(".auction_state").find("option:selected").text(),
        announcement_time = $(".announcement_time").val(),
        auction_platform = $(".auction_platform").find("option:selected").text(),
        auction_url = $(".auction_url").val(),
        starting_price = $(".starting_price").val(),
        transaction_price = $(".transaction_price").val(),
        premium_rate = $(".premium_rate").val(),
        // 评估栏
        assess_state = $(".assess_state").find("option:selected").text(),
        assess_method = $(".assess_method").find("option:selected").text(),
        appraisal_agency = $(".appraisal_agency").val(),
        appraisal_price  = $(".appraisal_price").val(),
        appraisalSummaries_id = $(".appraisalSummaries_id")[0].files,
       
         //售后栏
         after_state = $(".after_state").find("option:selected").text(),
         buyer = $(".buyer").val(),
         buyer_phoneNum = $(".buyer_phoneNum").val(),
         remark = $(".remark").val(),
         //情况说明
         presentation_condition = $(".presentation_condition").val()
         otFile_id = $(".otFile_id")[0].files;
         console.log(object_location)
         console.log(object_name)
        //  添加至formdata
            // 标的文件添加
            // console.log(objectPhoto_file)
            console.log(filesArr)
            for(var i = 0;i<filesArr.length;i++){
                form_data.append("objectPhoto_file",filesArr[i])

            }
            for(var i=0;i<objectInvestigate_file.length;i++){  
                form_data.append("objectInvestigate_file",objectInvestigate_file[i])
            }
            for(var i=0;i<appraisalSummaries_id.length;i++){  
                form_data.append("appraisalSummaries_id",appraisalSummaries_id[i])
            }
            for(var i=0;i<otFile_id.length;i++){  
                form_data.append("otFile_id",otFile_id[i])
            }
            // 保存标的信息各字段
            sum = sum + parseInt(transaction_price);
            console.log(sum)
            sessionStorage['sum'] = sum;
            sessionStorage['object_uuid'] = object_uuid//保存标的id
            sessionStorage['object_name'] = object_name//保存标的名称
            form_data.append('presentation_condition',presentation_condition)//情况说明
            form_data.append('object_uuid',object_uuid)//标的物id
            form_data.append('lawCase_id',id)//案件id
            form_data.append('object_name',object_name)
            form_data.append('object_location',object_location)
            form_data.append('property_type',property_type)
            form_data.append('estimated_price',estimated_price)
            form_data.append('potential_purchaser',potential_purchaser)
            form_data.append('bidder_describe',bidder_describe)
            form_data.append('auction_state',auction_state)
            form_data.append('announcement_time',announcement_time)
            form_data.append('auction_platform',auction_platform)
            form_data.append('auction_url',auction_url)
            form_data.append('starting_price',starting_price)
            form_data.append('transaction_price',transaction_price)
            form_data.append('premium_rate',premium_rate)
            form_data.append('assess_state',assess_state)
            form_data.append('assess_method',assess_method)
            form_data.append('appraisal_agency',appraisal_agency)
            form_data.append('appraisal_price',appraisal_price)
        // 售后
            form_data.append('after_state',after_state)
            form_data.append('buyer',buyer)
            form_data.append('buyer_phoneNum',buyer_phoneNum)
            form_data.append('remark',remark)
            form_data.append('lawCase_id',id)
            // form_data.append('object_name',object_name)
            let  user_name =  $("#username").text();
            form_data.append('user_name',user_name)
            // 案件名称保存
            sessionStorage['object_name'] = object_name;
            // sessionStorage['']
            // $(".object_name").val(object_name)
             //对于用户提交标的表单惊醒得空判断
             console.log(typeof(announcement_time))
                  hide("objectadd")
                let state = true;
                if(potential_purchaser == "有"){
                    if(bidder_describe == ""){
                        state = false;
                    }
                }
                console.log(potential_purchaser,bidder_describe)
                if(object_name == ""  || object_location =="--请选择您的城市--" || filesArr.length == 0 || objectInvestigate_file.length ==0 ){
                        state = false 
                }
                    if(auction_state=="一拍成交"){
                        if(announcement_time =="" || auction_url =="" || starting_price =="" || transaction_price==="" || premium_rate =="" ){
                           state = false
                        }
                    } 
                 if(auction_state == "以物抵债"){
                        if(presentation_condition == ""){
                           state = false
                        }
                    }
                      
                if(auction_state == "二拍成交"){
                        if(announcement_time =="" || auction_url =="" || starting_price =="" || transaction_price==="" || premium_rate =="" ){
                          state = false
                        }
                    }   
                 if(auction_state == "变卖成交"){
                        if(announcement_time =="" || auction_url =="" || starting_price =="" || transaction_price==="" || premium_rate =="" ){
                          state = false
                        }  
                    }    
                 if(auction_state =="其他"){
                        if(presentation_condition == ""){
                          state = false
                        }
                    }
                    if(assess_state == "已评估"){
                        if(appraisal_price == "" || otFile_id.length == 0){
                            state = false
                        }
                    }
                    //售后栏
                    if(after_state == "已交割"){
                        if(buyer == "" || buyer_phoneNum ==""){
                           state = false
                        }
    
                    }        
                // 评估栏
                if(assess_state == "已评估"){
                    if(appraisal_price == "" || otFile_id.length == 0){
                       state = false
                    }
                }
                //售后栏
                if(after_state == "已交割"){
                    if(buyer == "" || buyer_phoneNum ==""){
                       state = false
                    }
                }
                console.log(state)
                  if(state == false){
                    alert("请填写完全部必填信息！")
                  }else{
                    objext_ajax()
                  } 
          function objext_ajax(){        
            $.ajax({
                url:"http://39.107.242.243:80/auction/add/object/",
                type:'POST',
                data:form_data,
                processData: false,  // tell jquery not to process the data
                contentType: false, 
                success:function(res){
                    console.log(res);
                    if(res.code == 1){
                     $(".biaodiwapper").css({
                         display:"none"
                     })
                    //  console.log(id)
                       //查看标的物信息
                      let form_data3 = new FormData()
                      form_data3.append('ocject_uuid',object_uuid)
                    //   console.log(form_data2)
                       $.ajax({
                        url:"http://39.107.242.243:80/auction/a/object/",
                        type:'POST',
                        data:form_data3,
                        processData: false,  // tell jquery not to process the data
                        contentType: false, 
                        success:function(res){
                            console.log(res)
                            console.log(res.data)
                            let object_lists = res.data
                            // $(".object_form").remove()
                            //新建完毕数据清空
                            $(".object_name").val("")
                            $("#sheng").val('0')
                            $(".property_type").val('0')
                            $(".estimated_price").val('0')
                            $(".potential_purchaser").val('1')
                            //竞买人描述是
                            $(".bidder_describe").val("")
                            //拍卖状态
                            $(".auction_state").val('0')
                            $(".remove_reason").val("")
                            $(".presentation_condition").val("")
                            $(".announcement_time").val("")
                            $(".auction_platform").val('0')
                            $(".auction_url").val("")
                            $(".starting_price").val("")
                            $(".transaction_price").val("")
                            $(".premium_rate").val("")
                            // 评估机构
                            $(".assess_state").val('1')
                            $(".assess_method").val('0')
                            $(".appraisal_agency").val("")
                            $(".appraisal_price").val("")
                            $(".appraisalSummaries_id").val("")
                            $(".objectInvestigate_file").val("")
                            $(".otFile_id").val("")
                               //售后状态
                                $(".after_state").val('1')  
                                //买受人
                                $(".buyer").val("")
                                $(".buyer_phoneNum").val("")
                             //备注
                                $(".remark").val("") 
                                $(".show-img-div2").remove()
                            for(let ii of object_lists){
                              // for(let iilist of ii){
                                  let objectlist = `
                                  <div class="newobject object_form">
                                    <table class="main_tb">
                                      <thead>
                                      <tr>
                                          <th class="all-choose">
                                          </th>
                                          <th style="display: none;"  class="uuid_th">${object_uuid}</th>
                                          <th>标的名称</th>
                                          <th>所在地</th>
                                          <th class="zhuangtai">状态</th>
                                          <th>财产类型</th>
                                          <th>预估价格</th>
                                          <th>潜在竞买人</th>
                                          <th>竞买人描述</th>
                                          <th id="object_th">
                                          <span class="object_copy aaa">复制</span>
                                          <span class="object_update aaa">编辑</span>
                                          <span class="object_delete aaa">删除</span>
                                        </th> 
                                      </tr>
                                      </thead>
                                      <tbody class="tbContent case_maintb">
                                        <tr class="b_first">
                                          <td class="all-choose">
                                              <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                          </td>
                                          <td style="display: none;">${ii.object_uuid}</td>
                                          <td>${ii.object_name}</td>
                                          <td>${ii.object_location}</td>
                                          <td class="object_status">${ii.object_status}</td>
                                          <td>${ii.property_type}</td>
                                          <td>${ii.estimated_price}</td>
                                          <td>${ii.potential_purchaser}</td>
                                          <td>${ii.bidder_describe}</td>

                                          <td><a data-toggle="collapse" data-parent="#accordion" href="#${ii.object_uuid}"><span class="more"><i class="am-icon-plus"></i>查看更多</span></a>
                                          </td>
                                        </tr>
                                        <tr class="">
                                          <td colspan="10" style="background-color:#F5F5F5;padding: 0">
                                              <div id="${ii.object_uuid}" class="panel-collapse collapse">
                                                  <table class="coltable">
                                                      <thead>
                                                      <tr>
                                                      <th>拍卖状态</th>
                                                      <th>公告时间</th>
                                                      <th>拍卖平台</th>
                                                      <th>拍卖网址</th>
                                                      <th>起拍价</th>
                                                      <th>成交价</th>
                                                      <th>溢价率</th>
                                                      </tr>
                                                      </thead>
                                                      <tbody>
                                                        <tr class="b_second">
                                                        <td>${ii.auction_state}</td>
                                                        <td>${ii.announcement_time}</td>
                                                        <td>${ii.auction_platform}</td>
                                                        <td>${ii.auction_url}</td>
                                                        <td>${ii.starting_price}</td>
                                                        <td>${ii.transaction_price}</td>
                                                        <td>${ii.premium_rate}</td>
                                                      </tr>
                                                      </tbody>
                                                      <thead>
                                                        <tr>
                                                        <th>评估状态</th>
                                                        <th>评估方式</th>
                                                        <th>评估机构</th>
                                                        <th>评估价格</th>
                                                        </tr>
                                                      </thead>
                                                        <tbody>
                                                          <tr class="b_second">
                                                            <td>${ii.assess_state}</td>
                                                            <td>${ii.assess_method}</td>
                                                            <td>${ii.appraisal_agency}</td>
                                                            <td>${ii.appraisal_price}</td>
                                                          </tr>
                                                        
                                                        </tbody>
                                                        <thead>
                                                          <tr>
                                                          <th>售后状态</th>
                                                          <th>买售人</th>
                                                          <th>买受人电话</th>
                                                          <th>备注</th>
                                                          </tr>
                                                        </thead>
                                                          <tbody>
                                                            <tr class="b_second">
                                                              <td>${ii.after_state}</td>
                                                              <td>${ii.buyer}</td>
                                                              <td>${ii.buyer_phoneNum}</td>
                                                              <td>${ii.remark}</td>
                                                            </tr>
                                                          
                                                          </tbody>
                                                  </table>
                            </div>
                        </td>
                      </tr>
                   
                    </tbody>   
                </table>
                 </div>
                              `
                              $(".object_wapper").append(objectlist)
                          
                             }
                       
                            //  $("body").on("mouseenter","#object_th span",function(){
                            //    $(this).css({
                            //         display:"block"
                            //     })
                            // })
                            // $("body").on("mouseleave","#object_th span",function(){
                            //     $(this).css({
                            //         display:"none"
                            //     })
                            // })

                              $(".object_table").css({
                                display:"none"
                              })
                             

                           
                        }

                       })
                    }
                }
            })
        }
    
    }) 
     //新建标的动态添加表单
    $(".add_object").click(function(){
      $(".object_table").css({
        display:"block"
      })
    })
    $(".objectoff").click(function(){
      $(".object_table").css({
        display:"none"
      })
    })

    $(".service_tariffing").blur(function(){
         let fuwulv = $(this).val();
         let transaction_price = $(".transaction_price").val()
        // let fuwu_price = $(".service_charge").val()
            fuwnum  = (fuwulv/100 * transaction_price).toFixed(2)
            console.log(fuwnum)
            $(".service_charge").val(fuwnum)

    })
    //新建收费信息
    $(".add_free").click(function(){
        let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
        console.log(choose)
        if(choose < 1){
            alert("请勾选您的标的物")
        }else{
            $(".free_table").css({
                display:"block"
            })
            let sum_price = sessionStorage.getItem('sum')
            if(sum_price == "NaN"){
                $(".transaction_price").val(0)
            }else{
                $(".transaction_price").val(sum_price)
            }
          
            let objectarr = [];
            var objectid_list = []
         
            $("input[class='object_dl-choose']:checked").each(function(){
                let object_name = $(this).parent().next().next().text()
                console.log(object_name)  
                objectarr.push(object_name)
                let object_uuids = $(this).parent().next().text()
                console.log(object_uuids)
                objectid_list.push(object_uuids)
                sessionStorage.setItem("objectid_list",JSON.stringify(objectid_list))
                })
                console.log(objectarr)
                console.log(JSON.stringify(objectid_list))
                // let object_str = JSON.stringify(objectarr)
                  sessionStorage.setItem("objectarr",objectarr)
                 let a = JSON.stringify(sessionStorage.getItem("objectarr"))  
                   let  reg = new RegExp('"',"g")
                   a = a.replace(reg,"")
                   console.log(a)
                   $(".free_table .object_name").val(a)
        
            }    
    })
    $(".freesave").click(function(){
      show("freeadd")
    })
    $(".freeoff").click(function(){
      $(".free_table").css({
        display:"none"
    })

    })
    // 保存收费信息
    $(".freeTrue").click(function(){
        hide('freeadd')
         $(".free_table").css({
        display:"none"
         })
     var biaodi_idlist = sessionStorage.getItem("objectid_list")
      console.log(biaodi_idlist)
     let sumcprice = sessionStorage.getItem('sum')
     if(sumcprice == "NaN"){
        sumcprice = 0
     }
      //  费用id
      let Feeuuid =  hex_md5(Math.random() + '' + Math.random());
      console.log(Feeuuid);
    //   let object_name = sessionStorage.getItem("object_name")+',',  //上一级标的物名称
     let object_name =  $(".free_table .object_name").val()
   
      transaction_price = $(".transaction_price").val(),//成交交割
      service_tariffing = $(".service_tariffing").val(), 
      service_charge = $(".service_charge").val(),//服务费
      // 增值服务
      valueadded_services = $(".valueadded_services").find("option:selected").text(),
      valueaddedservices_content = $(".valueaddedservices_content").val(),
      Valueadded_service_charges = $(".Valueadded_service_charges").val(),
      //开票
      have_ticket = $(".have_ticket").find("option:selected").text(),
      invoice_number = $(".invoice_number").val(),
      invoice_price = $(".invoice_price").val(),
      // 已到账
      payment_receive = $(".payment_receive").find("option:selected").text(),
      accounting_date = $(".accounting_date").val(),
      accounting_price = $(".accounting_price").val(),
      // 其他附件
      fbob_id = $(".fbob_id")[0].files,
      //备注
      content = $(".beizhu").val();
      let form_data = new FormData;
      let user_name = $("#username").text();
      console.log(user_name)
         // 循环加入附件
         for(var i=0;i<fbob_id.length;i++){  
          form_data.append("fbob_id",fbob_id[i])
      }
      let lawCase_uuid = sessionStorage.getItem('lawCase_uuid')
      form_data.append('lawCase_uuid',lawCase_uuid)
      form_data.append('user_name',user_name)
      form_data.append('objid_list',biaodi_idlist)
      form_data.append('content',content)
      form_data.append('object_name',object_name)
      form_data.append('transaction_price',transaction_price)
      form_data.append('service_charge',service_charge)
      form_data.append('service_tariffing',service_tariffing)
      form_data.append('valueadded_services',valueadded_services)
      form_data.append('valueaddedservices_content',valueaddedservices_content)
      form_data.append('Valueadded_service_charges',Valueadded_service_charges)
      form_data.append('have_ticket',have_ticket)
      form_data.append('invoice_number',invoice_number)
      form_data.append('invoice_price',invoice_price)
      form_data.append('payment_receive',payment_receive)
      form_data.append('accounting_date',accounting_date)
      form_data.append('accounting_price',accounting_price)
      form_data.append('FeeBased_uuid',Feeuuid)
      sessionStorage['Feeuuid'] = Feeuuid
      // let lawCase_uuid = sessionStorage.getItem('lawCase_uuid')
    //   $(".object_name").val(object_name)
      // console.log(service_charge)
      let  states = true;
      if(valueadded_services == "有"){
          if(valueaddedservices_content == "" || Valueadded_service_charges == ""){
              states = false
          }

      }
      console.log(payment_receive)
      if(payment_receive == "是"){
          if(accounting_date == "" && accounting_price == ""){
             states = false
          }
      }
      console.log(states)
      console.log(object_name)

      if(states == false){
          alert("请填写完整信息")
      }else{
          free_ajax()
      }

      function free_ajax(){
          $.ajax({
              url:"http://39.107.242.243:80/auction/add/fb/",
              type:'POST',
              data:form_data,
              processData: false,  // tell jquery not to process the data
              contentType: false, 
              success:function(res){
                  console.log(res);
                  if(res.code == 1){
                     axios.get('http://39.107.242.243:80/auction/a/fb/',{
                         params:{FeeBased_uuid:Feeuuid}
                      }).then(res=>{
                          console.log(res)
                           if(res.data.code == 1){
                               $(".shoufeiwapper").css({
                                   display:"none"
                               })
                               let freelist = res.data.data;
                               for(let ii of freelist){
                                   let free_content = `
                                   <div class="newobject free_form">
                                   <table class="main_tb">
                                     <thead>
                                     <tr>  
                                        <th class="all-choose">
                                        </th>
                                         <th style="display: none;">${ii.FeeBased_uuid}</th>
                                         <th>标的名称</th>
                                         <th>成交价合计</th>
                                         <th>服务费率</th>
                                         <th>服务费</th>
                                         <th>增值服务</th>
                                         <th>增值服务内容</th>
                                         
                                         <th id="free_th">
                                          <span class="free_copy bbb">复制</span>
                                          <span class="free_update bbb">编辑</span>
                                          <span class="free_delete bbb">删除</span>
                                        </th> 
                                     </tr>
                                     </thead>
                                     <tbody class="tbContent case_maintb">
                                       <tr class="c_first">
                                       <td class="all-choose">
                                       <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                       </td>
                                         <td>${ii.object_name}</td>
                                         <td>${sumcprice}</td>
                                         <td>${ii.service_tariffing}%</td>
                                         <td>${ii.service_charge}</td>
                                         <td>${ii.valueadded_services}</td>
                                         <td>${ii.valueaddedservices_content}</td>
                                         <td><a data-toggle="collapse" data-parent="#accordion" href="#${ii.FeeBased_uuid}"><span class="more"><i class="am-icon-plus"></i>查看更多</span></a>
                                         </td>
                                        </tr>
                                        <tr class="">
                                         <td colspan="10" style="background-color:#F5F5F5;padding: 0">
                                             <div id="${ii.FeeBased_uuid}" class="panel-collapse collapse">
                                                 <table class="coltable">
                                                     <thead>
                                                     <tr>
                                                      <th>增值服务收费</th>
                                                      <th>已开票</th>
                                                      <th>发票号码</th>
                                                      <th>开票金额</th>
                                                      <th>备注</th>
                                                     </tr>
                                                     </thead>
                                                     <tbody>
                                                       <tr class="c_second">
                                                       <td>${ii.Valueadded_service_charges}</td>
                                                       <td>${ii.have_ticket}</td>
                                                       <td>${ii.invoice_number}</td>
                                                       <td>${ii.invoice_price}</td>
                                                       <td>${ii.content}</td>
                                                     </tr>
                                                     </tbody>
                                                     <thead>
                                                       <tr>
                                                        <th>已到账</th>
                                                        <th>到账时间</th>
                                                        <th>到账金额</th>
                                                       </tr>
                                                     </thead>
                                                       <tbody>
                                                         <tr class="c_second">
                                                           <td>${ii.payment_receive}</td>
                                                           <td>${rTime(ii.accounting_date)}</td>
                                                           <td>${ii.accounting_price}</td>
                                                         </tr>
                                                       </tbody>
                                                       
                                                 </table>
                                             </div>
                                         </td>
                                       </tr>
                                    
                                     </tbody>   
                                 </table>
                                  </div>
                                   `
                                   $(".free_wapper").append(free_content)
                                    // let object_stats= $(".object_status").text();
                                    // let object_type =  $(".object_status").prev().prev().prev().prev().children()
                                    // console.log(object_stats)
                                    // if(object_stats == 1){
                                    //     object_type.attr("disabled","true")
                                    // }else{
                                    //     object_type.attr('disabled',"false")
                                    // }
                                    // location.reload()
                                   
                               }
                               let aa = $("input[class='dl-choose']:checked")
                               console.log(aa)
                            //    $("input[class='dl-choose']:checked").each(function(){
                            //        console.log(this)
                            //        console.log($(this))
                            //         if($(this)== true){
                            //             $("input[class='dl-choose']:checked").attr("disabled","disabled")

                            //         }

                            //    })
                        //        $(".object_uuid").each(function(){
                        //         let object_type = $(this).next().next().next().text()
                        //         let object_check = $(this).prev().children()
                        //         console.log(object_type)
                        //         console.log(object_check)
                        //         if(object_type == 1){
                        //             object_check.attr("disabled","disabled")
                        //         }else if(object_type == 0){
                        //             object_check.removeAttr('disabled')
                        //         }
                                  
                            
                        // }) 
                               location.reload()
                              
                           }
                      })

                  }
              }
  
          })


      }
})
    //表单验证函数
    function law_reg(){
        let flag = false;
        let name_reg = /[\u4e00-\u9fa5]/;
        let phinenum = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        // 失焦验证
        $(".law_case").blur(function(){
            if(this.value == "" || this.value == null){
                $(".law_case").attr('placeholder',"执行案号不能为空")
            }else{
                $(".law_case").removeAttr('placeholder')
            }
        })
            // 法院名称
        $(".mingcheng").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"法院名称不能为空")
            }
        })
        $(".mingcheng").blur(function(){
            if(name_reg.test($(this).val()) == false){
                $(this).val("输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }
        })
        //申请人
        $(".shenqing").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"申请人姓名不能为空")
            }
        })
        $(".shenqing").blur(function(){
            if(name_reg.test($(this).val()) == false){
                $(this).val("输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }
        })
        //被执行人
        $(".zhixing").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"执行人姓名不能为空")
            }
        })
        $(".zhixing").blur(function(){
            if(name_reg.test($(this).val()) == false){
                $(this).val("输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })
        //承办人
        $(".chengban").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"执行人姓名不能为空")
            }
        })
        $(".chengban").blur(function(){
            if(name_reg.test($(this).val()) == false){
                $(this).val("输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })
        //项目负责人
        $(".xiangmu").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"执行人姓名不能为空")
            }
        })
        $(".xiangmu").blur(function(){
            if(name_reg.test($(this).val()) == false){
                $(this).val("输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })
        //项目成员
        $(".xiangmumembers").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"项目成员姓名不能为空")
            }
        })

        $(".xiangmumembers").blur(function(){
            if(name_reg.test($(this).val()) == false){
                $(this).val("姓名输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })

        //申请人电话
        $(".shengqingnum").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"电话号码不能为空")
            }
        })
        $(".shengqingnum").blur(function(){
            if(phinenum.test($(this).val()) == false){
                $(this).val("电话号码输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })
        // 被执行人电话
        $(".zhixingnum").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"电话号码不能为空")
            }
        })
        $(".zhixingnum").blur(function(){
            if(phinenum.test($(this).val()) == false){
                $(this).val("电话号码输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })
        //承办人电话
        $(".zhixingnum").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"电话号码不能为空")
            }
        })
        $(".chengbannum").blur(function(){
            if(phinenum.test($(this).val()) == false){
                $(this).val("电话号码输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }
        })
       //项目负责人电话
       $(".fuzenum").focus(function(){
        if($(this).val() == ""){
            $(this).attr('placeholder',"电话号码不能为空")
        }
    })
       $(".fuzenum").blur(function(){
        if(phinenum.test($(this).val()) == false){
            $(this).val("电话号码输入格式错误").css({
                color:"red"
            })
        }else{
            $(this).css({
                color:"black"
            })
        }
       })
    //    备注
       $(".remarks").blur(function(){
        if($(this).val() == ""){
            $(this).attr('placeholder',"备注不能为空")
        }
    })
    //    $(".remarks").blur(function(){
       
    //    })   
    }    
    function object_reg(){
        // 表达验证

        let flag = false;
        let name_reg = /[\u4e00-\u9fa5]/;
        let phinenum = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let  url_reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
        let num_reg = /^[0-9]*$/;
        //  标的名称
        $(".object_name").blur(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"标的物名称不能为空")
            }else{
                $(this).removeAttr('placeholder')
            }

        })
        //竞买人描述
        $(".bidder_describe").blur(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"描述内容不能为空")
            }else{
                $(this).removeAttr('placeholder')
            }
        })
        //=撤拍原因
        $(".remove_reason").blur(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"撤拍原因不能为空")
            }else{
                $(this).removeAttr('placeholder')
            }
        })
        //情况说明
        $(".presentation_condition").blur(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"情况说明不能为空")
            }else{
                $(this).removeAttr('placeholder')
            }
        })
        //拍卖网址
        $(".auction_url").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"网址输入不能为空")
            }else{
                $(this).removeAttr('placeholder')
            }
        })
        $(".auction_url").blur(function(){
            if(url_reg.test($(this).val()) == false){
                $(this).val("输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }
        })
        //起拍价与成交价
        $(".starting_price").blur(function(){
            if(num_reg.test($(this).val()) == false){
                $(this).val("请输入数字").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })
        // //评估机构
        // $(".appraisal_agency")
        //评估价格
        $(".appraisal_price").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"价格输入不能为空")
            }else{
                $(this).removeAttr('placeholder')
            }

        })
        $(".appraisal_price").blur(function(){
            if(num_reg.test($(this).val()) == false){
                $(this).val("请输入数字").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })
        // 买受人
        $(".buyer").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"买受人姓名输入不能为空")
            }else{
                $(this).removeAttr('placeholder')
            }
        })
        $(".buyer").blur(function(){
            if(name_reg.test($(this).val()) == false){
                $(this).val("输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }


        })
        // 买受人电话
        $(".buyer_phoneNum").focus(function(){
            if($(this).val() == ""){
                $(this).attr('placeholder',"买受人电话输入不能为空")
            }else{
                $(this).removeAttr('placeholder')
            }
        })
        $(".buyer_phoneNum").blur(function(){
            if(phinenum.test($(this).val()) == false){
                $(this).val("电话号码输入格式错误").css({
                    color:"red"
                })
            }else{
                $(this).css({
                    color:"black"
                })
            }

        })
    }    


    // 进入页面查询案件 标的 费用信息
    // lawCase_uuid ，案件id  object_uuid 标的id   object_uuid  费用id
    var  law_ID = sessionStorage.getItem("lawCase_uuid");
     console.log(law_ID)
    function unique (object_ID) {
     return Array.from(new Set(object_ID))
   }  

       if(law_ID != null){
           free_show()
       }
        function free_show(){
            let sumcprice = sessionStorage.getItem('sum')
            console.log(sumcprice)
            if(sumcprice == "NaN"){
                sumcprice = 0
             console.log(111)
            }
            let object_uuid= sessionStorage.getItem("object_uuid")
            console.log(object_uuid)
          let  form_data_free = new  FormData();
          form_data_free.append("lawCase_uuid",law_ID)
        $.ajax({
            url:"http://39.107.242.243:80/auction/all/info/",
                        type:'POST',
                        data:form_data_free,
                        processData: false,  // tell jquery not to process the data
                        contentType: false, 
                        success:function(res){
                            console.log(res)
                          let law_lists = res.data.lawcase,
                              object_lists = res.data.lcobject,
                              free_lists = res.data.feebased;
                              //循环案件信息
                              $(".case_from").remove()
                              if(law_lists != ""){
                                for(let inf of law_lists){
                                  let anjian_content = `
                                  <div class="newobject case_from">
                                  <table class="main_tb">
                                    <thead>
                                    <tr>
                                        <th class="all-choose first_dl">
                                        </th>
                                        <th>执行案号</th>
                                        <th>法院名称</th>
                                        <th>申请人</th>
                                        <th>申请人电话</th>
                                        <th>被执行人</th>
                                        <th>被执行人电话</th>
                                        <th class="casebtn_th"><span class="case_update">编辑</span><th>
                                    </tr>
                                    </thead>
                                    <tbody class="tbContent fress_maintb">
                                      <tr  class="c_first">
                                        <td class="all-choose first_dl">
                                            <input type="checkbox" class="dl-choose" name="dl-choose">
                                        </td>
                                        <td>${inf.law_case}</td>
                                        <td>${inf.court_name}</td>
                                        <td>${inf.proposer}</td>
                                        <td>${inf.proposer_phonenumber}</td>
                                        <td>${inf.executor}</td>
                                        <td>${inf.executor_phoneNumber}</td>
                                        <td><a data-toggle="collapse" data-parent="#accordion" href="#111" style="color:'orange'"><span class="more"><i class="am-icon-plus"></i>查看更多</span></a>
                                        </td>
                                       </tr>
                                       <tr>
                                        <td colspan="10" style="background-color:#F5F5F5;padding: 0">
                                            <div id="111" class="panel-collapse collapse">
                                                <table class="coltable">
                                                    <thead>
                                                    <tr>
                                                 
                                                     <th>承办人</th>
                                                     <th>承办人电话</th>
                                                     <th>项目负责人</th>
                                                     <th>项目负责人电话</th>
                                                     <th>项目成员</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr class="c_second">
                                                 
                                                      <td>${inf.undertaker}</td>
                                                      <td>${inf.undertaker_phoneNumber}</td>
                                                      <td>${inf.project_leader}</td>
                                                      <td>${inf.projectLeader_phone}</td>
                                                      <td>${inf.project_member}</td>
                                                      </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>   
                                </table>
                                 </div>
                                  `
                                    $(".case_wapper").append(anjian_content)   
                                  
                                     
                                  }
                               
                              }
                            
                              //循环标的信息
                             $(".object_from").remove()
                              if( object_lists !=""){
                                for(let ii of object_lists){
                                    // for(let iilist of ii){
                                        let objectlist = `
                                        <div class="newobject object_from">
                                          <table class="main_tb">
                                            <thead>
                                            <tr>
                                                <th class="all-choose">
                                                   
                                                </th>
                                                <th style="display: none;" class="uuid_th">${ii.object_uuid}</th>
                                                <th>标的名称</th>
                                                <th>所在地</th>
                                                <th class='zhuangtai'>状态</th>
                                                <th>财产类型</th>
                                                <th>预估价格</th>
                                                <th>潜在竞买人</th>
                                                <th>竞买人描述</th>
                                                <th id="object_th">
                                                <span class="object_copy aaa">复制</span>
                                                <span class="object_update aaa">编辑</span>
                                                <span class="object_delete aaa">删除</span>
                                              </th> 
                                            </tr>
                                            </thead>
                                            <tbody class="tbContent case_maintb">
                                              <tr class="b_first">
                                                <td class="all-choose">
                                                    <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                                </td>
                                                <td style="display: none;" class="object_uuid">${ii.object_uuid}</td>
                                                <td>${ii.object_name}</td>
                                                <td>${ii.object_location}</td>
                                                <td class="object_status">${ii.object_status}</td>
                                                <td>${ii.property_type}</td>
                                                <td>${ii.estimated_price}</td>
                                                <td>${ii.potential_purchaser}</td>
                                                <td>${ii.bidder_describe}</td>

                                                <td><a data-toggle="collapse" data-parent="#accordion" href="#${ii.object_uuid}"><span class="more"><i class="am-icon-plus"></i>查看更多</span></a>
                                                </td>
                                              </tr>
                                              <tr class="">
                                                <td colspan="10" style="background-color:#F5F5F5;padding: 0">
                                                    <div id="${ii.object_uuid}" class="panel-collapse collapse">
                                                        <table class="coltable">
                                                            <thead>
                                                            <tr>
                                                            <th>拍卖状态</th>
                                                            <th>公告时间</th>
                                                            <th>拍卖平台</th>
                                                            <th>拍卖网址</th>
                                                            <th>起拍价</th>
                                                            <th>成交价</th>
                                                            <th>溢价率</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                              <tr class="b_second">
                                                              <td>${ii.auction_state}</td>
                                                              <td>${ii.announcement_time}</td>
                                                              <td>${ii.auction_platform}</td>
                                                              <td>${ii.auction_url}</td>
                                                              <td>${ii.starting_price}</td>
                                                              <td>${ii.transaction_price}</td>
                                                              <td>${ii.premium_rate}</td>
                                                            </tr>
                                                            </tbody>
                                                            <thead>
                                                              <tr>
                                                              <th>评估状态</th>
                                                              <th>评估方式</th>
                                                              <th>评估机构</th>
                                                              <th>评估价格</th>
                                                              </tr>
                                                            </thead>
                                                              <tbody>
                                                                <tr class="b_second">
                                                                  <td>${ii.assess_state}</td>
                                                                  <td>${ii.assess_method}</td>
                                                                  <td>${ii.appraisal_agency}</td>
                                                                  <td>${ii.appraisal_price}</td>
                                                                </tr>
                                                              
                                                              </tbody>
                                                              <thead>
                                                                <tr>
                                                                <th>售后状态</th>
                                                                <th>买售人</th>
                                                                <th>买受人电话</th>
                                                                <th>备注</th>
                                                                </tr>
                                                              </thead>
                                                                <tbody>
                                                                  <tr class="b_second">
                                                                    <td>${ii.after_state}</td>
                                                                    <td>${ii.buyer}</td>
                                                                    <td>${ii.buyer_phoneNum}</td>
                                                                    <td>${ii.remark}</td>
                                                                  </tr>
                                                                
                                                                </tbody>
                                                        </table>
                                  </div>
                              </td>
                            </tr>
                          </tbody>   
                      </table>
                       </div>
                                    `
                                    $(".object_wapper").append(objectlist)
                                    }
                                    $(".object_uuid").each(function(){
                                        let object_type = $(this).next().next().next().text()
                                        let object_check = $(this).prev().children()
                                        console.log(object_type)
                                        console.log(object_check)
                                        if(object_type == 0){
                                            object_check.attr("disabled","disabled")
                                        }else if(object_type == 1){
                                            object_check.removeAttr('disabled')
                                        }
                                          
                                    
                                }) 
                              }
                              //循环费用信息
                              $(".free_from").remove()
                              if(free_lists !=""){
                                for(let ii of free_lists){
                                  let free_content = `
                                  <div class="newobject free_from">
                                  <table class="main_tb">
                                    <thead>
                                    <tr>
                                        <th class="all-choose">
                                        </th>
                                        <th style="display: none;">${ii.FeeBased_uuid}</th>
                                        <th>标的名称</th>
                                        <th>成交价合计</th>
                                        <th>服务费率</th>
                                        <th>服务费</th>
                                        <th>增值服务</th>
                                        <th>增值服务内容</th>
                                        <th id="free_th">
                                        <span class="free_copy">复制</span>
                                        <span class="free_update">编辑</span>
                                        <span class="free_delete">删除</span>
                                      </th> 
                                    </tr>
                                    </thead>
                                    <tbody class="tbContent case_maintb">
                                      <tr class="c_first">
                                      <td class="all-choose">
                                      <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                      </td>
                                        <td>${ii.object_name}</td>
                                        <td>${sumcprice}</td>
                                        <td>${ii.service_tariffing}%</td>
                                        <td>${ii.service_charge}</td>
                                        <td>${ii.valueadded_services}</td>
                                        <td>${ii.valueaddedservices_content}</td>
                                        <td><a data-toggle="collapse" data-parent="#accordion" href="#${ii.FeeBased_id}"><span class="more"><i class="am-icon-plus"></i>查看更多</span></a>
                                        </td>
                                       </tr>
                                       <tr class="">
                                        <td colspan="10" style="background-color:#F5F5F5;padding: 0">
                                            <div id="${ii.FeeBased_id}" class="panel-collapse collapse">
                                                <table class="coltable">
                                                    <thead>
                                                    <tr>
                                                   
                                                     <th>增值服务收费</th>
                                                     <th>已开票</th>
                                                     <th>发票号码</th>
                                                     <th>开票金额</th>
                                                     <th>备注</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr class="c_second">
                                                   
                                                      <td>${ii.Valueadded_service_charges}</td>
                                                      <td>${ii.have_ticket}</td>
                                                      <td>${ii.invoice_number}</td>
                                                      <td>${ii.invoice_price}</td>
                                                      <td class="remark_td">${ii.content}</td>
                                                    </tr>
                                                    </tbody>
                                                    <thead>
                                                      <tr>
                                                       <th>已到账</th>
                                                       <th>到账时间</th>
                                                       <th>到账金额</th>
                                                      
                                                      </tr>
                                                    </thead>
                                                      <tbody>
                                                        <tr class="c_second">
                                                          <td>${ii.payment_receive}</td>
                                                          <td>${rTime(ii.accounting_date)}</td>
                                                          <td>${ii.accounting_price}</td>
                                                        </tr>
                                                      </tbody>
                                                      
                                                </table>
                                            </div>
                                        </td>
                                      </tr>
                                   
                                    </tbody>   
                                </table>
                                 </div>
                                 
                                  `
                                    $(".free_wapper").append(free_content)
                                  
                                }
                              }
                        }

        })
          

        }

      //删除标的信息 
      $(".delete_object").click(function(){
        let choose = document.querySelectorAll("input[class='dl-choose']:checked").length;
        console.log(choose)
        if(choose < 1){
            alert("请勾选您的标的物")
        }else{
            deleteObject()
           
        }
        function deleteObject(){
         let  object_id = $("input[name='dl-choose']:checked").parent().next().text();
         console.log(object_id)
           let formdata_delete = new FormData();
           formdata_delete.append('object_uuid',object_id)
         console.log(object_id)
         $.ajax({
             url:"http://39.107.242.243:80/auction/delete/object/",
            type:'POST',
            data:formdata_delete,
            processData: false,  // tell jquery not to process the data
            contentType: false, 
            success:function(res){
                console.log(res)
            }
         })
       

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
        $("body").on("mouseenter",".case_from",function(){
            console.log(111)
            $(".case_update").css({
                display:"block"
            })
        
        })
        $("body").on("mouseleave",".case_from",function(){
            $(".case_update").css({
                display:"none"
            })  
        })
        $("body").on("mouseenter",".object_from",function(){
            $("#object_th span").css({
                display:"block"
            })
        })
        $("body").on("mouseleave",".object_from",function(){
            $("#object_th span").css({
                display:"none"
            })
        })
        $("body").on("mouseenter",".free_from",function(){
            $("#free_th span").css({
                display:"block"
            })
        })
        $("body").on("mouseleave",".free_from",function(){
            $("#free_th span").css({
                display:"none"
            })

        })

        // 案件编辑事件
        $(".case_wapper").on("click",".case_update",function(){
          $(".case_table").css({
                display:"block"
            })
            $(".savebtn").css({
                display:"none"
            })
            $(".case_edit").css({
                display:"block"
            })
            console.log($(".case_table"))
            case_edit()
        })
        function case_edit(){
            // 获取数据
            let case_edit_uuid = sessionStorage.getItem("lawCase_uuid")
            axios.get('http://39.107.242.243/auction/a/case/',{
                params:{lawCase_uuid:case_edit_uuid}}).then(res=>{
                    for(let ii of res.data.data){
                        console.log(res.data.data)
                        // 委托书
                        let shuname,funame;
                        let  h_weituo =  ii.filepath_dict.pa_filepath.length,
                             h_fujian = ii.filepath_dict.oa_filepath.length;
                             if(h_weituo == 0){
                                shuname = ""
                                shu_oldname = ""
                                $(".wenjian1").css({
                                    display:"none"
                                })
                             }else{
                                shuname = ii.filepath_dict.pa_filepath[0].filepath,
                                shu_oldname = ii.filepath_dict.pa_filepath[0].filename
                               
                             }
                             sessionStorage["shu_oldname"] = shu_oldname
                             if(h_fujian == 0){
                                funame = "";
                                fu_oldname = "";
                                $(".wenjian2").css({
                                    display:"none"
                                })
                             }else{
                                funame = ii.filepath_dict.oa_filepath[0].filepath;
                                fu_oldname =ii.filepath_dict.oa_filepath[0].filename;
                             }
                             sessionStorage["fu_oldname"] = fu_oldname
                            console.log(shuname)
                            console.log(funame)
                            console.log(shu_oldname)
                            console.log(fu_oldname)
                            $(".oldpoa").val(shu_oldname)
                            $(".oldoa").val(fu_oldname)
                            $(".law_case").val(ii.law_case)
                            $(".mingcheng").val(ii.court_name)
                            $(".shenqing").val(ii.proposer)
                            $(".shengqingnum").val(ii.proposer_phonenumber)
                            $(".zhixing").val(ii.executor)
                            $(".zhixingnum").val(ii.executor_phoneNumber)
                            $(".chengban").val(ii.undertaker)
                            $(".chengbannum").val(ii.undertaker_phoneNumber)
                            $(".xiangmu").val(ii.project_leader)
                            $(".fuzenum").val(ii.projectLeader_phone)
                            $(".remarks").val(ii.remark)
                            $(".project_member").val(ii.project_member)
                                if(h_weituo < 1){
                                    $(".oldpoa").css({
                                        display:"none"
                                    })
                                }else{
                                    $(".oldpoa").css({
                                        display:"block"
                                    })                            
                                }
                                if(h_fujian < 1){
                                    $(".oldoa").css({
                                        display:"none"
                                    })
                                }else{
                                    $(".oldoa").css({
                                        display:"block"
                                    })
                                    
                                }
                        $(".case_edit").click(function(){
                            let law_case =  $(".law_case").val(),
                            user_id =  $("#username").text(),
                            courtname = $(".mingcheng").val(),
                            proposer =  $(".shenqing").val(),
                            proposer_phonenumber =  $(".shengqingnum").val(),
                            executor =   $(".zhixing").val(),
                            executor_phoneNumber =  $(".zhixingnum").val(),
                            undertaker =  $(".chengban").val(),
                            undertaker_phoneNumber = $(".chengbannum").val(),
                            project_leader =   $(".xiangmu").val(),
                            projectLeader_phone = $(".fuzenum").val(),
                            remark = $(".remarks").val(),
                            project_member = $(".project_member").val();
                            let form_data_caseedit = new FormData;
                               form_data_caseedit.append('lawCase_uuid',case_edit_uuid)
                               form_data_caseedit.append("law_case",law_case)
                               form_data_caseedit.append("courtname",courtname)
                               form_data_caseedit.append("proposer",proposer)
                               form_data_caseedit.append("user_id",user_id)
                               form_data_caseedit.append("proposer_phonenumber",proposer_phonenumber)
                               form_data_caseedit.append("executor",executor)
                               form_data_caseedit.append("executor_phoneNumber",executor_phoneNumber)
                               form_data_caseedit.append("undertaker",undertaker)
                               form_data_caseedit.append("undertaker_phoneNumber",undertaker_phoneNumber)
                               form_data_caseedit.append("project_leader",project_leader)
                               form_data_caseedit.append("projectLeader_phone",projectLeader_phone)
                               form_data_caseedit.append("project_member",project_member)
                               form_data_caseedit.append("remark",remark)
                            let weituoshu = $(".poa")[0].files;
                            let fujian = $(".oa")[0].files;
                            let weiLength = weituoshu.length;//委托书
                            let fujianLength = fujian.length;//附件
                            let shu_list = [];
                            let fujian_list = []
                            shu_list.push(shuname)//委托书老名字    
                            fujian_list.push(funame)//附件老名字
                            console.log(JSON.stringify(shu_list))
                            console.log(fujian_list)
                            console.log(weiLength)
                            console.log(fujianLength)
                            console.log(weituoshu)
                            console.log(fujian)
                            if(weiLength == 0){
                                // if()
                                form_data_caseedit.append("old_power_attorney",JSON.stringify(shu_list))
                            }else{
                                // console.log("加入委托书")
                                // form_data_caseedit.append("old_power_attorney",JSON.stringify(shu_list))
                                for(var i = 0;i<weiLength;i++){
                                    form_data_caseedit.append("power_attorney",weituoshu[i])
                                }
                            }
                            if(fujianLength == 0){
                                   form_data_caseedit.append("old_other_attachments",JSON.stringify(fujian_list))
                            }else{
                             
                                for(var i = 0;i<fujianLength;i++){
                                    form_data_caseedit.append("other_attachments",fujian[i])
                                }
                            }
                            console.log(weiLength,fujianLength)
                            console.log(ii.law_case,law_case,ii.court_name,courtname,ii.proposer,proposer,ii.proposer_phonenumber,proposer_phonenumber,ii.executor,executor,ii.executor_phoneNumber,executor_phoneNumber,ii.undertaker,undertaker, ii.project_leader,project_leader,ii.project_member,project_member,ii.remark,remark)
                            console.log(remark)
                            console.log($(".oldpoa").val())
                            console.log(flag)
                            if(ii.law_case == law_case && ii.court_name == courtname &&
                               ii.proposer == proposer && ii.proposer_phonenumber == proposer_phonenumber &&
                               ii.executor == executor && ii.executor_phoneNumber == executor_phoneNumber && 
                               ii.undertaker == undertaker && ii.undertaker_phoneNumber == undertaker_phoneNumber &&
                                ii.project_leader == project_leader && ii.projectLeader_phone == projectLeader_phone && 
                                ii.project_member == project_member && ii.remark == remark && weiLength == 0 && fujianLength == 0 && flag == true){
                                     show("editerr")
                                }else if(law_case == "" || courtname == "" || proposer == ""|| proposer_phonenumber == "" || project_leader == ""|| projectLeader_phone ==""|| project_member == ""){
                                     alert("您有必填信息未完善！")
                                }else{
                                 
                                    $.ajax({
                                        url:"http://39.107.242.243:80/auction/edit/case/",
                                    type:'POST',
                                    data:form_data_caseedit,
                                    processData: false,  // tell jquery not to process the data
                                    contentType: false, 
                                    success:function(res){
                                        console.log(res)
                                        if(res.code == 1){
                                            $(".case_table").css({
                                                display:"none"
                                            })
                                            // location.reload();
                                            $(".case_from").remove()

                                        }
                                    }
                                    })
                             }
                             $(".errTrue").click(function(e){
                                if(!e.isPropagationStopped()){
                                    hide("editerr")  
                                }
                                e.stopPropagation()
                             })
                        })
                    }
                })
                // 编辑确定
        }
        //复制案件
        $(".object_wapper").on("click",".object_copy",function(){
           let lawCase_id = sessionStorage.getItem('lawCase_uuid'),
         object_id = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().text();
         console.log(lawCase_id,object_id)
         $.ajax({
            url:'http://39.107.242.243:80/auction/copy/object/',
            type: 'POST',
            data: {
                lawCase_id:lawCase_id,
                object_uuid:object_id
            },
            success: (res) => {
                console.log(res);
                // if(res.code == 1){
                //    location.reload();  //实现页面重新加载  
                // }else{
                //     alert(res.Message)
                // }
              
            }
        })
         

           
        })

        // $(".poa").change(function(){
        //     console.log(2222)
        //     $(".case_w_delete").css({
        //         opacity:1
        //     })
        //    let  po_name = $(this)[0].files[0].name;
        //    let shu_oldname = sessionStorage.getItem("shu_oldname")
        //    console.log(po_name)
        //    console.log(shu_oldname)
        //    if(shu_oldname != "" && po_name !=""){
        //        show("textdelete")
        //        $(".textdeleteTrue").click(function(){
        //            hide("textdelete")
        //             $(".wenjian1").css({
        //                 display:"none"
        //             })
        //        })
        //    }
        // })
        // $(".oa").change(function(){
        //     $(".case_f_delete").css({
        //         opacity:1
        //     })
        //     let  oa_name = $(this)[0].files[0].name
        //     let fu_oldname = sessionStorage["fu_oldname"]
        //     if(fu_oldname != "" && oa_name !=""){
        //         show("textdelete")
        //         $(".textdeleteTrue").click(function(){
        //             hide("textdelete")
        //         $(".wenjian2").css({
        //             display:"none"
        //          })
        //         })
        //     }
         
        // })



        
        //删除标的
        $("body").on("click",".object_delete",function(){
           let object_id = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().text()
            console.log(object_id)
            $.ajax({
                url: 'http://39.107.242.243:80/auction/delete/object/',
                type: 'POST',
                data: {
                    object_uuid:object_id,
                },
                success: (res) => {
                    console.log(res);
                    if(res.code == 1){
                       location.reload();  //实现页面重新加载  
                    }else{
                        alert(res.Message)
                    }
                  
                }
            })


        })
        //删除费用
        $("body").on("click",".free_delete",function(){
            let free_uuid = $(this).parent().prev().prev().prev().prev().prev().prev().prev().text()
            console.log(free_uuid)
            $.ajax({
                url:'http://39.107.242.243:80/auction/delete/fb/',
                type:'POST',
                data: {
                    FeeBased_uuid:free_uuid,
                },
                success: (res) => {
                    console.log(res);
                    if(res.code == 1){
                    location.reload();  //实现页面重新加载
                    } 
                }
            })

        })

        //案件  委托书上传删除
        $(".case_w_delete").click(function(){
           $(".poa").val("")
        })
        $(".case_f_delete").click(function(){
            $(".oa").val("")
        })

        // 旧文件清除
                var flag = true;
            $(".old_w_delete").click(function(){
                $(".oldpoa").val("")
                $(".oldpoa").css({
                    display:"none"
                })
                $(".wenjian1").css({
                    display:"none"
                })
                $(".old_w_delete").css({
                    display:"none"
    
                })
                flag = false;
            })
            
            $(".old_f_delete").click(function(){
                $(".oldoa").val("")
                $(".oldoa").css({
                    display:"none"
                })
                $(".wenjian2").css({
                    display:"none"
                })
                $(".old_f_delete").css({
                    display:"none"
                })
                flag = false;
            })
    //  案件编辑取消按钮
    $(".quxiaobtn").click(function(){
        $(".poa").val("")
        $(".oa").val("")
        $(".wenjian1").css({
            display:"block"
        })
        $(".wenjian2").css({
            display:"block"
        })
        $(".case_w_delete").css({
            opacity:0
        })
        $(".case_f_delete").css({
            opacity:0
        })

    })
       
      


       
    
    
  
  


  

         //时间转换函数
        function rTime(date) {
            var json_date = new Date(date).toJSON();
            return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        }
})()
