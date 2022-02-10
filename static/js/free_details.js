(function(){
    let free_uuid = $(".free_uuidtetx").text()
console.log(free_uuid)
axios.get('http://39.107.242.243:80/auction/a/fb/',{
    params:{FeeBased_uuid:free_uuid}}).then(res=>{
          console.log(res)
          let free_llst = res.data.data;
          console.log(free_llst)
          for(let ii of free_llst){
              let fu_list = []
              let fujian = ii.filepath_dict.fb_filepath;
              console.log(fujian.length)
              if(fujian.length ==0){
                fu_list.push(`
                <tr class="gradeX">
                <td class="joln_watch">
                <div class="no_more">暂无信息</div>
                </td>
            </tr>`)
              }else{
                  for(let fu of fujian){
                    fu_list.push(
                        `
                            <tr class="gradeX">
                            <td><div class="icon_div"><img src="/static/img/zip.png" alt="" class="ping_img"></div></td> 
                            <td style="display: none;">${fu.filepath_id}</td>
                            <td class="joln_watch">${fu.filename}</td>
                            <td style="display: none;" class="ping_path">${fu.filepath.slice(24)}</td>
                            <td class="button_td"><button class="fu_upload">下载</button><button class="fu_delete">删除</button></td>
                        </tr>`
                    )

                  }

              }
              let free_content  = `
              <div class="row  am-cf">
              <button type="button" style="display:none;" class="am-btn am-btn-default am-btn-success object_uuid"><span class="am-icon-plus object_uuidtetx">{{ object_uuid }}</span> </button>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="widget am-cf">
                  <div class="widget-head am-cf">
                      <div class="widget-title am-fl widget_margin">费用详情信息</div>
                      <div class="widget-function am-fr">
                        编辑
                      </div>
                      <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 blackdiv">
                      <div class="widget-body black">

                                 <img src="/static/img/last.png" alt="">返回
                              </div>
                  </div>
                  </div>
                <section>
                    <div class="poster">
                          <div class="poster-list">
                                <div class="poster-txt xg"  style="height:7.8rem;">
                                    <div class="widget-body am-fr show">
                                      <div class="open_more">
                                        <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
                                            <div class="am-fl">
                                                <div class="widget-fluctuation-description-text">
                                                标的名称：
                                              </div>
                                              <div class="widget-fluctuation-description-text text-primary" am-cf>
                                                  ${ii.object_name}
                                            </div>
                                            </div>
                                        </div>   
                                        <div class="am-u-sm-12 am-u-md-6 am-u-lg-3"> 
                                            <div class="am-fl am-cf">
                                                <div class="widget-fluctuation-description-text">
                                                    成交价总计
                                                </div>
                                                <div class="widget-fluctuation-description-text text-primary" am-cf>
                                                  ${ii.transaction_price}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">    
                                            <div class="am-fl am-cf">
                                            
                                                <div class="widget-fluctuation-description-text">
                                                    服务费率
                                                </div>
                                                <div class="widget-fluctuation-description-text text-success" am-cf>
                                                  ${ii.service_tariffing}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-4 am-u-lg-3">    
                                            <div class="am-fl">
                                              <div class="widget-fluctuation-description-text">
                                              服务费
                                            </div>
                                            <div class="widget-fluctuation-description-text text-success" am-cf>
                                              ${ii.service_charge}
                                          </div>
                                          </div>
                                        </div>
                                    </div>
                                      <div class="widget-body am-fr">
                                        <div class="am-u-sm-6 am-u-md-6 am-u-lg-3"> 
                                          <div class="am-fl">
                                              <div class="widget-fluctuation-description-text">
                                           增值服务
                                            </div>
                                            <div class="widget-fluctuation-description-text text-primary" am-cf>
                                              ${ii.valueadded_services}
                                          </div>
                                          </div>
                                        </div>  
                                        <div class="am-u-sm-6 am-u-md-6 am-u-lg-3"> 
                                            <div class="am-fl am-cf">
                                                <div class="widget-fluctuation-description-text">
                                                    增值服务内容
                                                </div>
                                                <div class="widget-fluctuation-description-text text-primary" am-cf>
                                            
                                                  ${ii.valueaddedservices_content}
                      
                                                </div>
                                            </div>
                                        </div>
                                        <div class="am-u-sm-6 am-u-md-4 am-u-lg-2">     
                                            <div class="am-fl">
                                              <div class="widget-fluctuation-description-text">
                                              增值服务收费
                                            </div>
                                            <div class="widget-fluctuation-description-text text-success" am-cf>
                                              ${ii.Valueadded_service_charges}
                                          </div>
                                          </div>
                                        </div>
                                        <div class="am-u-sm-6 am-u-md-4 am-u-lg-2">   
                                            <div class="am-fl am-cf">
                                                <div class="widget-fluctuation-description-text">
                                                  已开票
                                                </div>
                                                <div class="widget-fluctuation-description-text text-success" am-cf>
                                                  ${ii.have_ticket}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="am-u-sm-12 am-u-md-4 am-u-lg-2">     
                                            <div class="am-fl">
                                              <div class="widget-fluctuation-description-text">
                                                  开票号码
                                              </div>
                                              <div class="widget-fluctuation-description-text text-danger" am-cf>
                                                  ${ii.invoice_number}
                                              </div>
                                          </div>
                                        </div>  
                                    </div>
                                    <div class="widget-body am-fr">
                                      <div class="am-u-sm-6 am-u-md-12 am-u-lg-3"> 
                                          <div class="am-fl">
                                              <div class="widget-fluctuation-description-text">
                                                  开票金额
                                              </div>
                                              <div class="widget-fluctuation-description-text text-danger" am-cf>
                                                  ${ii.invoice_price}
                                              </div>
                                          </div>
                                      </div>
                                      <div class="am-u-sm-6 am-u-md-12 am-u-lg-3">     
                                        <div class="am-fl">
                                            <div class="widget-fluctuation-description-text">
                                            已到账
                                          </div>
                                          <div class="widget-fluctuation-description-text text-primary" am-cf>
                                            ${ii.payment_receive }
                                           
                                        </div>
                                        </div>
                                      </div>
                                      <div class="am-u-sm-6 am-u-md-12 am-u-lg-2">   
                                        <div class="am-fl am-cf">
                                            <div class="widget-fluctuation-description-text">
                                                到账时间
                                            </div>
                                            <div class="widget-fluctuation-description-text text-primary" am-cf>
                                              ${ii.accounting_date}
                                              
                                            </div>
                                        </div>
                                      </div>
                                      <div class="am-u-sm-6 am-u-md-12 am-u-lg-2">  
                                        <div class="am-fl">
                                          <div class="widget-fluctuation-description-text">
                                          到账金额
                                        </div>
                                        <div class="widget-fluctuation-description-text text-success" am-cf>
                                          ${ii.accounting_price}
                                          
                  
                                      </div>
                                      </div>
                                      </div>
                                      <div class="am-u-sm-6 am-u-md-12 am-u-lg-2">
                                        <div class="am-fl am-cf">
                                            <div class="widget-fluctuation-description-text">
                                              备注
                                            </div>
                                            <div class="widget-fluctuation-description-text text-success" am-cf>
                                              ${ii.content}
                                              
                                            </div>
                                        </div>
                                      </div>  
                                    </div>
                                 
                                      <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
                                              <div class="widget-head am-cf">
                                              <div class="widget-title am-fl">其他附件</div>
                                          </div>
                                          <div class="widget-body  widget-body-lg am-fl">
                                              <div class="am-scrollable-horizontal" style="width:100%; height: 66px; overflow-y: scroll; overflow-x: scroll;">
                                              <div class="am-u-sm-12 am-u-md-12 am-u-lg-1">    
                                              <table width="100%"  class="am-table am-table-compact am-text-nowrap tpl-table-black " id="example-r">
                                                      <tbody id="fu_tobody">
                                                      ${fu_list.join("")}
                                                      </tbody >
                                                      
                                                  </table>
                   </td>                                        
          </tr>
            `                           
        $(".tbContent").append(filelist)
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
                // console.log(limits,pages)
                let file_type = 0
                let form_data = new FormData()
                    form_data.append('user_name',admin_name)
                    form_data.append('page',pages)
                    form_data.append('limit',limits)
                    form_data.append('file_type',file_type)
                    $.ajax({
                        url:"/auction/all/file/",
                        type:'POST',
                        data:form_data,
                        processData: false,  // tell jquery not to process the data
                        contentType: false,
                        success:function(res){
                            // console.log(res)
                            let file_lists = res.data
                            $(".count_num").text(res.count)
                            $(".tbContent").children().remove()
                            for(let ii of file_lists){
                                let filelist =
                                ` <tr class="objectx_join_tr">
                                <td class="all-choose">
                                <input type="checkbox" class="file-choose" name="dl-choose">
                                </td>
                                <td style="display: none;" class="object_uuid">${ii.filepath.slice(24)}</td>
                                <td class="objectx_join">${rTime(ii.update_time)}</td>
                                <td class="objectx_join">${ii.fileType_id}</td>
                                <td class="objectx_join file_name">${ii.old_filename}</td>
                                <td class="object_type objectx_join">${ii.update_user}</td>
                                <td class="object_type objectx_join">
                                <button class="download_file"><a title="下载"><i class="am-icon-download sidebar-nav-link-logo"></i></a></button>
                                </td>                                        
                          </tr>
                            `                           
                        $(".tbContent").append(filelist)
                            }
                        }
                    })
          
        
            }
            
            
        })
    })




})

//查询
$(".search_btn").click(function(){
       let  filetype = $(".file_type").val()
       let user_grader = localStorage.getItem("user_grader")
    //    console.log(user_grader)
       let filetype_num;
        if(filetype == 0){
            filetype_num = filetype
        }else if(filetype == 1){
            filetype_num = filetype
        }else if(filetype == 2){
            filetype_num = filetype
        }else if(filetype == 3){
            filetype_num = filetype
        }
        $(".file_type_num").text(filetype_num)
        let search_val = $(".search_input").val()
        let search_time = $(".search_time").val()
        let search_type = $(".search_type").val()
        let page = $("._active_1").text()
        let limit = $("._sizes_select_active").text().slice(0,2)
        let admin_name = $("#username").text()
        let form_data = new FormData()
        if(search_type == 1){
            include_update_time = search_time
            file_name = ""
        }else if(search_type == 2){
            file_name = search_val
            include_update_time = ""
        }else{
            file_name = ""
            include_update_time = ""

        }
        form_data.append('user_name',admin_name)
        form_data.append('user_grade',user_grader)
        form_data.append('page',page)
        form_data.append('limit',limit)
        form_data.append('include_update_time',include_update_time)
        form_data.append('file_name',file_name)
        form_data.append('file_type',filetype_num)
        // console.log(search_type)
        if(search_type == 0 && filetype == 0){
            // alert("请选择查询条件")
        }else{
            $.ajax({
                url:"/auction/all/file/",
                type:'POST',
                data:form_data,
                processData: false,  // tell jquery not to process the data
                contentType: false,
                success:function(res){
                    // console.log(res)
                    let file_lists = res.data
                    $(".count_num").text(res.count)
                    $(".tbContent").children().remove()
                    for(let ii of file_lists){
                        let filelist =
                        ` <tr class="objectx_join_tr">
                        <td class="all-choose">
                        <input type="checkbox" class="file-choose" name="dl-choose">
                        </td>
                        <td style="display: none;" class="object_uuid">${ii.filepath.slice(24)}</td>
                        <td class="objectx_join">${rTime(ii.update_time)}</td>
                        <td class="objectx_join">${ii.fileType_id}</td>
                        <td class="objectx_join file_name">${ii.old_filename}</td>
                        <td class="object_type objectx_join">${ii.update_user}</td>
                        <td class="object_type objectx_join">
                        <button class="download_file"><a title="下载"><i class="am-icon-download sidebar-nav-link-logo"></i></a></button>
                        </td>
    
                                                                    
                  </tr>
                    `                           
                $(".tbContent").append(filelist)
                    }
                }
            })  .then(()=>{
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
                        // console.log(limits,pages)
                        let file_type = $(".file_type_num").text()
                        let form_data = new FormData()
                            form_data.append('user_name',admin_name)
                            form_data.append('page',pages)
                            form_data.append('limit',limits)
                            form_data.append('file_type',file_type)
                            form_data.append('user_grade',user_grader)
                            $.ajax({
                                url:"/auction/all/file/",
                                type:'POST',
                                data:form_data,
                                processData: false,  // tell jquery not to process the data
                                contentType: false,
                                success:function(res){
                                    // console.log(res)
                                    let file_lists = res.data
                                    $(".count_num").text(res.count)
                                    $(".tbContent").children().remove()
                                    for(let ii of file_lists){
                                        let filelist =
                                        ` <tr class="objectx_join_tr">
                                        <td class="all-choose">
                                        <input type="checkbox" class="file-choose" name="dl-choose">
                                        </td>
                                        <td style="display: none;" class="object_uuid">${ii.filepath.slice(24)}</td>
                                        <td class="objectx_join">${rTime(ii.update_time)}</td>
                                        <td class="objectx_join">${ii.fileType_id}</td>
                                        <td class="objectx_join file_name">${ii.old_filename}</td>
                                        <td class="object_type objectx_join">${ii.update_user}</td>
                                        <td class="object_type objectx_join">
                                        <button class="download_file"><a title="下载"><i class="am-icon-download sidebar-nav-link-logo"></i></a></button>
                                        </td>                                        
                                  </tr>
                                    `                           
                                $(".tbContent").append(filelist)
                                    }
                                }
                            })
                  
                
                    }
                    
                    
                })
            }) 
    

        }
      

    



   


  
    
})
$(".search_type").change(function(){
    let val = $(this).val()
   if(val == 1){
       $(".search_time").css({
           display:"block"
       })
       $(".search_input").css({
           display:"none"
       })
   }else{
    $(".search_time").css({
        display:"none"
    })
    $(".search_input").css({
        display:"block"
    })

   }
})
$(".clear_btn").click(function(){
    window.location.reload()
})
//下载
let downfile = "/auction/file/download/"
$("body").on("click",".download_file",function(){
    let filepath = $(this).parent().parent().children("td.object_uuid").text()
    let filename = $(this).parent().prev().prev().text()
    let download_path = downfile+"?filepath="+filepath+"&filename="+filename
   window.open(download_path)
})
//预览
$("body").on("click",".file_name",function(){
    let file_path = $(this).parent().children("td.object_uuid").text().slice(24)
    window.open(file_path)
    // console.log(file_path)
})








    function rTime(date) {
        var json_date = new Date(date).toJSON();
        return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
  
})()