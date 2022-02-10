(function(){
    var raid_namenum=0;
    $('.dl-choose').each(function(){
        raid_namenum+=1
    })

    //全选
    $('.al-choose').click(function(){
        console.log(all_namenum)
        var all_namenum=0
        $("input[name='dl-choose']:checked").each(function(){
            all_namenum+=1
        })
        if( raid_namenum==all_namenum){
            $('.dl-choose').each(function(){
                $(this).removeAttr("checked")
                this.checked=false
            })

        }else{

            $('.dl-choose').each(function(){
                $(this).prop("checked","true")
            })
        }
     })

    //反全选
    $('.dl-choose').click(function() {
        var all_namenum = 0
        $("input[name='dl-choose']:checked").each(function () {
            all_namenum += 1
        })

        if (raid_namenum == all_namenum) {
            $('.al-choose').prop("checked", "true")
        } else {
            $('.al-choose').removeAttr("checked")
            document.getElementsByClassName('al-choose')[0].checked = false
        }
    })

    // btn功能
    // 添加
    $(".createusers").click(function(){
      add_traget()
    })
    // 添加弹框
    function add_traget(){
        // $("#userAdd").modal("show")
        show('userAdd')
        var  username = $(".createName").val(),
             Englishname = $(".Englishname").val(),
             miaoshu = $(".miaoshu").val();
             $(".createTrue").click(function(){
                $.ajax({
                    url: ':80/user/create/role',
                    type: 'POST',
                    data: {
                        role_name: username,
                        english_RoleName: Englishname,
                        role_description: miaoshu
                    },
                    success: (res) => {
                        // console.log(111)
                        console.log(res);
                    //     // console.log(res.code)
                    //    if(res.code == 1){
                    //     success_alert(res.chMessage)
                        hide('userAdd')
                    //     location.

                    //    }else{
                    //     warning_alert(res.chMessage)
                    //     hide('userAdd')

                    //    }
                    
                       
                    }
                })

             })

       
    }
    //弹框弹出
function show(w){
	$(`#${w}`).modal('show');
	$(".modal-content input").val("")
}
//弹框隐藏
function hide(w){
	$(`#${w}`).modal('hide');
}
    

})()

