(function(){
    let object_uuid = $(".object_uuidtetx").text()
    // console.log(object_uuid)
    var user_grader = localStorage.getItem("user_grader")
    // console.log(user_grader)
    let form_data3 = new FormData()
    form_data3.append('object_uuid',object_uuid)
    let  size_sum = 0
    let fu_size = 5*1024*1024
    let artice_size = 2*1024*1024
$.ajax({
    url:"/auction/a/object/web/",
    type:'POST',
    data:form_data3,
    processData: false,  // tell jquery not to process the data
    contentType: false, 
    success:function(res){
        console.log(res)
        let object_list = res.data
        // console.log(object_list)
        let invoice_date = ""
        let province_val = ""
        let district_val = ""
        for(let ii of object_list){
            let ping_list = [];
            let photo_list = [];
            let diao_list = [];
            let fujian_list = [];
            let fapiao_list = [];
            let jiaoge_list = [];
            let ping_text = ii.filepath_dict.as_filepath  //评估摘要
            let photo = ii.filepath_dict.op_filepath //标的照片
            let diaocha =ii.filepath_dict.oi_filepath //标的调查表
            let fujian = ii.filepath_dict.of_filepath//附件信息
            let fapiao =  ii.filepath_dict.iv_filepath//发票
            let  jioage =  ii.filepath_dict.cd_filepath //交割确认书
            let announcement_time = ii.announcement_time;
            let auction_submissionDate = ii.auction_submissionDate
               invoice_date = ii.invoice_date
               province_val = ii.province
               district_val = ii.district
                city_val = ii.city
            // 开票日期
             if(invoice_date == null){
                invoice_date = ""
             }else{
                invoice_date = ii.invoice_date
             }
         
              if(announcement_time == null){
               announcement_time = ""
              }else{
                  announcement_time = ii.announcement_time
              }
            
              if(auction_submissionDate == null){
                auction_submissionDate = ""
              }else{
                auction_submissionDate = ii.auction_submissionDate
              }  

         // 开拍时间
             let start_time = ii.start_time
             end_time = ii.auction_submissionDate
             if(start_time == null){
                 start_time = ''
             }else{
                start_time = rTime(ii.start_time)
             }
             if(end_time == null){
                end_time = ''
             }else{
                 end_time = rTime(ii.auction_submissionDate)
             }
              
              

            //   console.log(auction_submissionDate)
            //  拍前
            sessionStorage["object_name"] = ii.object_name
            sessionStorage["entrusting_party"] = ii.entrusting_party
            sessionStorage["object_location"] = ii.province + ii.city + ii.district
            sessionStorage["object_locations"] = ii.object_location
            sessionStorage["business_type"] = ii.business_type
            sessionStorage["buyer"] = ii.buyer
            sessionStorage["property_type"] = ii.property_type
            sessionStorage["estimated_price"] = ii.estimated_price
            sessionStorage["province"] = ii.province
            sessionStorage["city"] = ii.city
            sessionStorage["district"] = ii.district
    
            // 拍中
            sessionStorage["auction_state"] = ii.auction_state
            sessionStorage["auction_platform"] = ii.auction_platform
            sessionStorage["auction_url"] = ii.auction_url
            sessionStorage["auction_submissionDate"] = ii.auction_submissionDate  //结束时间
            sessionStorage["start_time"] = ii.start_time //开拍时间
            sessionStorage["starting_price"] = ii.starting_price //起拍价
            sessionStorage["appraisal_price"] = ii.appraisal_price
           //拍后
           sessionStorage["after_state"] = ii.after_state
           sessionStorage["transaction_price"] = ii.transaction_price //成交价
           sessionStorage["premium_rate"] = ii.premium_rate
           sessionStorage["receivable_serviceCharge"] = ii.receivable_serviceCharge  // 应收服务费
           sessionStorage["received_serviceCharge"] = ii.received_serviceCharge //已收服务费
           sessionStorage["object_note"] = ii.object_note
         

             $(".law_uuidx").text(ii.lawCase_id)
            //    调查表
               if(diaocha.length == 0){
                diao_list.push(`  
                <tr class="gradeX">
                  <td class="joln_watch"><div class="no_more">暂无信息</div></td>
               </tr>`)

               }else{
                for(let dt of diaocha){
                    let file_type = dt.filename.slice(-3)
                    if(file_type == "pdf"){
                    diao_list.push(` 
                    <tr class="gradeX">
                    <td class="text_td">
                        <span class='span_img'><img src="${dt.filepath}" alt="" class="diao_img"></span>
                        <span> 
                        <button class="diao_button" ><a title="${dt.filename}" class="watching_wei">${dt.filename}</a></button>
                           
                        </span>
                
                    </td> 
                       <td style="display: none;">${dt.filepath_id}</td>
                       <td style="display: none;" class="diao_path">${dt.filepath}</td>
                    
                </tr>
                   `)
                }else{
                    diao_list.push(` <tr class="gradeX">
                    <td class="text_td">
                        <span class="span_img"><img src="${dt.filepath}" alt="" class="diao_img"></span>
                        <span> 
                        <button   class="diao_button" ><a title="${dt.filename}" class="watching_wei">${dt.filename}</a></button>
                           
                        </span>
                
                    </td> 
                       <td style="display: none;">${dt.filepath_id}</td>
                       <td style="display: none;" class="diao_path">${dt.filepath}</td>
                    
                </tr>`)

                }  
                //    console.log( $(".diao_img"))
                   $(".diao_img").attr("title","dasdasdasd")
               }

               }
            //    标的照片
               if(photo.length == 0){
                photo_list.push(`  
                <tr class="gradeX">
                  <td class="joln_watch"><div class="no_more">暂无信息</div></td>
              </tr>`)
               }else{
                for(let pt of photo){
                    photo_list.push(` <tr class="gradeX">
                    <td class="text_td">
                        <span class='span_img'><img src="${pt.filepath}" alt="" class="diao_img"></span>
                        <span> 
                        <button class="diao_button" ><a title="${pt.filename}" class="watching_wei">${pt.filename}</a></button>
                        </span>
                
                    </td> 
                       <td style="display: none;">${pt.filepath_id}</td>
                       <td style="display: none;" class="photo_path">${pt.filepath}</td>
                    
                </tr>`)  
               }

               }
    

               let head_content = `
                                                <div class="widget-body am-fl">
                                                <div class="widget-body am-fr">
                                                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
                                                        <div class="am-fl message_left_dl">
                                                            <div class="widget-fluctuation-description-amount">
                                                            标的名称：<span class="fu_text object_text" title="${ii.object_name}">${ii.object_name}</span>
                                                            </div>
                                                        
                                                        </div>
                                                    </div>   
                                                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                                                    <div class="am-fl am-cf message_left_dl">
                                                        <div class="widget-fluctuation-description-amount">
                                                            委托方: <span class="fu_text">${ii.entrusting_party}</span>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">    
                                                <div class="am-fl am-cf message_left_dl">
                                                
                                                    <div class="widget-fluctuation-description-amount">
                                                        业务类型: <span class="fu_text">${ii.business_type}</span>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                                                        <div class="am-fl am-cf message_left_dl">
                                                            <div class="widget-fluctuation-description-amount">
                                                                所在地: <span class="fu_text">${ii.object_location}</span>
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                                   
                                                   
                                                </div>
                                                <div class="widget-body am-fr">
                                                <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                                                <div class="am-fl am-cf message_left_dl">
                                                    <div class="widget-fluctuation-description-amount">
                                                    资产类型: <span class="fu_text">${ii.property_type}</span>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                            <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">    
                                            <div class="am-fl am-cf message_left_dl">
                                            
                                                <div class="widget-fluctuation-description-amount">
                                                    资产规模: <span class="fu_text">${ii.estimated_price}</span>
                                                </div>
                                            
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">    
                                        <div class="am-fl am-cf message_left_dl">
                                        
                                            <div class="widget-fluctuation-description-amount">
                                              
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
                                                <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 text_margin" > 
                                                    <div class="am-fl am-cf message_left" style="border: 1px solid #cecccc;">
                                                        <div class="widget-fluctuation-description-amount">
                                                            标的照片          
                                                                               
                                                        </div>
                                                        <div class="widget-fluctuation-description-text text-success" am-cf>
                                                            <div class="am-scrollable-horizontal" style="width:100%;overflow-y: hidden; overflow-x: hidden;">
                                                                <div class="am-u-sm-12 am-u-md-12 am-u-lg-1">    
                                                                <table width="100%"  class="am-table am-table-compact am-text-nowrap tpl-table-black " id="example-r">
                                                                        <tbody class="wei_tobody">
                                                                        ${photo_list.join("")}
                                                                        </tbody >
                            
                                                                    </table>
                                                                    </div>
                            
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 text_margin"> 
                                                    <div class="am-fl am-cf message_left" style="border: 1px solid #cecccc;">
                                                        <div class="widget-fluctuation-description-amount">
                                                            标的调查表
                                                      
                                                        </div>
                                                        <div class="widget-fluctuation-description-text text-success" am-cf>
                                                            <div class="am-scrollable-horizontal" style="width:100%;overflow-y: hidden; overflow-x: hidden;">
                                                                <div class="am-u-sm-12 am-u-md-12 am-u-lg-1">    
                                                                <table width="100%"  class="am-table am-table-compact am-text-nowrap tpl-table-black " id="example-r">
                                                                        <tbody class="wei_tobody">
                                                                        ${diao_list.join("")}
                                                                        </tbody >
                            
                                                                    </table>
                                                                    </div>
                            
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">  
                                                    <div class="am-fl message_left">
                                                        <div class="widget-fluctuation-description-amount">
                                                     
                                    
                           
                                                        </span>
                                                    </div>
                                                    
                                                    </div>
                                                </div>
                                                <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">  
                                                    <div class="am-fl message_left">
                                                        <div class="widget-fluctuation-description-amount">
                                                
                           
                                                        </span>
                                                    </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>   `

             $(".head_state").append(head_content)
             let ping_contet
                ping_contet = `
                <div class="widget-body am-fr">
                                        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                            <div class="am-fl am-cf message_left_dl">
                                                <div class="widget-fluctuation-description-amount">
                                                    拍卖阶段:<span class="ping_text_color">${ii.auction_state}</span>
                                                    
                                                </div>
                                            
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                            <div class="am-fl am-cf message_left_dl">
                                                <div class="widget-fluctuation-description-amount">
                                                    拍卖平台:<span class="ping_text_color">  ${ii.auction_platform}</span>                                                         
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                            <div class="am-fl am-cf message_left_dl">
                                                <div class="widget-fluctuation-description-amount">
                                                    拍卖网址:<span class="ping_text_color object_urls">${ii.auction_url}</span>
                                                </div>
                                            
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                            <div class="am-fl am-cf message_left_dl">
                                                <div class="widget-fluctuation-description-amount">
                                                    开拍时间:<span class="ping_text_color">${start_time}</span>
                                                </div>
                                            
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div class="widget-body am-fr">
                                        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                            <div class="am-fl am-cf message_left">
                                                <div class="widget-fluctuation-description-amount">
                                                    结束时间:<span class="fu_text">${end_time}</span>
                                                </div>
                                            
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                            <div class="am-fl am-cf message_left">
                                                <div class="widget-fluctuation-description-amount">
                                                    起拍价:<span class="fu_text">${ii.starting_price}</span>
                                                </div>
                                            
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                            <div class="am-fl am-cf message_left">
                                                <div class="widget-fluctuation-description-amount">
                                                    评估价:<span class="fu_text">${ii.appraisal_price}</span>
                                                </div>
                                            
                                            </div>
                                         </div>
                                         <div class="am-u-sm-12 am-u-md-12 am-u-lg-3"> 
                                                <div class="am-fl am-cf message_left">
                                                    <div class="widget-fluctuation-description-amount">
                                                    </div>
                                                
                                                </div>
                                      </div>
             
                
                                    </div>
                                    
                                    `

            $(".ping_state").append(ping_contet)



            let paimai_contet 
            if(ii.after_state =="一拍成交" || ii.after_state == "二拍成交" || ii.after_state == "变卖成交" || ii.after_state == "其他成交"){
                paimai_contet = `
                <div class="widget-body am-fr">
                <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                    <div class="am-fl message_left_dl">
                        <div class="widget-fluctuation-description-amount">
                    拍卖结果:<span class="pai_text_color">  ${ii.after_state}</span>
                    </div>
                
                    </div>
                </div>  
                <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                    <div class="am-fl am-cf message_left_dl">
                        <div class="widget-fluctuation-description-amount">
                            成交价:<span class="pai_text_color">  ${ii.transaction_price}</span>
                        </div>
                        
                    </div>
                </div>
                <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">     
                    <div class="am-fl message_left_dl">
                    <div class="widget-fluctuation-description-amount">
                    溢价率:<span class="pai_text_color">  ${ii.premium_rate}</span>
                </div>
                
                    </div>
                </div>
                <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">   
                    <div class="am-fl am-cf message_left_dl">
                        <div class="widget-fluctuation-description-amount">
                            应收服务费: <span class="fu_text"> ${ii.receivable_serviceCharge}</span>
                        </div>
                    </div>
                </div>
            
            
            </div>
                <div class="widget-body am-fr">
                    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">     
                            <div class="am-fl message_left_dl">
                                <div class="widget-fluctuation-description-amount">
                                   已收服务费:<span class="pai_text_color">  ${ii.received_serviceCharge}</span>
                                </div>
                            
                            </div>
                    </div>
                    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">     
                    <div class="am-fl message_left_dl">
                        <div class="widget-fluctuation-description-amount">
                           备注:<span class="pai_text_color">  ${ii.object_note}</span>
                        </div>
                    
                    </div>
            </div>  
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">     
            <div class="am-fl message_left_dl">
                <div class="widget-fluctuation-description-amount">
                   
                </div>
            
            </div>
    </div>  
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">     
    <div class="am-fl message_left_dl">
        <div class="widget-fluctuation-description-amount">
            
        </div>
    
    </div>
</div>    
                </div>    
                `
            }else{
                paimai_contet = `
                <div class="widget-body am-fr">
                    <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                        <div class="am-fl message_left_dl">
                            <div class="widget-fluctuation-description-amount">
                        拍卖结果:<span class="pai_text_color">${ii.after_state}</span>
                        </div>
                    
                        </div>
                    </div>  
                    <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">   
                        <div class="am-fl am-cf message_left_dl">
                            <div class="widget-fluctuation-description-amount">
                                应收服务费: <span class="fu_text"> ${ii.receivable_serviceCharge}</span>
                            </div>
                        </div>
                    </div>
                    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">     
                        <div class="am-fl message_left_dl">
                            <div class="widget-fluctuation-description-amount">
                                已收服务费:<span class="pai_text_color">${ii.received_serviceCharge}</span>
                            </div>
                        
                        </div>
                    </div>  
                    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">     
                    <div class="am-fl message_left_dl">
                        <div class="widget-fluctuation-description-amount">
                            备注:<span class="pai_text_color">${ii.object_note}</span>
                        </div>
                    
                    </div>
                </div>    
            </div> 
                  `
            }
            $(".later_state").append(paimai_contet)

         }
    }    
    })
    $(".object_location").click(function(){
        $(".new_arddess").css({
            display: "block"
        })
        $(".old_arddess").css({
            display:"none"
        })
        
    })

    // 文件操作按钮
    // 1.标的物调查表
    // --下载

    let downfile = "/auction/file/download/"
    $("body").on("click",".diao_upload",function(){
        let filepath = $(this).parent().parent().next().next().text();
        let filename = $(this).prev().children().text()
        let download_path = downfile+"?filepath="+filepath+"&filename="+filename
       window.open(download_path)
    })
    // --预览
    $("body").on("click",".watching_wei",function(){
        let join_path = $(this).parent().parent().parent().next().next().text()
        console.log(join_path)
        window.open(join_path)
    })
    // --删除
    $("body").on("click",".diao_delete",function(){
        let delete_id = $(this).parent().parent().next().text()
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
                        console.log(res);
                      if(res.code == 1){
                          layer.close(index)
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
        })
      
      
    })
      //--上传
      $("body").on("click",".uodate_biao",function(){
        //   console.log("显示")
        show("object_diao_add")
    })
    $(".diao_add_True").click(function(e){
        hide("object_diao_add")
        if(!e.isPropagationStopped()){
            let gather_uuid = "obj,"+$(".object_uuidtetx").text()
            let filepath_type = "oi";
            let file_object = $(".diao_file")[0].files;
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
            }else if(size_sum == 0 ){
                layer.msg("请选择您要上传的文件")
            }else{
                $.ajax({
                    url:"/auction/file/updates/",
                    type:'POST',
                    data:file_data,
                    processData: false,  // tell jquery not to process the data
                    contentType: false, 
                    success:function(res){
                        console.log(res)
                        if(res.code == 1){
                                layer.msg(res.chMessage)
                                $("#diao_text").html("")
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

    //  2.标的照片
        // --上传
        $("body").on("click",".uodate_photo",function(){
            show("object_photo_add")
        })
        $(".photo_addTrue").click(function(e){
            hide("object_photo_add")
            if(!e.isPropagationStopped()){
                let gather_uuid = "obj,"+$(".object_uuidtetx").text()
                let filepath_type = "op";
                let file_object = $(".photo_file")[0].files;
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
                $.ajax({
                    url:"/auction/file/updates/",
                    type:'POST',
                    data:file_data,
                    processData: false,  // tell jquery not to process the data
                    contentType: false, 
                    success:function(res){
                        // console.log(res)
                        if(res.code == 1){
                                layer.msg(res.chMessage)
                                $("#photo_text").html("")
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

        // --下载
        $("body").on("click",".photo_upload",function(){
            let filepath = $(this).parent().parent().next().next().text();
            let filename = $(this).prev().children().text()
            let download_path = downfile+"?filepath="+filepath+"&filename="+filename
           window.open(download_path)
        })
        //-=预览
        $("body").on("click",".photo_ft",function(){
            let join_path = $(this).parent().parent().parent().next().next().text()
            // console.log(join_path)
             window.open(join_path)

        })
        // -- 删除
        $("body").on("click",".photo_delete",function(){
            let delete_id = $(this).parent().parent().next().text()
            // console.log(delete_id)
            // show("photo_delete")
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
                            // console.log(res)
                            if(res.code == 1){
                                layer.close(index);
                                layer.msg(res.Message);
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
                    layer.close(index);
                },
                btnAlign:'c', //按钮对齐方式
                shade:[0.8,'#393D49'], //遮罩
                shadeClose:true //当点击遮罩是否关闭弹层
    
                });
        })

            //   模块化编辑
            //   1.  标的头部
             
            $("body").on("click",".object_head_update",function(){
                        show("object_head")
                            let  cai_type = sessionStorage.getItem("property_type")
                            let guimo =  sessionStorage.getItem("estimated_price")    //资产规模
                            let old_object_name = sessionStorage.getItem("object_name")
                            let old_entrusting_party = sessionStorage.getItem("entrusting_party") // 委托方
                            let old_business_type = sessionStorage.getItem("business_type") // 业务类型
                            let old_object_location = sessionStorage.getItem("object_location") 
                            let old_address = sessionStorage.getItem("buyer")
                            let old_province = sessionStorage.getItem("province")
                            let old_city = sessionStorage.getItem("city")
                            let old_district = sessionStorage.getItem("district")

                            if(old_business_type == "请选择"){
                                $(".business_type").val(0)
                            }else if(old_business_type == "司法拍卖"){
                                $(".business_type").val(1)
                            }else if(old_business_type == "破产清算"){                                
                            $(".business_type").val(2)
                            }else if(old_business_type == "其他"){
                                $(".business_type").val(3)

                            }
                            if(cai_type == "住宅用房"){
                                $(".property_type").val(1)
                            }else if(cai_type == "商业用房"){
                                $(".property_type").val(2)                     
                            }else if(cai_type == "工业用房"){
                                $(".property_type").val(3)  
                            }else if(cai_type == "请选择"){
                                $(".property_type").val(0)  
                            }else if(cai_type == "其他用房"){
                                $(".property_type").val(4)  
                            }else if(cai_type == "机动车"){
                                $(".property_type").val(5)  
                            }else if(cai_type == "其他交通"){
                                $(".property_type").val(6)  
                            }else if(cai_type == "股权"){
                                $(".property_type").val(7)  
                            }else if(cai_type == "土地"){
                                $(".property_type").val(8)  
                            }else if(cai_type == "机器设备"){
                                $(".property_type").val(9)  
                            }else if(cai_type == "其他"){
                                $(".property_type").val(10)  
                            }
                    
                            if(guimo == "100万以下"){
                                $(".estimated_price").val(1)
                            }else if(guimo == "100-1000万"){
                                $(".estimated_price").val(2)
                            }else if(guimo == "1000万以上"){
                                $(".estimated_price").val(3)
                            }

                            $(".object_name").val(old_object_name)
                            $(".object_location").val(old_object_location)       
                            $(".address").val(old_address)       
                            $(".entrusting_party").val(old_entrusting_party)  
                            $("#s_province option:selected").text(old_province)
                            $("#s_city option:selected").text(old_city)
                            $("#s_county option:selected").text(old_district)

              })
      
            $(".object_head_true").click(function(e){
                if(!e.isPropagationStopped()){
                   
                    let property_type = $(".property_type").find("option:selected").text()//资产类型
                    let estimated_price = $(".estimated_price").find("option:selected").text()//资产规模
                    let business_type = $(".business_type").find("option:selected").text()//业务类型
                    let entrusting_party = $(".entrusting_party").val()
                    let lawCase_id = $(".law_uuidx").text()
                    let object_uuid = $(".object_uuidtetx").text()
                    let object_name = $(".object_name").val()
                    let province = $("#s_province").find("option:selected").text()
                    let city = $("#s_city").find("option:selected").text()
                    let district = $("#s_county").find("option:selected").text()
                    let buyer = $(".address").val()
                    let object_locations = province + city + district +  buyer                 
                     let form_data = new FormData()
                    form_data.append("object_location",object_locations) 
                    form_data.append("property_type",property_type) 
                    form_data.append("estimated_price",estimated_price) 
                    form_data.append("lawCase_id",lawCase_id)
                    form_data.append("object_uuid",object_uuid)
                    form_data.append("object_name",object_name)
                    form_data.append("business_type",business_type)
                    form_data.append("entrusting_party",entrusting_party)
                    form_data.append("buyer",buyer)
                    form_data.append('province',province)
                    form_data.append('city',city)
                    form_data.append('district',district)
           

                        let old_object_location = sessionStorage.getItem("object_locations"),
                            old_object_name = sessionStorage.getItem("object_name"),
                            old_property_type = sessionStorage.getItem("property_type"),//资产类型
                            old_estimated_price = sessionStorage.getItem("estimated_price"),//资产规模
                            old_business_type = sessionStorage.getItem("business_type"),//业务类型
                            old_entrusting_party = sessionStorage.getItem("entrusting_party");//委托方
                           
                            console.log(object_locations)
                            console.log(old_object_location)
                            if(object_name == ""){
                                layer.msg("请填写标的名")
                            }else if(entrusting_party == ""){
                                layer.msg("请填写委托方")
                            }
                            else if( property_type == "请选择"){
                                layer.msg("请选择财产类型")
                            }else if(estimated_price == "请选择"){
                                layer.msg("请选择预估价格")
                            }else if(business_type == "请选择"){
                                layer.msg("请选择业务类型")
                            }else if(object_locations == old_object_location){
                                // &&  old_business_type == business_type &&  old_object_name == object_name && old_property_type == property_type && old_estimated_price == estimated_price && entrusting_party == old_property_type
                                layer.msg("未做任何修改")
                            }else{
                                $.ajax({
                                    url:"/auction/edit/object/",
                                    type:'POST',
                                    data:form_data,
                                    processData: false,  // tell jquery not to process the data
                                    contentType: false, 
                                    success:function(res){
                                        // console.log(res) 
                                        if(res.code == 1){
                                            layer.msg(res.chMessage)
                                            $(".object_head_form").css({
                                                display:"none"
                                        })
                                        location.reload()
                                        }else{
                                            // layer.msg(res.chMessage)
                                        }
                                    }
                                })  
                            }
                }
                e.stopPropagation();   
            })
            $(".object_head_off").click(function(){
                $(".new_arddess").css({
                    display: "none"
                })
                $(".old_arddess").css({
                    display:"block"
                })
            })
            

    //   2.拍中编辑


     //溢价率
     $(".transaction_price").blur(function(){
        let num_reg = /^[0-9]*$/,
        starting_price = sessionStorage.getItem('starting_price'),
        transaction_price = $(".transaction_price").val(),
        cha = (transaction_price - starting_price),
        premium_rate = Math.round(cha / starting_price*10000)/ 100.00;
        console.log(starting_price,transaction_price)
        console.log(premium_rate)
        if( starting_price == "" || transaction_price == ""){
        $(".price_text").css({
            opacity:1
        })
        
        }else{
        $(".price_text").css({
            opacity:0
        })
        if( transaction_price < 0 ||  transaction_price ==0 ){
            premium_rate = 0
        }else{
            $(".premium_rate").val(premium_rate)
        }
        }
 
})
             $("body").on("click",".ing_update",function(){
                  show("object_ing")
                        let old_auction_state = sessionStorage.getItem("auction_state")
                        let old_auction_platform = sessionStorage.getItem("auction_platform")
                        let old_auction_url = sessionStorage.getItem("auction_url")
                        let old_auction_submissionDate = sessionStorage.getItem("auction_submissionDate")
                        let old_start_time = sessionStorage.getItem("start_time")
                        let old_starting_price = sessionStorage.getItem("starting_price")
                        let old_appraisal_price = sessionStorage.getItem("appraisal_price")
                       
                     if(old_auction_state == "一拍"){
                        $(".auction_state").val(1)
                
                        }else if(old_auction_state == "二拍"){
                        $(".auction_state").val(2)
                        }else if(old_auction_state == "变卖"){
                        $(".auction_state").val(3)
                 
                        }else if(old_auction_state == "其他"){
                        $(".auction_state").val(4)
                        
                        }

                        if(old_auction_platform == "请选择"){
                            $(".pai_pingtai").val(0)
                        }else if(old_auction_platform == "淘宝网"){
                            $(".pai_pingtai").val(1)

                        }else if(old_auction_platform == "京东网" ){
                            $(".pai_pingtai").val(2)

                        }else if(old_auction_platform == "中拍网" ){
                            $(".pai_pingtai").val(3)

                        }else if(old_auction_platform == "诉讼资产网"){

                            $(".pai_pingtai").val(4)
                        }else if(old_auction_platform == "公拍网"){

                            $(".pai_pingtai").val(5)
                        }else if(old_auction_platform == "工行融e购"){
                            $(".pai_pingtai").val(6)

                        }else if(old_auction_platform == "北交所"){
                            $(".pai_pingtai").val(7)

                        }
                        // console.log(old_announcement_time)
                        $(".auction_url").val(old_auction_url)
                        $(".start_time").val(old_start_time)     
                        $(".auction_submissionDate").val(old_auction_submissionDate)
                        $(".starting_price").val(old_starting_price)      
                        $(".appraisal_price").val(old_appraisal_price)       
            })
            $(".update_ing_true").click(function(e){
                   if(!e.isPropagationStopped()){
                        let auction_state = $(".auction_state").find("option:selected").text();
                        let auction_platform = $(".pai_pingtai").find("option:selected").text();
                        let auction_url = $(".auction_url").val()
                        let start_time = $(".start_time").val()
                        let auction_submissionDate = $('.auction_submissionDate').val()
                        let starting_price = $(".starting_price").val()
                        let appraisal_price = $(".appraisal_price").val()
                        let lawCase_id = $(".law_uuidx").text()
                        let object_uuid = $(".object_uuidtetx").text()


                        // console.log(auction_platform)
                        // console.log(auction_url)
                        // console.log(start_time)
                        // console.log()
  
                        let form_data = new FormData();
                        form_data.append("lawCase_id",lawCase_id)
                        form_data.append("object_uuid",object_uuid)
                        form_data.append("auction_state",auction_state)
                        form_data.append("auction_platform",auction_platform)
                        form_data.append("auction_url",auction_url)
                        form_data.append("start_time",start_time)
                        form_data.append("auction_submissionDate",auction_submissionDate)
                        form_data.append("starting_price",starting_price )
                        form_data.append("appraisal_price",appraisal_price)
             
                        let old_auction_state = sessionStorage.getItem("auction_state")
                        let old_auction_platform = sessionStorage.getItem("auction_platform")
                        let old_auction_url = sessionStorage.getItem("auction_url")
                        let old_auction_submissionDate = sessionStorage.getItem("auction_submissionDate")
                        let old_start_time = sessionStorage.getItem("start_time")
                        let old_starting_price = sessionStorage.getItem("starting_price")
                        let old_appraisal_price = sessionStorage.getItem("appraisal_price")
            
    
                      if(auction_state == "请选择"){
                        layer.msg("请选择拍卖阶段")
                      }else{
                        if( old_auction_platform == auction_platform && old_auction_url == auction_url &&  old_auction_submissionDate == auction_submissionDate && old_starting_price == starting_price &&  old_appraisal_price == appraisal_price &&  old_start_time == start_time ){
                            layer.msg("您当前未做任何修改")
                         }else if(auction_platform == ""){
                              layer.msg("请选择拍卖平台")
                          }else if(auction_url == ""){
                              layer.msg("请填写拍卖网址")
                          }else if(start_time == ""){
                              layer.msg("请填写开拍时间")
                          }else if(auction_submissionDate == ""){
                              layer.msg("请填写结束时间")
                          }else if(starting_price == ""){
                              layer.msg("请填写起拍价")
                          }else if(appraisal_price == ""){
                              layer.msg("请填写评估价")
                          }else{
                            $.ajax({
                                url:"/auction/edit/object/",
                                type:'POST',
                                data:form_data,
                                processData: false,  // tell jquery not to process the data
                                contentType: false, 
                                success:function(res){
                                    console.log(res)
                                    if(res.code == 1){
                                        layer.msg(res.chMessage)
                                     
                                       location.reload()
                                    }else{
                                        layer.msg(res.chMessage)
                                    }
                                }
                            })

                        }

                      }
                   
                   }
                   e.stopPropagation();   
               

            })

        // 3.拍后编辑

            $("body").on("click",".later_update",function(){
                  show("object_later")
                        let old_after_state = sessionStorage.getItem("after_state")
                        let old_transaction_price = sessionStorage.getItem("transaction_price")
                        let old_premium_rate = sessionStorage.getItem("premium_rate")
                        let old_receivable_serviceCharge = sessionStorage.getItem("receivable_serviceCharge")
                        let old_received_serviceCharge = sessionStorage.getItem("received_serviceCharge")
                        let old_object_note = sessionStorage.getItem("object_note")
                        if(old_after_state == "请选择" || old_after_state == ""){
                            $(".after_state").val(0)

                        }else if(old_after_state == "一拍成交"){
                            $(".after_state").val(1)
                            $(".paimai").css({
                                display: "block"
                            })

                        }else if(old_after_state == "二拍成交"){
                            $(".after_state").val(2)
                            $(".paimai").css({
                                display: "block"
                            })
                            
                        }else if(old_after_state == "变卖成交"){
                            $(".after_state").val(3)
                            $(".paimai").css({
                                display: "block"
                            })
                            
                        }else if(old_after_state == "以物抵债"){
                            $(".after_state").val(4)
                        }else if(old_after_state == "撤拍"){
                            $(".after_state").val(5)
                        }else if(old_after_state == "其他未成交"){
                            $(".after_state").val(6)
                        }
                        $(".transaction_price").val(old_transaction_price)
                        $(".premium_rate").val(old_premium_rate)
                        $(".receivable_serviceCharge").val(old_receivable_serviceCharge)
                        $(".received_serviceCharge").val(old_received_serviceCharge)
                        $(".object_note").val(old_object_note)
                    
                      
                                            
            })
            $(".update_later_true").click(function(e){
                if(!e.isPropagationStopped()){
                    let lawCase_id = $(".law_uuidx").text()
                    let object_uuid = $(".object_uuidtetx").text()
                    let form_data = new FormData();
                    let after_state  = $(".after_state").find("option:selected").text()
                    let transaction_price = $(".transaction_price").val()
                    let premium_rate = $(".premium_rate").val()
                    let receivable_serviceCharge = $(".receivable_serviceCharge").val()
                    let received_serviceCharge = $(".received_serviceCharge").val()
                    let object_note = $(".object_note").val()

                    let old_after_state = sessionStorage.getItem("after_state")
                    let old_transaction_price = sessionStorage.getItem("transaction_price")
                    let old_premium_rate = sessionStorage.getItem("c")
                    let old_receivable_serviceCharge = sessionStorage.getItem("receivable_serviceCharge")
                    let old_received_serviceCharge = sessionStorage.getItem("received_serviceCharge")
                    let old_object_note = sessionStorage.getItem("object_note")
                    console.log(object_note)

                    if(after_state == "请选择"){
                        layer.msg("请选择拍卖结果")
                    }else if(after_state == "一拍成交" || after_state == "二拍成交" || after_state == "变卖成交" || after_state == "其他成交"){
                        form_data.append("object_uuid",object_uuid)
                        form_data.append("after_state",after_state)
                        form_data.append("transaction_price",transaction_price)
                        form_data.append("premium_rate",premium_rate)
                        form_data.append("receivable_serviceCharge",receivable_serviceCharge)
                        form_data.append("received_serviceCharge",received_serviceCharge)
                        form_data.append("object_note",object_note)
                        $.ajax({
                            url:"/auction/edit/object/",
                            type:'POST',
                            data:form_data,
                            processData: false,  // tell jquery not to process the data
                            contentType: false, 
                            success:function(res){
                                console.log(res) 
                                if(res.code == 1){
                                    layer.msg(res.chMessage)
                                    location.reload()
                                }else{
                                    // layer.msg(res.chMessage)
                                }
                            }
                        })

                    }else if(after_state == "以物抵债" || after_state == "撤拍" || after_state == "其他未成交"){
                        form_data.append("object_uuid",object_uuid)
                        form_data.append("after_state",after_state)
                        form_data.append("receivable_serviceCharge",receivable_serviceCharge)
                        form_data.append("received_serviceCharge",received_serviceCharge)
                        form_data.append("object_note",object_note)
                        form_data.append("transaction_price",true)
                        form_data.append("premium_rate",true)
                        $.ajax({
                            url:"/auction/edit/object/",
                            type:'POST',
                            data:form_data,
                            processData: false,  // tell jquery not to process the data
                            contentType: false, 
                            success:function(res){
                                console.log(res) 
                                if(res.code == 1){
                                    layer.msg(res.chMessage)
                                    location.reload()
                                }else{
                                    layer.msg(res.chMessage)
                                }
                            }
                        })
                    }
                
             
                }
                e.stopPropagation();   
                    

            })
            $("body").on("click",".object_urls",function(){
                // console.log()
                window.open($(this).text())

            })
        

        // 文件部分改变事件
        //    调查表

        $(".diao_file").change(function(){
            var e=e||window.event
            var _file=e.target.files
            var names=""
            // console.log(_file)
            for(let ii of _file){
                  let text_type =  ii.name.slice(-3)
                //   console.log(ii)
                //   console.log(text_type)
                //   console.log(_file.length)
                  localStorage['text_type'] = text_type
            }
            let diao_file_type = localStorage.getItem("text_type")
            // console.log(diao_file_type)
            if(diao_file_type != "pdf" && diao_file_type != "jpg" && diao_file_type != "png" && diao_file_type != "epg" && diao_file_type != "svg" && diao_file_type != "gif" && diao_file_type != "jpe"){
                  layer.msg("只能上传pdf文件或图片")
                  $(".diao_file").val("")
            }else{
                  if(_file.length>0){
                        for(let i=0;i<_file.length;i++){
                              if(i==_file.length-1){
                                    names+=_file[i].name
                              }else{
                                    names+=_file[i].name+"，"
                              }
                        }
                        $("#diao_text").html(names)
                  }else{
                        $("#diao_text").html("")
                  }
                
            }
          

        })
        //标的图片
       $(".photo_file").change(function(){
        var e=e||window.event
        var _file=e.target.files
        var names=""
        // console.log(_file)
        for(let ii of _file){
              let text_type =  ii.name.slice(-3)
            //   console.log(ii)
            //   console.log(text_type)
            //   console.log(_file.length)
              localStorage['text_type'] = text_type
        }
        let photo_file_type = localStorage.getItem("text_type")
        // console.log(photo_file_type)
        if(photo_file_type != "pdf" && photo_file_type != "jpg" && photo_file_type != "png" && photo_file_type != "epg" && photo_file_type != "svg" && photo_file_type != "gif" && photo_file_type != "jpe"){
              layer.msg("只能上传pdf文件或图片")
              $(".photo_file").val("")
        }else{
              if(_file.length>0){
                    for(let i=0;i<_file.length;i++){
                          if(i==_file.length-1){
                                names+=_file[i].name
                          }else{
                                names+=_file[i].name+"，"
                          }
                    }
                    $("#photo_text").html(names)
              }else{
                    $("#photo_text").html("")
              }
            
        }

       })
    $(".after_state").change(function(){
       let text = $(this).find("option:selected").text()
       if(text == "一拍成交" || text == "二拍成交" || text == "变卖成交" || text == "其他成交"){
           $(".paimai").css({
               display: 'block'
           })
       }else if(text == "以物抵债" || text == "撤拍" ||text == "其他未成交"){
        $(".paimai").css({
            display: 'none'
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

        $('.close-loading').click(function(){
            $('.loading').css("display",'none');
            $('.load-out').css("display",'none');
        })
        $("body").on("click",".black",function(){
            // console.log(1);
            window.history.back(-1);
      }) 
    //    时间转换函数
      function rTime(date) {
        var json_date = new Date(date).toJSON();
        return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }  
    function slice_path(str){
        var  pos = str.indexOf('1/WebGUI')
        str.substring(pos+1,str.length)
    }

    // function success_(txt){
    //     $(".success-txt").text(txt);
    //     $('.layer.msg-success').slideDown();
    //     setTimeout(function(){
    //         $('.layer.msg-success').slideUp() ;
    //     },2000)
        
    //     // getData($('.active>a').text())
        
    
    // }
    // function warning_layer.msg(txt){
    //     $(".warning-txt").text(txt);
    //     $('.layer.msg-warning').slideDown();
    //     setTimeout(function(){$('.layer.msg-warning').slideUp('slow')},2000)
    // }





})()