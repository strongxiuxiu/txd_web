(function(){
      //新建标的
      var law_uuid = $(".law_uuid_html").text()
      let size_sum   = 0
      let fu_size = 5*1024*1024
      let artice_size = 2*1024*1024
      // console.log(law_uuid)
    // 新增表单取消 
    $(".object_off").click(function(){
          $(".object_form ").css({
                display:"none"
          })
    })
   
    //删除标的
    $(".deleteobject_btn").click(function(){
         
      let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
      // console.log(choose)
      if(choose > 0){
            show("object_delete")
      }else{
          layer.msg("请选择您要删除的标的")
      }
    })
//     删除确定
   $(".objectDelete_True").click(function(e){
         hide("object_delete")
      if(!e.isPropagationStopped()){
            let objectu_list = [];
            $("input[class='object_dl-choose']:checked").each(function(){
                  let uuid =  $(this).parent().next().text()
                  objectu_list.push(uuid)
            })
            // console.log(objectu_list)
            $.ajax({
                  url: '/auction/delete/object/',
                  type: 'POST',
                  data: {
                      object_uuid: JSON.stringify(objectu_list),
                  },
                  success: (res) => {
                  //     console.log(res);
                    if(res.code == 1){
                          layer.msg(res.chMessage)
                          location.reload()
              
                    }
                  }
              })
      

      }
      e.stopPropagation();
  
   })
    //复制标的
 $(".copyobject_btn").click(function(){
      let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
      // console.log(choose)
      if(choose > 0){
            show("freecopy")
      }else{
          layer.msg("请选择您要复制的标的")
      } 
  })
  $(".copy_freeTrue").click(function(e){
      hide("freecopy")
   if(!e.isPropagationStopped()){
         $("input[class='object_dl-choose']:checked").each(function(){
               let uuid =  $(this).parent().next().text()
            //    console.log(uuid)
               $.ajax({
                  url: '/auction/copy/object/',
                  type: 'POST',
                  data: {
                        object_id:uuid,
                      lawCase_id:law_uuid
                  },
                  success: (res) => {
                      console.log(res);
                    if(res.code == 1){
                          layer.msg(res.chMessage)
                          location.reload()
              
                    }
                  }
              })
            
         })
       
     
   

   }
   e.stopPropagation();

})


    //编辑标的
    $(".editobject_btn").click(function(){
      let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
      // console.log(choose)
      if(choose > 0){
            update_object()
      }else{
          layer.msg("请选择您要修改的标的")
      }
    })
    function update_object(){
          $(".object_form").css({
                display:"block"
          })
          $(".object_submit").css({
                display:"none"
          })
          $(".object_xiugai").css({
                display:"block"
          })

    }
    //新增标的按钮

  $(".addobject_btn").click(function(){
      show("objectadd")
  })

            var sum = 0;
            var object_uuid;
            let objectarr = [];
            var objectid_list = []
            var object_sum = 0
            $(".objectTrue").click(function(e){
                  // hide("objectadd")
                  if(!e.isPropagationStopped()){
                        ////确定stopPropagation是否被调用过，点击按钮唯一性
                        object_uuid = hex_md5(Math.random() + '' + Math.random())
                        // console.log(object_uuid) //新建标的物id
                        // 头部信息
                        let object_name = $(".object_name").val(),
                        sheng = $("#sheng").find("option:selected").text(),
                        shi = $("#shi").find("option:selected").text(),
                        qu = $("#qu").find("option:selected").text(),
                        // shengval = $("#sheng").val(),
                        // shival = $("#shi").val(),
                        // quval = $("#qu").val(),
                         shengval =sheng,
                        shival = shi,
                        quval =qu,
                        object_location = sheng+shi+qu,   // 标的物所在地
                        property_type = $(".property_type").find("option:selected").text(), 
                        estimated_price = $(".estimated_price").find("option:selected").text(),//预估价格
                        potential_purchaser = $(".potential_purchaser").find("option:selected").text(),
                        bidder_describe = $(".bidder_describe").val(),//竞买人描述
                        objFb_node = $(".object_beizu").val(),//标的物备注
                        // 标的文件
                        form_data = new  FormData(),
         
                        // 拍卖栏
                        auction_state = $(".auction_state").find("option:selected").text(),
                        announcement_time = $(".announcement_time").val(),
                        auction_platform = $(".auction_platform").find("option:selected").text(),
                        auction_url = $(".auction_url").val(),
                        starting_price = $(".starting_price").val(),
                        transaction_price = $(".transaction_price").val(),
                        premium_rate = $(".premium_rate").val(),
                        auction_submissionDate = $(".auction_time").val(),//拍卖成交日期  
                       //撤销，以物抵债情况说明
                        presentation_condition = $(".presentation_condition").val(),
                        p_remark = $(".p_remark").val(),//拍卖的备注
                        // 评估栏
                        assess_state = $(".assess_state").find("option:selected").text(),
                        assess_method = $(".assess_method").find("option:selected").text(),
                        appraisal_agency = $(".appraisal_agency").val(),
                        appraisal_price  = $(".appraisal_price").val(),
                        assess_note = $(".assess_note").val(),//评估生成的备注
                        
                        //交割
                        after_state = $(".after_state").find("option:selected").text(),
                        buyer = $(".buyer").val(),
                        buyer_phoneNum = $(".buyer_phoneNum").val(),
                        remark = $(".remark").val(),
                       //收费
                        whether_charge = $(".order_state").find("option:selected").text()
                        receivable_serviceCharge = $(".ying_money").val(),//应收服务费
                        received_serviceCharge = $(".shou_money").val(),//已收服费
                        service_description = $(".shou_message").val(),//已收服务说明
                        Fee_note  = $(".shou_remark").val(),//收费备注.

                        //发票
                        invoice_state = $(".kiaopiao_state").find("option:selected").text(),
                        invoice_date = $(".kaipiao_date").val(),//开票日期
                        invoice_price = $(".kaipaio_price").val(),//开票金额
                        invoice_note = $(".fapiao_remark").val(),//发票备注 
                        // console.log(object_location)
                      
                        // console.log(invoice_date)
                        // 文件部分
                        // 1.标的调查表
                        objectInvestigate_id = $(".objectInvestigate_file")[0].files,
                        //2.评估摘要
                        appraisalSummaries_id = $(".appraisal_file")[0].files,
                        // 3.交割确认书
                        otFile_id = $(".jiaoge_file")[0].files,
                        //4. 收费发票文件
                        invoice_id = $(".kaipiao_file")[0].files,
                        //5.标的照片
                        objectPhoto_id = $(".object_imgs")[0].files,
                        //6.标的附件
                        accessory = $(".otFile_id")[0].files;
                        
                        //标的调查表
                        for(var i=0;i<objectInvestigate_id.length;i++){  
                              form_data.append("objectInvestigate_id",objectInvestigate_id[i])
                         }

                          //评估摘要
                        for(var i=0;i<appraisalSummaries_id.length;i++){  
                              form_data.append("appraisalSummaries_id",appraisalSummaries_id[i])
                              }
                                 //交割确认书
                        for(var i=0;i<otFile_id.length;i++){  
                              form_data.append("otFile_id",otFile_id[i])
                              }
                              //收费发票
                        for(var i=0;i<invoice_id.length;i++){
                              form_data.append("invoice_id",invoice_id[i])
                        }
                        //   标的照片
                        for(var i = 0;i<objectPhoto_id.length;i++){
                        form_data.append("objectPhoto_id",objectPhoto_id[i])
                        }
                        //标的附件
                        for(var i = 0;i <accessory.length;i++){
                              form_data.append("accessory",accessory[i])
                        }         
                        //   头部 
                        form_data.append('object_uuid',object_uuid)//标的物id
                        form_data.append('object_name',object_name)
                        form_data.append('object_location',object_location)
                        form_data.append('property_type',property_type)
                        form_data.append('estimated_price',estimated_price)
                        form_data.append('potential_purchaser',potential_purchaser)
                        form_data.append('bidder_describe',bidder_describe)
                        form_data.append('objFb_node',objFb_node)
                        form_data.append('province',shengval)
                        form_data.append('city',shival)
                        form_data.append('district',quval)
                        // 拍卖
                        form_data.append('auction_state',auction_state)
                        form_data.append('announcement_time',announcement_time)
                        form_data.append('auction_platform',auction_platform)
                        form_data.append('auction_url',auction_url)
                        form_data.append('starting_price',starting_price)
                        form_data.append('transaction_price',transaction_price)
                        form_data.append('premium_rate',premium_rate)
                        form_data.append('auction_submissionDate',auction_submissionDate)
                        form_data.append('presentation_condition',presentation_condition)
                        form_data.append('remark',p_remark)//情况说明
                        //评估
                        form_data.append('assess_state',assess_state)
                        form_data.append('assess_method',assess_method)
                        form_data.append('appraisal_agency',appraisal_agency)
                        form_data.append('appraisal_price',appraisal_price)
                        form_data.append('assess_note',assess_note)
                       //交割

                        form_data.append('after_state',after_state)
                        form_data.append('buyer',buyer)
                        form_data.append('buyer_phoneNum',buyer_phoneNum)
                        form_data.append('remark',remark)//交割触发的备注
                       //收费
                       form_data.append('whether_charge', whether_charge)  
                       form_data.append('receivable_serviceCharge', receivable_serviceCharge)
                       form_data.append('received_serviceCharge',received_serviceCharge)
                       form_data.append('service_description',service_description)
                       form_data.append('Fee_note',Fee_note)//收费备注
                       //发票
                       form_data.append('invoice_state',invoice_state)
                       form_data.append('invoice_date',invoice_date)
                       form_data.append('invoice_price',invoice_price)
                       form_data.append('invoice_note',invoice_note)
                  //    -----------
                        form_data.append('lawCase_id',law_uuid)//案件id
                        let  user_name =  $("#username").text();
                        form_data.append('user_name',user_name)

                        // 案件名称保存
                        sessionStorage['object_name'] = object_name;
                        //对于用户提交标的表单惊醒得空判断
                              // hide("objectadd")
                              console.log(presentation_condition)
                        let state = true;
                        if(object_name == "" ){
                              state = false 
                              layer.msg("请填写标的名称")
                        }else if(property_type == "请选择"){
                              state = false
                              layer.msg("请填写财产类型")
                        }else if(estimated_price   == "请选择"){
                              state = false
                              layer.msg("请填写预估价格")
                        }else if(  object_location =="--请选择--"){
                              state = false
                              layer.msg("请选择所在地")
                        }else if(objectPhoto_id.length == 0){
                              state = false
                              layer.msg("请选择标的照片")
                        }else if(objectInvestigate_id.length == 0 ){
                              state = false
                              layer.msg("请选择标的调查表")
                        }
                        if(potential_purchaser == "有"){
                              if(bidder_describe == ""){
                                    state = false;
                                    layer.msg("请填写竞买人描述")
                              }
                          }
                      
                              if(auction_state=="一拍成交"){
                                    if(announcement_time ==""){
                                          state = false
                                          layer.msg("请填写公告时间")
                                          }else if(auction_url == ""){
                                                state = false
                                                layer.msg("请填写拍卖网址")
                                          }else if(starting_price ==""){
                                                state = false
                                                layer.msg("请填写起拍价")
                                          }else if(transaction_price == ""){
                                                state = false
                                                layer.msg("请填写成交价")
                                          }
                              } 
                        if(auction_state == "以物抵债"){
                                    if(presentation_condition == ""){
                                    state = false
                                    layer.msg("请填写情况说明")
                                    }
                              }
                              
                        if(auction_state == "二拍成交"){
                                    if(announcement_time ==""){
                                    state = false
                                    layer.msg("请填写公告时间")
                                    }else if(auction_url == ""){
                                          state = false
                                          layer.msg("请填写拍卖网址")
                                    }else if(starting_price ==""){
                                          state = false
                                          layer.msg("请填写起拍价")
                                    }else if(transaction_price == ""){
                                          state = false
                                          layer.msg("请填写成交价")
                                    }
                              }   
                        if(auction_state == "变卖成交"){
                              if(announcement_time ==""){
                                    state = false
                                    layer.msg("请填写公告时间")
                                    }else if(auction_url == ""){
                                          state = false
                                          layer.msg("请填写拍卖网址")
                                    }else if(starting_price ==""){
                                          state = false
                                          layer.msg("请填写起拍价")
                                    }else if(transaction_price == ""){
                                          state = false
                                          layer.msg("请填写成交价")
                                    }
                        }    
                         
                        if(auction_state =="其他"){
                                    if(presentation_condition == ""){
                                    state = false
                                    layer.msg("请填写情况说明")
                                    }
                              }
                              //售后栏
                              if(after_state == "已交割"){
                                    if(buyer == ""){
                                          state = false
                                          layer.msg("请填写受买人")
                                    }

                              }        
                        // 评估栏
                        if(assess_state == "已评估"){
                              if(appraisal_price == "" ){
                                  state = false
                                    layer.msg("请填写评估价格")

                              }else if(assess_method == ""){
                                    layer.msg("请选择评估方式")

                              }
                        }
                        //交割栏
                        if(after_state == "已交割"){
                              if(buyer == ""){
                              state = false
                              layer.msg("请填写买受人")
                              }
                        }
                        //收费
                        if(invoice_state == "已开票"){
                              if(invoice_price == ""){
                                    state = false
                                    layer.msg("请填写开票金额")
                              }else if(invoice_id.length == 0 ){
                                       state = false
                                       layer.msg("请上传发票")
                              }else if(invoice_date ==null){
                                    layer.msg("请选择开票日期")

                              }

                        }
                        //收费
                        if(whether_charge == "已收费"){
                              if(receivable_serviceCharge == ""){
                                    state = false
                                     layer.msg("请填写应收服务费")

                              }else if(received_serviceCharge == "" ){
                                    state = false
                                    layer.msg("请填写已收服务费")

                              }else if(service_description == ""){
                                    layer.msg("请填写收费服务说明")

                              }
                        }
                        // console.log(state)
                              if(state == true){
                                    objext_ajax()
                         }
                              function objext_ajax(){        
                                    $.ajax({
                                    url:"/auction/add/objfb/",
                                    type:'POST',
                                    data:form_data,
                                    processData: false,  // tell jquery not to process the data
                                    contentType: false, 
                                    success:function(res){
                                          // console.log(res);
                                          if(res.code == 1){
                                                hide("objectadd")
                                                layer.msg(res.chMessage)
                                                object_sum = object_sum + 1;
                                                // console.log(object_sum)
                                                $(".object_sum").val(object_sum)
                                          //  console.log(id)
                                          //查看标的物信息
                                                // console.log(object_uuid)
                                                let form_data3 = new FormData()
                                                form_data3.append('object_uuid',object_uuid)
                                          $.ajax({
                                                url:":/auction/a/object/",
                                                type:'POST',
                                                data:form_data3,
                                                processData: false,  // tell jquery not to process the data
                                                contentType: false, 
                                                success:function(res){
                                                // console.log(res)
                                                // console.log(res.data)
                                                let object_lists = res.data
                                                // console.log(object_lists)
                                                for(let ii of object_lists){
                                                let objectlist =
                                                            ` <tr class="objectx_join_tr">
                                                            <td class="all-choose">
                                                            <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                                            </td>
                                                            <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                                                            <td class="objectx_join">${rTime(ii.create_time)}</td>
                                                            <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                                                            <td class="objectx_join">${ii.object_name}</td>
                                                            <td class="objectx_join">${ii.object_location}</td>
                                                            <td class="object_type objectx_join">${ii.property_type}</td>
                                                            <td class="objectx_join">${ii.estimated_price}</td>
                                                            <td  class="objectx_join">${ii.assess_state}</td>
                                                            <td class="objectx_join">${ii.appraisal_price}</td>
                                                            <td class="objectx_join">${ii.auction_state}</td>
                                                            <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                                                            <td class="objectx_join">${ii.after_state}</td>
                                                            <td class="objectx_join">${ii.buyer}</td>
                                                           <td class="objectx_join">${ii.whether_charge}</td>
                                                           <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                                                           <td class="objectx_join">${ii.invoice_state}</td>
                                                           <td class="objectx_join">${ii.invoice_price}</td>                                                           
                                                      </tr>
                                                      `                           
                                                $(".object_tobody").append(objectlist)
                                                // 添加成功之后文件名清空
                                               
                                                // location.reload()

                                                }
                                               }
                                          })
                                          }
                                    }
                                          
                                    })
                                    $("#wei_text").html("")
                                    $("#jioage_text").html("")
                                    $("#kaipiao_text").html("")
                                    $("#b_img_text").html("")
                                    $("#object_diao_text").html("")
                                    $("#fujian_text").html("")

                                    // 输入框内容清空
                                    $(".object_name").val("")
                                    $("#sheng").val(-1)
                                    $(".presentation_condition").val("")
                                    $(".auction_url").val("")
                                    $(".starting_price").val("")
                                    $(".transaction_price").val("")
                                    $(".premium_rate").val("")
                                    $(".p_remark").val("")
                                    $(".appraisal_agency").val("")
                                    $(".appraisal_price").val("")
                                    $(".buyer").val("")
                                    $(".buyer_phoneNum").val("")
                                    $(".ying_money").val("")
                                    $(".shou_money").val("")
                                    $(".shou_message").val("")
                                    $(".shou_remark").val("")

                                    $(".kaipaio_price").val("")







                              }
                  }
                  e.stopPropagation();        

            })

// ----------- 费用部分 -------------

   $(".service_tariffing").blur(function(){
      let fuwulv = $(this).val();
      let transaction_price = $(".transaction_price").val()
//    console.log(tra)
         fuwnum  = (fuwulv/100 * transaction_price).toFixed(2)
      //    console.log(fuwnum)
         $(".service_charge").val(fuwnum)

 })


// //进入页面调取大接口循环标的与费用信息
  if(law_uuid != null){
      free_show()
  }
   function free_show(){
      //    console.log(law_uuid)
     let  form_data_free = new  FormData();
     form_data_free.append("lawCase_uuid",law_uuid)
   $.ajax({
       url:"/auction/all/info/",
                   type:'POST',
                   data:form_data_free,
                   processData: false,  // tell jquery not to process the data
                   contentType: false, 
                   success:function(res){
                  //      console.log(res)
                       let object_nums  =  res.data.obj.length;
               
                  //      console.log($(".object_sum"))
                       $(".object_sum").text(object_nums)
                      let  object_lists = res.data.obj,
                        case_list = res.data.case,
                         team_list = res.data.team;
                        //  console.log(object_lists)
                        //  console.log(object_lists,free_lists,team_list)
                         if(team_list !=""){
                             for(let ii of team_list){
                                   $(".team_name").text(ii.team_name)
                                   $(".team_leader").text(ii.team_leader)   
                           }

                         }
                         //循环标的信息
                        // $(".object_from").remove()
                          if(case_list !=""){
                              for(let ii of case_list){
                                    let wei_list = [];
                                    let fu_list = [];
                                    let wei =  ii.filepath_dict.pa_filepath;
                                    let fu = ii.filepath_dict.oa_filepath;
                                    sessionStorage["law_case"] = ii.law_case
                                     if(wei.length == 0){
                                         wei_list.push(`  
                                         <tr class="gradeX">
                                           <td class="joln_watch">
                                           <div class="no_more">暂无信息</div>
                                           </td>
                                       </tr>`)
                                     }else{
                                         for(let wt of wei){   
                                               let file_type = wt.filename.slice(-3)
                                               if(file_type == "pdf"){
                                                     wei_list.push(`
                                                     <tr class="gradeX">
                                                     <td class="text_td">
                                                         <span><img src="/static/img/text.png" alt="" class="diao_img"></span>
                                                         <span> 
                                                         <button class="diao_button" ><a title="${wt.filename}" class="watching_wei">${wt.filename}</a></button>
                                                             <button class="download_wei">
                                                                 <a title="下载">
                                                                 <i class="am-icon-download sidebar-nav-link-logo"></i>
                                                                 </a>
                                                             </button>
                                                             <button class="wei_delete">
                                                                 <a title = "删除">
                                                                 <i class="am-icon-trash sidebar-nav-link-logo">
                                                                 </i></a>
                                                             </button>
                                                         </span>
                                                 
                                                     </td> 
                                                        <td style="display: none;">${wt.filepath_id}</td>
                                                        <td style="display: none;" class="photo_path">${wt.filepath.slice(24)}</td>
                                                     
                                                 </tr>
                                                      
                                                 `)
                 
                                               }else{
                                                     wei_list.push(`
                                                     <tr class="gradeX">
                                                     <td class="text_td">
                                                         <span><img src="/static/img/photo.png" alt="" class="diao_img"></span>
                                                         <span> 
                                                         <button class="diao_button" ><a title="${wt.filename}" class="watching_wei">${wt.filename}</a></button>
                                                             <button class="download_wei">
                                                                 <a title="下载">
                                                                 <i class="am-icon-download sidebar-nav-link-logo"></i>
                                                                 </a>
                                                             </button>
                                                             <button class="wei_delete">
                                                                 <a title = "删除">
                                                                 <i class="am-icon-trash sidebar-nav-link-logo">
                                                                 </i></a>
                                                             </button>
                                                         </span>
                                                 
                                                     </td> 
                                                        <td style="display: none;">${wt.filepath_id}</td>
                                                        <td style="display: none;" class="photo_path">${wt.filepath.slice(24)}</td>
                                                     
                                                 </tr>
                                                 `)
                                               }
                                             
                 
                                          }
                                     }
                                      if(fu.length == 0){
                                         fu_list.push(`  
                                         <tr class="gradeX">
                                           <td class="joln_watch">
                                           <div class="no_more">暂无信息</div>
                                           </td>
                                       </tr>`)
                                      }else{
                                         for(let ft of fu){
                                               fu_list.push(`
                                               <tr class="gradeX">
                                               <td class="text_td">
                                                   <span><img src="/static/img/zip.png" alt="" class="diao_img"></span>
                                                   <span> 
                                                   <button class="diao_button" ><a title="${ft.filename}" class="watching_wei">${ft.filename}</a></button>
                                                       <button class="download_fu">
                                                           <a title="下载">
                                                           <i class="am-icon-download sidebar-nav-link-logo"></i>
                                                           </a>
                                                       </button>
                                                       <button class="fu_delete">
                                                           <a title = "删除">
                                                           <i class="am-icon-trash sidebar-nav-link-logo">
                                                           </i></a>
                                                       </button>
                                                   </span
                                               </td> 
                                                  <td style="display: none;">${ft.filepath_id}</td>
                                                  <td style="display: none;" class="photo_path">${ft.filepath.slice(24)}</td>
                                               
                                           </tr>
                                               
                                               `)  
                                              
                                              }
                                      }
                 
                              //          let case_content = `
                              //          <div class="row  am-cf">
                              //          <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                              //            <div class="widget am-cf">
                              //                <div class="widget-head am-cf">
                         
                              //                    <div class="widget-title am-fl widget_margin">案件详情信息</div>
                              //                    <div class="anjian_update widget-title am-fr 
                              //                    " style="margin-right: 50px;">
                              //                      编辑
                              //                    </div>
                              //                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 blackdiv">
                              //                        <div class="widget-body black">
                              //                                    <img src="/static/img/last.png" alt="">返回
                              //                                </div>
                              //                    </div>
                              //                </div>
                              //                <div class="widget-body am-fr">
                              //                  <div class="widget-body am-fr">
                              //                      <div class="am-u-sm-12 am-u-md-4 am-u-lg-4">    
                              //                          <div class="am-fl am-cf">
                                                       
                              //                              <div class="widget-fluctuation-description-text">
                              //                                  档案编号
                              //                              </div>
                              //                              <div class="widget-fluctuation-description-text text-success" am-cf>
                              //                                  ${ii.file_number}
                              //                              </div>
                              //                          </div>
                              //                      </div>
                              //                      <div class="am-u-sm-12 am-u-md-4 am-u-lg-4">    
                              //                          <div class="am-fl">
                              //                            <div class="widget-fluctuation-description-text">
                              //                            创建时间
                              //                          </div>
                              //                          <div class="widget-fluctuation-description-text text-success" am-cf>
                              //                            ${ii.create_time}
                              //                        </div>
                              //                        </div>
                              //                      </div>
                              //                      <div class="am-u-sm-12 am-u-md-4 am-u-lg-4"> 
                              //                          <div class="am-fl am-cf">
                              //                              <div class="widget-fluctuation-description-text">
                              //                                  标的数量
                              //                              </div>
                              //                              <div class="widget-fluctuation-description-text text-success object_sum" am-cf>
                              //                              ${ res.data.obj.length}
                              //                              </div>
                                                 
                              //                        </div>
                              //                      </div>
                              //                  </div>    
                              //                  <div class="widget-body am-fr">
                              //                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-2">
                              //                        <div class="am-fl">
                              //                            <div class="widget-fluctuation-description-text">
                              //                            执行案号：
                              //                          </div>
                              //                          <div class="widget-fluctuation-description-text text-primary" am-cf>
                              //                              ${ii.law_case}
                              //                        </div>
                              //                        </div>
                              //                    </div>   
                              //                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-2"> 
                              //                        <div class="am-fl am-cf">
                                                       
                              //                            <div class="widget-fluctuation-description-text">
                              //                                法院名称
                              //                            </div>
                              //                            <div class="widget-fluctuation-description-text text-primary" am-cf>
                              //                              ${ii.court_name}
                              //                            </div>
                              //                        </div>
                              //                    </div>
                              //                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-2"> 
                              //                      <div class="am-fl">
                              //                          <div class="widget-fluctuation-description-text">
                              //                          申请人
                              //                        </div>
                              //                        <div class="widget-fluctuation-description-text text-primary" am-cf>
                              //                          ${ii.proposer}
                              //                      </div>
                              //                      </div>
                              //                    </div>  
                              //                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-2"> 
                              //                        <div class="am-fl am-cf">
                              //                            <div class="widget-fluctuation-description-text">
                              //                                申请人电话
                              //                            </div>
                              //                            <div class="widget-fluctuation-description-text text-primary" am-cf>
                                                     
                              //                                ${ii.proposer_phonenumber}
                               
                              //                            </div>
                              //                        </div>
                              //                    </div>
                              //                    <div class="am-u-sm-12 am-u-md-4 am-u-lg-2">     
                              //                        <div class="am-fl">
                              //                          <div class="widget-fluctuation-description-text">
                              //                          承办人
                              //                        </div>
                              //                        <div class="widget-fluctuation-description-text text-success" am-cf>
                              //                        ${ii.undertaker}
                              //                      </div>
                              //                      </div>
                              //                    </div>
                              //                    <div class="am-u-sm-12 am-u-md-4 am-u-lg-2">   
                              //                        <div class="am-fl am-cf">
                              //                            <div class="widget-fluctuation-description-text">
                              //                                承办人电话
                              //                            </div>
                              //                            <div class="widget-fluctuation-description-text text-success" am-cf>
                              //                              <td>${ii.undertaker_phoneNumber}</td>
                              //                            </div>
                              //                        </div>
                              //                    </div>
                              //                  </div>  
                              //                  <div class="widget-body am-fr">
                              //                      <div class="am-u-sm-12 am-u-md-4 am-u-lg-2">     
                              //                        <div class="am-fl">
                              //                          <div class="widget-fluctuation-description-text">
                              //                              团队名称
                              //                          </div>
                              //                          <div class="widget-fluctuation-description-text text-danger" am-cf>
                              //                            管理员团队
                              //                          </div>
                              //                      </div>
                              //                    </div>  
                              //                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-2"> 
                              //                          <div class="am-fl">
                              //                              <div class="widget-fluctuation-description-text">
                              //                                  团队负责人
                              //                              </div>
                              //                              <div class="widget-fluctuation-description-text text-danger" am-cf>
                              //                                阿打算打算
                              //                              </div>
                              //                          </div>
                              //                      </div>
                              //                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">     
                              //                        <div class="am-fl">
                              //                            <div class="widget-fluctuation-description-text">
                              //                            执行人
                              //                          </div>
                              //                          <div class="widget-fluctuation-description-text text-primary" am-cf>
                              //                            ${ii.executor}
                              //                        </div>
                              //                        </div>
                              //                      </div>
                              //                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">   
                              //                        <div class="am-fl am-cf">
                              //                            <div class="widget-fluctuation-description-text">
                              //                                执行人电话
                              //                            </div>
                              //                            <div class="widget-fluctuation-description-text text-primary" am-cf>
                              //                                ${ii.executor_phoneNumber}
                              //                            </div>
                              //                        </div>
                              //                      </div>
                              //                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">  
                              //                        <div class="am-fl">
                              //                          <div class="widget-fluctuation-description-text">
                              //                          项目负责人
                              //                        </div>
                              //                        <div class="widget-fluctuation-description-text text-success" am-cf>
                              //                            ${ii.project_leader}
                         
                              //                      </div>
                              //                      </div>
                              //                      </div>
                              //                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
                              //                        <div class="am-fl am-cf">
                              //                            <div class="widget-fluctuation-description-text">
                              //                              负责人电话
                              //                            </div>
                              //                            <div class="widget-fluctuation-description-text text-success" am-cf>
                              //                              ${ii.projectLeader_phone}
                              //                            </div>
                              //                        </div>
                              //                      </div>  
                              //                  </div>
                              //                  <div class="widget-body am-fr">
                              //                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">   
                              //                        <div class="widget-body am-fr">
                              //                          <div class="am-fl am-cf">
                              //                              <div class="widget-fluctuation-description-text">
                              //                                  项目成员
                              //                              </div>
                              //                              <div class="widget-fluctuation-description-text text-success" am-cf>
                              //                            <p>${ii.project_member}</p>
                              //                              </div>
                              //                          </div>
                              //                        </div>
                              //                      </div>
                              //                  </div>  
                              //                  <div class="widget-body am-fr">
                              //                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
                              //                      <div class="widget-body am-fr">
                              //                        <div class="am-fl">
                              //                            <div class="widget-fluctuation-description-text beizhu">
                              //                               委托书信息
                              //                               <div class="am-fr">
                              //                               <button class="uodate_wei"><a title="上传"><i class="am-icon-upload sidebar-nav-link-logo"></i></button>
                              //                               </div>
                                                          
                              //                            </div>
                                                        
                                                       
                              //                            <div class="widget-fluctuation-description-text text-danger" am-cf>
                              //                              <div class="am-scrollable-horizontal" style="width:100%;overflow-y: hidden; overflow-x: hidden;">
                              //                                <div class="am-u-sm-12 am-u-md-12 am-u-lg-1">    
                              //                                <table width="100%"  class="am-table am-table-compact am-text-nowrap tpl-table-black " id="example-r">
                              //                                        <tbody class="wei_tobody">
                              //                                        ${wei_list.join("")}
                              //                                        </tbody >
                           
                              //                                    </table>
                              //                                    </div>
                           
                              //                                </div>
                              //                            </div>
                              //                        </div>
                              //                      </div>
                                                 
                              //                  </div>
                              //                  </div>
                              //                  <div class="widget-body am-fr">
                              //                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
                              //                      <div class="widget-body am-fr">
                              //                        <div class="am-fl">
                              //                            <div class="widget-fluctuation-description-text beizhu">
                              //                               附件信息
                              //                               <div class="am-fr">
                              //                               <button class="uodate_fu"><i class="am-icon-upload sidebar-nav-link-logo"></i></button>
                              //                               </div>
                              //                            </div>
                                                      
                              //                            <div class="widget-fluctuation-description-text text-danger" am-cf>
                              //                              <div class="am-scrollable-horizontal" style="width:100%;overflow-y: hidden; overflow-x: hidden;">
                              //                                <div class="am-u-sm-12 am-u-md-12 am-u-lg-1">    
                              //                                <table width="100%"  class="am-table am-table-compact am-text-nowrap tpl-table-black " id="example-r">
                              //                                        <tbody class="wei_tobody">
                              //                                        ${fu_list.join("")}
                              //                                        </tbody >
                           
                              //                                    </table>
                              //                                    </div>
                           
                              //                                </div>
                              //                            </div>
                              //                        </div>
                              //                      </div>
                                                 
                              //                  </div>
                              //                  </div>
                              //                  <div class="widget-body am-fr">
                              //                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">    
                              //                      <div class="widget-body am-fr">
                              //                        <div class="am-fl">
                                                       
                              //                            <div class="widget-fluctuation-description-text beizhu">
                              //                              备注
                              //                            </div>
                              //                            <div class="widget-fluctuation-description-text text-danger" am-cf>
                              //                                <p>${ii.remark}</p>
                              //                            </div>
                              //                        </div>
                              //                      </div>
                              //                    </div> 
                              //                  </div>
                              //                </div>
                              //            </div>
                              //          </div>
                              //      </div>
                              //    `


                                        let case_content = `
                                        <div class="widget-body am-fr">
                                        <div class="widget-body am-fr">
                                            <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">    
                                                <div class="am-fl am-cf message_left_dl">
                                                
                                                    <div class="widget-fluctuation-description-amount">
                                                        档案编号:<span class="fu_text blue"> ${ii.file_number}</span>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">    
                                                <div class="am-fl message_left_dl">
                                                  <div class="widget-fluctuation-description-amount">
                                                  创建时间:<span class="fu_text">${ii.create_time}</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="am-u-sm-12 am-u-md-4 am-u-lg-3"> 
                                                <div class="am-fl am-cf message_left_dl">
                                                    <div class="widget-fluctuation-description-amount">
                                                        标的数量:<span class="fu_text">  ${ res.data.obj.length}</span>
                                                    </div>
                                              </div>
                                            </div>
                                            <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">    
                                            <div class="am-fl am-cf message_left_dl">
                                            
                                                <div class="widget-fluctuation-description-amount">
                                                  
                                                </div>

                                            </div>
                                        </div>
                                        </div>    
                                        <div class="widget-body am-fr">
                                          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
                                              <div class="am-fl message_left_dl">
                                                  <div class="widget-fluctuation-description-amount">
                                                  执行案号: <span class="fu_text red"> ${ii.law_case}</span>
                                                </div>
                                               
                                              </div>
                                          </div>   
                                          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                                              <div class="am-fl am-cf message_left_dl">
                                                
                                                  <div class="widget-fluctuation-description-amount">
                                                      法院名称:<span class="fu_text">  ${ii.court_name}</span>
                                                  </div>
                                                  
                                              </div>
                                          </div>
                                          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                                            <div class="am-fl message_left_dl">
                                                <div class="widget-fluctuation-description-amount">
                                                申请人:<span class="fu_text"> ${ii.proposer}</span>
                                              </div>
                                            </div>
                                          </div>  
                                          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                                              <div class="am-fl am-cf message_left_dl">
                                                  <div class="widget-fluctuation-description-amount">
                                                      申请人电话:<span class="fu_text">  ${ii.proposer_phonenumber}</span>
                                                  </div>
                                                 
                                              </div>
                                          </div>
                                        
                                        </div>  
                                        <div class="widget-body am-fr">
                                           <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">     
                                             <div class="am-fl message_left_dl">
                                                 <div class="widget-fluctuation-description-text">
                                                 执行人:<span class="fu_text"> ${ii.executor}</span>
                                               </div>
                                              
                                             </div>
                                           </div>
                                           <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">   
                                             <div class="am-fl am-cf message_left_dl">
                                                 <div class="widget-fluctuation-description-amount">
                                                     执行人电话:<span class="fu_text">   ${ii.executor_phoneNumber}</span>
                                                 </div>
                                               
                                             </div>
                                           </div>
                                               <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">     
                                                 <div class="am-fl message_left_dl">
                                                   <div class="widget-fluctuation-description-amount">
                                                   承办人:<span class="fu_text">  ${ii.undertaker}</span>
                                                 </div>
                                                 
                                               </div>
                                             </div>
                                             <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">   
                                                 <div class="am-fl am-cf message_left_dl">
                                                     <div class="widget-fluctuation-description-amount">
                                                         承办人电话:<span>${ii.undertaker_phoneNumber}</span>
                                                     </div>
                                                    
                                                 </div>
                                             </div>
                                        </div>
                                        <div class="widget-body am-fr">
                                           <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">  
                                             <div class="am-fl message_left_dl">
                                                   <div class="widget-fluctuation-description-amount">
                                                   项目负责人:<span class="fu_text">    ${ii.project_leader}</span>
                                                 </div>
                                           
                                             </div>
                                           </div>
                                           <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
                                             <div class="am-fl am-cf message_left_dl">
                                                 <div class="widget-fluctuation-description-amount">
                                                   负责人电话:<span class="fu_text"> ${ii.projectLeader_phone}</span>
                                                 </div>
                                                
                                             </div>
                                           </div>  
                                           <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">     
                                             <div class="am-fl message_left_dl">
                                               <div class="widget-fluctuation-description-amount">
                                                   团队名称:<span class="fu_text team_name"></span>
                                                 
                                               </div>
                                             
                                           </div>
                                         </div>  
                                           <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                               <div class="am-fl message_left_dl">
                                                   <div class="widget-fluctuation-description-amountt">
                                                       团队负责人:<span class="fu_text team_leader"></span>
                                                   </div>
                                                 
                                               </div>
                                           </div>
                                           
                                        </div>
                                        <div class="widget-body am-fr">
                                         <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">   
                                           <div class="widget-body am-fr">
                                             <div class="am-fl am-cf message_left_dl">
                                                 <div class="widget-fluctuation-description-amount">
                                                     项目成员:<span class="fu_text">${ii.project_member}</span>
                                                 </div>
                                                 
                                             </div>
                                           </div>
                                         </div>
                                        </div>
                                        <div class="widget-body am-fr">
                                         <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">    
                                           <div class="widget-body am-fr">
                                             <div class="am-fl message_left_dl">
                                               
                                                 <div class="widget-fluctuation-description-text beizhu">
                                                   备注:<span class="fu_text">${ii.remark}</span>
                                                 </div>
                                                
                                             </div>
                                           </div>
                                         </div> 
                                       </div>

                                        <div class="widget-body am-fr">
                                          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
                                            <div class="widget-body am-fr ">
                                              <div class="am-fl message_left_dl" style="border: 1px solid #cecccc;">
                                                  <div class="widget-fluctuation-description-text beizhu">
                                                     委托书信息
                                                     <div class="am-fr">
                                                     <button class="uodate_wei"><a title="上传"><i class="am-icon-upload sidebar-nav-link-logo"></i></button>
                                                     </div>
                                                   
                                                  </div>
                                                 
                                                
                                                  <div class="widget-fluctuation-description-text text-danger" am-cf>
                                                    <div class="am-scrollable-horizontal" style="width:100%;overflow-y: hidden; overflow-x: hidden;">
                                                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-1">    
                                                      <table width="100%"  class="am-table am-table-compact am-text-nowrap tpl-table-black " id="example-r">
                                                              <tbody class="wei_tobody">
                                                              ${wei_list.join("")}
                                                              </tbody >
                    
                                                          </table>
                                                          </div>
                    
                                                      </div>
                                                  </div>
                                              </div>
                                            </div>
                                          
                                        </div>
                                        </div>
                                        <div class="widget-body am-fr">
                                          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
                                            <div class="widget-body am-fr ">
                                              <div class="am-fl message_left_dl" style="border: 1px solid #cecccc;">
                                                  <div class="widget-fluctuation-description-text beizhu">
                                                     附件信息
                                                     <div class="am-fr">
                                                     <button class="uodate_fu"><i class="am-icon-upload sidebar-nav-link-logo"></i></button>
                                                     </div>
                                                  </div>
                                               
                                                  <div class="widget-fluctuation-description-text text-danger" am-cf>
                                                    <div class="am-scrollable-horizontal" style="width:100%;overflow-y: hidden; overflow-x: hidden;">
                                                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-1">    
                                                      <table width="100%"  class="am-table am-table-compact am-text-nowrap tpl-table-black " id="example-r">
                                                              <tbody class="wei_tobody">
                                                              ${fu_list.join("")}
                                                              </tbody >
                    
                                                          </table>
                                                          </div>
                    
                                                      </div>
                                                  </div>
                                              </div>
                                            </div>
                                          
                                        </div>
                                        </div>
                                       
                                      </div>
                                        `

                                       $(".casemessage").append(case_content)     
                                 }

                          }
                         if( object_lists !=""){
                              for(let ii of object_lists){
                                    let objectlist =
                                    ` <tr class="objectx_join_tr">
                                    <td class="all-choose">
                                    <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                    </td>
                                    <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                                    <td class="objectx_join">${rTime(ii.create_time)}</td>
                                    <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                                    <td class="objectx_join">${ii.object_name}</td>
                                    <td class="objectx_join">${ii.object_location}</td>
                                    <td class="object_type objectx_join">${ii.property_type}</td>
                                    <td class="objectx_join">${ii.estimated_price}</td>
                                    <td  class="objectx_join">${ii.assess_state}</td>
                                    <td class="objectx_join">${ii.appraisal_price}</td>
                                    <td class="objectx_join">${ii.auction_state}</td>
                                    <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                                    <td class="objectx_join">${ii.after_state}</td>
                                    <td class="objectx_join">${ii.buyer}</td>
                                   <td class="objectx_join">${ii.whether_charge}</td>
                                   <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                                   <td class="objectx_join">${ii.invoice_state}</td>
                                   <td class="objectx_join">${ii.invoice_price}</td>                                                           
                              </tr>
                              `                            
                                  $(".object_tobody").append(objectlist)
                                  }
                         }
                   }

   })
     

   }
          

//模态框弹框弹出
 let downfile = "/auction/file/download/"
function show(w){
      $(`#${w}`).modal('show');
      $(".modal-content input").val("")
  }
    //弹框隐藏
  function hide(w){
      $(`#${w}`).modal('hide');
  }
 //时间转换函数
 function rTime(date) {
      var json_date = new Date(date).toJSON();
      return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  }  
       //委托书上传
       $("body").on("click",".uodate_wei",function(){
             show("wei_add")
       })
       $(".wei_file").change(function(){
            var e=e||window.event
            var _file=e.target.files
            var names=""
            // console.log(_file)
            let text_type;
            for(let ii of _file){
                  let text_type =  ii.name.slice(-3)
                  console.log(ii)
                  console.log(text_type)
                  console.log(_file.length)
                  localStorage['text_type'] = text_type
            }
           file_type = localStorage.getItem("text_type")
      //      console.log(file_type)
            if(file_type != "pdf" && file_type != "jpg" && file_type != "png" && file_type != "epg" && file_type != "svg" && file_type != "gif" && file_type != "jpe"){
                  layer.msg("只能上传pdf文件或图片")
                  $(".wei_file").val("")
            }else{
                  if(_file.length>0){
                        for(let i=0;i<_file.length;i++){
                              if(i==_file.length-1){
                                    names+=_file[i].name
                              }else{
                                    names+=_file[i].name+"，"
                              }
                        }
                        $("#wei_text").html(names)
                  }else{
                        $("#wei_text").html("")
                  }
                
            }
          
       })
       $(".wei_addTrue").click(function(e){
            if(!e.isPropagationStopped()){
           
            let gather_uuid = "case,"+$(".law_uuid_html").text()
            let filepath_type = "pa";
            let file_object = $(".wei_file")[0].files;  
            let file_data = new FormData();
                file_data.append("gather_uuid",gather_uuid)
                file_data.append("filepath_type",filepath_type)
                for(let i = 0; i<file_object.length;i++){
                      file_data.append("file_object",file_object[i])
                } 
              for(let ii of file_object){
                  size_sum = size_sum + ii.size
              }
              if(size_sum > artice_size){
                    layer.msg("文件大小不能超过2M!")
              }else if(size_sum == 0){
                    layer.msg("请选择您要上传的文件")
              }else{
                  hide("wei_add")
                  $.ajax({
                        url:"/auction/file/updates/",
                        type:'POST',
                        data:file_data,
                        processData: false,  // tell jquery not to process the data
                        contentType: false, 
                        success:function(res){
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
              }
        }
        e.stopPropagation(); 


       })

             //委托书预览
            $("body").on("click",".watching_wei",function(){
                  // let join_path = $(this).parent().parent().children("td.wt_path").text()
                  let join_path = $(this).parent().parent().parent().next().next().text()
                  // console.log(join_path)
                  window.open(join_path)
          
            })
            //委托书下载
            $("body").on("click",".download_wei",function(){
                  let filepath = $(this).parent().parent().next().next().text();
                  let filename = $(this).prev().children().text()
                  let download_path = downfile+"?filepath="+filepath+"&filename="+filename
                 window.open(download_path)

                 
            })
            //委托书删除
            $("body").on("click",".wei_delete",function(){
                    let  delete_id =  $(this).parent().parent().next().text();
                  //   console.log(delete_id)
                  //   show("wei_delete")
                  layer.open({
                        type:0, //设置类型 默认为0 1页面层 2ifream层
                        title:"提示", //标题
                        content:'确定删除吗？',//内容 type=0为内容
                        skin:'layui-layer-molv',//皮肤
                        area:['200px','150px'], //宽高
                        icon:1, //只对type=0有效
                        btn:['确定','取消'],
                        yes: function(index,layero){
                              $.ajax({
                                    url: '/auction/file/remove/',
                                    type: 'GET',
                                    data: {
                                         filepath_id:delete_id
                                    },
                                    success: (res) => {
                                    //     console.log(res);
                                      if(res.code == 1){
                                            layer.msg(res.chMessage)
                                            setTimeout(function(){
                                                location.reload()
                                            },1000)
                                      }
                                    }
                                })
                        },
                        btn2:function (index,layero) {
                            layer.close(index);
                        },
                     
                        cancel:function () {
                            alert("cancel")
                        },
                        btnAlign:'c', //按钮对齐方式
                        shade:[0.8,'#393D49'], //遮罩
                        shadeClose:true //当点击遮罩是否关闭弹层
            
                        });     
            })


             //附件上传
             $("body").on("click",".uodate_fu",function(){
                   show("fu_add")
             })
            $(".fu_addTrue").click(function(e){
                    
                  if(!e.isPropagationStopped()){
                  let gather_uuid = "case,"+$(".law_uuid_html").text()
                  let filepath_type = "oa";
                  let file_object = $(".oa")[0].files;
                  let file_data = new FormData();
                  console.log(file_object)
                 
                  for(let ii of file_object){
                        size_sum = size_sum + ii.size
                  } 
                  console.log(size_sum)
                  if(size_sum >fu_size){
                        layer.msg("文件大小不能超过5M!")
                  }else if(size_sum == 0){
                        layer.msg("请选择您要上传的文件")
                  }else{
                           hide("wei_add")
                        file_data.append("gather_uuid",gather_uuid)
                        file_data.append("filepath_type",filepath_type)
                        for(let i = 0; i<file_object.length;i++){
                              file_data.append("file_object",file_object[i])
                        } 
                        $.ajax({
                              url:"/auction/file/updates/",
                              type:'POST',
                              data:file_data,
                              processData: false,  // tell jquery not to process the data
                              contentType: false, 
                              success:function(res){
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

                  }
               }
               e.stopPropagation(); 


            })
            //附件下载
         $("body").on("click",".download_fu",function(){
            let filepath = $(this).parent().parent().next().next().text();
                  let filename = $(this).prev().children().text()
                  let download_path = downfile+"?filepath="+filepath+"&filename="+filename
                 window.open(download_path)

         })
            //附件删除
            $("body").on("click",".fu_delete",function(){
                  let  delete_id =  $(this).parent().parent().next().text();
                  // console.log(delete_id)
                layer.open({
                      type:0, //设置类型 默认为0 1页面层 2ifream层
                      title:"提示", //标题
                      content:'确定删除吗？',//内容 type=0为内容
                      skin:'layui-layer-molv',//皮肤
                      area:['200px','150px'], //宽高
                      icon:1, //只对type=0有效
                      btn:['确定','取消'],
                      yes: function(index,layero){
                            $.ajax({
                                  url: '/auction/file/remove/',
                                  type: 'GET',
                                  data: {
                                       filepath_id:delete_id
                                  },
                                  success: (res) => {
                                    //   console.log(res);
                                    if(res.code == 1){
                                          layer.msg(res.chMessage)
                                          setTimeout(function(){
                                              location.reload()
                                          },1000)
                                    }
                                  }
                              })
                      },
                      btn2:function (index,layero) {
                          layer.close(index);
                      },
                   
                      cancel:function () {
                          alert("cancel")
                      },
                      btnAlign:'c', //按钮对齐方式
                      shade:[0.8,'#393D49'], //遮罩
                      shadeClose:true //当点击遮罩是否关闭弹层
          
                      });   
            })
            

      //    点击进入标的详情页
         $("body").on("click",".objectx_join",function(){
            let object_uuid = $(this).parent().children("td.object_uuid").text()
            // console.log(object_uuid)
            window.location.href = "/auction/object/info/?object_uuid="+object_uuid;

         })
      //点击进入费用   
         $("body").on("click",".join_free",function(){
            //    console.log(1111)
            let free_uuid = $(this).parent().children("td.free_uuid").text()
            // console.log(free_uuid)
            window.location.href = "/auction/fb/info/?fb_uuid="+free_uuid;
         })

      $("body").on("click",".poster-btn",function(){
            if ($(this).text() == "展开更多") {
                $(this).text("收起");
                $(this).siblings(".poster-txt").removeClass("xg").css("height","auto");
                $(this).addClass('current-menu').siblings().removeClass('current-menu');
            }else{
                $(this).text("展开更多");
                $(this).siblings(".poster-txt").addClass("xg").css("height","7.8rem");
                $(this).removeClass('current-menu').siblings().addClass('current-menu1');
            }         
        });

        $('.close-loading').click(function(){
            $('.loading').css("display",'none');
            $('.load-out').css("display",'none');
        })
 


      // 新增标的文件部分改变事件触发
      // 评估摘要改变事件
      $(".appraisal_file").change(function(){
            var e=e||window.event
            var _file=e.target.files
            var names=""
            // console.log(_file)
            let text_type;
            for(let ii of _file){
                  let text_type =  ii.name.slice(-3)
                  // console.log(ii)
                  // console.log(text_type)
                  // console.log(_file.length)
                  localStorage['text_type'] = text_type
            }
           file_type = localStorage.getItem("text_type")
      //      console.log(file_type)
            if(file_type != "pdf" && file_type != "jpg" && file_type != "png" && file_type != "epg" && file_type != "svg" && file_type != "gif" && file_type != "jpe"){
                  layer.msg("只能上传pdf文件或图片")
                  $(".appraisal_file").val("")
                   $("#wei_text").html("")
            }else{
                  if(_file.length>0){
                        for(let i=0;i<_file.length;i++){
                              if(i==_file.length-1){
                                    names+=_file[i].name
                              }else{
                                    names+=_file[i].name+"，"
                              }
                        }
                        $("#wei_text").html(names)
                  }else{
                        $("#wei_text").html("")
                  }

            }

       })
      //交割确认书
      $(".jiaoge_file").change(function(){
            var e=e||window.event
            var _file=e.target.files
            var names=""
            // console.log(_file)
            let text_type;
            for(let ii of _file){
                  let text_type =  ii.name.slice(-3)
                  // console.log(ii)
                  // console.log(text_type)
                  // console.log(_file.length)
                  localStorage['text_type'] = text_type
            }
           file_type = localStorage.getItem("text_type")
      //      console.log(file_type)
            if(file_type != "pdf" && file_type != "jpg" && file_type != "png" && file_type != "epg" && file_type != "svg" && file_type != "gif" && file_type != "jpe"){
                  layer.msg("只能上传pdf文件或图片")
                  $(".appraisal_file").val("")
                   $("#jioage_text").html("")
            }else{
                  if(_file.length>0){
                        for(let i=0;i<_file.length;i++){
                              if(i==_file.length-1){
                                    names+=_file[i].name
                              }else{
                                    names+=_file[i].name+"，"
                              }
                        }
                        $("#jioage_text").html(names)
                  }else{
                        $("#jioage_text").html("")

                  }

            }

       })
     $(".kaipiao_file").change(function(){
            var e=e||window.event
            var _file=e.target.files
            var names=""
            // console.log(_file)
            let text_type;
            for(let ii of _file){
                  let text_type =  ii.name.slice(-3)
                  // console.log(ii)
                  // console.log(text_type)
                  // console.log(_file.length)
                  localStorage['text_type'] = text_type
            }
           file_type = localStorage.getItem("text_type")
      //      console.log(file_type)
            if(file_type != "pdf" && file_type != "jpg" && file_type != "png" && file_type != "epg" && file_type != "svg" && file_type != "gif" && file_type != "jpe"){
                  layer.msg("只能上传pdf文件或图片")
                  $(".kaipiao_file").val("")
                   $("#kaipiao_text").html("")
            }else{
                  if(_file.length>0){
                        for(let i=0;i<_file.length;i++){
                              if(i==_file.length-1){
                                    names+=_file[i].name
                              }else{
                                    names+=_file[i].name+"，"
                              }
                        }
                        $("#kaipiao_text").html(names)
                  }else{
                        $("#kaipiao_text").html("")
                  }

            }

       })
      //  标的照片
       $(".object_imgs").change(function(){
            var e=e||window.event
            var _file=e.target.files
            var names=""
            // console.log(_file)
            for(let ii of _file){
                  let text_type =  ii.name.slice(-3)
                  // console.log(ii)
                  // console.log(text_type)
                  // console.log(_file.length)
                  localStorage['text_type'] = text_type
            }
           file_type = localStorage.getItem("text_type")
      //      console.log(file_type)
            if(file_type != "pdf" && file_type != "jpg" && file_type != "png" && file_type != "epg" && file_type != "svg" && file_type != "gif" && file_type != "jpe"){
                  layer.msg("只能上传pdf文件或图片")
                  $(".object_imgs").val("")
                   $("#b_img_text").html("")
            }else{
                  if(_file.length>0){
                        for(let i=0;i<_file.length;i++){
                              if(i==_file.length-1){
                                    names+=_file[i].name
                              }else{
                                    names+=_file[i].name+"，"
                              }
                        }
                        $("#b_img_text").html(names)
                  }else{
                        $("#b_img_text").html("")
                  }

            }

       })
      //  标的调查表
      $(".objectInvestigate_file").change(function(){
            var e=e||window.event
            var _file=e.target.files
            var names=""
            // console.log(_file)
            for(let ii of _file){
                  let text_type =  ii.name.slice(-3)
                  // console.log(ii)
                  // console.log(text_type)
                  // console.log(_file.length)
                  localStorage['text_type'] = text_type
            }
           file_type = localStorage.getItem("text_type")
      //      console.log(file_type)
            if(file_type != "pdf" && file_type != "jpg" && file_type != "png" && file_type != "epg" && file_type != "svg" && file_type != "gif" && file_type != "jpe"){
                  layer.msg("只能上传pdf文件或图片")
                  $(".objectInvestigate_file").val("")
                   $("#object_diao_text").html("")
            }else{
                  if(_file.length>0){
                        for(let i=0;i<_file.length;i++){
                              if(i==_file.length-1){
                                    names+=_file[i].name
                              }else{
                                    names+=_file[i].name+"，"
                              }
                        }
                        $("#object_diao_text").html(names)
                  }else{
                        $("#object_diao_text").html("")
                  }

            }

       })
       //附件上传
       $(".otFile_id").change(function(){
            var e=e||window.event
            var _file=e.target.files
            var names=""
            // console.log(_file)
            if(_file.length>0){
                        for(let i=0;i<_file.length;i++){
                              if(i==_file.length-1){
                                    names+=_file[i].name
                              }else{
                                    names+=_file[i].name+"，"
                              }
                        }
                        $("#fujian_text").html(names)
                  }else{
                        $("#fujian_text").html("")
                  }

       })


       window.addEventListener("load",function(){
            //监听input的输入事件
            document.getElementById('price_num').addEventListener('input',function(){
                  this.value = this.value.replace(/[^\d^\.]+/g, "")
            if (this.value) {
                  var rt = [],num,tail;
                  if(this.value.indexOf('.')>0){
                        num = this.value.slice(0,this.value.indexOf('.'));
                        tail =this.value.slice(this.value.indexOf('.'));
                  }else{
                        num = this.value.replace(/[^\d^\.]+/g, "");
                        tail = '';
                  }
                  if(num.length>3){
                        var mod = num.length%3;
                        val = (mod == 0 ? '' : (num.substring(0, mod)));
                        for(var i = 0 ; i < Math.floor(num.length / 3); i++){
                              if ((mod == 0) && (i == 0)){
                                     val += num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }else{
                                    val += ',' + num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }
                            
                      }
                        val += tail;
                  }else{
                        val = this.value;
                  }
                  this.value = val;
            }
            })
            
      },false)
      window.addEventListener("load",function(){
            //监听input的输入事件
            document.getElementById('transaction_price').addEventListener('input',function(){
                  this.value = this.value.replace(/[^\d^\.]+/g, "")
            if (this.value) {
                  var rt = [],num,tail;
                  if(this.value.indexOf('.')>0){
                        num = this.value.slice(0,this.value.indexOf('.'));
                        tail =this.value.slice(this.value.indexOf('.'));
                  }else{
                        num = this.value.replace(/[^\d^\.]+/g, "");
                        tail = '';
                  }
                  if(num.length>3){
                        var mod = num.length%3;
                        val = (mod == 0 ? '' : (num.substring(0, mod)));
                        for(var i = 0 ; i < Math.floor(num.length / 3); i++){
                              if ((mod == 0) && (i == 0)){
                                     val += num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }else{
                                    val += ',' + num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }
                            
                      }
                        val += tail;
                  }else{
                        val = this.value;
                  }
                  this.value = val;
            }
            })
            
      },false)
      window.addEventListener("load",function(){
            //监听input的输入事件
            document.getElementById('appraisal_price').addEventListener('input',function(){
                  this.value = this.value.replace(/[^\d^\.]+/g, "")
            if (this.value) {
                  var rt = [],num,tail;
                  if(this.value.indexOf('.')>0){
                        num = this.value.slice(0,this.value.indexOf('.'));
                        tail =this.value.slice(this.value.indexOf('.'));
                  }else{
                        num = this.value.replace(/[^\d^\.]+/g, "");
                        tail = '';
                  }
                  if(num.length>3){
                        var mod = num.length%3;
                        val = (mod == 0 ? '' : (num.substring(0, mod)));
                        for(var i = 0 ; i < Math.floor(num.length / 3); i++){
                              if ((mod == 0) && (i == 0)){
                                     val += num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }else{
                                    val += ',' + num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }
                            
                      }
                        val += tail;
                  }else{
                        val = this.value;
                  }
                  this.value = val;
            }
            })
            
      },false)
      window.addEventListener("load",function(){
            //监听input的输入事件
            document.getElementById('ying_money').addEventListener('input',function(){
                  this.value = this.value.replace(/[^\d^\.]+/g, "")
            if (this.value) {
                  var rt = [],num,tail;
                  if(this.value.indexOf('.')>0){
                        num = this.value.slice(0,this.value.indexOf('.'));
                        tail =this.value.slice(this.value.indexOf('.'));
                  }else{
                        num = this.value.replace(/[^\d^\.]+/g, "");
                        tail = '';
                  }
                  if(num.length>3){
                        var mod = num.length%3;
                        val = (mod == 0 ? '' : (num.substring(0, mod)));
                        for(var i = 0 ; i < Math.floor(num.length / 3); i++){
                              if ((mod == 0) && (i == 0)){
                                     val += num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }else{
                                    val += ',' + num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }
                            
                      }
                        val += tail;
                  }else{
                        val = this.value;
                  }
                  this.value = val;
            }
            })
            
      },false)
      window.addEventListener("load",function(){
            //监听input的输入事件
            document.getElementById('shou_money').addEventListener('input',function(){
                  this.value = this.value.replace(/[^\d^\.]+/g, "")
            if (this.value) {
                  var rt = [],num,tail;
                  if(this.value.indexOf('.')>0){
                        num = this.value.slice(0,this.value.indexOf('.'));
                        tail =this.value.slice(this.value.indexOf('.'));
                  }else{
                        num = this.value.replace(/[^\d^\.]+/g, "");
                        tail = '';
                  }
                  if(num.length>3){
                        var mod = num.length%3;
                        val = (mod == 0 ? '' : (num.substring(0, mod)));
                        for(var i = 0 ; i < Math.floor(num.length / 3); i++){
                              if ((mod == 0) && (i == 0)){
                                     val += num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }else{
                                    val += ',' + num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }
                            
                      }
                        val += tail;
                  }else{
                        val = this.value;
                  }
                  this.value = val;
            }
            })
            
      },false)
      window.addEventListener("load",function(){
            //监听input的输入事件
            document.getElementById('kaipaio_price').addEventListener('input',function(){
                  this.value = this.value.replace(/[^\d^\.]+/g, "")
            if (this.value) {
                  var rt = [],num,tail;
                  if(this.value.indexOf('.')>0){
                        num = this.value.slice(0,this.value.indexOf('.'));
                        tail =this.value.slice(this.value.indexOf('.'));
                  }else{
                        num = this.value.replace(/[^\d^\.]+/g, "");
                        tail = '';
                  }
                  if(num.length>3){
                        var mod = num.length%3;
                        val = (mod == 0 ? '' : (num.substring(0, mod)));
                        for(var i = 0 ; i < Math.floor(num.length / 3); i++){
                              if ((mod == 0) && (i == 0)){
                                     val += num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }else{
                                    val += ',' + num.substring(mod + 3 * i, mod + 3 * i + 3);
                              }
                            
                      }
                        val += tail;
                  }else{
                        val = this.value;
                  }
                  this.value = val;
            }
            })
            
      },false)


})()