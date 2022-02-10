(function(){
      let obj_List = [] 
      var fastTime = {
            true: {
                4: { // 双日历天、小时的快速选择格式
                    '最近7天': { startTime: moment().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().format('YYYY-MM-DD HH:mm:ss') },
                    '最近一个月': { startTime: moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().format('YYYY-MM-DD HH:mm:ss') },
                    '最近三个月': { startTime: moment().subtract(3, 'month').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().format('YYYY-MM-DD HH:mm:ss') }
                },
                5: { // 双日历天、小时的快速选择格式
                    '最近7天': { startTime: moment().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().format('YYYY-MM-DD HH:mm:ss') },
                    '最近一个月': { startTime: moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().format('YYYY-MM-DD HH:mm:ss') },
                    '最近三个月': { startTime: moment().subtract(3, 'month').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().format('YYYY-MM-DD HH:mm:ss') }
                },
                6: { // 双日历周的快速选择格式
                    '本周': { startTime: moment().startOf('week').subtract(0, 'week').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('week').format('YYYY-MM-DD HH:mm:ss') },
                    '最近2周': { startTime: moment().startOf('week').subtract(2, 'week').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('week').format('YYYY-MM-DD HH:mm:ss') },
                    '最近4周': { startTime: moment().startOf('week').subtract(4, 'week').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('week').format('YYYY-MM-DD HH:mm:ss') },
                    '最近8周': { startTime: moment().startOf('week').subtract(8, 'week').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('week').format('YYYY-MM-DD HH:mm:ss') },
                },
                7: { // 双日历月的快速选择格式
                    "本月": { startTime: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss') },
                    "本年": { startTime: moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss') },
                    "最近六个月": { startTime: moment().startOf('month').subtract(6, 'month').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss') }
                },
                8: { // 双日历季的快速选择格式
                    "本季度": { startTime: moment().startOf('quarter').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('quarter').format('YYYY-MM-DD HH:mm:ss') },
                    "今年至今": { startTime: moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('quarter').format('YYYY-MM-DD HH:mm:ss') },
                    "上一季度": { startTime: moment().subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD HH:mm:ss') }
                },
                9: { // 双日历年的快速选择格式
                    "今年": { startTime: moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('year').format('YYYY-MM-DD HH:mm:ss') },
                    "近一年": { startTime: moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('year').format('YYYY-MM-DD HH:mm:ss') },
                    "近二年": { startTime: moment().subtract(2, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('year').format('YYYY-MM-DD HH:mm:ss') },
                    "近十一年": { startTime: moment().subtract(11, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss'), endTime: moment().endOf('year').format('YYYY-MM-DD HH:mm:ss') }
                }
            },
            false: {
                4: {  // 单日历天和小时的快速时间选择格式
                    '今天': { startTime: moment().format('YYYY-MM-DD HH:mm:ss') },
                    '昨天': { startTime: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss') },
                    '一周前': { startTime: moment().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss') },
                },
                5: {  // 单日历天和小时的快速时间选择格式
                    '今天': { startTime: moment().format('YYYY-MM-DD HH:mm:ss') },
                    '昨天': { startTime: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss') },
                    '一周前': { startTime: moment().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss') },
                },
                6: { // 单日历周的快速选择格式
                    '本周': { startTime: moment().startOf('week').subtract(0, 'week').format('YYYY-MM-DD HH:mm:ss') },
                    '上一周': { startTime: moment().startOf('week').subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss') },
                    '上二周': { startTime: moment().startOf('week').subtract(2, 'week').format('YYYY-MM-DD HH:mm:ss') },
                },
                7: {  // 单选日历月的快速时间选择格式
                    '当前月': { startTime: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss') },
                    '一个月前': { startTime: moment().startOf('month').subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss') },
                    '半年前': { startTime: moment().startOf('month').subtract(6, 'month').format('YYYY-MM-DD HH:mm:ss') },
                    '一年前': { startTime: moment().startOf('month').subtract(12, 'month').format('YYYY-MM-DD HH:mm:ss') },
                },
                8: {  // 单选日历季的快速时间选择格式
                    '本季度': { startTime: moment().startOf('quarter').format('YYYY-MM-DD HH:mm:ss') },
                    '上一季度': { startTime: moment().startOf('quarter').subtract(1, 'quarter').format('YYYY-MM-DD HH:mm:ss') },
                    '上二季度': { startTime: moment().startOf('quarter').subtract(2, 'quarter').format('YYYY-MM-DD HH:mm:ss') },
                },
                9: {  // 单选日历年的快速时间选择格式
                    '今年': { startTime: moment().startOf('year').format('YYYY-MM-DD HH:mm:ss') },
                    '去年': { startTime: moment().startOf('year').subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss') },
                    '前年': { startTime: moment().startOf('year').subtract(2, 'year').format('YYYY-MM-DD HH:mm:ss') },
                },
            }
    
        }
    
        $('.wrap').on('click', function () {
            var _this = this;
            var reportTimeType = 4;
            var double = true;
            if (!$(this).next('[name="datePicker"]').length) {
                $(this).after("<div class='datePicker-x' name='datePicker'></div>");
                datePicker = $('.datePicker-x').datePicker({
                    reportTimeType: reportTimeType, // 4代表小时、5代表天、6代表周、7代表月、8代表季、9代表年
                    startDom: $(_this).find('input[name="startTime"]'),  // 开始时间要赋值的DOM元素
                    endDom: $(_this).find('input[name="endTime"]'),  // 结束时间要赋值的DOM元素
                    format: 'YYYY-MM-DD HH:mm:ss',
                    fastTime: fastTime[double][reportTimeType], // 快速选择的时间
                    isFast: true,   // 是否显示快速选择的选项
                    isDouble: double,   // 是否双选择的日历
                    disabledDate: false,    // 是否禁用以后的时间
                    yes: function (startTime, endTime) {    // 成功赋值前的回调可改变赋值的时间格式
                    },
                });
            } else {
                if ($(this).next('[name="datePicker"]').hasClass('hide')) {
                    $(this).next('[name="datePicker"]').removeClass('hide');
                    datePicker.render();
                } else {
                    $(this).next('[name="datePicker"]').addClass('hide');
    
                }
            }
    
    
    
        });
    
    var admin_name = $("#username").text()
    let limits = 10;
    let pages = 1
    let form_data = new FormData()
        form_data.append('page',pages)
        form_data.append('limit',limits)
    $.ajax({
        url:"/auction/all/object/web/",
        type:'POST',
        data:form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false,
        success:function(res){
            console.log(res)
            let object_lists = res.data
            $(".count_num").text(res.count)
            for(let ii of object_lists){
                  let  start_price = ''
                  if(ii.starting_price == null){
                        start_price = ''
                  }else{
                        start_price = ii.starting_price
                  }
                  obj_List.push(ii.ObjFeeBased_id)
                let objectlist =
                ` <tr class="objectx_join_tr">
                <td class="all-choose">
                <input type="checkbox" class="object_dl-choose" name="dl-choose">
                </td>
                <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                <td class="objectx_join">${rTime(ii.create_time)}</td>
                <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                <td class="objectx_join">${ii.name}</td>
                <td class="objectx_join">${ii.team}</td>
                <td class="objectx_join">${ii.object_name}</td>
                <td class="objectx_join">${ii.entrusting_party}</td>
                <td class="objectx_join">${ii.business_type}</td>
                <td class="objectx_join">${ii.object_location}</td>
                <td class="object_type objectx_join">${ii.property_type}</td>
                <td class="objectx_join">${ii.estimated_price}</td>
                <td  class="objectx_join">${ii.auction_state}</td>
                <td  class="objectx_join">${ii.auction_platform}</td>
                <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                <td  class="objectx_join">${rTime(ii.start_time)}</td>
                <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                <td  class="objectx_join">${start_price}</td>
                <td class="objectx_join">${ii.appraisal_price}</td>
                <td class="objectx_join">${ii.after_state}</td>
                <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                <td class="objectx_join">${ii.premium_rate}</td>
               <td class="objectx_join">${ii.receivable_serviceCharge}</td>
               <td class="objectx_join">${ii.received_serviceCharge}</td>
               <td class="objectx_join">${ii.object_note}</td>                                         
          </tr>
            `                           
        $(".tbContent").append(objectlist)
      
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
                console.log(admin_name)
                let limits = pageSize;
                let pages = index
                console.log(limits,pages)
                let form_data = new FormData()
                  //   form_data.append('user_name',admin_name)
                    form_data.append('page',pages)
                    form_data.append('limit',limits)
                  //   form_data.append('user_grade',user_grader)
                $.ajax({
                    url:"/auction/all/object/web/",
                    type:'POST',
                    data:form_data,
                    processData: false,  // tell jquery not to process the data
                    contentType: false,
                    success:function(res){
                        $(".tbContent").children().remove()
                        console.log(res)
                        let object_lists = res.data
                        obj_List = [] 
                        for(let ii of object_lists){
                              let  start_price = ''
                              if(ii.starting_price == null){
                                    start_price = ''
                              }else{
                                    start_price = ii.starting_price
                              }
                              obj_List.push(ii.ObjFeeBased_id)
                              let objectlist =
                              ` <tr class="objectx_join_tr">
                              <td class="all-choose">
                              <input type="checkbox" class="object_dl-choose" name="dl-choose">
                              </td>
                              <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                              <td class="objectx_join">${rTime(ii.create_time)}</td>
                              <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                              <td class="objectx_join">${ii.name}</td>
                              <td class="objectx_join">${ii.team}</td>
                              <td class="objectx_join">${ii.object_name}</td>
                              <td class="objectx_join">${ii.entrusting_party}</td>
                              <td class="objectx_join">${ii.business_type}</td>
                              <td class="objectx_join">${ii.object_location}</td>
                              <td class="object_type objectx_join">${ii.property_type}</td>
                              <td class="objectx_join">${ii.estimated_price}</td>
                              <td  class="objectx_join">${ii.auction_state}</td>
                              <td  class="objectx_join">${ii.auction_platform}</td>
                              <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                              <td  class="objectx_join">${rTime(ii.start_time)}</td>
                              <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                              <td  class="objectx_join">${ii.starting_price}</td>
                              <td class="objectx_join">${ii.appraisal_price}</td>
                              <td class="objectx_join">${ii.after_state}</td>
                              <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                              <td class="objectx_join">${ii.premium_rate}</td>
                             <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                             <td class="objectx_join">${ii.received_serviceCharge}</td>
                             <td class="objectx_join">${ii.object_note}</td>                                         
                        </tr>
                          `                           
                      $(".tbContent").append(objectlist)
                    
                          }
                    
                    
                    }
                })
          
        
            }
            
            
        })
    })   
    // 点击进入标的详情页
    $("body").on("click",".objectx_join",function(){
        let object_uuid = $(this).parent().children("td.object_uuid").text()
      //   console.log(object_uuid)
        window.location.href = "/auction/object/info/?object_uuid="+object_uuid;

     })
   $(".clear").click(function(){
      //    location.reload()
     
      console.log(target)
      if(target == "false"){
       $(".index_open").trigger('click');
      }
  
       $(".team").val("")
       $(".name").val("")
       $(".business_type_search").val(0)//业务类型
       $(".property_type_search").val(0)//资产类型
       $(".estimated_price_search").val(0)//资产规模     
       $(".auction_state").val(0)
       $(".auction_platform").val(0)
       $(".start_time").val("")
       $(".end_time").val("")  
       $(".c_time_up_icon").css({
           opacity: 1
       })
       $(".u_time_up_cion").css({
            opacity: 0
       })
      let limits = 10;
      let pages = 1
      let form_data = new FormData()
          form_data.append('page',pages)
          form_data.append('limit',limits)
      $.ajax({
          url:"/auction/all/object/web/",
          type:'POST',
          data:form_data,
          processData: false,  // tell jquery not to process the data
          contentType: false,
          success:function(res){
              console.log(res)
              let object_lists = res.data
              $(".count_num").text(res.count)
              $(".tbContent").children().remove()

         
              for(let ii of object_lists){
                    obj_List.push(ii.ObjFeeBased_id)
                  let objectlist =
                  ` <tr class="objectx_join_tr">
                  <td class="all-choose">
                  <input type="checkbox" class="object_dl-choose" name="dl-choose">
                  </td>
                  <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                  <td class="objectx_join">${rTime(ii.create_time)}</td>
                  <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                  <td class="objectx_join">${ii.name}</td>
                  <td class="objectx_join">${ii.team}</td>
                  <td class="objectx_join">${ii.object_name}</td>
                  <td class="objectx_join">${ii.entrusting_party}</td>
                  <td class="objectx_join">${ii.business_type}</td>
                  <td class="objectx_join">${ii.object_location}</td>
                  <td class="object_type objectx_join">${ii.property_type}</td>
                  <td class="objectx_join">${ii.estimated_price}</td>
                  <td  class="objectx_join">${ii.auction_state}</td>
                  <td  class="objectx_join">${ii.auction_platform}</td>
                  <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                  <td  class="objectx_join">${rTime(ii.start_time)}</td>
                  <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                  <td  class="objectx_join">${ii.starting_price}</td>
                  <td class="objectx_join">${ii.appraisal_price}</td>
                  <td class="objectx_join">${ii.after_state}</td>
                  <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                  <td class="objectx_join">${ii.premium_rate}</td>
                 <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                 <td class="objectx_join">${ii.received_serviceCharge}</td>
                 <td class="objectx_join">${ii.object_note}</td>                                         
            </tr>
              `                           
          $(".tbContent").append(objectlist)
        
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
                  console.log(admin_name)
                  let limits = pageSize;
                  let pages = index
                  console.log(limits,pages)
                  let form_data = new FormData()
                    //   form_data.append('user_name',admin_name)
                      form_data.append('page',pages)
                      form_data.append('limit',limits)
                    //   form_data.append('user_grade',user_grader)
                  $.ajax({
                      url:"/auction/all/object/web/",
                      type:'POST',
                      data:form_data,
                      processData: false,  // tell jquery not to process the data
                      contentType: false,
                      success:function(res){
                          $(".tbContent").children().remove()
                          console.log(res)
                          let object_lists = res.data
                          obj_List = [] 
                          for(let ii of object_lists){
                                obj_List.push(ii.ObjFeeBased_id)
                                let objectlist =
                                ` <tr class="objectx_join_tr">
                                <td class="all-choose">
                                <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                </td>
                                <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                                <td class="objectx_join">${rTime(ii.create_time)}</td>
                                <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                                <td class="objectx_join">${ii.name}</td>
                                <td class="objectx_join">${ii.team}</td>
                                <td class="objectx_join">${ii.object_name}</td>
                                <td class="objectx_join">${ii.entrusting_party}</td>
                                <td class="objectx_join">${ii.business_type}</td>
                                <td class="objectx_join">${ii.object_location}</td>
                                <td class="object_type objectx_join">${ii.property_type}</td>
                                <td class="objectx_join">${ii.estimated_price}</td>
                                <td  class="objectx_join">${ii.auction_state}</td>
                                <td  class="objectx_join">${ii.auction_platform}</td>
                                <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                                <td  class="objectx_join">${rTime(ii.start_time)}</td>
                                <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                                <td  class="objectx_join">${ii.starting_price}</td>
                                <td class="objectx_join">${ii.appraisal_price}</td>
                                <td class="objectx_join">${ii.after_state}</td>
                                <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                                <td class="objectx_join">${ii.premium_rate}</td>
                               <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                               <td class="objectx_join">${ii.received_serviceCharge}</td>
                               <td class="objectx_join">${ii.object_note}</td>                                         
                          </tr>
                            `                           
                        $(".tbContent").append(objectlist)
                      
                            }
                      
                      
                      }
                  })
            
          
              }
              
              
          })
      })  
   })
//升降序  查询

var state
$(".c_time_up").click(function(){
      $(".c_time_up").css({
            display:"none"
      })
      $(".c_time_down").css({
            display:"block"
      })
      $(".c_time_up_icon").css({
            opacity: 1
      })
      $(".c_time_down_icon").css({
            opacity: 1
      })
      $(".u_time_up_cion").css({
            opacity: 0
      })
      $(".u_time_down_cion").css({
            opacity: 0
      })
      console.log(111)
    let page = $("._active_1").text()
    let limit = $("._sizes_select_active").text().slice(0,2)
    let team = $(".team").val()
    let user_name = $(".name").val()
    let business_type = $(".business_type_search").find("option:selected").text()//业务类型
    let property_type = $(".property_type_search").find("option:selected").text()//资产类型
    let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
    let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
    let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
    let start_time = $(".start_time").val()//开拍时间
    let end_time = $(".end_time").val()//结束时间
    if(auction_state == "请选择"){
      auction_state = ""
      }
      if(auction_platform == "请选择"){
            auction_platform = ""
      }
      if(end_time == ""){
            end_time = ""
      }else{
           end_time =addDate($(".end_time").val())
      } 
       console.log(start_time)
       console.log(end_time)
    let sort_time = "create_time"
    if(business_type == "请选择"){
      business_type = ""
     }
      if(property_type == "请选择"){
            property_type = ""
      }
      if(estimated_price == "请选择"){
            estimated_price = ""
      }

    let form_data = new FormData()
    form_data.append('page',page)
    form_data.append('limit',limit)
    form_data.append('user_name',user_name)
    form_data.append('team',team)
    form_data.append('business_type',business_type)
    form_data.append('property_type',property_type)
    form_data.append('estimated_price',estimated_price)
    form_data.append('start_time',start_time)
    form_data.append('end_time',end_time)
    form_data.append('sort_time',sort_time)
    form_data.append("auction_state",auction_state)
    form_data.append("auction_platform",auction_platform)
    $.ajax({
        url:"/auction/all/object/web/",
        type:'POST',
        data:form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false, 
        success:function(res){
            $(".tbContent").children().remove()
            console.log(res)
            //循环加入数据
            let  object_lists = res.data;
            for(let ii of object_lists){
                  let  start_price = ''
                  if(ii.starting_price == null){
                        start_price = ''
                  }else{
                        start_price = ii.starting_price
                  }
                  obj_List.push(ii.ObjFeeBased_id)
                let objectlist =
                ` <tr class="objectx_join_tr">
                <td class="all-choose">
                <input type="checkbox" class="object_dl-choose" name="dl-choose">
                </td>
                <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                <td class="objectx_join">${rTime(ii.create_time)}</td>
                <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                <td class="objectx_join">${ii.name}</td>
                <td class="objectx_join">${ii.team}</td>
                <td class="objectx_join">${ii.object_name}</td>
                <td class="objectx_join">${ii.entrusting_party}</td>
                <td class="objectx_join">${ii.business_type}</td>
                <td class="objectx_join">${ii.object_location}</td>
                <td class="object_type objectx_join">${ii.property_type}</td>
                <td class="objectx_join">${ii.estimated_price}</td>
                <td  class="objectx_join">${ii.auction_state}</td>
                <td  class="objectx_join">${ii.auction_platform}</td>
                <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                <td  class="objectx_join">${rTime(ii.start_time)}</td>
                <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                <td  class="objectx_join">${start_price}</td>
                <td class="objectx_join">${ii.appraisal_price}</td>
                <td class="objectx_join">${ii.after_state}</td>
                <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                <td class="objectx_join">${ii.premium_rate}</td>
               <td class="objectx_join">${ii.receivable_serviceCharge}</td>
               <td class="objectx_join">${ii.received_serviceCharge}</td>
               <td class="objectx_join">${ii.object_note}</td>                                         
          </tr>
            `                           
        $(".tbContent").append(objectlist)
      
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

              let limits = pageSize;
              let pages = index
              let team = $(".team").val()
              let user_name = $(".name").val()
              let business_type = $(".business_type_search").find("option:selected").text()//业务类型
              let property_type = $(".property_type_search").find("option:selected").text()//资产类型
              let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
              let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
              let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
              let start_time = $(".start_time").val()//开拍时间
              let end_time = $(".end_time").val()//结束时间
              let form_data = new FormData()
              form_data.append('page',page)
              form_data.append('limit',limit)
              form_data.append('user_name',user_name)
              form_data.append('team',team)
              form_data.append('business_type',business_type)
              form_data.append('property_type',property_type)
              form_data.append('estimated_price',estimated_price)
              form_data.append('start_time',start_time)
              form_data.append('end_time',end_time)
              form_data.append('sort_time',sort_time)
              form_data.append("auction_state",auction_state)
              form_data.append("auction_platform",auction_platform)
              $.ajax({
                  url:"/auction/all/object/web/",
                  type:'POST',
                  data:form_data,
                  processData: false,  // tell jquery not to process the data
                  contentType: false,
                  success:function(res){
                      $(".tbContent").children().remove()
                  //     console.log(res)
                      let object_lists = res.data
                      for(let ii of object_lists){
                        let  start_price = ''
                        if(ii.starting_price == null){
                              start_price = ''
                        }else{
                              start_price = ii.starting_price
                        }
                        obj_List.push(ii.ObjFeeBased_id)
                      let objectlist =
                      ` <tr class="objectx_join_tr">
                      <td class="all-choose">
                      <input type="checkbox" class="object_dl-choose" name="dl-choose">
                      </td>
                      <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                      <td class="objectx_join">${rTime(ii.create_time)}</td>
                      <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                      <td class="objectx_join">${ii.name}</td>
                      <td class="objectx_join">${ii.team}</td>
                      <td class="objectx_join">${ii.object_name}</td>
                      <td class="objectx_join">${ii.entrusting_party}</td>
                      <td class="objectx_join">${ii.business_type}</td>
                      <td class="objectx_join">${ii.object_location}</td>
                      <td class="object_type objectx_join">${ii.property_type}</td>
                      <td class="objectx_join">${ii.estimated_price}</td>
                      <td  class="objectx_join">${ii.auction_state}</td>
                      <td  class="objectx_join">${ii.auction_platform}</td>
                      <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                      <td  class="objectx_join">${rTime(ii.start_time)}</td>
                      <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                      <td  class="objectx_join">${start_price}</td>
                      <td class="objectx_join">${ii.appraisal_price}</td>
                      <td class="objectx_join">${ii.after_state}</td>
                      <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                      <td class="objectx_join">${ii.premium_rate}</td>
                     <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                     <td class="objectx_join">${ii.received_serviceCharge}</td>
                     <td class="objectx_join">${ii.object_note}</td>                                         
                </tr>
                  `                           
              $(".tbContent").append(objectlist)
            
                  }
                  
                  }
              })
          }
      })
  })   
})
$(".c_time_down").click(function(){
      $(".c_time_up").css({
            display:"block"
      })
      $(".c_time_down").css({
            display:"none"
      })
      $(".u_time_up_cion").css({
            opacity: 0
      })
      $(".u_time_down_cion").css({
            opacity: 0
      })
      $(".c_time_up_icon").css({
            opacity: 1
      })
      $(".c_time_down_icon").css({
            opacity: 1
      })
      
    let page = $("._active_1").text()
    let limit = $("._sizes_select_active").text().slice(0,2)
    let admin_name = $("#username").text()
    let form_data = new FormData()
    let team = $(".team").val()
    let user_name = $(".name").val()
    let business_type = $(".business_type_search").find("option:selected").text()//业务类型
    let property_type = $(".property_type_search").find("option:selected").text()//资产类型
    let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
    let start_time = $(".start_time").val()
    let end_time = $(".end_time").val()//结束时间

    let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
    let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
    if(auction_state == "请选择"){
      auction_state = ""
      }
      if(auction_platform == "请选择"){
            auction_platform = ""
      }
      if(end_time == ""){
            end_time = ""
           }else{
           end_time =addDate($(".end_time").val())
           } 
       console.log(start_time)
       console.log(end_time)
    let sort_time = "-create_time"
    if(business_type == "请选择"){
      business_type = ""
    }
      if(property_type == "请选择"){
            property_type = ""
      }
      if(estimated_price == "请选择"){
            estimated_price = ""
      }
    form_data.append('page',page)
    form_data.append('limit',limit)
    form_data.append('user_name',user_name)
    form_data.append('team',team)
    form_data.append('business_type',business_type)
    form_data.append('property_type',property_type)
    form_data.append('estimated_price',estimated_price)
    form_data.append('start_time',start_time)
    form_data.append('end_time',end_time)
    form_data.append('sort_time',sort_time)
    form_data.append("auction_state",auction_state)
    form_data.append("auction_platform",auction_platform)
  
    $.ajax({
        url:"/auction/all/object/web/",
        type:'POST',
        data:form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false, 
        success:function(res){
            // console.log(res)
            $(".tbContent").children().remove()
            // console.log(res)
            //循环加入数据
            let  object_lists = res.data;
            for(let ii of object_lists){
                  let  start_price = ''
                  if(ii.starting_price == null){
                        start_price = ''
                  }else{
                        start_price = ii.starting_price
                  }
                  obj_List.push(ii.ObjFeeBased_id)
                let objectlist =
                ` <tr class="objectx_join_tr">
                <td class="all-choose">
                <input type="checkbox" class="object_dl-choose" name="dl-choose">
                </td>
                <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                <td class="objectx_join">${rTime(ii.create_time)}</td>
                <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                <td class="objectx_join">${ii.name}</td>
                <td class="objectx_join">${ii.team}</td>
                <td class="objectx_join">${ii.object_name}</td>
                <td class="objectx_join">${ii.entrusting_party}</td>
                <td class="objectx_join">${ii.business_type}</td>
                <td class="objectx_join">${ii.object_location}</td>
                <td class="object_type objectx_join">${ii.property_type}</td>
                <td class="objectx_join">${ii.estimated_price}</td>
                <td  class="objectx_join">${ii.auction_state}</td>
                <td  class="objectx_join">${ii.auction_platform}</td>
                <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                <td  class="objectx_join">${rTime(ii.start_time)}</td>
                <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                <td  class="objectx_join">${start_price}</td>
                <td class="objectx_join">${ii.appraisal_price}</td>
                <td class="objectx_join">${ii.after_state}</td>
                <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                <td class="objectx_join">${ii.premium_rate}</td>
               <td class="objectx_join">${ii.receivable_serviceCharge}</td>
               <td class="objectx_join">${ii.received_serviceCharge}</td>
               <td class="objectx_join">${ii.object_note}</td>                                         
          </tr>
            `                           
        $(".tbContent").append(objectlist)
      
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
            //   console.log(admin_name)
              let limits = pageSize;
              let pages = index
              let form_data = new FormData()
              let team = $(".team").val()
              let user_name = $(".name").val()
              let business_type = $(".business_type_search").find("option:selected").text()//业务类型
              let property_type = $(".property_type_search").find("option:selected").text()//资产类型
              let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
              let start_time = $(".start_time").val()
              let end_time = $(".end_time").val()//结束时间

              let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
              let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
              if(auction_state == "请选择"){
                auction_state = ""
                }
                if(auction_platform == "请选择"){
                      auction_platform = ""
                }
                if(end_time == ""){
                  end_time = ""
                 }else{
                 end_time =addDate($(".end_time").val())
                 } 
             console.log(start_time)
             console.log(end_time)
              let sort_time = "-create_time"
              if(business_type == "请选择"){
                business_type = ""
              }
                if(property_type == "请选择"){
                      property_type = ""
                }
                if(estimated_price == "请选择"){
                      estimated_price = ""
                }
              form_data.append('page',page)
              form_data.append('limit',limit)
              form_data.append('user_name',user_name)
              form_data.append('team',team)
              form_data.append('business_type',business_type)
              form_data.append('property_type',property_type)
              form_data.append('estimated_price',estimated_price)
              form_data.append('start_time',start_time)
              form_data.append('end_time',end_time)
              form_data.append('sort_time',sort_time)
              form_data.append("auction_state",auction_state)
              form_data.append("auction_platform",auction_platform)
              $.ajax({
                  url:"/auction/all/object/web/",
                  type:'POST',
                  data:form_data,
                  processData: false,  // tell jquery not to process the data
                  contentType: false,
                  success:function(res){
                      $(".tbContent").children().remove()

                      let object_lists = res.data
                      for(let ii of object_lists){
                        let  start_price = ''
                        if(ii.starting_price == null){
                              start_price = ''
                        }else{
                              start_price = ii.starting_price
                        }
                        obj_List.push(ii.ObjFeeBased_id)
                      let objectlist =
                      ` <tr class="objectx_join_tr">
                      <td class="all-choose">
                      <input type="checkbox" class="object_dl-choose" name="dl-choose">
                      </td>
                      <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                      <td class="objectx_join">${rTime(ii.create_time)}</td>
                      <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                      <td class="objectx_join">${ii.name}</td>
                      <td class="objectx_join">${ii.team}</td>
                      <td class="objectx_join">${ii.object_name}</td>
                      <td class="objectx_join">${ii.entrusting_party}</td>
                      <td class="objectx_join">${ii.business_type}</td>
                      <td class="objectx_join">${ii.object_location}</td>
                      <td class="object_type objectx_join">${ii.property_type}</td>
                      <td class="objectx_join">${ii.estimated_price}</td>
                      <td  class="objectx_join">${ii.auction_state}</td>
                      <td  class="objectx_join">${ii.auction_platform}</td>
                      <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                      <td  class="objectx_join">${rTime(ii.start_time)}</td>
                      <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                      <td  class="objectx_join">${start_price}</td>
                      <td class="objectx_join">${ii.appraisal_price}</td>
                      <td class="objectx_join">${ii.after_state}</td>
                      <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                      <td class="objectx_join">${ii.premium_rate}</td>
                     <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                     <td class="objectx_join">${ii.received_serviceCharge}</td>
                     <td class="objectx_join">${ii.object_note}</td>                                         
                </tr>
                  `                           
              $(".tbContent").append(objectlist)
            
                  }
                  
                  
                  }
              })
            


        
      
          }
          
          
      })
    
  }) 




})  
// 最后修改时间 升降序
$(".u_time_up").click(function(){
      $(".u_time_up").css({
            display:"none"
      })
      $(".u_time_down").css({
            display:"block"
      })
      $(".u_time_up_cion").css({
            opacity: 1
      })
      $(".u_time_down_cion").css({
            opacity: 1
      })
      $(".c_time_up_icon").css({
            opacity: 0
      })
      $(".c_time_down_icon").css({
            opacity: 0
      })

    let page = $("._active_1").text()
    let limit = $("._sizes_select_active").text().slice(0,2)
    let form_data = new FormData()
    let team = $(".team").val()
    let user_name = $(".name").val()
    let business_type = $(".business_type_search").find("option:selected").text()//业务类型
    let property_type = $(".property_type_search").find("option:selected").text()//资产类型
    let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
    let start_time = $(".start_time").val()
    let end_time = $(".end_time").val()//结束时间

    let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
    let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
    if(auction_state == "请选择"){
      auction_state = ""
      }
      if(auction_platform == "请选择"){
            auction_platform = ""
      }
    let sort_time = "last_updateTime"
    if(end_time == ""){
      end_time = ""
     }else{
     end_time =addDate($(".end_time").val())
     } 

    if(business_type == "请选择"){
      business_type = ""
    }
      if(property_type == "请选择"){
            property_type = ""
      }
      if(estimated_price == "请选择"){
            estimated_price = ""
      }
    form_data.append('page',page)
    form_data.append('limit',limit)
    form_data.append('user_name',user_name)
    form_data.append('team',team)
    form_data.append('business_type',business_type)
    form_data.append('property_type',property_type)
    form_data.append('estimated_price',estimated_price)
    form_data.append('start_time',start_time)
    form_data.append('end_time',end_time)
    form_data.append('sort_time',sort_time)
    form_data.append("auction_state",auction_state)
    form_data.append("auction_platform",auction_platform)
    $.ajax({
        url:"/auction/all/object/web/",
        type:'POST',
        data:form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false, 
        success:function(res){
            // console.log(res)
            $(".tbContent").children().remove()
            //循环加入数据
            let  object_lists = res.data;
            for(let ii of object_lists){
                  let  start_price = ''
                  if(ii.starting_price == null){
                        start_price = ''
                  }else{
                        start_price = ii.starting_price
                  }
                  obj_List.push(ii.ObjFeeBased_id)
                let objectlist =
                ` <tr class="objectx_join_tr">
                <td class="all-choose">
                <input type="checkbox" class="object_dl-choose" name="dl-choose">
                </td>
                <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                <td class="objectx_join">${rTime(ii.create_time)}</td>
                <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                <td class="objectx_join">${ii.name}</td>
                <td class="objectx_join">${ii.team}</td>
                <td class="objectx_join">${ii.object_name}</td>
                <td class="objectx_join">${ii.entrusting_party}</td>
                <td class="objectx_join">${ii.business_type}</td>
                <td class="objectx_join">${ii.object_location}</td>
                <td class="object_type objectx_join">${ii.property_type}</td>
                <td class="objectx_join">${ii.estimated_price}</td>
                <td  class="objectx_join">${ii.auction_state}</td>
                <td  class="objectx_join">${ii.auction_platform}</td>
                <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                <td  class="objectx_join">${rTime(ii.start_time)}</td>
                <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                <td  class="objectx_join">${start_price}</td>
                <td class="objectx_join">${ii.appraisal_price}</td>
                <td class="objectx_join">${ii.after_state}</td>
                <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                <td class="objectx_join">${ii.premium_rate}</td>
               <td class="objectx_join">${ii.receivable_serviceCharge}</td>
               <td class="objectx_join">${ii.received_serviceCharge}</td>
               <td class="objectx_join">${ii.object_note}</td>                                         
          </tr>
            `                           
        $(".tbContent").append(objectlist)
      
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
     
              let limit = pageSize;
              let pages = index
              let form_data = new FormData()
              let team = $(".team").val()
              let user_name = $(".name").val()
              let business_type = $(".business_type_search").find("option:selected").text()//业务类型
              let property_type = $(".property_type_search").find("option:selected").text()//资产类型
              let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
              let start_time = $(".start_time").val()
              let end_time = $(".end_time").val()//结束时间

              let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
              let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
              if(auction_state == "请选择"){
                auction_state = ""
                }
                if(auction_platform == "请选择"){
                      auction_platform = ""
                }
                if(end_time == ""){
                  end_time = ""
                 }else{
                 end_time =addDate($(".end_time").val())
                 } 
             console.log(start_time)
             console.log(end_time)
              let sort_time = "last_updateTime"
              if(business_type == "请选择"){
                business_type = ""
              }
                if(property_type == "请选择"){
                      property_type = ""
                }
                if(estimated_price == "请选择"){
                      estimated_price = ""
                }
              form_data.append('page',page)
              form_data.append('limit',limit)
              form_data.append('user_name',user_name)
              form_data.append('team',team)
              form_data.append('business_type',business_type)
              form_data.append('property_type',property_type)
              form_data.append('estimated_price',estimated_price)
              form_data.append('start_time',start_time)
              form_data.append('end_time',end_time)
              form_data.append('sort_time',sort_time)
              form_data.append("auction_state",auction_state)
              form_data.append("auction_platform",auction_platform)
              $.ajax({
                  url:"/auction/all/object/web/",
                  type:'POST',
                  data:form_data,
                  processData: false,  // tell jquery not to process the data
                  contentType: false,
                  success:function(res){
                      $(".tbContent").children().remove()
                  //     console.log(res)
                      let object_lists = res.data
                      for(let ii of object_lists){
                        let  start_price = ''
                        if(ii.starting_price == null){
                              start_price = ''
                        }else{
                              start_price = ii.starting_price
                        }
                        obj_List.push(ii.ObjFeeBased_id)
                      let objectlist =
                      ` <tr class="objectx_join_tr">
                      <td class="all-choose">
                      <input type="checkbox" class="object_dl-choose" name="dl-choose">
                      </td>
                      <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                      <td class="objectx_join">${rTime(ii.create_time)}</td>
                      <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                      <td class="objectx_join">${ii.name}</td>
                      <td class="objectx_join">${ii.team}</td>
                      <td class="objectx_join">${ii.object_name}</td>
                      <td class="objectx_join">${ii.entrusting_party}</td>
                      <td class="objectx_join">${ii.business_type}</td>
                      <td class="objectx_join">${ii.object_location}</td>
                      <td class="object_type objectx_join">${ii.property_type}</td>
                      <td class="objectx_join">${ii.estimated_price}</td>
                      <td  class="objectx_join">${ii.auction_state}</td>
                      <td  class="objectx_join">${ii.auction_platform}</td>
                      <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                      <td  class="objectx_join">${rTime(ii.start_time)}</td>
                      <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                      <td  class="objectx_join">${start_price}</td>
                      <td class="objectx_join">${ii.appraisal_price}</td>
                      <td class="objectx_join">${ii.after_state}</td>
                      <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                      <td class="objectx_join">${ii.premium_rate}</td>
                     <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                     <td class="objectx_join">${ii.received_serviceCharge}</td>
                     <td class="objectx_join">${ii.object_note}</td>                                         
                </tr>
                  `                           
              $(".tbContent").append(objectlist)
            
                  } 
                  }
              })
          }   
      })
   
  })   
})
$(".u_time_down").click(function(){
      $(".u_time_up").css({
            display:"block"
      })
      $(".u_time_down").css({
            display:"none"
      })
      $(".u_time_up_cion").css({
            opacity: 1
      })
      $(".u_time_down_cion").css({
            opacity: 1
      })
      $(".c_time_up_icon").css({
            opacity: 0
      })
      $(".c_time_down_icon").css({
            opacity: 0
      })
    let page = $("._active_1").text()
    let limit = $("._sizes_select_active").text().slice(0,2)
    let form_data = new FormData()
    let team = $(".team").val()
    let user_name = $(".name").val()
    let business_type = $(".business_type_search").find("option:selected").text()//业务类型
    let property_type = $(".property_type_search").find("option:selected").text()//资产类型
    let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
    let start_time = $(".start_time").val()
    let end_time = $(".end_time").val()//结束时间

    let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
    let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
    if(auction_state == "请选择"){
      auction_state = ""
      }
      if(auction_platform == "请选择"){
            auction_platform = ""
      }
      if(end_time == ""){
            end_time = ""
           }else{
           end_time =addDate($(".end_time").val())
           } 
       console.log(start_time)
       console.log(end_time)
    let sort_time = "-last_updateTime"
    if(business_type == "请选择"){
      business_type = ""
    }
      if(property_type == "请选择"){
            property_type = ""
      }
      if(estimated_price == "请选择"){
            estimated_price = ""
      }
    form_data.append('page',page)
    form_data.append('limit',limit)
    form_data.append('user_name',user_name)
    form_data.append('team',team)
    form_data.append('business_type',business_type)
    form_data.append('property_type',property_type)
    form_data.append('estimated_price',estimated_price)
    form_data.append('start_time',start_time)
    form_data.append('end_time',end_time)
    form_data.append('sort_time',sort_time)
    form_data.append("auction_state",auction_state)
    form_data.append("auction_platform",auction_platform)
            $.ajax({
                  url:"/auction/all/object/web/",
                  type:'POST',
                  data:form_data,
                  processData: false,  // tell jquery not to process the data
                  contentType: false, 
                  success:function(res){
                  // console.log(res)
                  $(".tbContent").children().remove()
                  //循环加入数据
                  let  object_lists = res.data;
                  for(let ii of object_lists){
                        let  start_price = ''
                        if(ii.starting_price == null){
                              start_price = ''
                        }else{
                              start_price = ii.starting_price
                        }
                        obj_List.push(ii.ObjFeeBased_id)
                        let objectlist =
                        ` <tr class="objectx_join_tr">
                        <td class="all-choose">
                        <input type="checkbox" class="object_dl-choose" name="dl-choose">
                        </td>
                        <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                        <td class="objectx_join">${rTime(ii.create_time)}</td>
                        <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                        <td class="objectx_join">${ii.name}</td>
                        <td class="objectx_join">${ii.team}</td>
                        <td class="objectx_join">${ii.object_name}</td>
                        <td class="objectx_join">${ii.entrusting_party}</td>
                        <td class="objectx_join">${ii.business_type}</td>
                        <td class="objectx_join">${ii.object_location}</td>
                        <td class="object_type objectx_join">${ii.property_type}</td>
                        <td class="objectx_join">${ii.estimated_price}</td>
                        <td  class="objectx_join">${ii.auction_state}</td>
                        <td  class="objectx_join">${ii.auction_platform}</td>
                        <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                        <td  class="objectx_join">${rTime(ii.start_time)}</td>
                        <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                        <td  class="objectx_join">${start_price}</td>
                        <td class="objectx_join">${ii.appraisal_price}</td>
                        <td class="objectx_join">${ii.after_state}</td>
                        <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                        <td class="objectx_join">${ii.premium_rate}</td>
                        <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                        <td class="objectx_join">${ii.received_serviceCharge}</td>
                        <td class="objectx_join">${ii.object_note}</td>                                         
                  </tr>
                  `                           
                  $(".tbContent").append(objectlist)
            
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
                        let limit = pageSize;
                        let pages = index
                        let team = $(".team").val()
            let user_name = $(".name").val()
            let business_type = $(".business_type_search").find("option:selected").text()//业务类型
            let property_type = $(".property_type_search").find("option:selected").text()//资产类型
            let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
            let start_time = $(".start_time").val()
            let end_time = $(".end_time").val()//结束时间

            let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
            let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
            if(auction_state == "请选择"){
              auction_state = ""
              }
              if(auction_platform == "请选择"){
                    auction_platform = ""
              }
              if(end_time == ""){
                  end_time = ""
                 }else{
                 end_time =addDate($(".end_time").val())
                 } 
             console.log(start_time)
             console.log(end_time)
            let sort_time = "-last_updateTime"
            if(business_type == "请选择"){
                  business_type = ""
            }
                  if(property_type == "请选择"){
                        property_type = ""
                  }
                  if(estimated_price == "请选择"){
                        estimated_price = ""
                  }

                        let form_data = new FormData()
                        form_data.append('page',page)
                        form_data.append('limit',limit)
                        form_data.append('user_name',user_name)
                        form_data.append('team',team)
                        form_data.append('business_type',business_type)
                        form_data.append('property_type',property_type)
                        form_data.append('estimated_price',estimated_price)
                        form_data.append('start_time',start_time)
                        form_data.append('end_time',end_time)
                        form_data.append('sort_time',sort_time)
                        form_data.append("auction_state",auction_state)
                        form_data.append("auction_platform",auction_platform)
            
                        $.ajax({
                        url:"/auction/all/object/web/",
                        type:'POST',
                        data:form_data,
                        processData: false,  // tell jquery not to process the data
                        contentType: false,
                        success:function(res){
                              $(".tbContent").children().remove()
                        //     console.log(res)
                              let object_lists = res.data
                              for(let ii of object_lists){
                                    let  start_price = ''
                                    if(ii.starting_price == null){
                                          start_price = ''
                                    }else{
                                          start_price = ii.starting_price
                                    }
                              obj_List.push(ii.ObjFeeBased_id)
                              let objectlist =
                              ` <tr class="objectx_join_tr">
                              <td class="all-choose">
                              <input type="checkbox" class="object_dl-choose" name="dl-choose">
                              </td>
                              <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                              <td class="objectx_join">${rTime(ii.create_time)}</td>
                              <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                              <td class="objectx_join">${ii.name}</td>
                              <td class="objectx_join">${ii.team}</td>
                              <td class="objectx_join">${ii.object_name}</td>
                              <td class="objectx_join">${ii.entrusting_party}</td>
                              <td class="objectx_join">${ii.business_type}</td>
                              <td class="objectx_join">${ii.object_location}</td>
                              <td class="object_type objectx_join">${ii.property_type}</td>
                              <td class="objectx_join">${ii.estimated_price}</td>
                              <td  class="objectx_join">${ii.auction_state}</td>
                              <td  class="objectx_join">${ii.auction_platform}</td>
                              <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                              <td  class="objectx_join">${rTime(ii.start_time)}</td>
                              <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                              <td  class="objectx_join">${start_price}</td>
                              <td class="objectx_join">${ii.appraisal_price}</td>
                              <td class="objectx_join">${ii.after_state}</td>
                              <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                              <td class="objectx_join">${ii.premium_rate}</td>
                              <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                              <td class="objectx_join">${ii.received_serviceCharge}</td>
                              <td class="objectx_join">${ii.object_note}</td>                                         
                        </tr>
                        `                           
                        $(".tbContent").append(objectlist)
                  
                        } 
                        }
                        })
                  }   
            })
     
            })  
  })  

$(".seatch_submit").click(function(){

      let page = $("._active_1").text()
      let limit = $("._sizes_select_active").text().slice(0,2)
      let team = $(".team").val()
      let user_name = $(".name").val()
      let business_type = $(".business_type_search").find("option:selected").text()//业务类型
      let property_type = $(".property_type_search").find("option:selected").text()//资产类型
      let estimated_price = $(".estimated_price_search").find("option:selected").text() //资产规模     
      let start_time = $(".start_time").val()
      let end_time = $(".end_time").val()
      let auction_state = $(".auction_state").find("option:selected").text()//拍卖阶段
      let auction_platform = $(".auction_platform").find("option:selected").text()//拍卖平台
      if(auction_state == "请选择"){
        auction_state = ""
        }
        if(auction_platform == "请选择"){
              auction_platform = ""
        }
      if(business_type == "请选择"){
            business_type = ""
      }
      if(property_type == "请选择"){
            property_type = ""
      }
      if(estimated_price == "请选择"){
            estimated_price = ""
      }
         if(end_time == ""){
            end_time = ""
           }else{
           end_time =addDate($(".end_time").val())
           } 
       console.log(start_time)
       console.log(end_time)
      let form_data = new FormData()
      form_data.append("page",page)
      form_data.append("limit",limit)
      form_data.append("start_time",start_time)
      form_data.append("end_time",end_time)
      form_data.append("user_name",user_name)
      form_data.append("team",team)
      form_data.append("business_type",business_type)
      form_data.append("property_type",property_type)
      form_data.append("estimated_price",estimated_price)
      form_data.append("auction_state",auction_state)
      form_data.append("auction_platform",auction_platform)
            $.ajax({
            url:"/auction/all/object/web/",
            type:'POST',
            data:form_data,
            processData: false,  // tell jquery not to process the data
            contentType: false, 
            success:function(res){
                  console.log(res)
                  let counts = res.count;
                  $("._count").text("共"+counts+"条")
                  $(".count_num").text(counts)
                  $(".tbContent").children().remove()
                  //循环加入数据
                  let  object_lists = res.data;
                  for(let ii of object_lists){
                        let  start_price = ''
                        if(ii.starting_price == null){
                              start_price = ''
                        }else{
                              start_price = ii.starting_price
                        }
                        let objectlist =
                        ` <tr class="objectx_join_tr">
                        <td class="all-choose">
                        <input type="checkbox" class="object_dl-choose" name="dl-choose">
                        </td>
                        <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                        <td class="objectx_join">${rTime(ii.create_time)}</td>
                        <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                        <td class="objectx_join">${ii.name}</td>
                        <td class="objectx_join">${ii.team}</td>
                        <td class="objectx_join">${ii.object_name}</td>
                        <td class="objectx_join">${ii.entrusting_party}</td>
                        <td class="objectx_join">${ii.business_type}</td>
                        <td class="objectx_join">${ii.object_location}</td>
                        <td class="object_type objectx_join">${ii.property_type}</td>
                        <td class="objectx_join">${ii.estimated_price}</td>
                        <td  class="objectx_join">${ii.auction_state}</td>
                        <td  class="objectx_join">${ii.auction_platform}</td>
                        <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                        <td  class="objectx_join">${rTime(ii.start_time)}</td>
                        <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                        <td  class="objectx_join">${start_price}</td>
                        <td class="objectx_join">${ii.appraisal_price}</td>
                        <td class="objectx_join">${ii.after_state}</td>
                        <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                        <td class="objectx_join">${ii.premium_rate}</td>
                       <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                       <td class="objectx_join">${ii.received_serviceCharge}</td>
                       <td class="objectx_join">${ii.object_note}</td>                                         
                  </tr>
                    `                           
                $(".tbContent").append(objectlist)
              
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
                        var admin_name = $("#username").text()
                        // console.log(admin_name)
                        let limits = pageSize;
                        let pages = index
                        let form_data = new FormData()
                        form_data.append("page",page)
                        form_data.append("limit",limit)
                        form_data.append("page",page)
                        form_data.append("start_time",start_time)
                        form_data.append("end_time",end_time)
                        form_data.append("user_name",user_name)
                        form_data.append("team",team)
                        form_data.append("business_type",business_type)
                        form_data.append("property_type",property_type)
                        form_data.append("estimated_price",estimated_price)
                        form_data.append("auction_state",auction_state)
                        form_data.append("auction_platform",auction_platform)
                        $.ajax({
                              url:"/auction/all/object/web/",
                              type:'POST',
                              data:form_data,
                              processData: false,  // tell jquery not to process the data
                              contentType: false,
                              success:function(res){
                              $(".tbContent").children().remove()
                              // console.log(res)
                              let object_lists = res.data
                              for(let ii of object_lists){
                                    let  start_price = ''
                                    if(ii.starting_price == null){
                                          start_price = ''
                                    }else{
                                          start_price = ii.starting_price
                                    }
                                    let objectlist =
                                    ` <tr class="objectx_join_tr">
                                    <td class="all-choose">
                                    <input type="checkbox" class="object_dl-choose" name="dl-choose">
                                    </td>
                                    <td style="display: none;" class="object_uuid">${ii.ObjFeeBased_uuid}</td>
                                    <td class="objectx_join">${rTime(ii.create_time)}</td>
                                    <td class="objectx_join">${rTime(ii.last_updateTime)}</td>
                                    <td class="objectx_join">${ii.name}</td>
                                    <td class="objectx_join">${ii.team}</td>
                                    <td class="objectx_join">${ii.object_name}</td>
                                    <td class="objectx_join">${ii.entrusting_party}</td>
                                    <td class="objectx_join">${ii.business_type}</td>
                                    <td class="objectx_join">${ii.object_location}</td>
                                    <td class="object_type objectx_join">${ii.property_type}</td>
                                    <td class="objectx_join">${ii.estimated_price}</td>
                                    <td  class="objectx_join">${ii.auction_state}</td>
                                    <td  class="objectx_join">${ii.auction_platform}</td>
                                    <td  class="objectx_join object_url" title="${ii.auction_url}">${ii.auction_url}</td>
                                    <td  class="objectx_join">${rTime(ii.start_time)}</td>
                                    <td  class="objectx_join">${rTime(ii.auction_submissionDate)}</td>
                                    <td  class="objectx_join">${start_price}</td>
                                    <td class="objectx_join">${ii.appraisal_price}</td>
                                    <td class="objectx_join">${ii.after_state}</td>
                                    <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                                    <td class="objectx_join">${ii.premium_rate}</td>
                                   <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                                   <td class="objectx_join">${ii.received_serviceCharge}</td>
                                   <td class="objectx_join">${ii.object_note}</td>                                         
                              </tr>
                                `                           
                            $(".tbContent").append(objectlist)
                          
                                }
                              
                              }
                        })
                  }
                  })

            })
})
//增加一天
function addDate(time) {
      //加一天
      var timestamp = Date.parse(new Date(time));
      timestamp = timestamp /1000;
      timestamp += 86400;//加一天
      var newTime =new Date(timestamp * 1000).format('yyyy-MM-dd hh:mm:ss');
      return newTime;
  }
  //日期格式
  Date.prototype.format = function(format) {
      var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1
                  ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
      }
      return format;
  }
$(".select_search").click(function(){
      console.log(1111)
      show("object_search")
})
$(".c_span").on("click","div",function(){
      $(".c_span div").removeClass("click_color")
      $(this).addClass("click_color")

})
      $(".addobject_btn").click(function(){
            show("objectadd")  
      })
      //新增确定
      var object_uuid;
      var object_sum = 0
      $(".objectTrue").click(function(e){
            hide("objectadd")
            if(!e.isPropagationStopped()){
                  ////确定stopPropagation是否被调用过，点击按钮唯一性
                  object_uuid = hex_md5(Math.random() + '' + Math.random())
                  // console.log(object_uuid) //新建标的物id
                  // 头部信息
                  let object_name = $(".object_name").val(),
                  sheng = $("#sheng").find("option:selected").text(),
                  shi = $("#shi").find("option:selected").text(),
                  qu = $("#qu").find("option:selected").text(),
                  shengval = $("#sheng").val(),
                  shival = $("#shi").val(),
                  quval = $("#qu").val(),
                  object_location = sheng+shi+qu,   // 标的物所在地
                  property_type = $(".property_type").find("option:selected").text(), 
                  estimated_price = $(".estimated_price").find("option:selected").text(),//预估价格
                  potential_purchaser = $(".potential_purchaser").find("option:selected").text(),
                  bidder_describe = $(".bidder_describe").val(),//竞买人描述
                  objFb_node = $(".object_beizu").val(),//标的物备注
                  // 标的文件
                  form_data = new  FormData(),
                  law_uuid =  $(".law_uuid_html").text()

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
                  form_data.append('presentation_condition',p_remark)//情况说明
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
                  let state = true;
                  if(object_name == "" ){
                        state = false 
                        alert("请填写标的名称")
                  }else if(property_type == "请选择"){
                        state = false
                        alert("请填写财产类型")
                  }else if(estimated_price   == "请选择"){
                        state = false
                        alert("请填写预估价格")
                  }else if(  object_location =="--请选择--"){
                        state = false
                        alert("请选择所在地")
                  }else if(objectPhoto_id.length == 0){
                        state = false
                        alert("请选择标的照片")
                  }else if(objectInvestigate_id.length == 0 ){
                        state = false
                        alert("请选择标的调查表")
                  }
                  if(potential_purchaser == "有"){
                        if(bidder_describe == ""){
                              state = false;
                              alert("请填写竞买人描述")
                        }
                  }
                  
                        if(auction_state=="一拍成交"){
                              if(announcement_time ==""){
                                    state = false
                                    alert("请填写公告时间")
                                    }else if(auction_url == ""){
                                          state = false
                                          alert("请填写拍卖网址")
                                    }else if(starting_price ==""){
                                          state = false
                                          alert("请填写起拍价")
                                    }else if(transaction_price == ""){
                                          state = false
                                          alert("请填写成交价")
                                    }
                        } 
                  if(auction_state == "以物抵债"){
                              if(presentation_condition == ""){
                              state = false
                              alert("请填写情况说明")
                              }
                        }
                        
                  if(auction_state == "二拍成交"){
                              if(announcement_time ==""){
                              state = false
                              alert("请填写公告时间")
                              }else if(auction_url == ""){
                                    state = false
                                    alert("请填写拍卖网址")
                              }else if(starting_price ==""){
                                    state = false
                                    alert("请填写起拍价")
                              }else if(transaction_price == ""){
                                    state = false
                                    alert("请填写成交价")
                              }
                        }   
                  if(auction_state == "变卖成交"){
                        if(announcement_time ==""){
                              state = false
                              alert("请填写公告时间")
                              }else if(auction_url == ""){
                                    state = false
                                    alert("请填写拍卖网址")
                              }else if(starting_price ==""){
                                    state = false
                                    alert("请填写起拍价")
                              }else if(transaction_price == ""){
                                    state = false
                                    alert("请填写成交价")
                              }
                  }    
                  
                  if(auction_state =="其他"){
                              if(presentation_condition == ""){
                              state = false
                              alert("请填写情况说明")
                              }
                        }
                        //售后栏
                        if(after_state == "已交割"){
                              if(buyer == ""){
                                    state = false
                                    alert("请填写受买人")
                              }

                        }        
                  // 评估栏
                  if(assess_state == "已评估"){
                        if(appraisal_price == "" ){
                              state = false
                              alert("请填写评估价格")

                        }else if(assess_method == ""){
                              alert("请选择评估方式")

                        }
                  }
                  //交割栏
                  if(after_state == "已交割"){
                        if(buyer == ""){
                        state = false
                        alert("请填写买受人")
                        }
                  }
                  //收费
                  if(invoice_state == "已开票"){
                        if(invoice_price == ""){
                              state = false
                              alert("请填写开票金额")
                        }else if(invoice_id.length == 0 ){
                              state = false
                              alert("请上传发票")
                        }else if(invoice_date ==null){
                              alert("请选择开票日期")

                        }

                  }
                  //收费
                  if(whether_charge == "已收费"){
                        if(receivable_serviceCharge == ""){
                              state = false
                              alert("请填写应收服务费")

                        }else if(received_serviceCharge == "" ){
                              state = false
                              alert("请填写已收服务费")

                        }else if(service_description == ""){
                              alert("请填写收费服务说明")

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
                                          alert(res.chMessage)
                                          object_sum = object_sum + 1;
                                          // console.log(object_sum)
                                          $(".object_sum").val(object_sum)
                                    //  console.log(id)
                                    //查看标的物信息
                                          console.log(object_uuid)
                                          let form_data3 = new FormData()
                                          form_data3.append('object_uuid',object_uuid)
                                    $.ajax({
                                          url:":80/auction/a/object/",
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
                                                <td  class="objectx_join ${ii.assess_state =='已评估'?'success':'primary'}">${ii.assess_state}</td>
                                                <td class="objectx_join">${ii.appraisal_price}</td>
                                                <td class="objectx_join ${ii.auction_state =='未上拍'?'primary':'success'} ">${ii.auction_state}</td>
                                                <td class="chengjiao_price objectx_join">${ii.transaction_price}</td>
                                                <td class="objectx_join ${ii.after_state == '已交割'?'success':'primary'} ">${ii.after_state}</td>
                                                <td class="objectx_join">${ii.buyer}</td>
                                               <td class="objectx_join ${ii.whether_charge == '已收费'?'success':'primary'}">${ii.whether_charge}</td>
                                               <td class="objectx_join">${ii.receivable_serviceCharge}</td>
                                               <td class="objectx_join ${ii.invoice_state == '已开票'?'success':'primary'}">${ii.invoice_state}</td>
                                               <td class="objectx_join">${ii.invoice_price}</td>                                                           
                                          </tr>
                                            `                      
                                          $(".tbContent").append(objectlist)
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


    $(".deleteobject_btn ").click(function(){
      let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
      if(choose > 0){
            layer.open({
                  type:0, //设置类型 默认为0 1页面层 2ifream层
                  title:"提示", //标题
                  content:'确定删除吗？',//内容 type=0为内容
                  skin:'layui-layer-molv',//皮肤
                  area:['200px','150px'], //宽高
                  icon:1, //只对type=0有效
                  btn:['确定','取消'],
                  yes:function(index,layero){
                        let objectu_list = [];
                        $("input[class='object_dl-choose']:checked").each(function(){
                              let uuid =  $(this).parent().next().text()
                              console.log(uuid)
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
                                    if(res.code == 1){
                                      layer.msg(res.chMessage);
                                      setTimeout(function(){
                                          location.reload()
                                      },1000)
                                    }else{
                                      layer.msg(res.chMessage);
                                    }
                                    }
                          })

                  }

            })


      }else{
            
            layer.msg("请选择您要删除的标的")

      }

    })

  //导出
  
  $(".export_object").click(function(){

    let choose = document.querySelectorAll("input[class='object_dl-choose']:checked").length;
    console.log(choose)
    if(choose > 0){
      $("input[class='object_dl-choose']:checked").each(function(){
            let law_uuid =  $(this).parent().next().text()
              console.log(law_uuid)
              window.location.href ='/auction/file/export/?object_uuid='+JSON.stringify(obj_List)  
        })
    }else{
      layer.msg("请选择您要导出的标的")
    }
  })
  let target 
  $(".index_open").click(function(e){
     target = e.currentTarget.ariaExpanded
     console.log(target)
     if(target == "false"){
           console.log(111)
        $(".zhan").css({
              display: "none"
        })
        $(".shou").css({
              display:"block"
        })
     }else if(target == "true"){
      console.log(222)
      $(".zhan").css({
            display: "block"
      })
      $(".shou").css({
            display:"none"
      })
     }
  })
  $(".index_off").click(function(){
    
})



//   全选
  var inp = document.getElementsByClassName('al-choose')
  var inps = document.getElementsByClassName("object_dl-choose")
//   console.log(inps)
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
    //时间转换函数
    function rTime(date) {
        var json_date = new Date(date).toJSON();
        return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    } 

    //模态框弹框弹出
function show(w){
    $(`#${w}`).modal('show');
    $(".modal-content input").val("")
}
  //弹框隐藏
function hide(w){
    $(`#${w}`).modal('hide');
}

// 地区加载函数
function City(){
    var sheng = document.getElementById('sheng');
    var shi = document.getElementById('shi');
    var qu = document.getElementById('qu');
    // 获取数据
    // 遍历数组省
    var data = cityData;
    for (var i = 0; i < data.length; i++) {
        var option = new Option(data[i]["text"], i);
        sheng.add(option);
      }
    //下拉框 省的事件
    sheng.onchange = function sheng_optionfun(){
        var value = this.value 
        qu.options.length = 0;
        shi.options.length = 0;
    if (value >= 0) {
    //添加-市
    for (var j = 0; j < data[value]["children"].length; j++) {//遍历出每个市
            var option = new Option(data[value]["children"][j]["text"], j);
            shi.add(option);//市
    // 区-默认值
        for (var i = 0; i < data[value]["children"][0]["children"].length; i++) {
            var qu_option = new Option(data[value]["children"][0]["children"][i]["text"], i);
            qu.add(qu_option);
           }
    //下拉框-市的事件-方法
            shi.onchange = function () {
                var values = this.value;//获取市-value值
                qu.options.length = 0;//清除区
                for (var i = 0; i < data[value]["children"][values]["children"].length; i++) {
                    var qu_option = new Option(data[value]["children"][values]["children"][i]["text"], i);
                    qu.add(qu_option);
                }
            }
       }
       }
      }

}
City()
    //查询类型改变时间
$(".search_type").change(function(){
      let val = $(this).val()
     if(val == 1 || val == 2 ){
         $(".search_time").css({
             display:"block"
         })
         $(".search_time_end").css({
            display:"block"
           })
           $(".start").css({
               display:"block"
           })
           $(".end").css({
               display:"block"
           })
         $(".search_input").css({
             display:"none"
         })
     }else{
      $(".search_time").css({
          display:"none"
      })
        $(".search_time_end").css({
            display:"none"
        })
        $(".start").css({
            display:"none"
        })
        $(".end").css({
            display:"none"
        })
      $(".search_input").css({
          display:"block"
      })

     }
})





})()