(function(){
    let newlaw_case = sessionStorage.getItem("law_case")
    // console.log(newlaw_case)
        let  law_uuid = $(".law_uuid_html").text()
        // console.log(law_uuid)
        let  form_data_free = new  FormData();
        form_data_free.append("lawCase_uuid",law_uuid)
        $.ajax({
          url:":80/auction/all/info/",
                      type:'POST',
                      data:form_data_free,
                      processData: false,  // tell jquery not to process the data
                      contentType: false, 
                      success:function(res){
                        //   console.log(res)
                          let case_list = res.data.case;
                          for(let ii of case_list){
                            //   console.log(ii)
                              sessionStorage["law_case"] = ii.law_case
                              sessionStorage["court_name"] = ii.court_name
                              sessionStorage["proposer"] = ii.proposer
                              sessionStorage["proposer_phonenumber"] = ii.proposer_phonenumber
                              sessionStorage["executor"] = ii.executor
                              sessionStorage["executor_phoneNumber"] = ii.executor_phoneNumber
                              sessionStorage["undertaker"] = ii.undertaker
                              sessionStora</li>
                    `)   
               }
                //循环加入数据
                let firlist = res.enMessage
                for(let ii of firlist){
                    let f_team = ii.team
                    let f_team_list = []
                    let c_Status
                    if(ii.case_status == 1){
                        c_Status = "已完成"
                    }else{
                        c_Status = "进行中"
                    }
                    for(bb of f_team){
                        f_team_list.push(bb.team_name)
                    }
                    let top_tr = `
                    <tr class="object_join_tr top_first">
                    
                    <td>
                        <input type="checkbox" class="dl-choose" name="dl-choose">
                    </td>
                    <td class="uuid">${ii.lawCase_uuid}</td>
                    <td class="object_join_a"> <button class="top_button">置顶</button> ${ii.create_time}</td>
                    <td class="object_join_a">${ii.last_updateTime}</td>
                    <td class="object_join_a">${ii.law_case}</td>
                    <td class="object_join_a">${ii.court_name}</td>
                    <td class="object_join_a">${ii.proposer}</td>
                    <td class="object_join_a">${ii.executor}</td>
                    <td class="object_join_a">${ii.undertaker}</td>
                    <td class="object_join_a">${ii.object_num}</td>
                    <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>

                    <td class="object_join_a">${f_team_list.join("")}</td>
                    <td class="object_join_a">${ii.project_leader}</td>
                    <td class="object_join_a">${ii.file_number}</td>
                    <td>
                    <button class="no_top"><img src="/static/img/no_top.png" alt=""><span class="q_span">取消置顶</span></button>
                    <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                    <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                   </td>
                    </a>
                </tr>`
                $(".tbContent").append(top_tr)

                }
                let  tablelist = res.data;
                for(let ii of tablelist){
                    let team = ii.team
                    let team_list = []
                    let c_Status
                  if(ii.case_status == 1){
                      c_Status = "已完成"
                  }else{
                      c_Status = "进行中"
                  }

                    for(let aa of team){
                        team_list.push(aa.team_name)
                    }
                     let table_content = `
                        <tr class="object_join_tr">
                        <td>
                            <input type="checkbox" class="dl-choose" name="dl-choose">
                        </td>
                        <td class="uuid">${ii.lawCase_uuid}</td>
                        <td class="object_join_a">${ii.create_time}</td>
                        <td class="object_join_a">${ii.last_updateTime}</td>
                        <td class="object_join_a">${ii.law_case}</td>
                        <td class="object_join_a">${ii.court_name}</td>
                        <td class="object_join_a">${ii.proposer}</td>
                        <td class="object_join_a">${ii.executor}</td>
                        <td class="object_join_a">${ii.undertaker}</td>
                        <td class="object_join_a">${ii.object_num}</td>
                        <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>
                        <td class="object_join_a">${team_list.join("")}</td>
                        <td class="object_join_a">${ii.project_leader}</td>
                        <td class="object_join_a">${ii.file_number}</td>
                        <td>
                        <button class="top"><img src="/static/img/top.png" alt=""><span class="zhi_span">置顶</span></button>
                        <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                        <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                       </td>
                        </a>
                    </tr>
                    `
                    $(".tbContent").append(table_content)
                }
                
        }
       }).
       then(()=>{
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
                  let  page= index;
                  let limit = pageSize;
                  let admin_name = $("#username").text()
                  let form_data = new FormData()
                //   console.log(page,limit)
                  form_data.append('user_name',admin_name)
                  form_data.append('page',page)
                  form_data.append('limit',limit)
                  form_data.append('user_grade',user_grader)
                  $.ajax({
                  url:"/auction/inquire_case/",
                  type:'POST',
                  data:form_data,
                  processData: false,  // tell jquery not to process the data
                  contentType: false, 
                  success:function(res){
                      $(".tbContent").children().remove()
                    //   console.log(res)
                      //循环加入数据
                      if(page == 1){
                        let firlist = res.enMessage
                        for(let ii of firlist){
                            let f_team = ii.team
                            let f_team_list = []
                            let c_Status
                            if(ii.case_status == 1){
                                c_Status = "已完成"
                            }else{
                                c_Status = "进行中"
                            }
                            for(bb of f_team){
                                f_team_list.push(bb.team_name)
                            }
                            let top_tr = `
                            <tr class="object_join_tr top_first">
                            
                            <td>
                                <input type="checkbox" class="dl-choose" name="dl-choose">
                            </td>
                            <td class="uuid">${ii.lawCase_uuid}</td>
                            <td class="object_join_a"> <button class="top_button">置顶</button> ${ii.create_time}</td>
                            <td class="object_join_a">${ii.last_updateTime}</td>
                            <td class="object_join_a">${ii.law_case}</td>
                            <td class="object_join_a">${ii.court_name}</td>
                            <td class="object_join_a">${ii.proposer}</td>
                            <td class="object_join_a">${ii.executor}</td>
                            <td class="object_join_a">${ii.undertaker}</td>
                            <td class="object_join_a">${ii.object_num}</td>
                            <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>
        
                            <td class="object_join_a">${f_team_list.join("")}</td>
                            <td class="object_join_a">${ii.project_leader}</td>
                            <td class="object_join_a">${ii.file_number}</td>
                            <td>
                            <button class="no_top"><img src="/static/img/no_top.png" alt=""><span class="q_span">取消置顶</span></button>
                            <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                            <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                           </td>
                            </a>
                        </tr>`
                        $(".tbContent").append(top_tr)
    
                        }
                      }
                      let  tablelist = res.data;
                      for(let ii of tablelist){
                          let team = ii.team
                          let team_list = []
                          let c_Status
                          if(ii.case_status == 1){
                              c_Status = "已完成"
                          }else{
                              c_Status = "进行中"
                          }
                          for(let aa of team){
                              team_list.push(aa.team_name)
                          }
                          let table_content = `
                            <tr class="object_join_tr">
                            <td>
                                <input type="checkbox" class="dl-choose" name="dl-choose">
                            </td>
                            <td class="uuid">${ii.lawCase_uuid}</td>
                            <td class="object_join_a">${ii.create_time}</td>
                            <td class="object_join_a">${ii.last_updateTime}</td>
                            <td class="object_join_a">${ii.law_case}</td>
                            <td class="object_join_a">${ii.court_name}</td>
                            <td class="object_join_a">${ii.proposer}</td>
                            <td class="object_join_a">${ii.executor}</td>
                            <td class="object_join_a">${ii.undertaker}</td>
                            <td class="object_join_a">${ii.object_num}</td>
                            <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>

                            <td class="object_join_a">${team_list.join("")}</td>
                            <td class="object_join_a">${ii.project_leader}</td>
                            <td class="object_join_a">${ii.file_number}</td>
                            <td>
                            <button class="top"><img src="/static/img/top.png" alt=""><span class="zhi_span">置顶</span></button>
                            <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                            <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                           </td>
                            </a>
                        </tr>
                        `
                          $(".tbContent").append(table_content)
                          
                      }   
                      let enmessage = $(".enmessage").text()
                      let totaltext = `
                      <div class="_counts">共 ${enmessage} 条</div>` 
                      $("._count").after(totaltext)   
                  }
              })
          
        
            }
        })
        // let enmessage = $(".enmessage").text()
        // let totaltext = `
        // <div class="_counts">共 ${enmessage} 条</div>` 
        // $("._count").after(totaltext)
       }).then(()=>{
           let enmessage = $(".enmessage").text()
        let totaltext = `
        <div class="_counts">共 ${enmessage} 条</div>` 
        $("._count").after(totaltext)

       })

    }
    case_show() 
    // ---分页
    // 创建时间 升降序
    var state
    // 创建时间升序
    $(".c_time_up").click(function(){
        // console.log(user_grader)
        let page = $("._active_1").text()
        let limit = $("._sizes_select_active").text().slice(0,2)
        let admin_name = $("#username").text()
        let sort_create_time = 1
        let search_time = $(".search_time").val()
        let search_time_end = $(".search_time_end").val()
        let form_data = new FormData()
        let search_type = $(".search_type").val()
        let search_val = $(".search_input_case").val()

        let include_create_time,
         include_update_time,
        include_end_create_time,
        include_end_update_time,
        include_case,
        all_inquire,
        include_file_number,
        include_project_leader,
        include_undertaker,
        include_by_executor,
        include_court_name,
        include_proposer;
            if(search_type == 0){
                all_inquire = search_val
                include_create_time = ""
                include_update_time = ""
                include_end_create_time = ""
                include_end_update_time = ""
                include_case = "" 
                include_file_number = ""
                include_project_leader = ""
                include_undertaker = ""
                include_by_executor = ""
                include_court_name = ""
                include_proposer = ""

            }else if(search_type == 1){
            all_inquire = ""
            include_create_time = search_time
            include_end_create_time = search_time_end
            include_update_time = ""
            include_end_update_time = ""
            include_case = "" 
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_court_name = ""
            include_proposer = ""
        }else if(search_type == 2){
            all_inquire = ""
            include_update_time = search_time
            include_end_update_time = search_time_end
            include_create_time = ""
            include_end_create_time = ""
            include_case = "" 
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_court_name = ""
            include_proposer = ""
        }else if(search_type == 3){
                include_case = search_val
                all_inquire = ""
                include_create_time = ""
                include_update_time = ""
                include_end_create_time = ""
                include_end_update_time = ""
                include_file_number = ""
                include_project_leader = ""
                include_undertaker = ""
                include_by_executor = ""
                include_court_name = ""
                include_proposer = ""
        }else if(search_type == 4){
            include_court_name = search_val
            include_case = ""
            all_inquire = ""
            include_create_time = ""
            include_update_time = ""
            include_end_create_time = ""
            include_end_update_time = ""
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_proposer = ""
        }else if(search_type == 5){
            include_proposer = search_val
            include_case = ""
            all_inquire = ""
            include_create_time = ""
            include_update_time = ""
            include_end_create_time = ""
            include_end_update_time = ""
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_court_name = ""
        }else if(search_type == 6){
            include_by_executor = search_val
            include_proposer = ""
            include_case = ""
            all_inquire = ""
                include_create_time = ""
                include_update_time = ""
                include_end_create_time = ""
                include_end_update_time = ""
            sort_update_time = ""
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_court_name = ""

        }else if(search_type == 7){
            include_undertaker = search_val
            include_by_executor = ""
            include_proposer = ""
            include_case = ""
            all_inquire = ""
            include_create_time = ""
            include_update_time = ""
            include_end_create_time = ""
            include_end_update_time = ""
            sort_update_time = ""
            include_file_number = ""
            include_project_leader = ""
            include_court_name = ""

        }else if(search_type == 8){
            include_project_leader = search_val
            include_undertaker = ""
            include_by_executor = ""
            include_proposer = ""
            include_case = ""
            all_inquire = ""
                include_create_time = ""
                include_update_time = ""
                include_end_create_time = ""
                include_end_update_time = ""
            sort_update_time = ""
            include_file_number = ""
            include_court_name = ""

        }else if(search_type == 9){
            include_file_number = search_val
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_proposer = ""
            include_case = ""
            all_inquire = ""
            include_create_time = ""
            include_update_time = ""
            include_end_create_time = ""
            include_end_update_time = ""
            sort_update_time = ""
            include_court_name = ""

        }
        // console.log(search_type)
        // console.log(include_create_time)
        // console.log(include_end_create_time)
        // console.log(include_update_time)
        // console.log(include_end_update_time)
        form_data.append('user_name',admin_name)
        form_data.append('page',page)
        form_data.append('limits',limit)
        form_data.append('sort_create_time',sort_create_time)
        form_data.append('include_case',include_case)
        form_data.append('include_file_number',include_file_number)
        form_data.append('include_project_leader',include_project_leader)
        form_data.append('include_undertaker',include_undertaker)
        form_data.append('include_by_executor',include_by_executor)
        form_data.append('include_court_name',include_court_name)
        form_data.append('include_proposer',include_proposer)
        form_data.append('all_inquire',all_inquire)
        form_data.append('include_create_time',include_create_time)
        form_data.append('include_end_create_time',include_end_create_time)
        form_data.append('user_grade',user_grader)
      
        $.ajax({
            url:"/auction/inquire_case/",
            type:'POST',
            data:form_data,
            processData: false,  // tell jquery not to process the data
            contentType: false, 
            success:function(res){
                $(".tbContent").children().remove()
                // console.log(res)
                //循环加入数据
                let firlist = res.enMessage
                for(let ii of firlist){
                    let f_team = ii.team
                    let f_team_list = []
                    let c_Status
                    if(ii.case_status == 1){
                        c_Status = "已完成"
                    }else{
                        c_Status = "进行中"
                    }
                    for(bb of f_team){
                        f_team_list.push(bb.team_name)
                    }
                    let top_tr = `
                    <tr class="object_join_tr top_first">
                    
                    <td>
                        <input type="checkbox" class="dl-choose" name="dl-choose">
                    </td>
                    <td class="uuid">${ii.lawCase_uuid}</td>
                    <td class="object_join_a"> <button class="top_button">置顶</button> ${ii.create_time}</td>
                    <td class="object_join_a">${ii.last_updateTime}</td>
                    <td class="object_join_a">${ii.law_case}</td>
                    <td class="object_join_a">${ii.court_name}</td>
                    <td class="object_join_a">${ii.proposer}</td>
                    <td class="object_join_a">${ii.executor}</td>
                    <td class="object_join_a">${ii.undertaker}</td>
                    <td class="object_join_a">${ii.object_num}</td>
                    <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>

                    <td class="object_join_a">${f_team_list.join("")}</td>
                    <td class="object_join_a">${ii.project_leader}</td>
                    <td class="object_join_a">${ii.file_number}</td>
                    <td>
                    <button class="no_top"><img src="/static/img/no_top.png" alt=""><span class="q_span">取消置顶</span></button>
                    <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                    <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                   </td>
                    </a>
                </tr>`
                $(".tbContent").append(top_tr)

                }
                let  tablelist = res.data;
                for(let ii of tablelist){
                    let team = ii.team
                    let team_list = []
                    let c_Status
                    if(ii.case_status == 1){
                        c_Status = "已完成"
                    }else{
                        c_Status = "进行中"
                    }
                    for(let aa of team){
                        team_list.push(aa.team_name)
                    }
                    let table_content = `
                      <tr class="object_join_tr">
                      <td>
                          <input type="checkbox" class="dl-choose" name="dl-choose">
                      </td>
                      <td class="uuid">${ii.lawCase_uuid}</td>
                      <td class="object_join_a">${ii.create_time}</td>
                      <td class="object_join_a">${ii.last_updateTime}</td>
                      <td class="object_join_a">${ii.law_case}</td>
                      <td class="object_join_a">${ii.court_name}</td>
                      <td class="object_join_a">${ii.proposer}</td>
                      <td class="object_join_a">${ii.executor}</td>
                      <td class="object_join_a">${ii.undertaker}</td>
                      <td class="object_join_a">${ii.object_num}</td>
                      <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>

                      <td class="object_join_a">${team_list.join("")}</td>
                      <td class="object_join_a">${ii.project_leader}</td>
                      <td class="object_join_a">${ii.file_number}</td>
                      <td>
                      <button class="top"><img src="/static/img/top.png" alt=""><span class="zhi_span">置顶</span></button>
                      <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                      <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                     </td>
                      </a>
                  </tr>
                  `
                    $(".tbContent").append(table_content)
                }   

            }
        })
        .then(()=>{
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
                      let  page= index;
                      let limit = pageSize;
                      let admin_name = $("#username").text()
                      let sort_create_time = 1
                      let form_data = new FormData()
                      let search_type = $(".search_type").val()
                      let search_val = $(".search_input_case").val()
                      let search_time = $(".search_time").val()
                      let search_time_end = $(".search_time_end").val()
                      let include_create_time,
                      include_update_time,
                     include_end_create_time,
                     include_end_update_time,
                     include_case,
                     all_inquire,
                     include_file_number,
                     include_project_leader,
                     include_undertaker,
                     include_by_executor,
                     include_court_name,
                     include_proposer;
                         if(search_type == 0){
                             all_inquire = search_val
                             include_create_time = ""
                             include_update_time = ""
                             include_end_create_time = ""
                             include_end_update_time = ""
                             include_case = "" 
                             include_file_number = ""
                             include_project_leader = ""
                             include_undertaker = ""
                             include_by_executor = ""
                             include_court_name = ""
                             include_proposer = ""
             
                         }else if(search_type == 1){
                         all_inquire = ""
                         include_create_time = search_time
                         include_end_create_time = search_time_end
                         include_update_time = ""
                         include_end_update_time = ""
                         include_case = "" 
                         include_file_number = ""
                         include_project_leader = ""
                         include_undertaker = ""
                         include_by_executor = ""
                         include_court_name = ""
                         include_proposer = ""
                     }else if(search_type == 2){
                         all_inquire = ""
                         include_update_time = search_time
                         include_end_update_time = search_time_end
                         include_create_time = ""
                         include_end_create_time = ""
                         include_case = "" 
                         include_file_number = ""
                         include_project_leader = ""
                         include_undertaker = ""
                         include_by_executor = ""
                         include_court_name = ""
                         include_proposer = ""
                     }else if(search_type == 3){
                             include_case = search_val
                             all_inquire = ""
                             include_create_time = ""
                             include_update_time = ""
                             include_end_create_time = ""
                             include_end_update_time = ""
                             include_file_number = ""
                             include_project_leader = ""
                             include_undertaker = ""
                             include_by_executor = ""
                             include_court_name = ""
                             include_proposer = ""
                     }else if(search_type == 4){
                         include_court_name = search_val
                         include_case = ""
                         all_inquire = ""
                         include_create_time = ""
                         include_update_time = ""
                         include_end_create_time = ""
                         include_end_update_time = ""
                         include_file_number = ""
                         include_project_leader = ""
                         include_undertaker = ""
                         include_by_executor = ""
                         include_proposer = ""
                     }else if(search_type == 5){
                         include_proposer = search_val
                         include_case = ""
                         all_inquire = ""
                         include_create_time = ""
                         include_update_time = ""
                         include_end_create_time = ""
                         include_end_update_time = ""
                         include_file_number = ""
                         include_project_leader = ""
                         include_undertaker = ""
                         include_by_executor = ""
                         include_court_name = ""
                     }else if(search_type == 6){
                         include_by_executor = search_val
                         include_proposer = ""
                         include_case = ""
                         all_inquire = ""
                             include_create_time = ""
                             include_update_time = ""
                             include_end_create_time = ""
                             include_end_update_time = ""
                         sort_update_time = ""
                         include_file_number = ""
                         include_project_leader = ""
                         include_undertaker = ""
                         include_court_name = ""
             
                     }else if(search_type == 7){
                         include_undertaker = search_val
                         include_by_executor = ""
                         include_proposer = ""
                         include_case = ""
                         all_inquire = ""
                         include_create_time = ""
                         include_update_time = ""
                         include_end_create_time = ""
                         include_end_update_time = ""
                         sort_update_time = ""
                         include_file_number = ""
                         include_project_leader = ""
                         include_court_name = ""
             
                     }else if(search_type == 8){
                         include_project_leader = search_val
                         include_undertaker = ""
                         include_by_executor = ""
                         include_proposer = ""
                         include_case = ""
                         all_inquire = ""
                             include_create_time = ""
                             include_update_time = ""
                             include_end_create_time = ""
                             include_end_update_time = ""
                         sort_update_time = ""
                         include_file_number = ""
                         include_court_name = ""
             
                     }else if(search_type == 9){
                         include_file_number = search_val
                         include_project_leader = ""
                         include_undertaker = ""
                         include_by_executor = ""
                         include_proposer = ""
                         include_case = ""
                         all_inquire = ""
                         include_create_time = ""
                         include_update_time = ""
                         include_end_create_time = ""
                         include_end_update_time = ""
                         sort_update_time = ""
                         include_court_name = ""
             
                     }
                    //   console.log(search_time)
                    //   console.log(search_time_end)
                      form_data.append('user_name',admin_name)
                      form_data.append('page',page)
                      form_data.append('limit',limit)
                      form_data.append('sort_create_time',sort_create_time)
                      form_data.append('include_case',include_case)
                      form_data.append('include_file_number',include_file_number)
                      form_data.append('include_project_leader',include_project_leader)
                      form_data.append('include_undertaker',include_undertaker)
                      form_data.append('include_by_executor',include_by_executor)
                      form_data.append('include_court_name',include_court_name)
                      form_data.append('include_proposer',include_proposer)
                      form_data.append('all_inquire',all_inquire)
                      form_data.append('include_create_time',include_create_time)
                      form_data.append('include_end_create_time',include_end_create_time)
                      form_data.append('include_end_create_time',include_end_create_time)
                      form_data.append('include_end_update_time',include_end_update_time)
                      form_data.append('user_grade',user_grader)
                      $.ajax({
                      url:"/auction/inquire_case/",
                      type:'POST',
                      data:form_data,
                      processData: false,  // tell jquery not to process the data
                      contentType: false, 
                      success:function(res){
                          $(".tbContent").children().remove()
                          console.log(res)
                          //循环加入数据
                          if(page == 1){
                            let firlist = res.enMessage
                            for(let ii of firlist){
                                let f_team = ii.team
                                let f_team_list = []
                                let c_Status
                                if(ii.case_status == 1){
                                    c_Status = "已完成"
                                }else{
                                    c_Status = "进行中"
                                }
                                for(bb of f_team){
                                    f_team_list.push(bb.team_name)
                                }
                                let top_tr = `
                                <tr class="object_join_tr top_first">
                                
                                <td>
                                    <input type="checkbox" class="dl-choose" name="dl-choose">
                                </td>
                                <td class="uuid">${ii.lawCase_uuid}</td>
                                <td class="object_join_a"> <button class="top_button">置顶</button> ${ii.create_time}</td>
                                <td class="object_join_a">${ii.last_updateTime}</td>
                                <td class="object_join_a">${ii.law_case}</td>
                                <td class="object_join_a">${ii.court_name}</td>
                                <td class="object_join_a">${ii.proposer}</td>
                                <td class="object_join_a">${ii.executor}</td>
                                <td class="object_join_a">${ii.undertaker}</td>
                                <td class="object_join_a">${ii.object_num}</td>
                                <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>
            
                                <td class="object_join_a">${f_team_list.join("")}</td>
                                <td class="object_join_a">${ii.project_leader}</td>
                                <td class="object_join_a">${ii.file_number}</td>
                                <td>
                                <button class="no_top"><img src="/static/img/no_top.png" alt=""><span class="q_span">取消置顶</span></button>
                                <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                                <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                               </td>
                                </a>
                            </tr>`
                            $(".tbContent").append(top_tr)
            
                            }
                          }
                          let  tablelist = res.data;
                          for(let ii of tablelist){
                              let team = ii.team
                              let team_list = []
                              let c_Status
                              if(ii.case_status == 1){
                                  c_Status = "已完成"
                              }else{
                                  c_Status = "进行中"
                              }
                              for(let aa of team){
                                  team_list.push(aa.team_name)
                              }
                              let table_content = `
                                <tr class="object_join_tr">
                                <td>
                                    <input type="checkbox" class="dl-choose" name="dl-choose">
                                </td>
                                <td class="uuid">${ii.lawCase_uuid}</td>
                                <td class="object_join_a">${ii.create_time}</td>
                                <td class="object_join_a">${ii.last_updateTime}</td>
                                <td class="object_join_a">${ii.law_case}</td>
                                <td class="object_join_a">${ii.court_name}</td>
                                <td class="object_join_a">${ii.proposer}</td>
                                <td class="object_join_a">${ii.executor}</td>
                                <td class="object_join_a">${ii.undertaker}</td>
                                <td class="object_join_a">${ii.object_num}</td>
                                <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>

                                <td class="object_join_a">${team_list.join("")}</td>
                                <td class="object_join_a">${ii.project_leader}</td>
                                <td class="object_join_a">${ii.file_number}</td>
                                <td>
                                <button class="top"><img src="/static/img/top.png" alt=""><span class="zhi_span">置顶</span></button>
                                <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                                <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                               </td>
                                </a>
                            </tr>
                            `
                              $(".tbContent").append(table_content)
                          }  
                          let enmessage = $(".enmessage").text()
                          let totaltext = `
                          <div class="_counts">共 ${enmessage} 条</div>` 
                          $("._count").after(totaltext)    
                      }
                  })
              
            
                }
            })
            $(".c_time_up").css({
                display:"none"
            })
            $(".c_time_down").css({
                display:"block"
            })
       
        })
        .then(()=>{
            let enmessage = $(".enmessage").text()
         let totaltext = `
         <div class="_counts">共 ${enmessage} 条</div>` 
         $("._count").after(totaltext)
 
        })




    })
    // 降序
    $(".c_time_down").click(function(){
        let page = $("._active_1").text()
        let limit = $("._sizes_select_active").text().slice(0,2)
        let admin_name = $("#username").text()
        let search_time = $(".search_time").val()
        let search_time_end = $(".search_time_end").val()
        let search_type = $(".search_type").val()
        let search_val = $(".search_input_case").val()
        let form_data = new FormData()
        
        let include_case,
            all_inquire,
            include_file_number,
            include_project_leader,
            include_undertaker,
            include_by_executor,
            include_court_name,
            include_proposer,
            include_end_create_time,
            include_end_update_time,
            include_create_time,
            include_update_time;
            if(search_type == 0){
                all_inquire = search_val
                include_create_time = ""
                include_update_time = ""
                include_end_create_time = ""
                include_end_update_time = ""
                include_case = "" 
                include_file_number = ""
                include_project_leader = ""
                include_undertaker = ""
                include_by_executor = ""
                include_court_name = ""
                include_proposer = ""

            }else if(search_type == 1){
            all_inquire = ""
            include_create_time = search_time
            include_end_create_time = search_time_end
            include_update_time = ""
            include_end_update_time = ""
            include_case = "" 
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_court_name = ""
            include_proposer = ""
        }else if(search_type == 2){
            all_inquire = ""
            include_update_time = search_time
            include_end_update_time = search_time_end
            include_create_time = ""
            include_end_create_time = ""
            include_case = "" 
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_court_name = ""
            include_proposer = ""
        }else if(search_type == 3){
            include_case = search_val
                all_inquire = ""
                include_create_time = ""
                include_update_time = ""
                include_end_create_time = ""
                include_end_update_time = ""
                include_file_number = ""
                include_project_leader = ""
                include_undertaker = ""
                include_by_executor = ""
                include_court_name = ""
                include_proposer = ""
        }else if(search_type == 4){
            include_court_name = search_val
            include_case = ""
            all_inquire = ""
            include_create_time = ""
            include_update_time = ""
            include_end_create_time = ""
            include_end_update_time = ""
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_proposer = ""
        }else if(search_type == 5){
            include_proposer = search_val
            include_case = ""
            all_inquire = ""
            include_create_time = ""
            include_update_time = ""
            include_end_create_time = ""
            include_end_update_time = ""
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_court_name = ""
        }else if(search_type == 6){
            include_by_executor = search_val
            include_proposer = ""
            include_case = ""
            all_inquire = ""
                include_create_time = ""
                include_update_time = ""
                include_end_create_time = ""
                include_end_update_time = ""
            sort_update_time = ""
            include_file_number = ""
            include_project_leader = ""
            include_undertaker = ""
            include_court_name = ""

        }else if(search_type == 7){
            include_undertaker = search_val
            include_by_executor = ""
            include_proposer = ""
            include_case = ""
            all_inquire = ""
            include_create_time = ""
            include_update_time = ""
            include_end_create_time = ""
            include_end_update_time = ""
            sort_update_time = ""
            include_file_number = ""
            include_project_leader = ""
            include_court_name = ""

        }else if(search_type == 8){
            include_project_leader = search_val
            include_undertaker = ""
            include_by_executor = ""
            include_proposer = ""
            include_case = ""
            all_inquire = ""
                include_create_time = ""
                include_update_time = ""
                include_end_create_time = ""
                include_end_update_time = ""
            sort_update_time = ""
            include_file_number = ""
            include_court_name = ""

        }else if(search_type == 9){
            include_file_number = search_val
            include_project_leader = ""
            include_undertaker = ""
            include_by_executor = ""
            include_proposer = ""
            include_case = ""
            all_inquire = ""
            include_create_time = ""
            include_update_time = ""
            include_end_create_time = ""
            include_end_update_time = ""
            sort_update_time = ""
            include_court_name = ""

        }
        form_data.append('user_name',admin_name)
        form_data.append('page',page)
        form_data.append('limits',limit)
        form_data.append('include_create_time',include_create_time)
        form_data.append('include_update_time',include_update_time)
        form_data.append('include_case',include_case)
        form_data.append('include_file_number',include_file_number)
        form_data.append('include_project_leader',include_project_leader)
        form_data.append('include_undertaker',include_undertaker)
        form_data.append('include_by_executor',include_by_executor)
        form_data.append('include_court_name',include_court_name)
        form_data.append('include_proposer',include_proposer)
        form_data.append('all_inquire',all_inquire)
        form_data.append('include_end_create_time',include_end_create_time)
        form_data.append('include_end_update_time',include_end_update_time)
        form_data.append('user_grade',user_grader)
        state = 2
        $.ajax({
            url:"/auction/inquire_case/",
            type:'POST',
            data:form_data,
            processData: false,  // tell jquery not to process the data
            contentType: false, 
            success:function(res){
                // console.log(res)
                $(".tbContent").children().remove()
                // console.log(res)
                //循环加入数据
                let firlist = res.enMessage
                for(let ii of firlist){
                    let f_team = ii.team
                    let f_team_list = []
                    let c_Status
                    if(ii.case_status == 1){
                        c_Status = "已完成"
                    }else{
                        c_Status = "进行中"
                    }
                    for(bb of f_team){
                        f_team_list.push(bb.team_name)
                    }
                    let top_tr = `
                    <tr class="object_join_tr top_first">
                    
                    <td>
                        <input type="checkbox" class="dl-choose" name="dl-choose">
                    </td>
                    <td class="uuid">${ii.lawCase_uuid}</td>
                    <td class="object_join_a"> <button class="top_button">置顶</button> ${ii.create_time}</td>
                    <td class="object_join_a">${ii.last_updateTime}</td>
                    <td class="object_join_a">${ii.law_case}</td>
                    <td class="object_join_a">${ii.court_name}</td>
                    <td class="object_join_a">${ii.proposer}</td>
                    <td class="object_join_a">${ii.executor}</td>
                    <td class="object_join_a">${ii.undertaker}</td>
                    <td class="object_join_a">${ii.object_num}</td>
                    <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>

                    <td class="object_join_a">${f_team_list.join("")}</td>
                    <td class="object_join_a">${ii.project_leader}</td>
                    <td class="object_join_a">${ii.file_number}</td>
                    <td>
                    <button class="no_top"><img src="/static/img/no_top.png" alt=""><span class="q_span">取消置顶</span></button>
                    <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                    <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                   </td>
                    </a>
                </tr>`
                $(".tbContent").append(top_tr)

                }
                let  tablelist = res.data;
                for(let ii of tablelist){
                    let team = ii.team
                    let team_list = []
                    let c_Status
                    if(ii.case_status == 1){
                        c_Status = "已完成"
                    }else{
                        c_Status = "进行中"
                    }
                    for(let aa of team){
                        team_list.push(aa.team_name)
                    }
                    let table_content = `
                      <tr class="object_join_tr">
                      <td>
                          <input type="checkbox" class="dl-choose" name="dl-choose">
                      </td>
                      <td class="uuid">${ii.lawCase_uuid}</td>
                      <td class="object_join_a">${ii.create_time}</td>
                      <td class="object_join_a">${ii.last_updateTime}</td>
                      <td class="object_join_a">${ii.law_case}</td>
                      <td class="object_join_a">${ii.court_name}</td>
                      <td class="object_join_a">${ii.proposer}</td>
                      <td class="object_join_a">${ii.executor}</td>
                      <td class="object_join_a">${ii.undertaker}</td>
                      <td class="object_join_a">${ii.object_num}</td>
                      <td class="object_join_a  ${ii.case_status == '1'?'success':'primary'}">${c_Status}</td>

                      <td class="object_join_a">${team_list.join("")}</td>
                      <td class="object_join_a">${ii.project_leader}</td>
                      <td class="object_join_a">${ii.file_number}</td>
                      <td>
                        <button class="top"><img src="/static/img/top.png" alt=""><span class="zhi_span">置顶</span></button>
                        <button class="c_jie" style="display:${ii.case_status =="0"?'display':'none'}"><img src="/static/img/pai.png" alt=""><span class="jie_case">结案</span></button>
                        <button class="c_no_jie" style="display:${ii.case_status =="1"?'display':'none'}"><img src="/static/img/no_pai.png" alt=""><span class="q_case">取消结案</span></button>
                       </td>
                      </a>
                  </tr>
                  `
                    $(".tbContent").append(table_content)
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
                      let  page= index;
                      let limit = pageSize;
                      let admin_name = $("#username").text()
                    //   let sort_create_time = 1
                      let form_data = new FormData()
                      let search_time = $(".search_time").val()
                      let search_time_end = $(".search_time_end").val()
                      let search_type = $(".search_type").val()
                      let search_val = $(".search_input_case").val()
                   let  include_case,
                      all_inquire,
                      include_file_number,
                      include_project_leader,
                      include_undertaker,
                      include_by_executor,
                      include_court_name,
                      include_create_time,
                      include_update_time,
                      include_end_update_time,
                      include_end_create_time
                      include_proposer;
                      if(search_type == 0){
                          all_inquire = search_val
                          include_create_time = ""
                          include_update_time = ""
                          include_end_create_time = ""
                          include_end_update_time = ""
                          include_case = "" 
                          include_file_number = ""
                          include_project_leader = ""
                          include_undertaker = ""
                          include_by_executor = ""
                          include_court_name = ""
                          include_proposer = ""
              
                      }else if(search_type == 1){
                      all_inquire = ""
                      include_create_time = search_time
                      include_end_create_time = search_time_end
                      include_update_time = ""
                      include_end_update_time = ""
                      include_case = "" 
                      include_file_number = ""
                      include_project_leader = ""
                      include_undertaker = ""
                      include_by_executor = ""
                      include_court_name = ""
                      include_proposer = ""
                  }else if(search_type == 2){
                       all_inquire = ""
                       include_update_time = search_time
                       include_end_update_time = search_time_end
                       include_create_time = ""
                       include_end_create_time = ""
                       include_case = "" 
                       include_file_number = ""
                       include_project_leader = ""
                       include_undertaker = ""
                       include_by_executor = ""
                       include_court_name = ""
                       include_proposer = ""
                  }else if(search_type == 3){
                         include_case = search_val
                          all_inquire = ""
                          include_create_time = ""
                          include_update_time = ""
                          include_end_create_time = ""
                          include_end_update_time = ""
                          include_file_number = ""
                          include_project_leader = ""
                          include_undertaker = ""
                          include_by_executor = ""
                          include_court_name = ""
                          include_proposer = ""
                  }else if(search_type == 4){
                      include_court_name = search_val
                      include_case = ""
                      all_inquire = ""
                      include_create_time = ""
                      include_update_time = ""
                      include_end_create_time = ""
                      include_end_update_time = ""
                      include_file_number = ""
                      include_project_leader = ""
                      include_undertaker = ""
                      include_by_executor = ""
                      include_proposer = ""
                  }else if(search_type == 5){
                      include_proposer = search_val
                      include_case = ""
                      all_inquire = ""
                      include_create_time = ""
                      include_update_time = ""
                      include_end_create_time = ""
                      include_end_update_time = ""
                      include_file_number = ""
                      include_project_leader = ""
                      include_undertaker = ""
                      include_by_executor = ""
                      include_court_name = ""
                  }else if(search_type == 6){
                      include_by_executor = search_val
                      include_proposer = ""
                      include_case = ""
                      all_inquire = ""
                          include_create_time = ""
                          include_update_time = ""
                          include_end_create_time = ""
                          include_end_update_time = ""
                      sort_update_time = ""
                      include_file_number = ""
                      include_project_leader = ""
                      include_undertaker = ""
                      include_court_name = ""
              
                  }else if(search_type == 7){
                      include_undertaker = search_val
                      include_by_executor = ""
                      include_proposer = ""
                      include_case = ""
                      all_inquire = ""
                      include_create_time = ""
                      include_update_time = ""
                      include_end_create_time = ""
                      include_end_update_time = ""
                      sort_update_time = ""
                      include_file_number = ""
                      include_project_leader = ""
                      include_court_name = ""
              
                  }else if(search_type == 8){
                      include_project_leader = search_val
                      include_undertaker = ""
                      include_by_executor = ""
                      include_proposer = ""
                      include_case = ""
                      all_inquire = ""
                          include_create_time = ""
                          include_update_time = ""
                          include_end_create_time = ""
                          