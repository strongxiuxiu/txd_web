// 进入主页（）
(function(){
    $.ajax({
        url:"/product/all",
        type:'GET',
        data:{
            page:1,
            limit:9
        },
        processData: false,  // tell jquery not to process the data
        contentType: false,
        success:function(res){
            console.log(res)
        }

    })

})()
