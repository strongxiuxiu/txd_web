(function(){
    //进入页面获取全部标的物信息
    let admin_name = $("#username").text()
    let pages = 5;
    let limits = 2;
    let form_data = new FormData()
    form_data.append('user_name',admin_name)
    form_data.append('pages',pages)
    form_data.append('limits',limits)
    object_show()
    function object_show(){
    $.ajax({
        url:"http://39.107.242.243:80/auction/inquire_object/",
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
                <td>${ii.assess_method}</td>
                <td>${ii.appraisal_price}</td>
                <td>${ii.potential_purchaser}</td>
                <td>${ii.assess_state}</td>
                <td>${ii.auction_state}</td>
                <td>${ii.after_state}</td>
               </tr>
                
                `)
                let table_content = `
                <tr>
                <td class="all-choose">
                    <input type="checkbox" class="dl-choose" name="dl-choose">
                </td>
                <td class="uuid">${ii.object_uuid}</td>
                <td>${ii.object_name}</td>
                <td>${ii.appraisal_agency}</td>
                <td>${ii.u_create_time}</td>
                <td><a data-toggle="collapse" data-parent="#accordion"
                    href="#${ii.object_uuid}" class="more">查看更多</a>
                 </td>
                <td>
                    <button class="updatebtn"> <i class="am-icon-pencil " style="top: 3px;"></i>编辑</button>
                    <button class="deletebtn"> <i class="am-icon-trash" style="top: 3px;"></i>删除</button>
                </td>
            </tr>
            <tr>
            <td colspan="10" style="background-color: #fff;padding: 0">
                <div id="${ii.object_uuid}" class="panel-collapse collapse">
                    <table class="coltable">
                        <thead>
                        <tr>
                         <th>财产类型</th>
                         <th>预估价格</th>
                         <th>潜在竞买人</th>
                         <th>拍卖状态</th>
                         <th>评估状态</th>
                         <th>售后状态</th>
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
              
              
            }
        }

    })
}

    // 删除
    $("body").on("click", ".deletebtn", function() {
        let chose = document.querySelectorAll("input[class='dl-choose']:checked");
		// if(chose.length>0){
		//     delete_objects();
		// }else{
		// 	alert("请选择想要删除的raid");
		// }
        delete_objects()
    });
    //删除函数
     function delete_objects(){
        $("input[class='dl-choose']:checked").each(function(){
            let id = $(this).parent().next().text()
            console.log(id)
            $.ajax({
                url: 'http://39.107.242.243:80/auction/delete/object/',
                type: 'POST',
                data: {
                    object_uuid: id,
                },
                success: (res) => {
                    console.log(res);
                    location.reload();  //实现页面重新加载  
                }
            })
        })
    }

    // 部分内容点击显示
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
            $(".sitem_div_money").css({
                display:"block"
            })
        }else{
            $(".sitem_div_money").css({
                display:"none"
            })
        }

    })


     //编辑标的物
     $("body").on("click",".updatebtn",function(){
       $(".object_table").css({
           display:"block"
       })
     })
    //  标的编辑物确定
     $(".objectsave").click(function(){
         //关闭表单
        $(".object_table").css({
            display:"block"
        })
        edit_object()
     })
     function edit_object(){
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
            // 添加至formdata
            // 标的文件添加
            // console.log(objectPhoto_file)
            console.log(filesArr)
            // 照片
            for(var i=0;i<filesArr.length;i++){  
                form_data.append("objectInvestigate_file",filesArr[i])
            }
           //评估摘要
            for(var i=0;i<appraisalSummaries_id.length;i++){  
                form_data.append("appraisalSummaries_id",appraisalSummaries_id[i])
            }
            //附件
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

     }

            



})()