(function(){
    // 进入首页获取数据
    let path = "/media/"
    let counts = ""
    $.ajax({
        url:"/product/all",
        type:'GET',
        data:{
            page:1,
            limit:20
        },
        processData: false,  // tell jquery not to process the data
        contentType: false,
        success:function(res){
            console.log(res)
            counts = res.count
            let arr = res.data
            for(let ii of arr){
                let product_list = `
                <div class="col-sm-4 col-md-3 col-mm-6 product_img a_project" data-id = "${ii.product_id}">
                                <a href="javascript:;">
                                    <img src="${path}${ii.product_image}" class="img-thumbnail" alt="行车记录仪 白色真爱版WDR宽动态 行车记录仪 白色真爱版WDR宽动态">
                                </a>
                            <p class="product_title"><a href="javascript:;" title="行车记录仪 白色真爱版WDR宽动态 行车记录仪 白色真爱版WDR宽动态">${ii.product_name}</a></p>
                            </div>     
                `
            $(".product_list").append(product_list)
            }   
        }
      }).then(()=>{
        new Pagination({
            element: '#pages', // 渲染的容器  [必填]
            type: 1, // 样式类型，默认1 ，目前可选 [1,2] 可自行增加样式   [非必填]
            layout: 'total, sizes, home, prev, pager, next, last, jumper', // [必填]
            // pageIndex:  // 当前页码 [非必填]
            pageSize:20, // 每页显示条数   TODO: 默认选中sizes [非必填]
            pageCount: 9, // 页码显示数量，页码必须大于等于5的奇数，默认页码9  TODO:为了样式美观，参数只能为奇数， 否则会报错 [非必填]
            total: counts, // 数据总条数 [必填]
            singlePageHide: false, // 单页隐藏， 默认true  如果为true页码少于一页则不会渲染 [非必填]
            pageSizes: [4], // 选择每页条数  TODO: layout的sizes属性存在才生效
            prevText: '上一页', // 上一页文字，不传默认为箭头图标  [非必填]
            nextText: '下一页', // 下一页文字，不传默认为箭头图标 [非必填]
            ellipsis: true, // 页码显示省略符 默认false  [非必填]
            disabled: true, // 显示禁用手势 默认false  [非必填]
            currentChange: function(index, pageSize) { // 页码改变时回调  TODO:第一个参数是当前页码，第二个参数是每页显示条数数量，需使用sizes第二参数才有值。
                let limits = pageSize;
                let pages = index
                console.log(limits,pages)
                $.ajax({
                    url:"/product/all",
                    type:'GET',
                    data:{
                        page:1,
                        limit:20
                    },
                    processData: false,  // tell jquery not to process the data
                    contentType: false,
                    success:function(res){
                        console.log(res)
                        counts = res.count
                        let arr = res.data
                        $(".product_list").children().remove()
                        for(let ii of arr){
                            let product_list = `
                            <div class="col-sm-4 col-md-3 col-mm-6 product_img a_project" data-id = "${ii.product_id}">
                                            <a href="javascript:;">
                                                <img src="${path}${ii.product_image}" class="img-thumbnail" alt="行车记录仪 白色真爱版WDR宽动态 行车记录仪 白色真爱版WDR宽动态">
                                            </a>
                                        <p class="product_title"><a href="javascript:;" title="行车记录仪 白色真爱版WDR宽动态 行车记录仪 白色真爱版WDR宽动态">${ii.product_name}</a></p>
                                        </div>     
                            `
                        $(".product_list").append(product_list)
                        }   
                    }
                  })
            }
            
            
        })

      })






    $("body").on("click",".a_project",function(e){
        let project_id = e.currentTarget.dataset.id 
        console.log(project_id)
        location.href = "product/details?project_id="+project_id
    })

})()
