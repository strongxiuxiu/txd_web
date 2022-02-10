(function(){
    //新建标的
    var law_uuid = $(".law_uuid_html").text()
    console.log(law_uuid)
// //进入页面调取大接口循环标的与费用信息
if(law_uuid != null){
    free_show()
}
 function free_show(){
       console.log(law_uuid)
   let  form_data_free = new  FormData();
    form_data_free.append("lawCase_uuid",law_uuid)
     $.ajax({
              url:"/auction/all/info/",
                 type:'POST',
                 data:form_data_free,
                 processData: false,  // tell jquery not to process the data
                 contentType: false, 
                 success:function(res){
                     console.log(res)
                     let object_nums  =  res.data.obj.length;
                     console.log($(".object_sum"))
                     $(".object_sum").text(object_nums)
                    let  object_lists = res.data.obj,
                      case_list = res.data.case,
                       team_list = res.data.team;
                       console.log(object_lists)
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
                                                    
                                                 </span
                                             </td> 
                                                <td style="display: none;">${ft.filepath_id}</td>
                                                <td style="display: none;" class="photo_path">${ft.filepath.slice(24)}</td>
                                             
                                         </tr>
                                             
                                             `)  
                                            
                                            }
                                    }
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
     //删除标的
     $(".deleteobject_btn").click(function(){
         
      let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
      console.log(choose)
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
            console.log(objectu_list)
            $.ajax({
                  url: '/auction/delete/object/',
                  type: 'POST',
                  data: {
                      object_uuid: JSON.stringify(objectu_list),
                  },
                  success: (res) => {
                      console.log(res);
                    if(res.code == 1){
                          layer.msg(res.chMessage)
                          setTimeout(function(){
                              location.reload()
                          },1000)
                    }
                  }
              })
      

      }
      e.stopPropagation();
  
   })
    //复制标的
 $(".copyobject_btn").click(function(){
      let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
      console.log(choose)
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
               console.log(uuid)
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
                          setTimeout(function(){
                              location.reload()

                          },1000)
                        
                    }
                  }
              })
            
         })
       
     
   

   }
   e.stopPropagation();

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
function success_alert(txt){
  $(".success-txt").text(txt);
  $('.layer.msg-success').slideDown();
  setTimeout(function(){
      $('.layer.msg-success').slideUp() ;
  },2000)
  


}
function warning_alert(txt){
  $(".warning-txt").text(txt);
  $('.layer.msg-warning').slideDown();
  setTimeout(function(){$('.layer.msg-warning').slideUp('slow')},2000)
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
          console.log(_file)
          let text_type;
          for(let ii of _file){
                let text_type =  ii.name.slice(-3)
                console.log(ii)
                console.log(text_type)
                console.log(_file.length)
                localStorage['text_type'] = text_type
          }
         file_type = localStorage.getItem("text_type")
         console.log(file_type)
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
          hide("wei_add")
          let gather_uuid = "case,"+$(".law_uuid_html").text()
          let filepath_type = "pa";
          let file_object = $(".wei_file")[0].files;
          console.log(gather_uuid)
          console.log(filepath_type)
          console.log(file_object)
          let file_data = new FormData();
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
      e.stopPropagation(); 


     })

           //委托书预览
          $("body").on("click",".watching_wei",function(){
                // let join_path = $(this).parent().parent().children("td.wt_path").text()
                let join_path = $(this).parent().parent().parent().next().next().text()
                console.log(join_path)
                window.open(join_path)
        
          })
          //委托书下载
          $("body").on("click",".download_wei",function(){
                let load_path = $(this).parent().prev().text()
                // console.log(load_path)
                window.location.href=load_path
          })
          //委托书删除
          $("body").on("click",".wei_delete",function(){
                  let  delete_id =  $(this).parent().prev().prev().prev().text();
                  console.log(delete_id)
                  show("wei_delete")
                  $(".wei_de_True").click(function(e){
                      if(!e.isPropagationStopped()){
                        hide("wei_delete")
                        $.ajax({
                              url: '/auction/file/remove/',
                              type: 'GET',
                              data: {
                                   filepath_id:delete_id
                              },
                              success: (res) => {
                                  console.log(res);
                                if(res.code == 1){
                                      layer.msg(res.chMessage)
                                      setTimeout(function(){
                                          location.reload()

                                      },1000)
                                }
                              }
                          })
                      }
                      e.stopPropagation();        

                  })
              
          })
           //附件上传
           $("body").on("click",".uodate_fu",function(){
                 show("fu_add")
           })
          $(".fu_addTrue").click(function(e){
                     hide("wei_add")
                if(!e.isPropagationStopped()){
                let gather_uuid = "case,"+$(".law_uuid_html").text()
                let filepath_type = "oa";
                let file_object = $(".oa")[0].files;
                console.log(gather_uuid)
                console.log(filepath_type)
                console.log(file_object)
                let file_data = new FormData();
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
                            })
                           
                      }else{
                            layer.msg(res.chMessage)
                      }
                      }
                })
             }
             e.stopPropagation(); 


          })


          //附件下载
       $("body").on("click",".download_fu",function(){
          let ft_path = $(this).parent().prev().text()
          console.log(ft_path)
          window.location.href=ft_path
       })
          //附件删除
          $("body").on("click",".fu_delete",function(){
              
                let  delete_id =  $(this).parent().prev().prev().prev().text();
                console.log(delete_id)
                show("fu_delete")
                $(".fu_delete_True").click(function(e){
                if(!e.isPropagationStopped()){
                      hide("fu_delete")
                      $.ajax({
                            url: '/auction/file/remove/',
                            type: 'GET',
                            data: {
                                 filepath_id:delete_id
                            },
                            success: (res) => {
                                console.log(res);
                              if(res.code == 1){
                                    layer.msg(res.chMessage)
                                    setTimeout(function(){
                                          location.reload()
                                    })
                                 
                              }
                            }
                        })
                }  
                e.stopPropagation();       

                })

             
              
              
          })
          

    //    点击进入标的详情页
       $("body").on("click",".objectx_join",function(){
          let object_uuid = $(this).parent().children("td.object_uuid").text()
          console.log(object_uuid)
          window.location.href = "/auction/object/info/?object_uuid="+object_uuid;

       })
    //点击进入费用   
       $("body").on("click",".join_free",function(){
             console.log(1111)
          let free_uuid = $(this).parent().children("td.free_uuid").text()
          console.log(free_uuid)
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
          console.log(_file)
          let text_type;
          for(let ii of _file){
                let text_type =  ii.name.slice(-3)
                console.log(ii)
                console.log(text_type)
                console.log(_file.length)
                localStorage['text_type'] = text_type
          }
         file_type = localStorage.getItem("text_type")
         console.log(file_type)
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
          console.log(_file)
          let text_type;
          for(let ii of _file){
                let text_type =  ii.name.slice(-3)
                console.log(ii)
                console.log(text_type)
                console.log(_file.length)
                localStorage['text_type'] = text_type
          }
         file_type = localStorage.getItem("text_type")
         console.log(file_type)
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
          console.log(_file)
          let text_type;
          for(let ii of _file){
                let text_type =  ii.name.slice(-3)
                console.log(ii)
                console.log(text_type)
                console.log(_file.length)
                localStorage['text_type'] = text_type
          }
         file_type = localStorage.getItem("text_type")
         console.log(file_type)
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
          console.log(_file)
          for(let ii of _file){
                let text_type =  ii.name.slice(-3)
                console.log(ii)
                console.log(text_type)
                console.log(_file.length)
                localStorage['text_type'] = text_type
          }
         file_type = localStorage.getItem("text_type")
         console.log(file_type)
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
          console.log(_file)
          for(let ii of _file){
                let text_type =  ii.name.slice(-3)
                console.log(ii)
                console.log(text_type)
                console.log(_file.length)
                localStorage['text_type'] = text_type
          }
         file_type = localStorage.getItem("text_type")
         console.log(file_type)
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
          console.log(_file)
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